from flask import Blueprint, Response
from io import BytesIO
from ...src.crud import get_sprite



api = Blueprint("api", __name__)



### REQUIRES DB SET UP ###
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
