from backend.app import create_app#, socketio
# from flask_socketio import SocketIO # COMMENT OUT FOR PRODUCTION



if __name__ == "__main__":
    app = create_app()
    # app.run(debug=True)
    # socketio = SocketIO(app)
    from backend.app import socketio
    # from backend.app.blueprints.api import events # COMMENT OUT FOR PRODUCTION
    socketio.run(app, debug=True)