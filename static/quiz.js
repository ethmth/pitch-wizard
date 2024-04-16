const VIDEO_DOMAIN = "https://droplet.ethanmt.com/videos/pitching/";
const slideDiv = "#slide";
const nextButton = "#next-button";
const slideNavigation = "#slide-navigation";
let slides = {};
let currentSlide = 0;

function nextButtonClicked() {
  console.log("Next button clicked");
}

function getSlideMediaDiv(slideMedia) {
  let slide_media_div = $("<div>").addClass("row");

  for (const media of slideMedia) {
    const videoURL = VIDEO_DOMAIN + media["filename"];
    const captionLocation = media["captionLocation"];

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
    slide_caption.text(media["caption"]);

    slide_video.append(slide_source);
    if (captionLocation == "bottom") {
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

  let slideText = "";
  if (slide["slideText"]) {
    slideText = slide["slideText"].replaceAll("\n", "<br/>");
  }

  let slide_div = $("<div>").addClass("");
  let slide_title = $("<h2>").addClass("");
  let slide_text = $("<h3>").addClass("text-left");
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

function setSlide(slide_number) {
  currentSlide = Number(slide_number);
  renderCurrentSlide();
}

function genSlideNavigation() {
  console.log(slides);
  $(slideNavigation).empty();

  for (const key in slides) {
    let slide = slides[key];

    let slide_div = $("<div>").addClass("slide-button-div");
    let slide_button = $("<button>").addClass("btn btn-secondary");
    slide_button.click(function () {
      setSlide(key);
    });
    slide_button.text(slide["slideName"]);
    slide_div.append(slide_button);

    $(slideNavigation).append(slide_div);
  }
}

$(document).ready(function () {
  // initializeSlides(lesson["slides"]);

  // genSlideNavigation();

  // renderCurrentSlide();

  $(nextButton).click(function () {
    nextButtonClicked();
  });
});
