from flask import Blueprint
from ...src.db.crud import *

auth = Blueprint("auth", __name__)