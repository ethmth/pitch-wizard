const slideDiv = "#slide";
const nextButton = "#next-button";
const slideNavigation = "#slide-navigation";

const VIDEO_DOMAIN = "https://droplet.ethanmt.com/pitching/media/";

// CITATION - https://github.com/yixizhang/seed-shuffle/blob/master/index.js
function deterministicShuffle(array, seed = 44) {
  let currentIndex = array.length,
    temporaryValue,
    randomIndex;
  seed = seed || 1;
  let random = function () {
    var x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
  };
  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(random() * currentIndex);
    currentIndex -= 1;
    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

function genMediaDiv(media, option_id = -1) {
  const videoURL = VIDEO_DOMAIN + media["filename"];

  let captionLocation = "bottom";
  if (media["captionLocation"]) {
    captionLocation = media["captionLocation"];
  }

  let slide_col = $("<div>").addClass("col-12");

  let slide_video = $("<video>").addClass("");
  let slide_source = $("<source>").addClass("");

  let slide_caption;
  if (captionLocation == "bottom") {
    slide_caption = $("<span>").addClass("");
  } else {
    slide_caption = $("<h4>").addClass("");
  }

  slide_video.attr("controls", "controls");
  slide_source.attr("type", "video/mp4");
  slide_source.attr("src", videoURL);
  if (media["caption"]) {
    slide_caption.text(media["caption"]);
  }

  slide_video.append(slide_source);
  if (captionLocation == "bottom") {
    slide_col.append(slide_video);
    if (media["caption"]) {
      slide_col.append(slide_caption);
    }
  } else {
    if (media["caption"]) {
      slide_col.append(slide_caption);
    }
    slide_col.append(slide_video);
  }

  if (option_id >= 0) {
    slide_col.data("option_id", option_id);
  }
  return slide_col;
}

function setNextButtonText(new_text) {
  let message = "Next";
  if (new_text) {
    message = new_text;
  }
  $(nextButton).text(message);
}

function showNextButtonErrorMessage(message) {
  console.log("showNextButtonErrorMessage: " + message);
}

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
  let media_div = genMediaDiv(question["questionMedia"]);
  media_container.append(media_div);

  let warning_div = $("<div>").addClass("col-12 warning-div");
  warning_div.text("Option Selection not yet implemented");

  for (const key in options) {
    const option = options[key];
    const option_id = option["optionId"];

    let option_div = $("<div>").addClass("answer-option");
    option_div.text(option["optionPitchType"]);
    option_div.data("option_id", option_id);
    options_div.append(option_div);
  }

  question_div.append(warning_div);
  question_div.append(options_div, media_container);

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
  }

  question_div.append(question_title, question_text, question_content);
  $(slideDiv).append(question_div);
}

function checkIfAnswered(question) {
  // TODO Check if question is answered
  return true;
}

function checkAnswer(question) {
  // TODO Check answer and display incorrect/correct answer, update score, etc.
  console.log("Checking answer");
}
