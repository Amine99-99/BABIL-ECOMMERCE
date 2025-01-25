from flask import request,jsonify,abort
from .models import User,Role,Permission,RoleRequest
from werkzeug.security import check_password_hash, generate_password_hash
from flask_login import current_user,login_user,logout_user,login_required
from .auth import auth
from . import db
from functools import wraps
from datetime import datetime

def role_required(*roles):
    def wrapper(f):
        @wraps(f)
        def decorated_roles(*args,**kwargs):
            user =current_user
            if user.is_authenticated:
                if user.role.name not in roles:
                    abort(403)
            else:
                abort(401)
            
             
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
        role = Role.query.filter_by(name='User').first() 
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
    return jsonify({
        'id':user.id,
        'name':user.name,
        'email':user.email,
        'role':user.role.name
    }),200
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
    user =current_user
    data = request.json
    requested_role = data.get('requested_role')
    
    if not requested_role:
        return jsonify({
            'error':'requested role not found'

        }),401
    role = Role.query.filter_by(name=requested_role).first()
    if not role:
        return jsonify({
            'error':'role not found'
        }),401
  
    new_requested = RoleRequest(user_id = user.id,role_id = role.id,requested_role =requested_role,status='pending')
    db.session.add(new_requested)
    db.session.commit()
    return jsonify({
        'message':'your request successfully sent'
    }),200

@auth.route('/seen_request',methods=['GET'])
@login_required
@role_required('Admin')
def seen_request():
    seen_requests = RoleRequest.query.filter_by(is_seen=False).all()

    requested = [
        {
            'id':seen_request.id,
            'requested_role':seen_request.requested_role,
            'name':seen_request.users.name,
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





        


    


