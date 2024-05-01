from flask import Flask, session
from flask import render_template, redirect
from flask import Response, request, jsonify
import json
import datetime
import uuid
app = Flask(__name__)
app.secret_key = "super_secret_key"

lessons = []
questions = []
correct_answers = {}

# FUNCTIONS
def log_route(session, remote_addr, route_name):
    current_time = datetime.datetime.now()

    if 'session_id' not in session:
        session['session_id'] = str(uuid.uuid4())

    if 'session_timestamps' not in session:
        session['session_timestamps'] = []

    if 'page_entered' not in session:
        session['page_entered'] = {}

    session['page_entered'][route_name] = current_time
    session['session_timestamps'].append((route_name, remote_addr, current_time))

    with open("logs/page.txt", "a") as f:
        f.write(f"({current_time}) User {session["session_id"]} ({remote_addr}) visited {route_name}.\n")

    print(f"({current_time}) User {session["session_id"]} ({remote_addr}) visited {route_name}.")

def log_quiz_finish(session, quiz_id, number_correct):
    current_time = datetime.datetime.now()

    if 'session_id' not in session:
        session['session_id'] = str(uuid.uuid4())
    
    user_answers = get_answers(session, quiz_id)

    with open("logs/quiz.txt", "a") as f:
        f.write(f"({current_time}) User {session["session_id"]} finished quiz {quiz_id} with answers {user_answers} and {number_correct} correct.\n")

    print(f"({current_time}) User {session["session_id"]} finished quiz {quiz_id} with answers {user_answers} and {number_correct} correct.")

def read_json():
    global lessons
    global questions

    with open("data/learn.json", 'r') as f:
        lessons = json.load(f)
    
    with open("data/quiz.json", 'r') as f:
        questions = json.load(f)

    lessons = lessons['lessons']

def get_correct_answer(quiz_id, question_id):
    global correct_answers
    answer_key = correct_answers
    res = None

    new_answer_key = None
    if answer_key:
        new_answer_key = answer_key.copy()

    if not new_answer_key:
        new_answer_key = {}

    if not quiz_id in new_answer_key:
        new_answer_key[quiz_id] = {}

    if question_id in new_answer_key[quiz_id]:
        res = new_answer_key[quiz_id][question_id]
    else:
        res = None

    correct_answers = new_answer_key
    return res

def set_correct_answer(quiz_id, question_id, answer):
    global correct_answers
    answer_key = correct_answers
    res = None

    new_answer_key = None
    if answer_key:
        new_answer_key = answer_key.copy()

    if not new_answer_key:
        new_answer_key = {}

    if not quiz_id in new_answer_key:
        new_answer_key[quiz_id] = {}

    new_answer_key[quiz_id][question_id] = answer
    correct_answers = new_answer_key

def set_correct_answers_radio(quiz_id, question_id, question):
    for option in question["options"]:
        if option["optionCorrect"]:
            set_correct_answer(quiz_id, question_id, option["optionId"])

def set_correct_answers_match(quiz_id, question_id, question):
    corr_ans = {}
    for option in question["options"]:
        corr_ans[str(option["optionId"])] = option["optionId"]
    set_correct_answer(quiz_id, question_id, corr_ans)

def set_correct_answers_sentence(quiz_id, question_id, question):
    corr_ans = {}
    for sentence in question["sentences"]:
        for option in sentence["sentenceOptions"]:
            if option["optionCorrect"] == True:
                corr_ans[str(sentence["sentenceId"])] = option["optionId"]
    set_correct_answer(quiz_id, question_id, corr_ans)

def set_correct_answers():
    global questions
    global correct_answers

    for quiz_id in questions:
        for question_id in questions[quiz_id]["questions"]:
            question = questions[quiz_id]["questions"][question_id]
            questionType = question["questionType"]

            if questionType == "Identify":
                set_correct_answers_radio(quiz_id, question_id, question)
            elif questionType == "Match":
                set_correct_answers_match(quiz_id, question_id, question)
            elif questionType == "Select":
                set_correct_answers_radio(quiz_id, question_id, question)
            elif questionType == "Sentence":
                set_correct_answers_sentence(quiz_id, question_id, question)

def print_answer_key(session):
    answer_key = session.get("answer_key")
    if answer_key:
        print(answer_key)
    else:
        print(None)

def get_answers(session, quiz_id):
    answer_key = session.get("answer_key")

    if not answer_key:
        return {}

    if not quiz_id in answer_key:
        return {}
    
    return answer_key[quiz_id]

def get_answer(session, quiz_id, question_id):
    quiz_answer_key = get_answers(session, quiz_id)
    if question_id not in quiz_answer_key:
        return None

    return quiz_answer_key[question_id]

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

def is_correct(user_answer, correct_answer):
    if user_answer == correct_answer:
        return True
    return False

def calculate_number_correct(session, quiz_id):
    correct_count = 0
    for question_id in questions[quiz_id]["questions"]:
        user_answer = get_answer(session, quiz_id, question_id)
        correct_answer = get_correct_answer(quiz_id, question_id)

        if not user_answer:
            continue

        if is_correct(user_answer, correct_answer):
            correct_count += 1

    return correct_count

# ROUTES
@app.route('/')
def home():
    log_route(session, request.remote_addr, "/")

    return render_template('home.html')

@app.route('/learn/<int:learn_id>')
def learn(learn_id):
    log_route(session, request.remote_addr, f"/learn/{learn_id}")

    learn_id = str(learn_id)
    lesson = lessons[learn_id]
    return render_template('learn.html', lesson=lesson)

def render_quiz(session, quiz_id, question_id:int):
    question_id = str(question_id)
    if question_id == "0":
        return render_template('quiz_welcome.html')

    question = questions[quiz_id]["questions"][question_id]
    user_answer = get_answer(session, quiz_id, question_id)
    user_answered = False
    if user_answer:
        user_answered = True

    correct_answer = None
    if user_answered:
        correct_answer = get_correct_answer(quiz_id, question_id)

    correct = is_correct(user_answer, correct_answer)

    next_route = None
    if "nextRoute" in questions[quiz_id]:
        next_route = questions[quiz_id]["nextRoute"]

    return render_template('quiz.html', 
        question=question,
        quiz_id=quiz_id,
        question_id=question_id,
        last_question=len(questions[quiz_id]["questions"]),
        answered=user_answered,
        answer=user_answer,
        correct_answer=correct_answer,
        correct=correct,
        next_route=next_route)

@app.route('/quiz/<int:question_id>')
def quiz(question_id):
    log_route(session, request.remote_addr, f"/quiz/{question_id}")

    return render_quiz(session, "main", question_id)


@app.route('/quiz/<quiz_id>/<int:question_id>')
def quiz_general(quiz_id, question_id):
    log_route(session, request.remote_addr, f"/quiz/{quiz_id}/{question_id}")

    return render_quiz(session, quiz_id, question_id)

def render_quiz_results(session, quiz_id):
    total_questions = len(questions[quiz_id]["questions"])
    number_correct = calculate_number_correct(session, quiz_id)

    log_quiz_finish(session, quiz_id, number_correct)

    return render_template('quiz_results.html',
        quiz_id=quiz_id,
        number_correct=number_correct,
        total_questions=total_questions)

@app.route('/quiz_results')
def quiz_results():
    log_route(session, request.remote_addr, "/quiz_results")

    return render_quiz_results(session, "main")

@app.route('/quiz_results/<quiz_id>')
def quiz_results_general(quiz_id):
    log_route(session, request.remote_addr, f"/quiz_results/{quiz_id}")

    return render_quiz_results(session, quiz_id)

@app.errorhandler(404)
def http_error_handler(error):
    log_route(session, request.remote_addr, "404")

    return render_template("404.html"), 404

# AJAX FUNCTIONS
@app.route('/check_answer', methods=['GET', 'POST'])
def check_answer():
    global questions

    log_route(session, request.remote_addr, "/check_answer")

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
    log_route(session, request.remote_addr, "/clear_session")

    try:
        session.clear()
        return jsonify(success=True)
    except:
        return jsonify(success=False)

# DRIVER
if __name__ == '__main__':
    read_json()
    set_correct_answers()
    app.run(debug = True)




