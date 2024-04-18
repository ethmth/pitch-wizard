const slideDiv = "#slide";
const nextButton = "#next-button";
const slideNavigation = "#slide-navigation";

const VIDEO_DOMAIN = "https://droplet.ethanmt.com/pitching/media/";

function deterministicShuffle(array, seed = 42) {
  const shuffledArray = array.slice();
  let currentIndex = shuffledArray.length;

  const seededRandom = (max) =>
    Math.floor(Math.abs(Math.sin(seed++) * 10000) % max);

  while (currentIndex !== 0) {
    const randomIndex = seededRandom(currentIndex);
    currentIndex--;

    const temporaryValue = shuffledArray[currentIndex];
    shuffledArray[currentIndex] = shuffledArray[randomIndex];
    shuffledArray[randomIndex] = temporaryValue;
  }

  return shuffledArray;
}

function genMediaDiv(media) {
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
  // console.log(question);

  const options = question["options"];

  // console.log(options);

  let question_div = $("<div>").addClass("btn-group row");

  for (const key in options) {
    const option = options[key];
    // console.log(key);
    // console.log(option);

    let media_div = genMediaDiv(option["optionMedia"]);

    let btn_div = $("<div>").addClass("");
    let btn_input = $("<input>").addClass("btn-check option-input");
    btn_input.attr("type", "radio");
    btn_input.attr("name", "options");
    btn_input.attr("id", `option-${key}`);
    btn_input.attr("autocomplete", "off");

    let btn_label = $("<label>").addClass("btn btn-secondary option-label");
    btn_label.attr("for", `option-${key}`);
    btn_label.text(`Option ${key}`);

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

  let pitch_options = [];

  for (const key in options) {
    const option = options[key];
    let media_div = genMediaDiv(option["optionMedia"]);
    drop_div.append(media_div);
    
    pitch_options.push(option["optionPitchType"]);
  }

  console.log(pitch_options);

  pitch_options = deterministicShuffle(pitch_options);
  for (const key in pitch_options) {
    let option_div = $("<div>").addClass("answer-option draggable-answer");
    option_div.text(pitch_options[key]);
    drag_div.append(option_div);
  }

  question_div.append(drag_div, drop_div);

  return question_div;
}

function genQuestionSelect(question) {
  // TODO
  let question_div = $("<div>").addClass("");

  question_div.text("Select");

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