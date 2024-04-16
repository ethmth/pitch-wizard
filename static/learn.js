const VIDEO_DOMAIN = "https://droplet.ethanmt.com/videos/pitching/";
const slideDiv = "#slide";
let slides = {};
let currentSlide = 0;

function getSlideMediaDiv(slideMedia) {
  console.log(slideMedia);

  let slide_media_div = $("<div>").addClass("row");

  for (const media of slideMedia) {
    const videoURL = VIDEO_DOMAIN + media["filename"];

    let slide_col = $("<div>").addClass("col-6");

    let slide_video = $("<video>").addClass("");
    let slide_source = $("<source>").addClass("");
    let slide_caption = $("<span>").addClass("");

    slide_video.attr("controls", "controls");
    slide_source.attr("type", "video/mp4");
    slide_source.attr("src", videoURL);
    slide_caption.text(media["caption"]);

    slide_video.append(slide_source);
    slide_col.append(slide_video, slide_caption);
    slide_media_div.append(slide_col);
  }

  return slide_media_div;
}

function renderSlide(slide) {
  $(slideDiv).empty();

  const slideText = slide["slideText"].replace("\n", "<br/>");

  let slide_div = $("<div>").addClass("");
  let slide_title = $("<h1>").addClass("");
  let slide_text = $("<h2>").addClass("text-left");
  let slide_media_div = $("<div>");
  if(slide["slideMedia"]) {
    slide_media_div = getSlideMediaDiv(slide["slideMedia"]);
  }

  slide_title.text(slide["slideName"]);
  slide_text.html(slideText);

  console.log(slide["slideText"]);

  slide_div.append(slide_title, slide_text, slide_media_div);

  $(slideDiv).append(slide_div);
}

function renderCurrentSlide() {
  const slide = slides[currentSlide];

  renderSlide(slide);
}

function initializeSlides(slides_array) {
  const slides_dict = slides_array.reduce((acc, currentValue, index) => {
    acc[index] = currentValue;
    return acc;
  }, {});

  slides = slides_dict;
}

$(document).ready(function () {
  console.log(lesson);
  initializeSlides(lesson["slides"]);

  renderCurrentSlide();
});
