from flask import request,jsonify,abort,current_app,url_for
from .models import User,Role,Permission,RoleRequest,Offer
from werkzeug.security import check_password_hash, generate_password_hash
from flask_login import current_user,login_user,logout_user,login_required
from .auth import auth
from . import db 
from functools import wraps
from datetime import datetime
import os

from werkzeug.utils import secure_filename



def role_required(*roles):
    def wrapper(f):
        @wraps(f)
        def decorated_roles(*args,**kwargs):
            user =current_user
            if not user.is_authenticated:
                abort(401)

            if not user.role or user.role.name not in roles:
                abort(403)   
          
            
             
            return f(*args,**kwargs)
        return decorated_roles
    return wrapper





@auth.route('/register',methods=['GET','POST'])
def register():
    data = request.json
    
    name = data.get('name')
    email = data.get('email')
    password = data.get('password')
    confirm_password = data.get('confirm_password')
    
    user = User.query.filter_by(email=email).first()
    if user:
        return jsonify({
            'error':'email alredy registred'
        }),401
    if password != confirm_password:
        return jsonify({
            'error':'password must match'
        })
    if email== 'mansouriamine77@gmail.com':
        role = Role.query.filter_by(name='Admin').first()
        if not role:
            role = Role(name='Admin',permissions=Permission.VIEW | Permission.SEARCH | Permission.COMMENT | Permission.POST_PRODUCT | Permission.RECIEVE_PAYMENT | Permission.VIEW_ORDER_HISTORY | Permission. MODERATE_PRODUCT_LISTINGS | Permission.MANAGE_ACCOUNTS | Permission.CONFIGURE_SYSTEM_SETTINGS)
            db.session.add(role)
            db.session.commit()
        
     
         
    else:
        role =Role.query.filter_by(name='User').first()  
        if not role:
            role = Role(name='User',permissions=Permission.VIEW | Permission.SEARCH | Permission.COMMENT | Permission.ADD_TO_CART | Permission.PAY)
            db.session.add(role)
            db.session.commit()

        
    hashed_password = generate_password_hash(password,method='pbkdf2:sha256')
    new_user = User(name=name,email=email,password_hash=hashed_password,role_id = role.id)
    db.session.add(new_user)
    db.session.commit()
    
   
    

    return jsonify({
        'message':'email sent to you '
    }),200


@auth.route('/login',methods=['GET','POST'])
def login():
    data = request.json
    
    email = data.get('email')
    password = data.get('password')
    user =User.query.filter_by(email=email).first()
    if user and user.verify_password(password):
        login_user(user)
        return jsonify({
            'message':'log success'
        }),200
    else:
        return jsonify({
            'errro':'invalid credentials'
        }),401
    
@auth.route('/user',methods=['GET','POST'])
@login_required
def user():
    user_id = current_user.id 
    if not user_id:
        return jsonify({
            'error':'unauthorised'
        }),401
    user =User.query.get(user_id)
    if not user:
        return jsonify({
            'error':'user not found'
        }),401
    if user.role:
        return jsonify({
        'id':user.id,
        'name':user.name,
        'email':user.email,
        'role':user.role.name
    }),200
    else:
        return jsonify({
            'error':'user got no role'
        })
@auth.route('/logout',methods=['POST'])
@login_required
def logout():
    logout_user()
    return({
        'message':'successfully out'
    }),200


@auth.route('/check_status',methods=['GET'])
def check_auth():
    if current_user.is_authenticated:
        return jsonify({
            'is_authenticated':True
        }),200
    else:
        return jsonify({
            'is_authenticated':False,'message':'user not authenticated'
        }),200
    
@auth.route('/admin',methods=['GET'])
@login_required
@role_required('Admin')
def admin():
     return jsonify({
        "message": "Welcome to the Admin Page!",
        "status": "success"
    })

@auth.route('/role_request',methods=['POST'])
@login_required
def role_request():
    user = current_user
    data = request.json
    requested_role = data.get('requested_role')
    if not requested_role:
        return jsonify({'message':'no requested role submitted'}),400
    role = Role.query.filter_by(name=requested_role).first()
    if not role:
        return jsonify({'message':'requested role does not exist'}),400
    if user.role_id == role.id:
        return jsonify({'message':'your actual role is the requested'}),400
    existing_request = RoleRequest.query.filter_by(user_id=user.id,role_id=role.id,requested_role=requested_role).first()
    if existing_request:
        return jsonify({'message':'you have requested role existing'})
    rejected_request = RoleRequest.query.filter_by(user_id=user.id,role_id=role.id,status='rejected',requested_role=requested_role).first()
    if rejected_request:
        rejected_request.status ='pending'
        rejected_request.is_seen = False
        db.session.commit()
    approved_request = RoleRequest.query.filter_by(user_id=user.id,role_id=role.id,status='approved',requested_role=requested_role).first()
    if approved_request:
        approved_request.status ='pending'
        approved_request.is_seen = 'False'
        db.session.commit()
    new_request =RoleRequest(user_id=user.id,role_id=role.id,requested_role=requested_role)
    db.session.add(new_request)
    db.session.commit()
    return jsonify({'message':'your request sent'}),200    


    





@auth.route('/seen_request',methods=['GET'])
@login_required
@role_required('Admin')
def seen_request():
    seen_requests = RoleRequest.query.filter_by(is_seen=False).all()
    
    requested = [
        
        {
            'id':seen_request.id,
            'requested_role':seen_request.requested_role,
            'name': seen_request.user.name if seen_request.user else 'Unknown',
             'timestamp': seen_request.timestamp.isoformat(),
            'status': 'pending'
          
        }
        for seen_request in seen_requests
        
    ]
    return jsonify(requested)


@auth.route('/action/<int:request_id>',methods=['POST'])
@login_required
@role_required('Admin')
def action(request_id):
    data = request.json
    action = data.get('action')
    if action not in ['approve','reject']:
        return jsonify({
            'error':'action not defined'
        }),403
    role_request = RoleRequest.query.get(request_id)
    if not role_request:
        return jsonify({
            'error':'role request not registred'
        }),404
    if action =='approve':
        role_request.status ='approved'
        user = User.query.get(role_request.user_id)
        user.role_id = role_request.role_id
        role_request.is_seen = True
    elif action =='reject':
        role_request.status = 'rejected'
    role_request.is_seen = True
    db.session.commit()
    return jsonify({
        'message':f'request {action}d successfully'
    }),200

@auth.route('/trading', methods=['GET'])
@login_required
@role_required('Admin','Vendor','Moderator')
def trading():
    return jsonify({
         "message": "Welcome to the Vendor Page!",
        "status": "success"

    }),200
def allowed_filename(filename):
    return "." in filename and filename.rsplit(".", 1)[1].lower() in current_app.config["ALLOWED_EXTENSIONS"]




@auth.route('/offers',methods=['POST'])
@login_required
@role_required('Admin','Vendor','Moderator')
def offer():
    upload_folder = current_app.config["UPLOAD_FOLDER"]
   
    






    user = current_user
    name = request.form.get('name')
    price = request.form.get('price')
    quantity = request.form.get('quantity')
    image = request.files['image']
    offer = Offer.query.filter_by(name=name,user_id = user.id).first()
    if offer:
        offer.quantity = quantity
        db.session.commit()
        return jsonify({'message':'offer updated','image_url':url_for('static',filename=f'upload/{offer.image}',_external=True)}),200
    if not offer:
        if image and allowed_filename(image.filename):
            filename = secure_filename(image.filename)
            file_path = os.path.join(upload_folder, filename)
            image.save(file_path)


            new_offer = Offer(user_id=user.id,name=name,price=price,quantity=quantity,image=filename)
            db.session.add(new_offer)
            db.session.commit()
            return jsonify({
                'message': 'New product added',
                'id': new_offer.id,
                'name': new_offer.name,
                'quantity': new_offer.quantity,
                'price': new_offer.price,
                'image_url': url_for('static', filename=f'upload/{new_offer.image}', _external=True) 
            }), 200



@auth.route('/my_product',methods=['GET'])
def my_product():
    products = Offer.query.all()
    product_offer=[
        {
            'id':product.id,
            'name':product.name,
            'quantity':product.quantity,
        
            'price':product.price,
            'image_url':url_for('static',filename=f'upload/{product.image}',_external=True),
            'email':product.user.email if product.user else None


        }
        for product in products

    ]
    return jsonify(product_offer),200

@auth.route('/my_products',methods=['GET'])
@login_required
@role_required('Admin','Vendor','Moderator')
def my_offer():
    user = current_user
    offers= Offer.query.filter_by(user_id=user.id).all()
    if not offers:
        return jsonify({'message':'no product listed'}),200
    my_offer=[
          {
            'id':o.id,
            'name':o.name,
            'quantity':o.quantity,
        
            'price':o.price,
            'image_url':url_for('static',filename=f'upload/{o.image}',_external=True)



        }
        for o in offers


    ]
    return jsonify(my_offer),200


@auth.route('/delete/<int:id>',methods=['DELETE'])
@login_required
@role_required('Admin','Vendor','Moderator')
def delete(id):
    user=current_user
    product_offer = Offer.query.get(id)
    if not product_offer:
        return jsonify({'error':'product does not exist'}),400
    db.session.delete(product_offer)
    db.session.commit()
    return jsonify({'message':'product successfully removed'}),200
    


   
    











        


    


