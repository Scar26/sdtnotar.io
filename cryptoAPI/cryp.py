from flask import Flask,request

app = Flask(__name__)

@app.route('/test',methods = ['POST' , 'GET'])

def hello_world():
    f = request.form['fn']
    print(f)  
    return f'Sup {f}'

if __name__ == '__main__':
    app.run()