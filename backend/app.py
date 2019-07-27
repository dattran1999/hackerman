from flask import Flask, jsonify, request
from flask_login import LoginManager, login_user, logout_user

app = Flask("hackerman")

@app.route("/")
def home_page():
    # show popular products data  
    # TODO: fetch data from database
    data = {}
    return jsonify(data)

@app.route("/product/<product_id>")
def get_product_info(product_id):
    product = {}
    product['id'] = product_id
    return jsonify(product)

@app.route("/user/<user_id>")
def get_user_info(user_id):
    user_info = {}
    user_info['id'] = user_id
    return jsonify(user_info)

@app.route("/centre/<centre_id>")
def get_centre_info(centre_id):
    return jsonify({
        "id": centre_id,
    })

if __name__ == '__main__':
   app.run("0.0.0.0", "8080", debug=True)