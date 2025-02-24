from flask import Blueprint, Response

api = Blueprint("api", __name__)

### REQUIRES DB SET UP ###
# @api.route("/image/<image_id>")
# def serve_image(image_id: str):
#     """This route serves to return an image to HTML. Implement it as a src={{ url_for('serve_image', question_id=XXX) }}.

#     Args:
#         image_id (str): String of the image_id from the database.

#     Returns:
#         A HTML-readable response of an images binary data.
#     """
#     image_binary = get_image(int(image_id))    # Retreive the image-binary from the database
#     image_stream = BytesIO(image_binary) # Use io.BytesIO to wrap binary data
#     return Response(image_stream, mimetype='image/jpeg')    # Return the image as a response with the correct MIME type
