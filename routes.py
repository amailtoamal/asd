from flask_pymongo import PyMongo
from bson.json_util import dumps

import re,json,time,os,library as l


def login(mongo,request):
    x = mongo.db.users.find({"username":request.form['username']},{"_id":0})
    
    if x.count()!=1:
        return l.response(False,10,"Incorrect username or password")

    #return dumps(x)
    for row in x:
        if row['password'] != request.form['password']:
            return l.response(False, 10, "Incorrect username or password")
        else:
            r1 = {"responseStatus": True, "responseCode": 200, "responseMsg": "Success."}
            token = l.generateToken(row['username'], row['type'], row['status'], row['statComment'])
            p = {"authToken": token}
            r1.update(p)
            return dumps(r1)


def addStockCategory(mongo, request):
    #auth = request.cookies.get('authToken')
    auth=l.decodeToken(request.form['authToken'])
    if(auth == 1):
        return l.response(False, 2, "Authentication token invalid.")
    elif(auth == 0):
        return l.response(False, 3, "Authentication token expired.")
    query = mongo.db.stock_categories.find({"name": re.compile(request.form['name'], re.IGNORECASE)}).count()
    if(query==0):
        data={
            "_id": int(time.time()*1000),
            "name": request.form['name'],
            "status": 1,
            "statusComment": "",
            "description": request.form['desc']
        }
        mongo.db.stock_categories.insert(data) 
        return l.response(True, 200, "Success.")
    else:
        return l.response(False, 10, "Already Exits.")
   
    
        

def getStockCategories(mongo, request):
    auth = l.decodeToken(request.form['authToken'])
    if(auth == 1):
        return l.response(False, 2, "Authentication token invalid.")
    elif(auth == 0):
        return l.response(False, 3, "Authentication token expired.")

    result = mongo.db.stock_categories.find()
    return dumps(result)


def deleteStockCategory(mongo, request):
    auth = l.decodeToken(request.form['authToken'])
    if(auth == 1):
        return l.response(False, 2, "Authentication token invalid.")
    elif(auth == 0):
        return l.response(False, 3, "Authentication token expired.")
    no=mongo.db.stock_categories.delete_one({"_id": int(request.form['id'])})
    if no:
        return l.response(True, 200, "Success.")
    else:
        return l.response(False, 0, "Fail.")


def getStockDetail(mongo, request):
    auth = l.decodeToken(request.form['authToken'])
    if(auth == 1):
        return l.response(False, 2, "Authentication token invalid.")
    elif(auth == 0):
        return l.response(False, 3, "Authentication token expired.")

    result = mongo.db.stock_categories.find({"_id": int(request.form['id'])})
    if(result.count()==1):
       return dumps(result)
    else:
        return "dfdsf"
        

def stockEditSave(mongo, request):
    auth = l.decodeToken(request.form['authToken'])
    if(auth == 1):
        return l.response(False, 2, "Authentication token invalid.")
    elif(auth == 0):
        return l.response(False, 3, "Authentication token expired.")
    d1 = {"_id": int(request.form['id'])}
    d2 = {"$set": {
        "name": request.form['name'], "description": request.form['desc'], "status": request.form['status']}}
    result= mongo.db.stock_categories.update(d1,d2)
    return l.response(True, 200, "Success.")


def getStockCategoryNames(mongo, request):
    auth = l.decodeToken(request.form['authToken'])
    if(auth == 1):
        return l.response(False, 2, "Authentication token invalid.")
    elif(auth == 0):
        return l.response(False, 3, "Authentication token expired.")

    result = mongo.db.stock_categories.find({"status": {"$ne": "0"}}, {"status": 0, "statusComment": 0, "description": 0})
    return dumps(result)


def updateStock(mongo, request):
    auth = l.decodeToken(request.form['authToken'])
    if(auth == 1):
        return l.response(False, 2, "Authentication token invalid.")
    elif(auth == 0):
        return l.response(False, 3, "Authentication token expired.")
    data = {"_id": int(time.time()*1000), "productName": request.form['productName'], "productId": request.form['productId'], "receivedFrom": request.form['receivedFrom'],
            "invoiceNo": request.form['invoiceNo'], "rate": request.form['rate'], "qty": request.form['qty'], "remarks": request.form['remarks'], "time":  int(time.time()*1000)}
    result = mongo.db.stock_details.insert(data)
    return l.response(True, 200, "Success.")


def getStockList(mongo, request):
    auth = l.decodeToken(request.form['authToken'])
    if(auth == 1):
        return l.response(False, 2, "Authentication token invalid.")
    elif(auth == 0):
        return l.response(False, 3, "Authentication token expired.")

    result = mongo.db.stock_details.find()
    if(result.count()> 0):
       return dumps(result)
    else:
        return "dfdsf"

def getStockDetailSingle(mongo, request):
    auth = l.decodeToken(request.form['authToken'])
    if(auth == 1):
        return l.response(False, 2, "Authentication token invalid.")
    elif(auth == 0):
        return l.response(False, 3, "Authentication token expired.")

    result = mongo.db.stock_details.find({"_id": int(request.form['id'])})
    if(result.count() == 1):
       return dumps(result)
    else:
        return "dfdsf"


def updateStockEditSave(mongo, request):
    auth = l.decodeToken(request.form['authToken'])
    if(auth == 1):
        return l.response(False, 2, "Authentication token invalid.")
    elif(auth == 0):
        return l.response(False, 3, "Authentication token expired.")
    d1 = {"_id": int(request.form['id'])}
    d2 = {"$set": {"receivedFrom": request.form['receivedFrom'], "invoiceNo": request.form['invoiceNo'], "rate": request.form['rate'], "qty": request.form['qty'], "remarks": request.form['remarks'], "time":  int(time.time()*1000)}}
    result = mongo.db.stock_details.update(d1,d2)
    return l.response(True, 200, "Success.")


def getCat(mongo, request):
    auth = l.decodeToken(request.form['authToken'])
    if(auth == 1):
        return l.response(False, 2, "Authentication token invalid.")
    elif(auth == 0):
        return l.response(False, 3, "Authentication token expired.")
    result = mongo.db.stock_categories.find({}, {"_id": 1, "name": 1})
    return dumps(result)


def getBalanceSheet(mongo, request):
    auth = l.decodeToken(request.form['authToken'])
    if(auth == 1):
        return l.response(False, 2, "Authentication token invalid.")
    elif(auth == 0):
        return l.response(False, 3, "Authentication token expired.")
    result = mongo.db.stock_categories.find({},{"_id": 1,"name":1})
    o=[]
    n={}
    if(result.count() == 0):
       return dumps(result)
    j = -1
    for x in result:
        r2=mongo.db.stock_details.find({"productName": str(x['_id'])},{"qty":1})
        c=0        
        for i in r2:
            c=c+int(i['qty'])
        j=j+1
        o.append(c)
        #n.append("a"+str(j))
    #f=dict(zip(n, o))
    #return dumps(f)
    n['val']=o
    return dumps(n)


def newEvent(mongo, request, app):
    auth = l.decodeToken(request.form['authToken'])
    if(auth == 1):
        return l.response(False, 2, "Authentication token invalid.")
    elif(auth == 0):
        return l.response(False, 3, "Authentication token expired.")
    d3=[]
    d2=[]

    for i in range(0, int(request.form['pNo'])):
        t="p"+str(i+1)
        d3.append(request.files[t])
        timeSave = str(int(time.time()*1000))
        d2.append(timeSave+"-"+d3[i].filename)
        f = os.path.join(app.config['UPLOAD_FOLDER'], d2[i])
        d3[i].save(f)

    data = {"_id": int(time.time()*1000), "name": request.form['title'], "description": request.form['desc'], "date": request.form['date'],"photos":d2}
    result = mongo.db.events.insert(data)
    return l.response(True, 200, "Success.")


def viewEvents(mongo, request):
    auth = l.decodeToken(request.form['authToken'])
    if(auth == 1):
        return l.response(False, 2, "Authentication token invalid.")
    elif(auth == 0):
        return l.response(False, 3, "Authentication token expired.")
    
    result = mongo.db.events.find({}, {"_id": 1, "name": 1})
    return dumps(result)


def deleteEvent(mongo, request):
    auth = l.decodeToken(request.form['authToken'])
    if(auth == 1):
        return l.response(False, 2, "Authentication token invalid.")
    elif(auth == 0):
        return l.response(False, 3, "Authentication token expired.")
    
    no=mongo.db.events.delete_one({"_id": int(request.form['id'])})
    if no:
        return l.response(True, 200, "Success.")
    else:
        return "dfd";

def newPhotos(mongo, request, app):
    auth = l.decodeToken(request.form['authToken'])
    if(auth == 1):
        return l.response(False, 2, "Authentication token invalid.")
    elif(auth == 0):
        return l.response(False, 3, "Authentication token expired.")
    d3 = []
    d2 = []

    for i in range(0, int(request.form['pNo'])):
        t = "p"+str(i+1)
        d3.append(request.files[t])
        timeSave = str(int(time.time()*1000))
        d2.append(timeSave+"-"+d3[i].filename)
        f = os.path.join(app.config['UPLOAD_FOLDER'], d2[i])
        d3[i].save(f)
    data = {"_id": int(time.time()*1000), "name": request.form['title'], "photos": d2}
    result = mongo.db.photos.insert(data)
    return l.response(True, 200, "Success.")


def viewPhotos(mongo, request):
    auth = l.decodeToken(request.form['authToken'])
    if(auth == 1):
        return l.response(False, 2, "Authentication token invalid.")
    elif(auth == 0):
        return l.response(False, 3, "Authentication token expired.")

    result = mongo.db.photos.find({}, {"_id": 1, "name": 1})
    return dumps(result)


def deletePhotos(mongo, request):
    auth = l.decodeToken(request.form['authToken'])
    if(auth == 1):
        return l.response(False, 2, "Authentication token invalid.")
    elif(auth == 0):
        return l.response(False, 3, "Authentication token expired.")

    no = mongo.db.photos.delete_one({"_id": int(request.form['id'])})
    if no:
        return l.response(True, 200, "Success.")
    else:
        return "dfd"




def newAcheivements(mongo, request):
    auth = l.decodeToken(request.form['authToken'])
    if(auth == 1):
        return l.response(False, 2, "Authentication token invalid.")
    elif(auth == 0):
        return l.response(False, 3, "Authentication token expired.")
    d2 = []

    for i in range(0, int(request.form['no'])):
        t = "nm"+str(i+1)
        d2.append(request.form[t])

    data = {"_id": int(time.time()*1000),
            "pname": request.form['pname'],
            "ename": request.form['ename'],
            "etype": request.form['etype'],
            "ecat": request.form['ecat'],
            "eprize": request.form['eprize'],
            "evenue": request.form['evenue'],
            "edate": request.form['edate'],
            "eremarks": request.form['eremarks'],
             "winners": d2
             }
    result = mongo.db.achievements.insert(data)     
    return l.response(True, 200, "Success.")


def viewAchievements(mongo, request):
    auth = l.decodeToken(request.form['authToken'])
    if(auth == 1):
        return l.response(False, 2, "Authentication token invalid.")
    elif(auth == 0):
        return l.response(False, 3, "Authentication token expired.")

    result = mongo.db.achievements.find({})
    return dumps(result)


def deleteAchievements(mongo, request):
    auth = l.decodeToken(request.form['authToken'])
    if(auth == 1):
        return l.response(False, 2, "Authentication token invalid.")
    elif(auth == 0):
        return l.response(False, 3, "Authentication token expired.")

    no = mongo.db.achievements.delete_one({"_id": int(request.form['id'])})
    if no:
        return l.response(True, 200, "Success.")
    else:
        return "dfd"


def addReceipts(mongo, request):
    auth = l.decodeToken(request.form['authToken'])
    if(auth == 1):
        return l.response(False, 2, "Authentication token invalid.")
    elif(auth == 0):
        return l.response(False, 3, "Authentication token expired.")
    

    data = {"_id": int(time.time()*1000),
            "item": request.form['item'],
            "rno": request.form['rno'],
            "date": request.form['date'],
            "amount": request.form['amount'],
            "remarks": request.form['remarks']
            }
    result = mongo.db.receipts.insert(data)
    return l.response(True, 200, "Success.")


def viewReceipts(mongo, request):
    auth = l.decodeToken(request.form['authToken'])
    if(auth == 1):
        return l.response(False, 2, "Authentication token invalid.")
    elif(auth == 0):
        return l.response(False, 3, "Authentication token expired.")

    result = mongo.db.receipts.find({})
    return dumps(result)


def deleteReceipts(mongo, request):
    auth = l.decodeToken(request.form['authToken'])
    if(auth == 1):
        return l.response(False, 2, "Authentication token invalid.")
    elif(auth == 0):
        return l.response(False, 3, "Authentication token expired.")

    no = mongo.db.receipts.delete_one({"_id": int(request.form['id'])})
    if no:
        return l.response(True, 200, "Success.")
    else:
        return "dfd"


def addVouchers(mongo, request):
    auth = l.decodeToken(request.form['authToken'])
    if(auth == 1):
        return l.response(False, 2, "Authentication token invalid.")
    elif(auth == 0):
        return l.response(False, 3, "Authentication token expired.")

    data = {"_id": int(time.time()*1000),
            "item": request.form['item'],
            "vno": request.form['vno'],
            "date": request.form['date'],
            "paidto": request.form['pto'],
            "purpose": request.form['purpose'],
            "amount": request.form['amount'],
            "remarks": request.form['remarks']
            }
    result = mongo.db.vouchers.insert(data)
    return l.response(True, 200, "Success.")


def viewVouchers(mongo, request):
    auth = l.decodeToken(request.form['authToken'])
    if(auth == 1):
        return l.response(False, 2, "Authentication token invalid.")
    elif(auth == 0):
        return l.response(False, 3, "Authentication token expired.")

    result = mongo.db.vouchers.find({})
    return dumps(result)


def deleteVouchers(mongo, request):
    auth = l.decodeToken(request.form['authToken'])
    if(auth == 1):
        return l.response(False, 2, "Authentication token invalid.")
    elif(auth == 0):
        return l.response(False, 3, "Authentication token expired.")

    no = mongo.db.vouchers.delete_one({"_id": int(request.form['id'])})
    if no:
        return l.response(True, 200, "Success.")
    else:
        return "dfd"
