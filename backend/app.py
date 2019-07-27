from flask import Flask, jsonify, request
from flask import make_response, redirect
# from flask_login import LoginManager, login_user, logout_user
import psycopg2
from flask_cors import CORS
import json

app = Flask("hackerman")
CORS(app)

global connection
global cursor

def connect_db():
    try: 
        connection = psycopg2.connect(user="postgres",
                                        password="postgres", ####### PUT YOUR OWN PASSWORD HERE ######
                                        host="127.0.0.1",
                                        port="5432",
                                        database="hackerman")      
    except:
        print( "Failed to connect to the DATABASE")

    return connection
    

def closeDB():
    #closing database connection.
    global connection
    global cursor

    if(connection):
        connection.cursor.close()
        connection.close()
        print("PostgreSQL connection is closed")

def get_user_db(email):
    global connection
    global cursor

    if (not connection):
        connection = connect_db
        cursor = connection.cursor()
    try:
        sql_select_query = """select * from users where email=%s;"""
        cursor.execute(sql_select_query, (email,))
        record = cursor.fetchone()
        return record

    except (Exception, psycopg2.Error) as error :
        if(connection):

            print("Failed to find user data on USER Table", error)        

def get_all_product_info():
    return

def get_all_session_info():
    global connection
    global cursor
    if (not connection):
        connection = connect_db
        cursor = connection.cursor()

    # To retrieve the available slot for booking 
    # List of slot will be returned as record in following format:
    # sessID, weekday(0 or 7), time starts, Address of booking, remaining spot.
    query = """
    with CountBookedNumber(id, number) as (
        select distinct SessID, count(*) over (partition by SessID)
        from Bookings 
    )
    select distinct CS.ID, CS.weekDay, CS.timeStarts,  C.Address, CS.capacity - CBN.number as available_spot
    from ClassSessions as CS, Centres as C, CountBookedNumber as CBN
    where CS.location = C.ID and CS.ID = CBN.id
    ;
    """
    cursor.execute(query)
    record = cursor.fetchall()
    slotlist = []
    for r in record:
        slotlist.append( (r[0], r[1], r[2].strftime('%H:%M:%S'), r[3], r[4] ))
    return json.dumps(slotlist)


def bookFreeSlot(session_id, user_email):
    global connection
    global cursor
    if (not connection):
        connection = connect_db
        cursor = connection.cursor()

    # Checking for whether current seesion id can be booked
    # we are checking again with DB since it might be changed
    # during user were reading previous info.
    query = """
    with CountBookedNumber(number) as (
        select count(*) 
        from Bookings where SessID=%s
    )
    select distinct CS.capacity - CBN.number >= 0
    from ClassSessions as CS, CountBookedNumber as CBN
    where CS.ID = %s
    ;
    """
    cursor.execute(query, (session_id, session_id) )
    record = cursor.fetchone()
    if(record[0] ):
        query = """
        insert into bookings values ( (select id from users where emails='%s'),  %s, DEFAULT);
        """
        cursor.execute(query, (user_email, session_id) )
    
def account_exist(user_email, psswd):
    global connection
    global cursor
    if (not connection):
        connection = connect_db
        cursor = connection.cursor()
    query="""
    select id from users where Email='%s' and Passwd='%s';
    """
    cursor.execute(query, (user_email, psswd) )
    return cursor.rowcount != 0


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

@app.route("/product/") 
def get_product_info():
    global connection
    global cursor
    if (not connection):
        connection = connect_db
        cursor = connection.cursor()

    query = """
    select * from tools;
    """
    cursor.execute(query)
    record = cursor.fetchall()
    r_list = []
    for r in record:
        r_list.append({'name':r[0], 'img_src':r[1], 'id':r[2], 'location_id':r[3], 'rention_rate':r[4]})
    return jsonify(r_list)

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
        "id": centre_id
    })

# Query for all session information which includes the booking availability.
@app.route("/session/") 
def session_page():
    return get_all_session_info()


# Query for the booking availability
@app.route("/booking/<session_id>")
def book(session_id):
    user_email = request.cookies.get('user_email')
    return bookFreeSlot(session_id, user_email)

@app.route("/login/")
def check_login():
    user_email = request.cookies.get('user_email')
    result = {}
    result['result'] = "False"

    # if user already logged in, go back.
    if user_email:
        result['result'] = "True"
        return jsonify(result)
    if request.method=='POST':
        user_email = request.form.get('user_email')
        psswd = request.form.get('psswd')
        if(account_exist(user_email, psswd) ):
            resp = make_response(redirect('/'))
            resp.set_cookie('user_email', user_email)
            return resp

    return jsonify(result)


def add_new_account(user_email, psswd):
    first_name = request.form.get('first_name')
    last_name = request.form.get('last_name')
    phone_number = request.form.get('phone_number')
    dob = request.form.get('dob')

    query = """
    insert into bookings values ( DEFAULT,  %s, %s, %s, %s, %s, %s);
    """
    cursor.execute(query, (psswd, first_name, last_name, user_email, phone_number, dob) )


@app.route("/register/")
def check_user_can_be_registered():

    if request.method=='POST':
        user_email = request.form.get('user_email')
        psswd = request.form.get('psswd')

    else:
        return 0

    if(not account_exist(user_email, psswd) ):

        resp = make_response(redirect('/'))
        resp.set_cookie('user_email', user_email)
        return resp
    else:
        return 0

@app.route("/rent/<tooltype>")
def rentItem(tooltype):
    user_email = request.cookies.get('user_email')
    if not user_email:
        return 0

    # Select one tool that has renting fee. (meaning rentable)
    query="""
    select id from tools as t where tooltype='%s'
    and rentingfee is not null limit 1;
    """
    cursor.execute(query, (tooltype) )
    record = cursor.fetchone()

    if( cursor.rowcount != 0 ):
        toolid = record[0]
        expiry_date = request.form.get('expiry_date')

        query="""
        insert into rents values(%s, (select id from users where emails='%s'), '%s', DEFAULT );
        update tools set rentingfee=null where id=%s;
        """
        cursor.execute(query, (toolid, user_email, expiry_date, toolid) )


if __name__ == '__main__':
    global connection
    connection = connect_db()
    global cursor
    cursor = connection.cursor()
    app.run("0.0.0.0", "8080", debug=True)
    closeDB()