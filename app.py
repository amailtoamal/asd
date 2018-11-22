from flask import Flask, request, render_template, redirect, make_response
from flask_cors import CORS, cross_origin
from flask_pymongo import PyMongo
import library as lib,os,routes as r,json,datetime


app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = "static/uploads/"

app.config["MONGO_URI"] = "mongodb://amal:amal1234@ds131743.mlab.com:31743/final_whistle"
#app.config["MONGO_URI"] = "mongodb://127.0.0.1:27017/final_whistle"

CORS(app)
mongo = PyMongo(app)

#print(lib.decodeToken("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6ImFtYWwiLCJleHAiOjE1NDA1ODE1Nzd9.gyaJRVpm6b4lQMKdg33wPgRZjIi80KIslpIfx4LlZqY"))

#################################################################################################################################
                                                  #      ERROR HANDLERS         #
#################################################################################################################################


@app.errorhandler(404)
def page_not_found(e):
    return lib.response(False, 404, "Page not found.")


# @app.errorhandler(400)
# def bad_request(e):
#     return lib.response(False, 400, "Bad request.")

@app.errorhandler(405)
def method_not_allowed(e):
    return lib.response(False, 405, "Method not allowed.")


@app.errorhandler(500)
def internal_error(e):
    return lib.response(False, 500, "Internal error.")


#################################################################################################################################
                                                  #      PAGES         #
#################################################################################################################################



@app.route('/', methods=['GET'])
@app.route('/admin/', methods=['GET'])
def index():
    return redirect("/admin/login")


@app.route('/admin/login', methods=['GET'])
def indexAdmin():
    if request.cookies.get('authToken'):
        return redirect("/admin/dashboard")
    #return render_template("admin/dashboard.html")
    return render_template("admin/login.html")
    #return "login page"


@app.route('/admin/dashboard', methods=['GET'])
def adminDashboard():
    if not request.cookies.get('authToken'):
        return redirect("/admin/login")
    elif(lib.decodeToken(request.cookies.get('authToken')) == 0 or lib.decodeToken(request.cookies.get('authToken')) == 1):
        return render_template("admin/login")
    return render_template("admin/dashboard.html")
    #return "dfdfs"

@app.route('/admin/user-management', methods=['GET'])
def user_management():
    if not request.cookies.get('authToken'):
        return redirect("/admin/login")
    elif(lib.decodeToken(request.cookies.get('authToken')) == 0 or lib.decodeToken(request.cookies.get('authToken')) == 1):
        return render_template("admin/login")
    return render_template("admin/user-management.html")
    #return "SDfsdfsdfsd"


@app.route('/admin/stock-categories', methods=['GET'])
def stock_categories():
    if not request.cookies.get('authToken'):
        return redirect("/admin/login")
    elif(lib.decodeToken(request.cookies.get('authToken')) == 0 or lib.decodeToken(request.cookies.get('authToken')) == 1):
        return render_template("admin/login")
    return render_template("admin/stock-categories.html")


@app.route('/admin/update-stock', methods=['GET'])
def update_stock():
    if not request.cookies.get('authToken'):
        return redirect("/admin/login")
    elif(lib.decodeToken(request.cookies.get('authToken')) == 0 or lib.decodeToken(request.cookies.get('authToken')) == 1):
        return render_template("admin/login")
    return render_template("admin/update-stock.html")


@app.route('/admin/stock-report', methods=['GET'])
def stock_report():
    if not request.cookies.get('authToken'):
        return redirect("/admin/login")
    elif(lib.decodeToken(request.cookies.get('authToken')) == 0 or lib.decodeToken(request.cookies.get('authToken')) == 1):
        return render_template("admin/login")
    return render_template("admin/stock-report.html")


@app.route('/admin/events', methods=['GET'])
def events():
    if not request.cookies.get('authToken'):
        return redirect("/admin/login")
    elif(lib.decodeToken(request.cookies.get('authToken')) == 0 or lib.decodeToken(request.cookies.get('authToken')) == 1):
        return render_template("admin/login")
    return render_template("admin/events.html")

@app.route('/admin/photos', methods=['GET'])
def photos():
    if not request.cookies.get('authToken'):
        return redirect("/admin/login")
    elif(lib.decodeToken(request.cookies.get('authToken')) == 0 or lib.decodeToken(request.cookies.get('authToken')) == 1):
        return render_template("admin/login")
    return render_template("admin/photos.html")


@app.route('/admin/acheivements', methods=['GET'])
def acheivements():
    if not request.cookies.get('authToken'):
        return redirect("/admin/login")
    elif(lib.decodeToken(request.cookies.get('authToken')) == 0 or lib.decodeToken(request.cookies.get('authToken')) == 1):
        return render_template("admin/login")
    return render_template("admin/acheivements.html")


@app.route('/admin/receipts', methods=['GET'])
def receipts():
    if not request.cookies.get('authToken'):
        return redirect("/admin/login")
    elif(lib.decodeToken(request.cookies.get('authToken')) == 0 or lib.decodeToken(request.cookies.get('authToken')) == 1):
        return render_template("admin/login")
    return render_template("admin/receipts.html")


@app.route('/admin/vouchers', methods=['GET'])
def vouchers():
    if not request.cookies.get('authToken'):
        return redirect("/admin/login")
    elif(lib.decodeToken(request.cookies.get('authToken')) == 0 or lib.decodeToken(request.cookies.get('authToken')) == 1):
        return render_template("admin/login")
    return render_template("admin/vouchers.html")



#################################################################################################################################
                                                 #         API            #
#################################################################################################################################


@app.route('/api/admin/login', methods=['POST'])
def login():
    return r.login(mongo, request)


@app.route('/api/admin/addStockCategory', methods=['POST'])
def addStockCategory():
    return r.addStockCategory(mongo, request)


@app.route('/api/admin/getStockCategories', methods=['POST'])
def getStockCategories():
    return r.getStockCategories(mongo, request)


@app.route('/api/admin/deleteStockCategory', methods=['POST'])
def deleteStockCategory():
    return r.deleteStockCategory(mongo, request)


@app.route('/api/admin/getStockDetail', methods=['POST'])
def getStockDetail():
    return r.getStockDetail(mongo, request)


@app.route('/api/admin/stockEditSave', methods=['POST'])
def stockEditSave():
    return r.stockEditSave(mongo, request)


@app.route('/api/admin/getStockCategoryNames', methods=['POST'])
def getStockCategoryNames():
    return r.getStockCategoryNames(mongo, request)

@app.route('/api/admin/updateStock', methods=['POST'])
def updateStock():
    return r.updateStock(mongo, request)


@app.route('/api/admin/getStockList', methods=['POST'])
def getStockList():
    return r.getStockList(mongo, request)


@app.route('/api/admin/getStockDetailSingle', methods=['POST'])
def getStockDetailSingle():
    return r.getStockDetailSingle(mongo, request)


@app.route('/api/admin/updateStockEditSave', methods=['POST'])
def updateStockEditSave():
    return r.updateStockEditSave(mongo, request)


@app.route('/api/admin/getCat', methods=['POST'])
def getCat():
    return r.getCat(mongo, request)


@app.route('/api/admin/getBalanceSheet', methods=['POST'])
def getBalanceSheet():
    return r.getBalanceSheet(mongo, request)


@app.route('/api/admin/newEvent', methods=['POST'])
def newEvent():
    return r.newEvent(mongo, request,app)


@app.route('/api/admin/viewEvents', methods=['POST'])
def viewEvents():
    return r.viewEvents(mongo, request)


@app.route('/api/admin/deleteEvent', methods=['POST'])
def deleteEvent():
    return r.deleteEvent(mongo, request)


@app.route('/api/admin/newPhotos', methods=['POST'])
def newPhotos():
    return r.newPhotos(mongo, request, app)


@app.route('/api/admin/viewPhotos', methods=['POST'])
def viewPhotos():
    return r.viewPhotos(mongo, request)


@app.route('/api/admin/deletePhotos', methods=['POST'])
def deletePhotos():
    return r.deletePhotos(mongo, request)



@app.route('/api/admin/newAcheivements', methods=['POST'])
def newAcheivements():
    return r.newAcheivements(mongo, request)


@app.route('/api/admin/viewAchievements', methods=['POST'])
def viewAchievements():
    return r.viewAchievements(mongo, request)


@app.route('/api/admin/deleteAchievements', methods=['POST'])
def deleteAchievements():
    return r.deleteAchievements(mongo, request)


@app.route('/api/admin/addReceipts', methods=['POST'])
def addReceipts():
    return r.addReceipts(mongo, request)


@app.route('/api/admin/viewReceipts', methods=['POST'])
def viewReceipts():
    return r.viewReceipts(mongo, request)


@app.route('/api/admin/deleteReceipts', methods=['POST'])
def deleteReceipts():
    return r.deleteReceipts(mongo, request)

@app.route('/api/admin/addVouchers', methods=['POST'])
def addVouchers():
    return r.addVouchers(mongo, request)


@app.route('/api/admin/viewVouchers', methods=['POST'])
def viewVouchers():
    return r.viewVouchers(mongo, request)


@app.route('/api/admin/deleteVouchers', methods=['POST'])
def deleteVouchers():
    return r.deleteVouchers(mongo, request)

if __name__ == "__main__":
    app.run(debug=True)
