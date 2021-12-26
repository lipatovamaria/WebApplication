import psycopg2


class DbConfig:
    instance = None
    cursor = None
    connection = None

    def __init__(self, app):
        if DbConfig.instance is not None:
            raise Exception("This class is a singleton!")
        else:
            DbConfig.open_connection(app.config['DB_NAME'], app.config['DB_HOST'], app.config['DB_USER'],
                                     app.config['DB_PASSWORD'])
            DbConfig.__instance = self

    @staticmethod
    def open_connection(db_name, host, user, password):
        DbConfig.close_connection()
        con = psycopg2.connect(dbname=db_name, user=user, host=host, password=password)
        DbConfig.connection = con
        DbConfig.cursor = con.cursor()

    @staticmethod
    def close_connection():
        if DbConfig.cursor is not None:
            DbConfig.cursor.close()
        if DbConfig.connection is not None:
            DbConfig.connection.close()
