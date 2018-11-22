
import jwt,time
from flask import redirect,render_template
from bson.json_util import dumps

# def generateToken(username, type, status, statComment):
#     return str(jwt.encode({'username': username, 'type': type, 'status': status, 'statComment': statComment, 'exp': int(time.time())+100}, 'hahaha', algorithm='HS256'))


def generateToken(username, type, status, statComment):
    return str(jwt.encode({'username': username, 'type': type, 'status': status, 'statComment': statComment, 'exp': int(time.time())+86400}, 'hahaha', algorithm='HS256').decode('utf-8'))


def decodeToken(token):
    try:
        decoded = jwt.decode(token, 'hahaha', algorithms=['HS256'])
    except jwt.ExpiredSignatureError:
        return 0
    except:
        return 1
    return decoded

def response(ok,code,msg):
    r = {"responseStatus": ok, "responseCode": code, "responseMsg":msg}
    return dumps(r)


