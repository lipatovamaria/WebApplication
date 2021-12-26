import hashlib
from flask import request, Blueprint, current_app, Response, session, jsonify

from repo import UserRepo

user_blueprint = Blueprint('user', __name__)


@user_blueprint.route('/', methods=['GET'])
def get_user():
    if 'user' in session:
        return jsonify(session['user'])
    else:
        return Response(status=401)


@user_blueprint.route('/in', methods=["POST"])
def auth():
    auth_data = request.json
    auth_data['password'] = hashlib.md5(auth_data['password'].encode('utf-8')).hexdigest()
    conn = current_app.db_connection
    user = UserRepo.find_by_username(conn, auth_data['username'])
    if user is None:
        return Response(status=403)
    elif user['password'] != auth_data['password']:
        return Response(status=403)
    else:
        session['user'] = user
        return {}


@user_blueprint.route('/', methods=["POST"])
def reg_user():
    reg_data = request.json
    conn = current_app.db_connection
    user = UserRepo.find_by_username(conn, reg_data['username'])
    if user is None:
        reg_data['password'] = hashlib.md5(reg_data['password'].encode('utf-8')).hexdigest()
        UserRepo.create_new_user(conn, reg_data)
        return {}
    else:
        return Response(status=409)


@user_blueprint.route('/out', methods=['GET'])
def sign_out_user():
    if 'user' in session:
        session.pop('user', None)
        return {}
    else:
        return Response(status=401)
