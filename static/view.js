const divViewRating = "#view-entry-rating";
const divViewDifficulty = "#view-entry-difficulty";
const divViewArches = "#view-entry-arches";

const divViewOthersFamily = "#view-entry-other-distros-family";
const divViewOthersDifficulty = "#view-entry-other-distros-difficulty";

function set_rating(entry) {
  let div = get_rating_div(entry.expert_rating);
  $(divViewRating).append(div);
}

function set_difficulty(entry) {
  let div = get_experience_div(entry.experience_level, true);
  $(divViewDifficulty).append(div);
}

function set_arches(entry) {
  let div = get_architectures_div(entry.architectures, "", true);
  $(divViewArches).append(div);
}

function set_others_family(others_family) {
  let div = get_similar_links(select_n_entries(others_family, 3, true));
  $(divViewOthersFamily).append(div);
}

function set_others_difficulty(others_difficulty) {
  let div = get_similar_links(select_n_entries(others_difficulty, 3, true));
  $(divViewOthersDifficulty).append(div);
}

$(document).ready(function () {
  set_rating(entry);
  set_difficulty(entry);
  set_arches(entry);
  set_others_family(others_family);
  set_others_difficulty(others_difficulty);

  $("#edit-entry-button").click(function () {
    window.location.href = `/edit/${entry.id}`;
  });
});
