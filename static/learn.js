// const divViewRating = "#view-entry-rating";
// const divViewDifficulty = "#view-entry-difficulty";
// const divViewArches = "#view-entry-arches";

// const divViewOthersFamily = "#view-entry-other-distros-family";
// const divViewOthersDifficulty = "#view-entry-other-distros-difficulty";

// function set_rating(entry) {
//   let div = get_rating_div(entry.expert_rating);
//   $(divViewRating).append(div);
// }

// function set_difficulty(entry) {
//   let div = get_experience_div(entry.experience_level, true);
//   $(divViewDifficulty).append(div);
// }

// function set_arches(entry) {
//   let div = get_architectures_div(entry.architectures, "", true);
//   $(divViewArches).append(div);
// }

// function set_others_family(others_family) {
//   let div = get_similar_links(select_n_entries(others_family, 3, true));
//   $(divViewOthersFamily).append(div);
// }

// function set_others_difficulty(others_difficulty) {
//   let div = get_similar_links(select_n_entries(others_difficulty, 3, true));
//   $(divViewOthersDifficulty).append(div);
// }

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

  let slide_div = $("<div>").addClass("");
  let slide_title = $("<h1>").addClass("");
  let slide_text = $("<h2>").addClass("");
  let slide_media_div = $("<div>");
  if(slide["slideMedia"]) {
    slide_media_div = getSlideMediaDiv(slide["slideMedia"]);
  }

  slide_title.text(slide["slideName"]);
  slide_text.text(slide["slideText"]);

  slide_div.append(slide_title, slide_text, slide_media_div);

  $(slideDiv).append(slide_div);
}

function renderCurrentSlide() {
  const slide = slides[currentSlide];

  // console.log(slide);
  renderSlide(slide);
}

function initializeSlides(slides_array) {
  // console.log(slides_array);

  const slides_dict = slides_array.reduce((acc, currentValue, index) => {
    acc[index] = currentValue;
    return acc;
  }, {});

  // console.log(slides_dict);
  slides = slides_dict;
}

$(document).ready(function () {
  console.log(lesson);
  initializeSlides(lesson["slides"]);

  renderCurrentSlide();
});
