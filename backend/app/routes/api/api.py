from flask import Blueprint, Response, request, jsonify
from io import BytesIO
from ...src.crud import add_sprite, get_sprite
import base64



api = Blueprint("api", __name__)



@api.route("/sprite/upload", methods=["POST"])
def upload_sprite():
    data = request.get_json()
    file_data = data.get('fileData')
    
    if file_data.startswith('data:'):
        file_data = file_data.split(',')[1]

    # Decode the base64 data to binary data
    file_binary_data = base64.b64decode(file_data)
    if add_sprite(file_binary_data):
        return jsonify({'message': 'File uploaded successfully'})
    
    return jsonify({'message': 'File upload failed'})



@api.route("/sprite/<sprite_id>")
def serve_sprite(sprite_id: str):
    """This route serves to return a sprite to HTML. Implement it as a src="/api/sprite/xxx" --> xxx = ID of the sprite in the database.

    Args:
        image_id (str): String of the sprite_id from the database.

    Returns:
        A HTML-readable response of a sprite binary data.
    """
    sprite_binary = get_sprite(int(sprite_id))    # Retreive the image-binary from the database
    sprite_stream = BytesIO(sprite_binary) # Use io.BytesIO to wrap binary data
    return Response(sprite_stream, mimetype='image/jpeg')    # Return the image as a response with the correct MIME type
