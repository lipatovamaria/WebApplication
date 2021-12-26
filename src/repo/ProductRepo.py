def get_user_products(connection, user_id):
    db_cursor = connection.cursor()
    db_cursor.execute("select * from product where product.owner_id = %s", [user_id])
    tasks = db_cursor.fetchall()
    if len(tasks) > 0:
        tasks = list(map(lambda t: query_res_to_product(t), tasks))
        return tasks
    else:
        return []


def add_product(connection, user_id, new_product):
    db_cursor = connection.cursor()
    db_cursor.execute(
        "insert into product(name , water, squirrels, fats, carbohydrates, callories, owner_id)"
        "values (%s, %s, %s, %s, %s, %s, %s)  "
        "returning *",
        (new_product['name'], new_product['water'], new_product['squirrels'],
         new_product['fats'], new_product['carbohydrates'], new_product['callories'],
         user_id))
    connection.commit()
    saved_task = db_cursor.fetchone()
    return query_res_to_product(saved_task)


def query_res_to_product(q_res):
    return {
        'id': q_res[0],
        'name': q_res[1],
        'water': q_res[2],
        'squirrels': q_res[3],
        'fats': q_res[4],
        'carbohydrates': q_res[5],
        'callories': q_res[6]
    }
