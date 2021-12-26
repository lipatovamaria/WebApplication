def find_by_username(connection, username):
    db_cursor = connection.cursor()
    sql = "select * from usr_m where usr_m.username = \'" + username + "\'"
    db_cursor.execute(sql)
    result = db_cursor.fetchall()
    if len(result) == 0:
        return None
    else:
        return query_result_to_user(result[0])


def create_new_user(connection, new_user):
    db_cursor = connection.cursor()
    db_cursor.execute("insert into usr_m(username, password) values (%s, %s) returning *",
                      (new_user['username'], new_user['password']))
    connection.commit()
    user = db_cursor.fetchone()
    return query_result_to_user(user)


def query_result_to_user(q_res):
    return {
        'id': q_res[0],
        'username': q_res[1],
        'password': q_res[2]
    }
