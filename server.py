from flask import Flask
from flask import render_template
from flask import Response, request, jsonify
app = Flask(__name__)


data = {
    "1":{
        "sample":"This text is a sample"
        }
    "2":{
        "sample":"This text is another sample"
    }
}


@app.route('/')
def homepage():
   return render_template('homepage.html', data = data)


@app.route('/learn')
def learn():
    return render_template('learn.html', data = data)
    

@app.route('/learn/<id>')
def view_dessert(id=None):
    index = id
    
    return render_template('view_dessert.html', data = data, index = index)
    

@app.route('/quiz', methods=['GET', 'POST'])
def quiz():
    return render_template('quiz.html')
    
    
@app.route('/results')
def results():
    return render_template('results.html')


if __name__ == '__main__':
   app.run(debug = True)