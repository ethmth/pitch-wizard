const slideInformation = "#slide-information";

let curr_answers = {};

function genQuestionIdentify(question) {
  const options = deterministicShuffle(question["options"]);

  let container_div = $("<div>").addClass("");

  let questions_div = $("<div>").addClass("questions-div row");
  for (const key in options) {
    const option = options[key];
    const option_id = option["optionId"];

    let media_div = genMediaDiv(
      option["optionMedia"],
      options.length,
      option_id,
      false,
      true
    );
    media_div.addClass("question-div");

    questions_div.append(media_div);
  }

  let answers_div = $("<div>").addClass("answers-div row");

  let count = 0;
  for (const key in options) {
    const option = options[key];
    const option_id = option["optionId"];

    let radio_container = $("<div>").addClass("answer-div radio-container");
    if (options.length == 2) {
      radio_container.addClass("col-6");
    } else if (options.length == 3) {
      radio_container.addClass("col-4");
    }

    if (answered) {
      radio_container.addClass("answer-div-answered");
      if (option_id == Number(correct_answer)) {
        radio_container.addClass("answer-div-correct");
      } else if (option_id == Number(answer)) {
        radio_container.addClass("answer-div-incorrect");
      }
    }

    let btn_div = $("<div>").addClass("radio-item");
    btn_div.data("option_id", option_id);
    let btn_input = $("<input>").addClass("");
    btn_input.data("option_id", option_id);
    btn_input.attr("type", "radio");
    btn_input.attr("name", "options");
    btn_input.attr("id", `option-${option_id}`);
    btn_input.attr("autocomplete", "off");

    if (answered) {
      btn_input.attr("disabled", true);
    }

    btn_input.click(function () {
      setInfoText();
    });

    let btn_label = $("<label>").addClass("");
    btn_label.attr("for", `option-${option_id}`);
    if (options.length == 2) {
      if (count == 0) {
        btn_label.text("Left");
      } else {
        btn_label.text("Right");
      }
    } else {
      btn_label.text(`Option ${Number(key) + 1}`);
    }

    btn_div.append(btn_input, btn_label);
    radio_container.append(btn_div);

    answers_div.append(radio_container);

    count++;
  }

  container_div.append(questions_div, answers_div);

  return container_div;
}

function genQuestionMatch(question) {
  const options = deterministicShuffle(question["options"]);

  let container_div = $("<div>").addClass("");

  let questions_div = $("<div>").addClass("questions-div row");

  let pitch_options = [];

  for (const key in options) {
    const option = options[key];
    const option_id = option["optionId"];

    let media_container = $("<div>").addClass(
      "question-div question-div-match"
    );

    if (options.length == 1) {
      media_container.addClass("col-12");
    } else if (options.length == 2) {
      media_container.addClass("col-6");
    } else if (options.length == 3) {
      media_container.addClass("col-4");
    } else if (options.length == 4) {
      media_container.addClass("col-3");
    }

    let media_div = genMediaDiv(
      option["optionMedia"],
      -1,
      option_id,
      false,
      true
    );
    media_div.addClass("");

    let drop_here = $("<div>").addClass("drop-here");
    drop_here.text("Drop Here");
    if (answered) {
      let matching_option_id = answer[option_id];

      let pitch_type;
      for (const inside in options) {
        if (options[inside]["optionId"] == matching_option_id) {
          pitch_type = options[inside]["optionPitchType"];
          break;
        }
      }
      drop_here.text(pitch_type);
      drop_here.addClass("drop-here-dropped");

      if (answer[option_id] == correct_answer[option_id]) {
        drop_here.addClass("drop-here-correct");
      } else {
        drop_here.addClass("drop-here-incorrect");
      }

      matching_option_id = correct_answer[option_id];
      for (const inside in options) {
        if (options[inside]["optionId"] == matching_option_id) {
          pitch_type = options[inside]["optionPitchType"];
          break;
        }
      }
      media_container.text(pitch_type);
    }
    media_container.append(media_div, drop_here);

    if (!answered) {
      media_container.droppable({
        classes: {
          "ui-droppable-hover": "drop-here-hovered",
        },
        drop: function (event, ui) {
          setInfoText();

          drop_here.addClass("drop-here-dropped");

          const drag_option_id = ui.draggable.data("option_id");
          const drop_option_id = option_id;

          curr_answers[drop_option_id] = drag_option_id;

          ui.draggable.addClass("invisible");

          drop_here.text(ui.draggable.text());

          $(this).droppable({
            accept: "",
          });
        },
      });
    }

    questions_div.append(media_container);

    pitch_options.push({
      pitchType: option["optionPitchType"],
      optionId: option_id,
    });
  }

  let answers_div = $("<div>").addClass("answers-div answers-div-match row");

  pitch_options = deterministicShuffle(pitch_options);

  for (const key in pitch_options) {
    let answer_div = $("<div>").addClass("answer-div answer-div-match");

    if (answered) {
      answer_div.addClass("invisible");
    }

    if (pitch_options.length == 2) {
      answer_div.addClass("col-6");
    } else if (pitch_options.length == 3) {
      answer_div.addClass("col-4");
    }
    answer_div.text(pitch_options[key]["pitchType"]);
    answer_div.data("option_id", pitch_options[key]["optionId"]);

    if (!answered) {
      answer_div.draggable({ revert: "invalid" });
    }

    answers_div.append(answer_div);
  }

  container_div.append(questions_div);

  if (!answered) {
    container_div.append(answers_div);
  }

  return container_div;
}

function genQuestionSelect(question) {
  const options = deterministicShuffle(question["options"]);

  let container_div = $("<div>").addClass("");

  let media_container = $("<div>").addClass("row");
  for (const key in question["questionMedia"]) {
    const media = question["questionMedia"][key];
    let media_div = genMediaDiv(media, 1, media["media_id"], true, false);
    media_container.append(media_div);
  }

  let answers_div = $("<div>").addClass("answers-div row");

  for (const key in options) {
    const option = options[key];
    const option_id = option["optionId"];

    let radio_container = $("<div>").addClass(
      "answer-div answer-div-select radio-container"
    );

    if (answered) {
      radio_container.addClass("answer-div-answered");
      if (option_id == Number(correct_answer)) {
        radio_container.addClass("answer-div-correct");
      } else if (option_id == Number(answer)) {
        radio_container.addClass("answer-div-incorrect");
      }
    }

    let btn_div = $("<div>").addClass("radio-item");
    btn_div.data("option_id", option_id);
    let btn_input = $("<input>").addClass("");
    btn_input.data("option_id", option_id);
    btn_input.attr("type", "radio");
    btn_input.attr("name", "options");
    btn_input.attr("id", `${option["optionPitchType"]}`);
    btn_input.attr("autocomplete", "off");

    btn_input.click(function () {
      setInfoText();
    });

    if (answered) {
      btn_input.attr("disabled", true);
    }

    let btn_label = $("<label>").addClass("");
    btn_label.attr("for", `${option["optionPitchType"]}`);
    btn_label.text(`${option["optionPitchType"]}`);

    btn_div.append(btn_input, btn_label);
    radio_container.append(btn_div);

    answers_div.append(radio_container);
  }

  container_div.append(media_container, answers_div);

  return container_div;
}

function genQuestionSentence(question) {
  const options = question["questionMedia"];

  let container_div = $("<div>").addClass("");

  let questions_div = $("<div>").addClass("questions-div row");
  for (const key in options) {
    let media_div = genMediaDiv(
      options[key],
      options.length,
      -1,
      false,
      options.length > 1
    );
    media_div.addClass("question-div");

    questions_div.append(media_div);
  }

  let answers_div = $("<div>").addClass("answers-div-sentence");

  const sentences = question["sentences"];

  for (const i in sentences) {
    const sentence_id = sentences[i]["sentenceId"];

    let before_span = $("<span>").text(sentences[i]["sentenceBefore"]);
    answers_div.append(before_span);

    let dropdown = $("<select>").addClass("");

    let empty_option = $("<option>").addClass("");
    empty_option.attr("value", "");
    empty_option.text("SELECT");
    dropdown.append(empty_option);

    const options = sentences[i]["sentenceOptions"];
    for (const key in options) {
      let new_option = $("<option>").addClass("");
      new_option.attr("value", options[key]["optionId"]);
      new_option.text(options[key]["optionName"]);

      dropdown.append(new_option);
    }

    dropdown.on("change", function () {
      setInfoText();
      const new_val = $(this).val();
      if (!isNaN(new_val)) {
        curr_answers[sentence_id] = Number(new_val);
      }
    });

    answers_div.append(dropdown);

    if (answered) {
      dropdown.attr("disabled", true);
      dropdown.val(answer[sentence_id]);

      if (answer[sentence_id] == correct_answer[sentence_id]) {
        dropdown.addClass("dropdown-correct");
      } else {
        dropdown.addClass("dropdown-incorrect");

        let correction_span = $("<span>").addClass("bold");

        let correct_option_text;
        for (const inside in options) {
          if (options[inside]["optionId"] == correct_answer[sentence_id]) {
            correct_option_text = options[inside]["optionName"];
            break;
          }
        }
        correction_span.text(` (${correct_option_text})`);
        answers_div.append(correction_span);
      }
    }

    let after_span = $("<span>").text(sentences[i]["sentenceAfter"]);
    answers_div.append(after_span);
  }

  container_div.append(questions_div, answers_div);

  return container_div;
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

function sendAJAX(quiz_id, question_id, question, user_answer) {
  const request = {
    quiz_id: quiz_id,
    question_id: question_id,
    user_answer: user_answer,
  };

  $.ajax({
    type: "POST",
    url: "/check_answer",
    dataType: "json",
    contentType: "application/json; charset=utf-8",
    data: JSON.stringify(request),
    success: function (response) {
      if (response["success"]) {
        window.location.reload(true);
      } else {
        console.log("Error setting your answer");
      }
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
    return false;
  }

  sendAJAX(quiz_id, question_id, question, user_answer);

  return true;
}

function sendAnswerMatch(quiz_id, question_id, question) {
  let user_answer = curr_answers;

  if (Object.keys(curr_answers).length != question["options"].length) {
    return false;
  }
  sendAJAX(quiz_id, question_id, question, user_answer);

  return true;
}

function sendAnswerSentence(quiz_id, question_id, question) {
  let user_answer = curr_answers;

  if (Object.keys(curr_answers).length != question["sentences"].length) {
    return false;
  }
  sendAJAX(quiz_id, question_id, question, user_answer);

  return true;
}

function sendAnswer(quiz_id, question_id, question) {
  const questionType = question["questionType"];

  if (questionType == "Identify" || questionType == "Select") {
    return sendAnswerRadio(quiz_id, question_id, question);
  } else if (questionType == "Match") {
    return sendAnswerMatch(quiz_id, question_id, question);
  } else if (questionType == "Sentence") {
    return sendAnswerSentence(quiz_id, question_id, question);
  }
}

function nextPage(quiz_id, question_id) {
  if (Number(question_id) < Number(last_question)) {
    if (quiz_id == "main") {
      window.location.href = `/quiz/${1 + Number(question_id)}`;
    } else {
      window.location.href = `/quiz/${quiz_id}/${1 + Number(question_id)}`;
    }
  } else {
    if (next_route) {
      window.location.href = next_route;
    } else {
      if (quiz_id == "main") {
        window.location.href = "/quiz_results";
      } else {
        window.location.href = `/quiz_results/${quiz_id}`;
      }
    }
  }
}

function secondButtonClicked() {
  nextButtonClicked(true);
}

function nextButtonClicked(second = false) {
  if (!answered && !second && question["questionType"] == "Match") {
    window.location.reload(true);
    return;
  }

  if (answered) {
    nextPage(quiz_id, question_id);
  } else {
    if (!sendAnswer(quiz_id, question_id, question)) {
      setInfoText("Please Answer the Question");
    }
  }
}

function setInfoText(new_text = "") {
  let message = "";
  if (new_text) {
    message = new_text;
  }
  $(slideInformation).text(message);
}

$(document).ready(function () {
  genNavLinks("Quiz");
  genQuestion(question);

  if (answered) {
    setNextButtonText("Next");
  } else {
    setNextButtonText("Check");
  }

  if (answered) {
    if (correct) {
      setInfoText("Correct!");
    } else {
      setInfoText("Incorrect");
    }
  } else {
    setInfoText("");
  }

  if (!answered && question["questionType"] == "Match") {
    setNextButtonText("Reset");
    setSecondButtonText("Check");
    $(nextButton).removeClass("button-accent");
    $(secondButton).addClass("button-accent");
  } else {
    $("#second-button-div").remove();
  }

  $(nextButton).click(function () {
    nextButtonClicked();
  });

  $(secondButton).click(function () {
    secondButtonClicked();
  });
});
