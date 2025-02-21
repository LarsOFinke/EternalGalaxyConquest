from backend.app import create_app



if __name__ == "__main__":
    app = create_app()
    from backend.app import socketio
    socketio.run(app, debug=True)