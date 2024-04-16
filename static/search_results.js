const entryDiv = "#search-results";

function replaceLeafText(custfilter, element) {
  $(element)
    .children()
    .each(function () {
      if ($(this).children().length === 0) {
        let originalText = $(this).text();
        let newText = originalText.replace(custfilter, function (match) {
          return `<span class='highlight'>${match}</span>`;
        });
        $(this).html(newText);
      } else {
        replaceLeafText(custfilter, this);
      }
    });
}

// CITATION - Source is https://www.infoandapps.com/blog/jquery-to-search-and-highlight-words-in-html/
function replaceText(search_term) {
  console.log("replacing text");

  $(entryDiv).find(".highlight").removeClass("highlight");

  let custfilter = new RegExp(search_term, "ig");

  if (search_term != "") {
    replaceLeafText(custfilter, entryDiv);
  }
}

function get_data_div(value) {
  let div_col = $("<div>").addClass("");
  let div_entry = $("<div>").addClass("row search-entry");
  let link_entry = $("<a>")
    .addClass("search-entry-link")
    .attr("href", `/view/${value.id}`);

  let div_name = $("<div>")
    .addClass("col-2 search-entry-title")
    .text(value.name);

  let div_experience_level = get_experience_div(value.experience_level);
  div_experience_level.addClass("col-2");

  let div_rating = get_rating_div(value.expert_rating);
  div_rating.addClass("col-2");

  let div_architectures = get_architectures_div(value.architectures);
  div_architectures.addClass("col-6 search-entry-archs");

  div_entry.append(
    div_name,
    div_rating,
    div_experience_level,
    div_architectures
  );
  div_entry.data("id", value.id);

  link_entry.append(div_entry);

  div_col.append(link_entry);
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

$(document).ready(function () {
  display_data_list(results);
  console.log(search_term);
  replaceText(search_term);
});
