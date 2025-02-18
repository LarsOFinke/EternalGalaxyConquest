from flask import Blueprint
from ...src.crud import *

auth = Blueprint("auth", __name__)