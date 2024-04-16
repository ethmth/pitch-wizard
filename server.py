from flask import Flask
from flask import render_template, redirect
from flask import Response, request, jsonify
import json
app = Flask(__name__)

lessons = []
questions = []

def read_json():
    global lessons
    global questions

    with open("data/learn.json", 'r') as f:
        lessons = json.load(f)
    
    with open("data/quiz.json", 'r') as f:
        questions = json.load(f)

    lessons = lessons['lessons']
    questions = questions['questions']

# ROUTES
@app.route('/')
def home():
   return render_template('home.html')

@app.route('/learn/<int:learn_id>')
def learn(learn_id):
    learn_id = str(learn_id)
    lesson = lessons[learn_id]
    return render_template('learn.html', lesson=lesson)

@app.route('/quiz/<int:question_id>')
def quiz(question_id):
    question_id = str(question_id)
    if question_id == "0":
        return render_template('quiz_welcome.html')

    question = questions[question_id]
    return render_template('quiz.html', question=question)

# AJAX FUNCTIONS

# @app.route('/edit_data', methods=['GET', 'POST'])
# def edit_data():
#     global data

#     json_data = request.get_json()  
#     data_id = json_data["id"] 

#     data[data_id] = json_data

#     return jsonify(success=True)

# @app.route('/add_data', methods=['GET', 'POST'])
# def add_data():
#     global data
#     global current_id

#     data_id = str(current_id)

#     result_dict = {"id": data_id}
#     json_data = request.get_json()
#     for key in json_data:
#         result_dict[key] = json_data[key]

#     data[data_id] = result_dict
#     current_id += 1

#     return jsonify(id=data_id, name=data[data_id]["name"], success=True)


# DRIVER
if __name__ == '__main__':
    read_json()
    app.run(debug = True)




