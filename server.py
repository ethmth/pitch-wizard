from flask import Flask, session
from flask import render_template, redirect
from flask import Response, request, jsonify
import json
app = Flask(__name__)
app.secret_key = "super_secret_key"

lessons = []
questions = []

# FUNCTIONS
def read_json():
    global lessons
    global questions

    with open("data/learn.json", 'r') as f:
        lessons = json.load(f)
    
    with open("data/quiz.json", 'r') as f:
        questions = json.load(f)

    lessons = lessons['lessons']

def print_answer_key(session):
    answer_key = session.get("answer_key")
    if answer_key:
        print(answer_key)
    else:
        print(None)

def get_answer(session, quiz_id, question_id):
    answer_key = session.get("answer_key")
    res = None

    new_answer_key = None
    if answer_key:
        new_answer_key = answer_key.copy()

    if not new_answer_key:
        new_answer_key = {}

    if not quiz_id in new_answer_key:
        new_answer_key[quiz_id] = {}

    if question_id in new_answer_key[quiz_id]:
        print("Question id in there")
        res = new_answer_key[quiz_id][question_id]
    else:
        print("Question id not in theree")
        res = None

    session["answer_key"] = new_answer_key
    return res

def set_answer(session, quiz_id, question_id, answer):
    answer_key = session.get("answer_key")
    res = None

    new_answer_key = None
    if answer_key:
        new_answer_key = answer_key.copy()

    if not new_answer_key:
        new_answer_key = {}

    if not quiz_id in new_answer_key:
        new_answer_key[quiz_id] = {}

    new_answer_key[quiz_id][question_id] = answer
    session["answer_key"] = new_answer_key

# ROUTES
@app.route('/')
def home():
   return render_template('home.html')

@app.route('/learn/<int:learn_id>')
def learn(learn_id):
    learn_id = str(learn_id)
    lesson = lessons[learn_id]
    return render_template('learn.html', lesson=lesson)


def render_quiz(session, quiz_id, question_id):
    question_id = str(question_id)
    if question_id == "0":
        return render_template('quiz_welcome.html')

    question = questions[quiz_id]["questions"][question_id]

    print("render_quiz: before get_answer")
    print_answer_key(session)
    user_answer = get_answer(session, quiz_id, question_id)
    print("render_quiz: after get_answer")
    print_answer_key(session)
    user_answered = False
    if user_answer:
        user_answered = True

    return render_template('quiz.html', 
        question=question,
        quiz_id=quiz_id,
        question_id=question_id,
        last_question=len(questions[quiz_id]["questions"]),
        answered=user_answered,
        answer=user_answer)

@app.route('/quiz/<int:question_id>')
def quiz(question_id):
    return render_quiz(session, "main", question_id)


@app.route('/quiz/<quiz_id>/<int:question_id>')
def quiz_general(quiz_id, question_id):
    return render_quiz(session, quiz_id, question_id)

def render_quiz_results(session, quiz_id):
    # TODO - show actual user results
    return render_template('quiz_results.html')

@app.route('/quiz_results')
def quiz_results():
    return render_quiz_results(session, "main")

@app.route('/quiz_results/<quiz_id>')
def quiz_results_general(quiz_id):
    return render_quiz_results(session, quiz_id)

# AJAX FUNCTIONS
@app.route('/check_answer', methods=['GET', 'POST'])
def check_answer():
    global questions

    try:
        json_data = request.get_json()
        user_answer = json_data['user_answer']
        quiz_id = json_data['quiz_id']
        question_id = json_data['question_id']

        set_answer(session, quiz_id, question_id, user_answer)

        return jsonify(success=True)
    except:
        return jsonify(success=False)

@app.route('/clear_session', methods=['GET', 'POST'])
def clear_session():
    try:
        session.clear()
        return jsonify(success=True)
    except:
        return jsonify(success=False)

# DRIVER
if __name__ == '__main__':
    read_json()
    app.run(debug = True)




