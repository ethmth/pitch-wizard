from flask import Flask
from flask import render_template, redirect
from flask import Response, request, jsonify
import json
app = Flask(__name__)

# Video URL - https://youtu.be/spuJfcKAZFk

# DATA
# data = {
#     "1": {
#         "id": "1",
#         "name": "Debian",
#         "logo": "https://www.debian.org/Pics/debian-logo-1024x576.png",
#         "description": "Debian is a venerable and widely respected Linux distribution known for its stability, reliability, and commitment to free and open-source software principles. It boasts a vast repository of precompiled software packages, making it a versatile choice for users ranging from novices to experienced sysadmins. Debian's package management system, APT (Advanced Package Tool), simplifies software installation and updates. One of its defining features is its strict adherence to the Debian Free Software Guidelines (DFSG), ensuring that all included software is free to use, modify, and distribute. With multiple officially supported architectures and a vibrant community, Debian continues to be a cornerstone of the open-source ecosystem, powering everything from personal computers to enterprise servers.",
#         "release_year": 1993,
#         "expert_rating": 8,
#         "family": "Debian",
#         "package_manager": "APT",
#         "architectures": [
#             "aarch64",
#             "armel",
#             "armhf",
#             "i386",
#             "i686",
#             "loongarch64",
#             "mipsel",
#             "ppc64el",
#             "s390x",
#             "x86_64"
#         ],
#         "default_desktop": "GNOME",
#         "upgrade_style": "Stable",
#         "init_system": "Systemd",
#         "experience_level": "Intermediate"
#     }
# }

lessons = []
questions = []

def read_json():
    global lessons
    global questions

    with open("data/learn.json", 'r') as f:
        lessons = json.load(f)
    
    with open("data/quiz.json", 'r') as f:
        questions = json.load(f)

# current_id = 17

# FUNCTIONS

def select_unique(field):
    results = []
    for data_id in data:
        if data[data_id][field] not in results:
            results.append(data[data_id][field])

    if "None" in results:
        results.remove("None")
        results.insert(0, "None")

    return results

def get_others_same(search_key, entry):
    results = []
    for data_id in data:
        if entry[search_key] == data[data_id][search_key] and entry != data[data_id]:
            results.append({"id": data_id, "name": data[data_id]["name"]})
    return results

# ROUTES

@app.route('/')
def home():
   return render_template('home.html', data=data)

@app.route('/learn/<int:learn_id>')
def learn(learn_id):
    # data_id = str(data_id)
    # global data
    # entry = data[data_id]
    # others_family = get_others_same("family", entry)
    # others_difficulty = get_others_same("experience_level", entry)
    return render_template('learn.html', lesson=lesson, next_route=next_route)

# @app.route('/edit/<int:data_id>')
# def edit(data_id):
#     data_id = str(data_id)
#     global data
#     entry = data[data_id]
#     return render_template('edit.html', 
#         entry=entry, 
#         family_options=select_unique("family"), 
#         package_manager_options=select_unique("package_manager"),
#         default_desktop_options=select_unique("default_desktop"), 
#         upgrade_style_options=select_unique("upgrade_style"),
#         init_system_options=select_unique("init_system")
#         )

# @app.route('/add')
# def add():
#     return render_template('add.html',
#         family_options=select_unique("family"), 
#         package_manager_options=select_unique("package_manager"),
#         default_desktop_options=select_unique("default_desktop"), 
#         upgrade_style_options=select_unique("upgrade_style"),
#         init_system_options=select_unique("init_system")
#         )

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




