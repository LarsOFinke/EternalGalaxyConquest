from flask import Blueprint, render_template, session, redirect, url_for

views = Blueprint("views", __name__)


@views.route("/")
def home():
    if "username" in session:
        return redirect(url_for("views.mainmenu"))
    
    return render_template("index.html")


@views.route("/mainmenu")
def mainmenu():
    if "username" not in session:
        return redirect(url_for("views.home"))
    
    return render_template("mainmenu.html")
