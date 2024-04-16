const VIDEO_DOMAIN = "https://droplet.ethanmt.com/videos/pitching/";
const slideDiv = "#slide";
const nextButton = "#next-button";
let slides = {};
let currentSlide = 0;

function nextButtonClicked(nextBehavior, nextRoute) {
  // window.location.href = "/learn/1";
  console.log("Next button clicked");

  console.log("Next behavior " + nextBehavior);

  const slidesLength = Object.keys(slides).length;

  if (nextBehavior == "lesson" || currentSlide >= slidesLength - 1) {
    window.location.href = nextRoute;
    return;
  } else {
    currentSlide += 1;
    renderCurrentSlide();
  }
}

function getSlideMediaDiv(slideMedia) {
  let slide_media_div = $("<div>").addClass("row");

  for (const media of slideMedia) {
    const videoURL = VIDEO_DOMAIN + media["filename"];
    const captionLocation = media["captionLocation"];

    let slide_col = $("<div>").addClass("col-12");

    let slide_video = $("<video>").addClass("");
    let slide_source = $("<source>").addClass("");
    let slide_caption = $("<span>").addClass("");

    slide_video.attr("controls", "controls");
    slide_source.attr("type", "video/mp4");
    slide_source.attr("src", videoURL);
    slide_caption.text(media["caption"]);

    slide_video.append(slide_source);
    if(captionLocation == "bottom") {
      slide_col.append(slide_video, slide_caption);
    } else {
      slide_col.append(slide_caption, slide_video);
    }
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
  if (slide["slideMedia"]) {
    slide_media_div = getSlideMediaDiv(slide["slideMedia"]);
  }

  slide_title.text(slide["slideName"]);
  slide_text.html(slideText);

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
  initializeSlides(lesson["slides"]);

  renderCurrentSlide();

  $(nextButton).click(function () {
    nextButtonClicked(lesson["nextBehavior"], lesson["nextRoute"]);
  });
});
