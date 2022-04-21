from flask import Flask, send_from_directory
from flask_restful import Api, Resource, reqparse
from flask_cors import CORS #comment this on deployment

import json


app = Flask(__name__, static_url_path='', static_folder='frontend/build')
CORS(app) #comment this on deployment
api = Api(app)

@app.route("/")
def index():
    return send_from_directory(app.static_folder,'index.html')

@app.route('/hello', methods=['GET'])
def helloWorld():
    return {
        'resultStatus': 'SUCCESS',
        'message': "Hello Api Handler!"
    }

@app.route('/update', methods=['POST'])
def updateTodo():
    parser = reqparse.RequestParser()
    parser.add_argument('Todos', type=list, action= 'append')
    parser = parser.parse_args()
    Todos = parser['Todos']
    
    with open("sample.json", "w") as outfile:
        json.dump(Todos, outfile)
    

    
    
    
    
    
    
    
    
    # parser.add_argument('type', type=str)
    # parser.add_argument('message', type=str)



    # print(args)

    # request_type = args['type']
    # request_msg = args['message']
    
    # currently just returning the request straight back
    # if request_msg:
    #     ret_msg = "Your Message: {}".format(request_msg)
    # else:
    #     ret_msg = "No Message"

    # if ret_msg:
    #     ret_type = "Your Type: {}".format(request_type)
    # else:
    #     ret_type = "No Type"
    
    # final_ret = {"status": "Success", "message": ret_msg, "type": ret_type}

    # return final_ret