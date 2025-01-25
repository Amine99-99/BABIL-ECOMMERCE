from . import create_app
from flask_migrate import Migrate, upgrade
from  .models import User,Role,Permission
from . import db

app = create_app()

migrate=Migrate(app,db)

@app.shell_context_processor
def make_shell_context():
    return dict(db=db, User=User, Role=Role,
	              Permission=Permission)

@app.cli.command()
def deploy():
    
    upgrade()

    
    Role.insert_roles()