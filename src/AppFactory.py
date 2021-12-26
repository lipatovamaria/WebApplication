import os

from flask import current_app, request, session, Flask
from flask_cors import CORS

from configs import DbConfig
from controller.ProductController import task_blueprint
from controller.UserController import user_blueprint


def create_app():
    app = Flask(__name__)
    app.config.update(
        SECRET_KEY="BAD_SECRET_KEY",

        DB_NAME=os.environ['DB_NAME'],
        DB_HOST=os.environ['DB_HOST'],
        DB_USER=os.environ['DB_USER'],
        DB_PASSWORD=os.environ['DB_PASSWORD']
    )
    CORS(app, supports_credentials=True)

    app_ctx = app.app_context()
    app_ctx.push()

    current_app.db_connection = DbConfig.DbConfig(app).connection

    app.register_blueprint(task_blueprint, url_prefix="/product")
    app.register_blueprint(user_blueprint, url_prefix="/user")

    cookieSerializer = get_serializer(app.config['SECRET_KEY'])

    @app.after_request
    def cookies_set(response):
        same_cookie = cookieSerializer.dumps(dict(session))
        response.headers.add("Set-Cookie", f"my_cookie={same_cookie}; Secure; HttpOnly; SameSite=None; Path=/;")
        return response

    @app.before_request
    def cookies_get():
        if 'my_cookie' in request.cookies:
            same_cookie_session = cookieSerializer.loads(request.cookies['my_cookie'])
            if 'user' in same_cookie_session:
                session['user'] = same_cookie_session['user']

    return app


def get_serializer(secret_key):
    import hashlib
    from itsdangerous import URLSafeTimedSerializer
    from flask.sessions import TaggedJSONSerializer
    salt = 'cookie-session'
    serializer = TaggedJSONSerializer()
    signer_kwargs = {
        'key_derivation': 'hmac',
        'digest_method': hashlib.sha1
    }
    s = URLSafeTimedSerializer(secret_key, salt=salt, serializer=serializer, signer_kwargs=signer_kwargs)
    return s
