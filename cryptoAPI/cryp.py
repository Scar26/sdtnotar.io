from flask import Flask,request
from base64 import  b64decode,b64encode
import ecdsa
import json

def xor(s1,s2):
    return b''.join([s[i1]^s2[i] for i in range(len(s1))])

def sign(data):
    sk = ecdsa.SigningKey.generate(curve=ecdsa.NIST384p)
    sig = b64encode(sk.sign(data['sdt'].encode('utf-8')))
    pk = sk.get_verifying_key().to_string()
    p1 = b64decode(data['cid'])
    p2 = b64decode(data['bid'])
    p3 = b64decode(data['sid'])
    nonce = xor(xor(xor(pk,p1),p2),p3)
    return sig,nonce
    

app = Flask(__name__)

@app.route('/ring',methods = ['POST'])

def formRing():
    f = request.form['data']
    dat = json.loads(f)
    sig,nonce = sign(dat)


@app.route('/pubkey',methods = ['POST'])

def getpub():
    priv = request.form['pri'].encode('utf-8')
    sk = ecdsa.SigningKey.from_string(priv[:48],curve=ecdsa.NIST384p)
    pub = sk.get_verifying_key().to_string()
    return b64encode(pub)

if __name__ == '__main__':
    app.run()