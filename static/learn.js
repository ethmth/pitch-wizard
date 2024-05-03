const lessonName = "#lesson-name";
let slides = {};
let currentSlide = 0;

const lessonToRoute = {
  Introduction: "Intro",
  Fastball: "Fastball",
  Changeup: "Changeup",
  Curveball: "Curveball",
  Knuckleball: "Knuckleball",
};

function previousSlide() {
  if (currentSlide > 0) {
    setSlide(currentSlide - 1);
  } else {
    window.location.href = "/";
  }
}

function nextSlide(nextRoute) {
  const slidesLength = Object.keys(slides).length;

  if (currentSlide >= slidesLength - 1) {
    window.location.href = nextRoute;
  } else {
    setSlide(currentSlide + 1);
  }
}

function secondButtonClicked(nextRoute) {
  if (lesson["lessonName"] == "Introduction") {
    nextSlide(nextRoute);
  } else {
    window.location.href = nextRoute;
  }
}

function nextButtonClicked(nextRoute) {
  if (lesson["lessonName"] == "Introduction") {
    previousSlide(nextRoute);
  } else {
    nextSlide(nextRoute);
  }
}

function getSlideMediaDiv(slideMedia) {
  let slide_media_div = $("<div>").addClass("row");

  if (slideMedia.includes(".svg")) {
    let slide_col = $("<div>").addClass("col-12");
    let image = $("<img>").addClass("image-pitch-info");
    image.on("dragstart", function (event) {
      event.preventDefault();
    });
    image.attr("src", `${VIDEO_DOMAIN}/${slideMedia}`);
    slide_col.append(image);
    slide_media_div.append(slide_col);

    return slide_media_div;
  }

  for (const media of slideMedia) {
    let slide_col = genMediaDiv(
      media,
      slideMedia.length,
      1,
      slideMedia.length <= 1,
      slideMedia.length > 1
    );
    slide_media_div.append(slide_col);
  }

  return slide_media_div;
}

function renderSlide(slide, showTitle = false) {
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
    if (slide["slideMedia"].includes(".svg")) {
      slideText = "";
    }
    slide_media_div = getSlideMediaDiv(slide["slideMedia"]);
  }

  slide_title.text(slide["slideName"]);
  slide_text.html(slideText);

  if (showTitle) {
    slide_div.append(slide_title);
  }
  slide_div.append(slide_text, slide_media_div);

  $(slideDiv).append(slide_div);
}

function renderCurrentSlide() {
  const slide = slides[currentSlide];
  if (lesson["lessonName"] == "Introduction") {
    renderSlide(slide, true);
  } else {
    renderSlide(slide);
  }
  genSlideNavigation();
  handleResizeFooter();

  if (lesson["lessonName"] != "Introduction") {
    if (currentSlide > 0) {
      // $(nextButton).removeClass("button-accent");
      $(secondButton).addClass("button-accent");
    } else {
      // $(nextButton).addClass("button-accent");
      $(secondButton).removeClass("button-accent");
    }
  }
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
  if (lesson["lessonName"] == "Introduction") {
    return;
  }

  for (const key in slides) {
    let slide = slides[key];

    let slide_div = $("<div>").addClass("slide-button-div");
    let slide_button = $("<button>").addClass("button nav-button");
    if (key == currentSlide) {
      slide_button.addClass("button-accent");
    }
    slide_button.click(function () {
      setSlide(key);
    });
    slide_button.text(slide["slideName"]);
    slide_div.append(slide_button);

    $(slideNavigation).append(slide_div);
  }
}

function hideLessonName() {
  $(lessonName).addClass("hidden");
}

$(document).ready(function () {
  genNavLinks(lessonToRoute[lesson["lessonName"]]);

  if (lesson["lessonName"] == "Introduction") {
    hideLessonName();
  }

  initializeSlides(lesson["slides"]);
  setNextButtonText("Next");
  if (lesson["lessonName"] == "Introduction") {
    $(nextButton).removeClass("button-accent");
    $(secondButton).addClass("button-accent");
    setSecondButtonText("Next");
    setNextButtonText("Back");
  } else {
    setSecondButtonText(`${lesson["lessonName"]} Quiz`);
  }

  renderCurrentSlide();

  $(nextButton).click(function () {
    nextButtonClicked(lesson["nextRoute"]);
  });

  $(secondButton).click(function () {
    secondButtonClicked(lesson["nextRoute"]);
  });
});
