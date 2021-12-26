from flask import jsonify, request, Blueprint, session, Response, current_app

from repo import ProductRepo

task_blueprint = Blueprint('product', __name__)


@task_blueprint.route('/', methods=["GET"])
def get_products():
    if 'user' in session:
        conn = current_app.db_connection
        user_id = session['user']['id']
        return jsonify(ProductRepo.get_user_products(conn, user_id))
    else:
        return Response(status=401)


@task_blueprint.route('/', methods=["POST"])
def add_product():
    if 'user' in session:
        conn = current_app.db_connection
        user_id = session['user']['id']
        newProduct = request.json
        return jsonify(ProductRepo.add_product(conn, user_id, newProduct))
    else:
        return Response(status=401)
