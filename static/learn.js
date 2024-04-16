let slides = {};
let currentSlide = 0;

function nextButtonClicked(nextBehavior, nextRoute) {
  const slidesLength = Object.keys(slides).length;

  if (nextBehavior == "lesson" || currentSlide >= slidesLength - 1) {
    window.location.href = nextRoute;
    return;
  } else {
    setSlide(currentSlide + 1);
  }
}

function getSlideMediaDiv(slideMedia) {
  let slide_media_div = $("<div>").addClass("row");

  for (const media of slideMedia) {
    let slide_col = genMediaDiv(media);
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
  initializeSlides(lesson["slides"]);
  setNextButtonText(lesson["nextText"]);

  genSlideNavigation();

  renderCurrentSlide();

  $(nextButton).click(function () {
    nextButtonClicked(lesson["nextBehavior"], lesson["nextRoute"]);
  });
});
