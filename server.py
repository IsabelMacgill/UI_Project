from flask import Flask
from flask import render_template
from flask import Response, request, jsonify
from random import randint
import socket
app = Flask(__name__)


desserts = {
    "1":{
        "id": "1",
        "name":"German Chocolate Cake",
        "description": ["layered chocolate cake", "topped with coconut pecan frosting"],
        "country": "United States",
        "image":"/static/images/german.jpg",
        "map":"/static/images/usa.jpg"
    },
    "2":{
        "id": "2",
        "name":"Sopaipilla",
        "description": ["light and crispy pastry puff", "deep fried dough"],
        "country": "United States",
        "image":"/static/images/sopaipilla.jpg",
        "map":"/static/images/usa.jpg"
    },
    "3":{
        "id": "3",
        "name":"Nanaimo Bars",
        "description": ["no bake layered bar cookie", "wafer crumb base, icing, chocolate gaanche"],
        "country": "Canada",
        "image":"/static/images/nanaimo.jpg",
        "map":"/static/images/canada.jpg"
    },
    "4":{
        "id": "4",
        "name":"Beavertail",
        "description": ["fried dough pastry ", "topped w sweet condiments"],
        "country": "Canada",
        "image":"/static/images/beavertail.jpg",
        "map":"/static/images/canada.jpg"
    },
    "5":{
        "id": "5",
        "name":"Ube Halaya",
        "description": ["purple yam jam", "sweetened spread made of ube, butter, sugar, and coconut milk"],
        "country": "Philippines",
        "image":"/static/images/ube.jpg",
        "map":"/static/images/philippines.jpg"
    },
     "6":{
        "id": "6",
        "name":"Buko Pandan",
        "description": ["young coconut, pandan leaves, and ago pearls"],
        "country": "Philippines",
        "image":"/static/images/buko.jpg",
        "map":"/static/images/philippines.jpg"
    },
    "7":{
        "id": "7",
        "name":"Jalebi",
        "description": ["deep fried flour in a ciruclar pattern and soaked in simple syrup"],
        "country": "India",
        "image":"/static/images/jalebi.jpg",
        "map":"/static/images/india.jpg"
    },
    "8":{
        "id": "8",
        "name":"Gulab Jamun",
        "description": ["milk and semolina dough soaked with an aromatic spiced syrup "],
        "country": "India",
        "image":"/static/images/gulab.jpg",
        "map":"/static/images/india.jpg"
    },
    "9":{
        "id": "9",
        "name":"Danish Pastries",
        "description": ["multi-layered sweet pastry", "fillings can include almond cream, fruity jams"],
        "country": "France",
        "image":"/static/images/danish.jpg",
        "map":"/static/images/france.jpg"
    },
    "10":{
        "id": "10",
        "name":"Crepe Cake",
        "description": ["thin layers of crepes sandwiched with pastry cream"],
        "country": "France",
        "image":"/static/images/crepe.jpg",
        "map":"/static/images/france.jpg"
    },
}

questions = {
    "1":{
        "id":"1",
        "question":"Where does German Chocolate Cake originate from?",
        "options":["United States","Germany","Canada","Cuba"],
        "answer":"United States",
        "format":"choice"
    },
    "2":{
        "id":"2",
        "question":"Where does Sopaipilla originate from?",
        "options":["Denmark","Canada","United States","Mexico"],
        "answer":"United States",
        "format":"choice"
    },
    "3":{
        "id":"3",
        "question":"Choose the appropriate description for the dessert.",
        "options":["protein bars","layered cookie bars","savory bars","chocolate layered bars"],
        "answer":"layered cookie bars",
        "format":"choice"
    },
    "4":{
        "id":"4",
        "question":"Where do Beavertails originate from?",
        "options":["Canada","France","Denmark","United States"],
        "answer":"Canada",
        "format":"choice"
    },
    "5":{
        "id":"5",
        "question":"Choose the appropriate description for the dessert.",
        "options":["taro pudding","purple yam jam", "purple rice cake", "acai"],
        "answer":"purple yam jam",
        "format":"choice"
    },
    "6":{
        "id":"6",
        "question":"Where does Buko Pandan originate from?",
        "options":["Philippines","Germany","Denmark","United States"],
        "answer":"Philippines",
        "format":"choice"
    },
    "7":{
        "id":"7",
        "question":"Which dessert originated from India?",
        "options":["Paneer Tikka","Jalebi","Chana Masala","Rose Cardamom Pops"],
        "answer":"Jalebi",
        "format":"choice"
    },
    "8":{
        "id":"8",
        "question":"Where does Gulab Jamun originate from?",
        "options":["Philippines", "United States", "Mexico","India"],
        "answer":"India",
        "format":"choice"
    },
    "9":{
        "id":"9",
        "question":"Which dessert originated from the France?",
        "options":["Danish Pastries","Beavertails","Crepe Cake","Nanaimo Bars"],
        "answer":"Danish Pastries",
        "format":"choice"
    },
    "10":{
        "id":"10",
        "question":"Where does Crepe Cake originate from?",
        "options":["Germany", "United States","Mexico","France"],
        "answer":"France",
        "format":"choice"
    },
    "11":{
        "id":"11",
        "question":"Match the dessert image to the name.",
        "options":["1","3","5","7","9"],
        "format":"drag"
    },
    "12":{
        "id":"12",
        "question":"Match the dessert image to the name.",
        "options":["2","4","6","8","10"],
        "format":"drag"
    }
}


userLearn = {
    "1":{
        "id": "1",
        "name":"German Chocolate Cake",
        "page": "/learn/1",
        "enteredTime": "0",
        "timeOnPage":"0"
    },
    "2":{    
        "id": "2",
        "name":"Sopaipilla",
        "page": "/learn/2",
         "enteredTime": "0",
        "timeOnPage":"0"
    },
    "3":{
        "id": "3",
        "name":"",
        "page": "/learn/3",
        "enteredTime":"0",
        "timeOnPage":"0"
    },
    "4":{
        "id": "4",
        "name":"Beavertail",
        "page": "/learn/4",
        "enteredTime":"0",
        "timeOnPage":"0"
        
    },
    "5":{
        "id": "5",
        "name":"Ube Halaya",
        "page": "/learn/5",
        "enteredTime": "0",
        "timeOnPage":"0"
    },
     "6":{
        "id": "6",
        "name":"Buko Pandan",
        "page": "/learn/6",
        "enteredTime":"0",
        "timeOnPage":"0"
    },
    "7":{
        "id": "7",
        "name":"Jalebi",
        "page": "/learn/7",
        "enteredTime":"0",
        "timeOnPage":"0"
    },
    "8":{
        "id": "8",
        "name":"Gulab Jamun",
        "page": "/learn/8",
        "enteredTime": "0",
        "timeOnPage":"0"
    },
    "9":{
        "id": "9",
        "name":"Danish Pastries",
        "page": "/learn/9",
        "enteredTime": "0",
        "timeOnPage":"0"
    },
    "10":{
        "id": "10",
        "name":"Crepe Cake",
        "page": "/learn/10",
        "enteredTime": "0",
        "timeOnPage":"0"
    },
    "quiz":{
        "id": 0,
        "visited": [],
        "total": "0",
        "score": "0.0",
        "northAmerica": ["0","0"],
        "asia": ["0","0"],
        "europe": ["0","0"]
    }
}

@app.route('/')
def homepage():
   return render_template('homepage.html')


@app.route('/learn')
def learn():
    return render_template('learn.html')
    

@app.route('/learn/<id>')
def view_dessert(id=None):
    global desserts 
    dessert = desserts[id]
    print(dessert)
    
    return render_template('view_dessert.html', data = dessert, id = id)

@app.route('/enter_user', methods=['POST'])
def edit_enter():
    global userLearn
    global desserts

    json_data = request.get_json() 
    print(json_data)

    key = json_data['id']
    viewing = userLearn[key]
    if type(viewing) is tuple:
        viewing = viewing[0]
    print(viewing)


    value = {
        "id":key,
        "name":desserts[key]["name"],
        "page": "/learn/" + key,
        "enteredTime": json_data["enteredTime"],
        "timeOnPage": viewing["timeOnPage"]
    },
    userLearn[key] = value

    return jsonify(data = userLearn[key], id=key)

@app.route('/leave_user', methods=['POST'])
def edit_time():
    global userLearn
    global desserts

    json_data = request.get_json()
    print(json_data)

    key = json_data['id']
    viewing = userLearn[key]
    if type(viewing) is tuple:
        viewing = viewing[0]
    print(viewing)
    time = str(int(json_data["leftTime"]) - int(viewing["enteredTime"]))

    value = {
        "id":key,
        "name":desserts[key]["name"],
        "page": "/learn/" + key,
        "entertedTime": viewing["enteredTime"],
        "timeOnPage": time
    },
    userLearn[key] = value

    return jsonify(data = userLearn[key], id=key)




@app.route('/quiz', methods=['GET', 'POST'])
def quiz():
    global userLearn
        
    user = userLearn["quiz"]
        
    question_value = find_question()
    question = questions[str(question_value)]
    
    
    return render_template('quiz.html', desserts = desserts, question = question, question_value=question_value, user = user)
    

@app.route('/answer_question', methods=['GET', 'POST'])
def answer_question():
    global userLearn
    
    json_data = request.get_json()
    userId = json_data["id"]
    visited = json_data["visited"]
    total = json_data["total"]
    score = json_data["score"]
    
    userLearn["quiz"] = {
    "id": userId,
    "visited": visited,
    "total": total,
    "score": score
    }
        
    return jsonify(id = userId)
    
    
@app.route('/results')
def results():
    global userLearn
    
    user = userLearn["quiz"]
    
    userLearn["quiz"] = {
        "id": 0,
        "visited": [],
        "total": "0",
        "score": "0.0",
    }
        
    return render_template('results.html', desserts = desserts, user = user)
    
def find_question():
    global questions
    global userLearn
    
    if int(userLearn["quiz"]["total"]) < 2:
        print("here")
        question_value = int(userLearn["quiz"]["total"])%5 + 11
        
    if int(userLearn["quiz"]["total"]) >= 2 and int(userLearn["quiz"]["total"]) < 5:
        question_value = randint(1, 4)
        while question_value in userLearn["quiz"]["visited"]:
            question_value = randint(1, 4)
    
    if int(userLearn["quiz"]["total"]) >= 5 and int(userLearn["quiz"]["total"]) < 8:
        question_value = randint(5, 8)
        while question_value in userLearn["quiz"]["visited"]:
            question_value = randint(5, 8)
    
    if int(userLearn["quiz"]["total"]) >= 8:
        question_value = randint(9, 10)
        while question_value in userLearn["quiz"]["visited"]:
            question_value = randint(9, 10)
    
    return question_value


if __name__ == '__main__':
   app.run(debug = True)