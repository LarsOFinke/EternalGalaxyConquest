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


@views.route("/game")
def game():
    return render_template("game.html")


@views.route("/profile")
def profile():
    return render_template("profile.html")


@views.route("/settings")
def settings():
    return render_template("settings.html")


@views.route("/admin-panel")
def admin_panel():
    if "is_admin" not in session or not session["is_admin"]:
        return redirect(url_for("views.home"))
    
    return render_template("admin_panel.html")
