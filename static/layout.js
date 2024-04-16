const slideDiv = "#slide";
const nextButton = "#next-button";
const slideNavigation = "#slide-navigation";

const VIDEO_DOMAIN = "https://droplet.ethanmt.com/pitching/media/";

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

function genQuestionIdentify(question) {
  let question_div = $("<div>").addClass("");

  question_div.text("Identify");

  return question_div;
}

function genQuestionMatch(question) {
  let question_div = $("<div>").addClass("");

  question_div.text("Match");

  return question_div;
}

function genQuestionSelect(question) {
  let question_div = $("<div>").addClass("");

  question_div.text("Select");

  return question_div;
}

function genQuestion(question) {
  const questionType = question["questionType"];
  console.log(question);

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
