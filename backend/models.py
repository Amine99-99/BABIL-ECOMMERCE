from werkzeug.security import generate_password_hash, check_password_hash
from . import db ,login_manager
from flask_login import UserMixin
from datetime import datetime
from flask import current_app
import hashlib



class User(db.Model,UserMixin):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(64))

    email = db.Column(db.String(128), unique=True, nullable=False)
    password_hash = db.Column(db.String(128))
    role_id = db.Column(db.Integer,db.ForeignKey('role.id'))
    member_since = db.Column(db.DateTime(), default=datetime.utcnow)
    last_seen = db.Column(db.DateTime(), default=datetime.utcnow)
    confirmed = db.Column(db.Boolean, default=False)
    
    about_me = db.Column(db.Text())
    
    avatar_hash = db.Column(db.String(32))

    @property
    def password(self):
        raise AttributeError('password is not a readable attribute')

    @password.setter
    def password(self, password):
        self.password_hash = generate_password_hash(password)

    def verify_password(self, password):
        return check_password_hash(self.password_hash, password)
    
    
    
@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))
    
class Permission:
    VIEW  = 1
    SEARCH = 2
    COMMENT =4
    ADD_TO_CART = 8  
    PAY =16
    POST_PRODUCT=32
    RECIEVE_PAYMENT = 64
    VIEW_ORDER_HISTORY = 128
    MODERATE_PRODUCT_LISTINGS =256
    MANAGE_ACCOUNTS= 512
    CONFIGURE_SYSTEM_SETTINGS = 1024

class Role(db.Model):
    __tablename__='role'
    id = db.Column(db.Integer,primary_key=True)
    name = db.Column(db.String(64),unique=True)
    permissions = db.Column(db.Integer)
    default=db.Column(db.Boolean,default=False)
    users = db.relationship('User',backref='role',lazy='dynamic')

    def __init__(self,**kwargs):
        super(Role,self).__init__(**kwargs)
        if self.permissions is None:
            self.permissions=0


    def insert_roles():
         roles = {
            'Guest': [Permission.VIEW, Permission.SEARCH],
            'User': [Permission.VIEW, Permission.SEARCH, Permission.COMMENT, Permission.ADD_TO_CART,Permission.PAY],
            'Vendor':[Permission.VIEW, Permission.SEARCH, Permission.COMMENT, Permission.ADD_TO_CART,Permission.PAY,Permission.POST_PRODUCT,Permission.RECIEVE_PAYMENT],
            'Moderator':[Permission.VIEW, Permission.SEARCH, Permission.COMMENT,Permission.POST_PRODUCT,Permission.RECIEVE_PAYMENT,Permission.VIEW_ORDER_HISTORY,Permission. MODERATE_PRODUCT_LISTINGS],
            'Admin':[Permission.VIEW, Permission.SEARCH, Permission.COMMENT,Permission.POST_PRODUCT,Permission.RECIEVE_PAYMENT,Permission.VIEW_ORDER_HISTORY,Permission. MODERATE_PRODUCT_LISTINGS,Permission.MANAGE_ACCOUNTS,Permission.CONFIGURE_SYSTEM_SETTINGS],
       
        }
         default_role ='Guest'
         for r in roles:
             role = Role.query.filter_by(name=r).first()
             if role is None:
                 role = Role(name=r)
             role.reset_permission()
             for perm in roles[r]:
                 role.add_permission(perm)
                 role.default=(role.name == default_role)
                 db.session.add(role)
         db.session.commit()
    def add_permission(self,perm):
        if  not self.has_permission(perm):
            self.permissions +=perm
    def remove_permission(self,perm):
        if self.has_permission(perm):
            self.permissions -= perm
    def reset_permission(self):
        self.permissions = 0

    def has_permission(self,perm):
        return self.permissions & perm == perm
    


class RoleRequest(db.Model):
    __tablename__ = 'role_requests'
    id =db.Column(db.Integer,primary_key=True)
    user_id = db.Column(db.Integer,db.ForeignKey('user.id'))
    role_id = db.Column(db.Integer,db.ForeignKey('role.id'))
    requested_role = db.Column(db.String(60),nullable=False)
    status = db.Column(db.String(32),default='pending')
    is_seen = db.Column(db.Boolean, default=False)  
    timestamp = db.Column(db.DateTime,default = datetime.utcnow)
    updated_at = db.Column(db.DateTime,onupdate = datetime.utcnow)
    users = db.relationship('User',backref='role_requests')
    roles =  db.relationship('Role',backref='role_requests')


class Offer(db.Model):
    __tablename__='offer'
    id = db.Column(db.Integer, primary_key=True)  
    name = db.Column(db.String(255), nullable=False)  
    price = db.Column(db.Float, nullable=False) 
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False) 
    quantity = db.Column(db.Integer, nullable=False) 
    image = db.Column(db.String(255)) 

    user = db.relationship('User', backref='offers', lazy=True)

    def __repr__(self):
        return f'<Product {self.name}>'

    
    
    

