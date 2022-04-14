from flask import Flask
from flask import render_template
from flask import Response, request, jsonify
app = Flask(__name__)


desserts = {
    "1":{
        "id": "1",
        "name":"German Chcolate Cake",
        "description": ["layered chocolate cake", "topped with coconut pecan frosting"],
        "country": "United States",
        "image":"https://cooking.nytimes.com/recipes/1020098-nanaimo-bars"
    },
    "2":{
        "id": "2",
        "name":"Sopaipilla",
        "description": ["light and crispy pastry puff", "deep fried dough"],
        "country": "United States of America",
        "image":"https://cooking.nytimes.com/recipes/1020098-nanaimo-bars"
    },
    "3":{
        "id": "3",
        "name":"Nanaimo Bars",
        "description": ["no bake layered bar cookie", "wafer crumb base, icing, chocolate gaanche"],
        "country": "Canada",
        "image":"https://cooking.nytimes.com/recipes/1020098-nanaimo-bars"
    },
    "4":{
        "id": "4",
        "name":"Beavertail",
        "description": ["fried dough pastry ", "topped w sweet condiments"],
        "country": "Canada",
        "image":"https://matadornetwork.com/read/beavertail-canadas-national-doughnut/"
    },
    "5":{
        "id": "5",
        "name":"Ube Halaya",
        "description": ["purple yam jam", "sweetened spread made of ube, butter, sugar, and coconut milk"],
        "country": "Philipines",
        "image":"https://matadornetwork.com/read/beavertail-canadas-national-doughnut/"
    },
     "6":{
        "id": "6",
        "name":"Buko Pandan",
        "description": ["young coconut, pandan leaves, and ago pearls"],
        "country": "Philipines",
        "image":"https://matadornetwork.com/read/beavertail-canadas-national-doughnut/"
    },
    "7":{
        "id": "7",
        "name":"Jalebi",
        "description": ["deep fried flour in a ciruclar pattern and soaked in simple syrup"],
        "country": "India",
        "image":"https://matadornetwork.com/read/beavertail-canadas-national-doughnut/"
    },
    "8":{
        "id": "8",
        "name":"Gulab Jamun",
        "description": ["milk and semolina dough soaked with an aromatic spiced syrup "],
        "country": "India",
        "image":"https://matadornetwork.com/read/beavertail-canadas-national-doughnut/"
    },
    "9":{
        "id": "9",
        "name":"Danish Pastries",
        "description": ["multi-layered sweet pastry", "fillings can include almond cream, fruity jams"],
        "country": "France",
        "image":"https://matadornetwork.com/read/beavertail-canadas-national-doughnut/"
    },
    "10":{
        "id": "10",
        "name":"Crepe Cake",
        "description": ["thin layers of crepes sandwiched with pastry cream"],
        "country": "France",
        "image":"https://matadornetwork.com/read/beavertail-canadas-national-doughnut/"
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
    return render_template('quiz.html', data = desserts)
    
    
@app.route('/results')
def results():
    return render_template('results.html')


if __name__ == '__main__':
   app.run(debug = True)