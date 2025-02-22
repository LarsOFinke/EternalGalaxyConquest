from os import getenv, path, mkdir
from datetime import timedelta
import logging
from dotenv import load_dotenv
from flask import Flask
from flask_session import Session
from flask_socketio import SocketIO



### SET UP LOGGING ###

# Create directory, if neccessary #
if not path.exists("./logs"):                               
    mkdir("./logs")

# Set up the config #
logging.basicConfig(
    filename='./logs/backend_error_log.txt',                  # Specify the log file path
    level=logging.ERROR,                                    # Set the logging level to ERROR
    format='%(asctime)s - %(levelname)s - %(message)s',     # Customize the log format
)


### Create the Flask-Application ###
def create_app():
    app = Flask("Eternal Galaxy Conquest", static_folder="frontend/static", template_folder="frontend/templates")
    
    # Set the Flask app's log level
    app.logger.setLevel(logging.ERROR)

    # Suppress the Werkzeug log level to prevent connection request logs
    log = logging.getLogger('werkzeug')
    log.setLevel(logging.ERROR)
    
    ## Import Blueprints (routing) ##
    
    # HTML-Templates #
    from .blueprints.views import views 
    app.register_blueprint(views, url_prefix='/')
    
    # General API #
    from .blueprints.api.api import api     
    app.register_blueprint(api, url_prefix='/api')    
    
    # Login-System API #
    from .blueprints.api.auth import auth    
    app.register_blueprint(auth, url_prefix='/api/auth')
    
    
    ## Set up Configuration ##
    load_dotenv()
    app.config["SECRET_KEY"] = getenv("SECRET_KEY")

    # Session management #
    app.config['SESSION_USE_SIGNER'] = True   # REMOVED BC IT MESSES WITH WEBSOCKET APPARENTLY #
    app.config['SESSION_TYPE'] = 'filesystem'   # Save sessions server-sided
    if not path.exists("./backend/sessions"):   # Create directory, if neccessary
        mkdir("./backend/sessions")
    app.config['SESSION_FILE_DIR'] = './backend/sessions'


    ## Initialize the session for the app ##
    app.permanent_session_lifetime = timedelta(minutes=5000)
    Session(app)
    
    
    ## Initialize the websocket ##
    global socketio
    socketio = SocketIO(app, cors_allowed_origins="*", async_mode='eventlet')
    # Websocket-events #
    from .blueprints.api import events
    
    return app