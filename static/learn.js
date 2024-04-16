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

const slideDiv = "#slide"
let slides = {};
let currentSlide = 0;

function renderSlide(slide) {
  $(slideDiv).empty();

  let slide_div = $("<div>").addClass("");
  let slide_title = $("<h1>").addClass("");

  slide_title.text(slide["slideName"]);

  slide_div.append(slide_title);

  $(slideDiv).append(slide_div);
}

function renderCurrentSlide() {
  const slide = slides[currentSlide]

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
  initializeSlides(lesson['slides']);

  renderCurrentSlide();
});
