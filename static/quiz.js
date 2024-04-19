// let checked = false;
let checked = true;

function genQuestionIdentify(question) {
  const options = deterministicShuffle(question["options"]);

  let question_div = $("<div>").addClass("btn-group row");

  for (const key in options) {
    const option = options[key];
    const option_id = option["optionId"];

    let media_div = genMediaDiv(option["optionMedia"], option_id);

    let btn_div = $("<div>").addClass("");
    btn_div.data("option_id", option_id);
    let btn_input = $("<input>").addClass("");
    btn_input.data("option_id", option_id);
    btn_input.attr("type", "radio");
    btn_input.attr("name", "options");
    btn_input.attr("id", `option-${option_id}`);
    btn_input.attr("autocomplete", "off");

    let btn_label = $("<label>").addClass("");
    btn_label.attr("for", `option-${option_id}`);
    btn_label.text(`Option ${Number(key) + 1}`);

    btn_div.append(btn_input, btn_label);

    question_div.append(media_div);
    question_div.append(btn_div);
  }

  return question_div;
}

function genQuestionMatch(question) {
  const options = deterministicShuffle(question["options"]);

  let question_div = $("<div>").addClass("btn-group row");

  let drag_div = $("<div>").addClass("col-3");
  let drop_div = $("<div>").addClass("col-9");

  let warning_div = $("<div>").addClass("col-12 warning-div");
  warning_div.text("Dragging and Dropping not yet implemented");

  let pitch_options = [];

  for (const key in options) {
    const option = options[key];
    const option_id = option["optionId"];

    let media_div = genMediaDiv(option["optionMedia"], option_id);
    drop_div.append(media_div);

    pitch_options.push({
      pitchType: option["optionPitchType"],
      optionId: option_id,
    });
  }

  pitch_options = deterministicShuffle(pitch_options);

  for (const key in pitch_options) {
    let option_div = $("<div>").addClass("answer-option draggable-answer");
    option_div.text(pitch_options[key]["pitchType"]);
    option_div.data("option_id", pitch_options[key]["optionId"]);
    drag_div.append(option_div);
  }

  question_div.append(warning_div);
  question_div.append(drag_div, drop_div);

  return question_div;
}

function genQuestionSelect(question) {
  const options = deterministicShuffle(question["options"]);

  let question_div = $("<div>").addClass("btn-group row");

  let options_div = $("<div>").addClass("col-3");
  let media_container = $("<div>").addClass("col-9");
  for (const key in question["questionMedia"]) {
    const media = question["questionMedia"][key];
    let media_div = genMediaDiv(media, media["media_id"]);
    media_container.append(media_div);
  }

  for (const key in options) {
    const option = options[key];
    const option_id = option["optionId"];

    let btn_div = $("<div>").addClass("");
    btn_div.data("option_id", option_id);
    let btn_input = $("<input>").addClass("");
    btn_input.attr("type", "radio");
    btn_input.attr("name", "options");
    btn_input.attr("id", `${option["optionPitchType"]}`);
    btn_input.attr("autocomplete", "off");

    let btn_label = $("<label>").addClass("");
    btn_label.attr("for", `${option["optionPitchType"]}`);
    btn_label.text(`${option["optionPitchType"]}`);

    btn_div.append(btn_input, btn_label);

    options_div.append(btn_div);
  }

  question_div.append(options_div, media_container);

  return question_div;
}

function genQuestionSentence(question) {
  let question_div = $("<div>").addClass("");

  question_div.text("Sentence question");

  return question_div;
}

function genQuestion(question) {
  const questionType = question["questionType"];

  let questionText = "";
  if (question["questionText"]) {
    questionText = question["questionText"].replaceAll("\n", "<br/>");
  }

  $(slideDiv).empty();

  let question_div = $("<div>").addClass("");
  let question_title = $("<h2>").addClass("");
  let question_text = $("<h3>").addClass("text-left");

  question_title.text(question["questionName"]);
  question_text.html(questionText);

  let question_content;
  if (questionType == "Identify") {
    question_content = genQuestionIdentify(question);
  } else if (questionType == "Match") {
    question_content = genQuestionMatch(question);
  } else if (questionType == "Select") {
    question_content = genQuestionSelect(question);
  } else if (questionType == "Sentence") {
    question_content = genQuestionSentence(question);
  }

  question_div.append(question_title, question_text, question_content);
  $(slideDiv).append(question_div);
}

function checkIfAnswerSelected(question) {
  // TODO Check if question is answered
  return true;
}

function sendAJAX(quiz_id, question_id, question, user_answer) {
  const request = {
    quiz_id: quiz_id,
    question_id: question_id,
    // question: question,
    user_answer: user_answer,
  };

  $.ajax({
    type: "POST",
    url: "/check_answer",
    dataType: "json",
    contentType: "application/json; charset=utf-8",
    data: JSON.stringify(request),
    success: function (response) {
      // window.location.href = `/view/${entry.id}`;
      console.log("Response is " + response);
      console.log(response);
    },
    error: function (request, status, error) {
      console.log("Error");
      console.log(request);
      console.log(status);
      console.log(error);
    },
  });
}

function sendAnswerRadio(quiz_id, question_id, question) {
  let user_answer = $('input[type="radio"][name="options"]:checked').data(
    "option_id"
  );

  if (!user_answer) {
    user_answer = null;
  }

  console.log("value is " + user_answer);
  sendAJAX(quiz_id, question_id, question, user_answer);
}

function sendAnswer(quiz_id, question_id, question) {
  const questionType = question["questionType"];

  if (questionType == "Identify" || questionType == "Select") {
    sendAnswerRadio(quiz_id, question_id, question);
  } else if (questionType == "Match") {
  } else if (questionType == "Sentence") {
  }
}

function nextButtonClicked() {
  console.log("Next button clicked");

  if (answered) {
    if (Number(question_id) < Number(last_question)) {
      if (quiz_id == "main") {
        window.location.href = `/quiz/${1 + Number(question_id)}`;
      } else {
        window.location.href = `/quiz/${quiz_id}/${1 + Number(question_id)}`;
      }
    } else {
      if (quiz_id == "main") {
        window.location.href = "/quiz_results";
      } else {
        window.location.href = `/quiz_results/${quiz_id}`;
      }
    }
  } else {
    let answer_selected = checkIfAnswerSelected(question);
    if (answer_selected) {
      sendAnswer(quiz_id, question_id, question);
      window.location.reload();
    } else {
      showNextButtonErrorMessage("Please Answer the Question");
    }
  }

  // if(checked) {
  //   sendAnswer(question);
  //   return;
  // if(Number(question_id) < Number(last_question)) {
  //   window.location.href = `/quiz/${(1 + Number(question_id))}`;
  //   return
  // } else {
  //   window.location.href = '/quiz_results';
  // }
  // } else {
  //   let answer_selected = checkIfAnswerSelected(question);

  //   if(answered) {
  //     checked = true;
  //     setNextButtonText("Continue");
  //     checkAnswer(question);
  //   }
  //   else {
  //     showNextButtonErrorMessage("Please Answer the Question");
  //   }
  // }
}

$(document).ready(function () {
  genQuestion(question);

  if (answered) {
    setNextButtonText("Next");
  }

  $(nextButton).click(function () {
    nextButtonClicked();
  });
});
