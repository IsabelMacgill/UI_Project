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
        "country": "United States of America",
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
        "answer":"United States"
    },
    "2":{
        "id":"2",
        "question":"Where does Sopaipilla originate from?",
        "options":["Denmark","Canada","United States","Mexico"],
        "answer":"layered cookie bars"
    },
    "3":{
        "id":"3",
        "question":"What are Nanaimo Bars?",
        "options":["protein bars","layered cookie bars","savory bars","chocolate layered bars"],
        "answer":"layered cookie bars"
    },
    "4":{
        "id":"4",
        "question":"Where do Beavertails originate from?",
        "options":["Canada","France","Denmark","United States"],
        "answer":"Canada"
    },
    "5":{
        "id":"5",
        "question":"What is Ube Halaya?",
        "options":["taro pudding","purple yam jam", "purple rice cake", "acai"],
        "answer":"purple yam jam"
    },
    "6":{
        "id":"6",
        "question":"Where does Buko Pandan originate from?",
        "options":["Philippines","Germany","Denmark","United States"],
        "answer":"Philippines"
    },
    "7":{
        "id":"7",
        "question":"Which dessert originated from India?",
        "options":["Paneer Tikka","Jalebi","Chana Masala","Rose Cardamom Pops"],
        "answer":"Jalebi"
    },
    "8":{
        "id":"8",
        "question":"Where does Gulab Jamun originate from?",
        "options":["Philippines", "United States", "Mexico","India"],
        "answer":"India"
    },
    "9":{
        "id":"9",
        "question":"Which dessert originated from the United States?",
        "options":["Danish Pastries","Beavertails","Crepe Cake","Nanaimo Bars"],
        "answer":"Danish Pastries"
    },
    "10":{
        "id":"10",
        "question":"Where does Crepe Cake originate from?",
        "options":["Germany", "United States","Mexico","France"],
        "answer":"France"
    }
}

users = {}

userLearn = {
    "1":{
        "id": "1",
        "name":"German Chocolate Cake",
        "page": "/learn/1",
        "enteredTime": "",
        "timeOnPage":""
    },
    "2":{    
        "id": "2",
        "name":"Sopaipilla",
        "page": "/learn/2",
        "enteredTime": "",
        "timeOnPage":""
    },
    "3":{
        "id": "3",
        "name":"",
        "page": "/learn/3",
        "enteredTime": "",
        "timeOnPage":""
    },
    "4":{
        "id": "4",
        "name":"Beavertail",
        "page": "/learn/4",
        "enteredTime": "",
        "timeOnPage":""
        
    },
    "5":{
        "id": "5",
        "name":"Ube Halaya",
        "page": "/learn/5",
        "enteredTime": "",
        "timeOnPage":""
    },
     "6":{
        "id": "6",
        "name":"Buko Pandan",
        "page": "/learn/6",
        "enteredTime": "",
        "timeOnPage":""
    },
    "7":{
        "id": "7",
        "name":"Jalebi",
        "page": "/learn/7",
        "enteredTime": "",
        "timeOnPage":""
    },
    "8":{
        "id": "8",
        "name":"Gulab Jamun",
        "page": "/learn/8",
        "enteredTime": "",
        "timeOnPage":""
    },
    "9":{
        "id": "9",
        "name":"Danish Pastries",
        "page": "/learn/9",
        "enteredTime": "",
        "timeOnPage":""
    },
    "10":{
        "id": "10",
        "name":"Crepe Cake",
        "page": "/learn/10",
        "enteredTime": "",
        "timeOnPage":""
    },
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
    

@app.route('/quiz', methods=['GET', 'POST'])
def quiz():
    global users
    host = socket.gethostname()
    ip = socket.gethostbyname(host)
    
    if ip not in users:
        users[ip] = {
            "id": ip,
            "visited": [],
            "total": "0",
            "score": "0",
        }
        
    user = users[ip]
    
    user["total"] = str(int(user["total"]) + 1)
        
    question = find_question(ip)
    
    
    return render_template('quiz.html', desserts = desserts, question = question, user = user)
    

@app.route('/answer_question', methods=['GET', 'POST'])
def answer_question():
    global users
    
    json_data = request.get_json()
    userId = json_data["id"]
    visited = json_data["visited"]
    total = json_data["total"]
    score = json_data["score"]
    
    users[userId] = {
    "id": userId,
    "visited": visited,
    "total": total,
    "score": score
    }
        
    return jsonify(ip = userId)
    
    
@app.route('/results')
def results():
    global users
    host = socket.gethostname()
    ip = socket.gethostbyname(host)
    
    user = users[ip]
    
    users[ip] = {
        "id": ip,
        "visited": [],
        "total": "0",
        "score": "0",
    }
        
    return render_template('results.html', desserts = desserts, user = user)
    
def find_question(ip):
    global questions
    global users
    
    question_value = randint(1, 10)
    while str(question_value) in users[ip]["visited"]:
        question_value = randint(1, 10)
    
    users[ip]["visited"].append(str(question_value))
    
    return questions[str(question_value)]


if __name__ == '__main__':
   app.run(debug = True)