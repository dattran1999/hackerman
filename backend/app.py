from flask import Flask, jsonify, request
from flask_login import LoginManager, login_user, logout_user
import psycopg2
from flask_cors import CORS

app = Flask("hackerman")
CORS(app)

def get_tools_db():
    try:
        connection = psycopg2.connect(user="postgres",
                                        password="postgres",
                                        host="127.0.0.1",
                                        port="5432",
                                        database="hackerman")
        cursor = connection.cursor()

        sql_select_query = """select * from tools;"""
        cursor.execute(sql_select_query)
        record = cursor.fetchall()
        return record

    except (Exception, psycopg2.Error) as error :
        if(connection):
            print("Failed to get all the tools", error)

    finally:
        #closing database connection.
        if(connection):
            cursor.close()
            connection.close()
            print("PostgreSQL connection is closed")

def get_user_db(email):
    try:
        connection = psycopg2.connect(user="postgres",
                                        password="postgres",
                                        host="127.0.0.1",
                                        port="5432",
                                        database="hackerman")
        cursor = connection.cursor()

        sql_select_query = """select * from users where email=%s;"""
        cursor.execute(sql_select_query, (email,))
        record = cursor.fetchone()
        return record

    except (Exception, psycopg2.Error) as error :
        if(connection):
            print("Failed to find record with user email", error)

    finally:
        #closing database connection.
        if(connection):
            cursor.close()
            connection.close()
            print("PostgreSQL connection is closed")

def saveToDB():
    try:
        connection = psycopg2.connect(user="postgres",
                                        password="postgres",
                                        host="127.0.0.1",
                                        port="5432",
                                        database="hackerman")
        cursor = connection.cursor()

        print("Table Before updating record ")
        sql_select_query = """select * from users"""
        cursor.execute(sql_select_query)
        record = cursor.fetchall()
        print(record)
        # Update single record now
        sql_update_query = """INSERT INTO Users VALUES (DEFAULT, %s, %s, %s);"""
        
        user_name = 'Augustine'
        user_email = 'augusdn@gmail.com'
        user_birthday = '1995-12-14'
        cursor.execute(sql_update_query, (user_name,user_email,user_birthday))
        connection.commit()
        count = cursor.rowcount
        print(count, "Record Updated successfully ")
        print("Table After updating record ")
        sql_select_query = """select * from users"""
        cursor.execute(sql_select_query)
        record = cursor.fetchall()
        print(record)

    except (Exception, psycopg2.Error) as error :
        if(connection):
            print("Failed to insert record into mobile table", error)

    finally:
        #closing database connection.
        if(connection):
            cursor.close()
            connection.close()
            print("PostgreSQL connection is closed")


@app.route("/")
def home_page():
    # show popular products data  
    # TODO: fetch data from database
    data = {}
    return "Hello, World!"

@app.route("/product/<product_id>") 
def get_product_info(product_id):
    product = {}
    product['id'] = product_id
    return jsonify(product)

@app.route("/user/<user_id>")
def get_user_info(user_id):
    user_info = {}
    # user_info['email'] = user_id
    #email = 'augusdn@gmail.com'
    result = get_user_db(user_id)
    user_info['id'] = result[0]
    user_info['password'] = result[1]
    user_info['fName'] = result[2]
    user_info['lName'] = result[3]
    user_info['email'] = user_id
    user_info['pNumber'] = result[5]
    user_info['DOB'] = result[6]
    return jsonify(user_info)

@app.route("/tools/")
def get_all_tools():
    tools = {}
    results = get_tools_db()
    return jsonify(results)

@app.route("/centre/<centre_id>")
def get_centre_info(centre_id):
    return jsonify({
        "id": centre_id,
    })

if __name__ == '__main__':
   app.run("0.0.0.0", "8080", debug=True)