from flask import Flask, session
from flask import render_template, redirect
from flask import Response, request, jsonify
import json
app = Flask(__name__)
app.secret_key = "super_secret_key"

# HW10 Video - https://youtu.be/1TmIuiQQ9YM

lessons = []
questions = []
correct_answers = {}

# FUNCTIONS
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
                pass

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
        res = new_answer_key[quiz_id][question_id]
    else:
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
   return render_template('home.html')

@app.route('/test')
def test():
   return render_template('test.html')

@app.route('/learn/<int:learn_id>')
def learn(learn_id):
    learn_id = str(learn_id)
    lesson = lessons[learn_id]
    return render_template('learn.html', lesson=lesson)


def render_quiz(session, quiz_id, question_id:int):
    question_id = str(question_id)
    if question_id == "0":
        return render_template('quiz_welcome.html')

    print(questions[quiz_id]["questions"])
    question = questions[quiz_id]["questions"][question_id]
    user_answer = get_answer(session, quiz_id, question_id)
    user_answered = False
    if user_answer:
        user_answered = True

    correct_answer = None
    if user_answered:
        correct_answer = get_correct_answer(quiz_id, question_id)

    correct = is_correct(user_answer, correct_answer)

    return render_template('quiz.html', 
        question=question,
        quiz_id=quiz_id,
        question_id=question_id,
        last_question=len(questions[quiz_id]["questions"]),
        answered=user_answered,
        answer=user_answer,
        correct_answer=correct_answer,
        correct=correct)

@app.route('/quiz/<int:question_id>')
def quiz(question_id):
    return render_quiz(session, "main", question_id)


@app.route('/quiz/<quiz_id>/<int:question_id>')
def quiz_general(quiz_id, question_id):
    return render_quiz(session, quiz_id, question_id)

def render_quiz_results(session, quiz_id):
    print("User Answers:")
    print_answer_key(session)
    print("Correct Answers:")
    print(correct_answers)

    total_questions = len(questions[quiz_id]["questions"])
    number_correct = calculate_number_correct(session, quiz_id)

    return render_template('quiz_results.html',
        quiz_id=quiz_id,
        number_correct=number_correct,
        total_questions=total_questions)

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
        # print_answer_key(session)

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
    set_correct_answers()
    # print(correct_answers)
    # print(questions)
    app.run(debug = True)




