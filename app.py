from backend.app import create_app

app = create_app()
from backend.app import socketio



if __name__ == "__main__":
    socketio.run(app, debug=True)
