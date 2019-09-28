from flask import Flask,request
import json

app = Flask(__name__)

@app.route('/ring',methods = ['POST'])

def hello_world():
    f = request.form['data']
    print(json.loads(f))
    return f'Sup {json.loads(f)["bid"]}'

if __name__ == '__main__':
    app.run()