from flask import Blueprint, request, jsonify
from ...src.crud import validate_login, create_login



auth = Blueprint("auth", __name__)


@auth.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    
    if validate_login(username, password):
        return jsonify({"message": "Login successful!"}), 200
    else:
        return jsonify({"message": "Invalid credentials!"}), 401
    
    
@auth.route("/register", methods=["POST"])
def register():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")
    
    if create_login(username, password):
        return jsonify({"message": "Registration successful!"}), 200
    else:
        return jsonify({"message": "Registration failed!"}), 401
    