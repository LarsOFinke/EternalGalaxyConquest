from flask import Blueprint, render_template, session, redirect, url_for

views = Blueprint("views", __name__)


@views.route("/")
def home():
    return render_template("index.html")


@views.route("/register")
def register():
    return render_template("register.html")


@views.route("/mainmenu")
def mainmenu():
    if "username" not in session:
        return redirect(url_for("views.home"))
    
    return render_template("mainmenu.html")
