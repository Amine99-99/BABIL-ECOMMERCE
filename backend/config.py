import os

basedir = os.path.abspath(os.path.dirname(__file__))

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY', 'hello from jamaica')
    
    SQLALCHEMY_DATABASE_URI = os.environ.get('SQLALCHEMY_DATABASE_URI', 'sqlite:///' + os.path.join(basedir, 'data.sqlite'))
    

    MAIL_SERVER = os.environ.get('MAIL_SERVER', 'smtp.googlemail.com')
    MAIL_PORT = int(os.environ.get('MAIL_PORT', '587'))
    MAIL_USE_TLS = os.environ.get('MAIL_USE_TLS', 'false').lower() in ['true', 'on', '1']
    MAIL_USE_SSL = os.environ.get('MAIL_USE_SSL', 'false').lower() in ['true', 'on', '1']

    MAIL_USERNAME = os.environ.get('MAIL_USERNAME')
    MAIL_PASSWORD = os.environ.get('MAIL_PASSWORD')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    OFFBRAND_MAIL_SUBJECT_PREFIX = '[offbrand]'
    OFFBRAND_MAIL_SENDER = 'Offbrand Admin <mansouriamine77@gmail.com>'
    OFFBRAND_ADMIN = os.getenv('OFFBRAND_ADMIN') or 'mansouriamine77@gmail.com'
    
    SQLALCHEMY_RECORD_QUERY = True
