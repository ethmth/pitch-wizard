const entryDiv = "#home-data-entries";

function get_data_div(value) {
  let div_col = $("<div>").addClass("col-4 home-entry");
  let div_entry = $("<div>").addClass("home-entry-div");
  let link_entry = $("<a>")
    .addClass("home-entry-link")
    .attr("href", `/view/${value.id}`);

  let div_name = $("<div>").addClass("home-entry-title").text(value.name);
  let div_image = $("<div>").addClass("home-entry-image");
  let image = $("<img>")
    .attr("src", value.logo)
    .attr("alt", `The logo for the ${value.name} Linux Distribution`)
    .addClass("");
  div_image.append(image);

  let div_experience_level = get_experience_div(value.experience_level);
  let div_rating = get_rating_div(value.expert_rating);

  link_entry.append(div_name, div_image, div_rating, div_experience_level);

  div_entry.data("id", value.id);
  div_entry.append(link_entry);

  div_col.append(div_entry);
  return div_col;
}

function display_data_list(data) {
  $(entryDiv).empty();

  $.each(data, function (index, value) {
    let div_entry = get_data_div(value);
    $(entryDiv).prepend(div_entry);
  });

  if (Object.keys(data).length == 0) {
    let div_entry = $("<div>").addClass("row").text("No results found");
    $(entryDiv).prepend(div_entry);
  }
}

function display_n_entries(data, n, random = false) {
  display_data_list(select_n_entries(data, n, random));
}

$(document).ready(function () {
  display_n_entries(data, 3, true);
});
