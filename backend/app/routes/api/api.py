from flask import Blueprint, Response, request, jsonify
from io import BytesIO
from ...src.crud import add_sprite, get_sprite
import base64



api = Blueprint("api", __name__)



@api.route("/sprite/upload", methods=["POST"])
def upload_sprite():
    # data = request.get_json()
    # print(data)
    file_data = request.files['sprite']
    print(file_data)
    
   
    try:
        # The file is already in binary format, you can directly pass it to your add_sprite function
        # If you need to process it further (like converting it to an image object or manipulating the binary data)
        file_binary_data = file_data.read()  # Read the file as binary data
        
        # Process the file binary data with the add_sprite function
        if add_sprite(file_binary_data):
            return jsonify({'message': 'File uploaded successfully'})
        
        return jsonify({'message': 'File upload failed'}), 500
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({'message': 'An error occurred during file upload'}), 500



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
