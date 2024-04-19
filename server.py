from flask import Flask, session
from flask import render_template, redirect
from flask import Response, request, jsonify
import json
app = Flask(__name__)
app.secret_key = "super_secret_key"

lessons = []
questions = []

# session_temp = {
#     "answers"
# }

def read_json():
    global lessons
    global questions

    with open("data/learn.json", 'r') as f:
        lessons = json.load(f)
    
    with open("data/quiz.json", 'r') as f:
        questions = json.load(f)

    lessons = lessons['lessons']
    # questions = questions['questions']

# ROUTES
@app.route('/')
def home():
   return render_template('home.html')

@app.route('/learn/<int:learn_id>')
def learn(learn_id):
    learn_id = str(learn_id)
    lesson = lessons[learn_id]
    return render_template('learn.html', lesson=lesson)


def render_quiz(quiz_id, question_id):
    question_id = str(question_id)
    if question_id == "0":
        return render_template('quiz_welcome.html')

    question = questions[quiz_id]["questions"][question_id]
    return render_template('quiz.html', 
        question=question, 
        question_id=question_id, 
        last_question=len(questions[quiz_id]["questions"]), 
        answer=None)

@app.route('/quiz/<int:question_id>')
def quiz(question_id):
    return render_quiz("main", question_id)


@app.route('/quiz/<quiz_id>/<int:question_id>')
def quiz_general(quiz_id, question_id):
    return render_quiz(quiz_id, question_id)

@app.route('/quiz_results')
def quiz_results():
    # TODO - show actual user results
    return render_template('quiz_results.html')

# AJAX FUNCTIONS

@app.route('/check_answer', methods=['GET', 'POST'])
def check_answer():
    global questions

    json_data = request.get_json()

    # if not session['answers']:
    #     session['answers'] = {}

    # data_id = json_data["id"] 

    # data[data_id] = json_data

    return jsonify(success=True)

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




