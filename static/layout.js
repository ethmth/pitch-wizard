let global_architectures = [];

function isNumeric(str) {
  if (typeof str != "string") return false; // we only process strings!
  return (
    !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
    !isNaN(parseFloat(str))
  ); // ...and ensure strings of whitespace fail
}

function get_link_div(value) {
  let div_entry = $("<div>").addClass("view-link");

  let link_entry = $("<a>")
    .addClass("")
    .attr("href", `/view/${value.id}`)
    .text(value.name);
  div_entry.append(link_entry);

  div_entry.data("id", value.id);

  return div_entry;
}

function select_n_entries(data, n, random = false) {
  let temp_list = [];
  for (let list_entry in data) {
    temp_list.push(data[list_entry]);
  }

  if (random) {
    temp_list = temp_list.sort(() => 0.5 - Math.random());
  }
  let selected = temp_list.slice(0, n);

  return selected;
}

function get_rating_div(rating) {
  let div = $("<div>").addClass("star-row");

  let starContent = $("<div>");

  let star1 = $("<i>").addClass("bi bi-star-fill");
  let star2 = $("<i>").addClass("bi bi-star-fill");
  let star3 = $("<i>").addClass("bi bi-star-fill");
  let star4 = $("<i>").addClass("bi bi-star-fill");
  let star5 = $("<i>").addClass("bi bi-star-fill");

  switch (rating) {
    case 0:
      star1.removeClass("bi-star-fill");
      star1.addClass("bi-star");
    case 1:
      star1.removeClass("bi-star-half bi-star-fill");
      star1.addClass("bi-star-half");
    case 2:
      star2.removeClass("bi-star-fill");
      star2.addClass("bi-star");
    case 3:
      star2.removeClass("bi-star-half bi-star-fill");
      star2.addClass("bi-star-half");
    case 4:
      star3.removeClass("bi-star-fill");
      star3.addClass("bi-star");
    case 5:
      star3.removeClass("bi-star-half bi-star-fill");
      star3.addClass("bi-star-half");
    case 6:
      star4.removeClass("bi-star-fill");
      star4.addClass("bi-star");
    case 7:
      star4.removeClass("bi-star-half bi-star-fill");
      star4.addClass("bi-star-half");
    case 8:
      star5.removeClass("bi-star-fill");
      star5.addClass("bi-star");
    case 9:
      star5.removeClass("bi-star-half bi-star-fill");
      star5.addClass("bi-star-half");
  }

  starContent.append(star1, star2, star3, star4, star5);

  div.append(starContent);

  return div;
}

function get_experience_div(experience_level, link = false) {
  let container_div = $("<div>").addClass("experience-tag");
  let div = $("<div>").addClass("");

  let span = $("<span>").addClass("").text(experience_level);

  switch (experience_level) {
    case "Beginner":
      div.addClass("experience-tag-beginner");
      break;
    case "Intermediate":
      div.addClass("experience-tag-intermediate");
      break;
    case "Expert":
      div.addClass("experience-tag-expert");
      break;
  }

  div.append(span);
  let link_element = $("<a>")
    .addClass("experience-tag-link")
    .attr("href", `/search_results/${experience_level}`);
  link_element.append(div);
  container_div.append(link_element);
  if (link) {
  } else {
    container_div.append(div);
  }

  return container_div;
}

function delete_arch(arch) {
  console.log(global_architectures);
  global_architectures = global_architectures.filter((item) => item !== arch);
  console.log("after");
  console.log(global_architectures);
  set_arches(global_architectures);
}

function get_architectures_div(
  architectures,
  separator = "",
  link = false,
  remove = false
) {
  let div_arch = $("<div>").addClass("");

  for (const arch of architectures) {
    let arch_entry = $("<span>").addClass("").text(`${arch}${separator}`);
    if (remove) {
      let arch_button = $("<button>")
        .attr("type", "button")
        .addClass("btn btn-warning arch-remove-button")
        .text("");
      arch_button.data("architecture", arch);
      arch_button.append(arch_entry);
      arch_button.click(function () {
        delete_arch(arch);
      });
      div_arch.append(arch_button);
    } else if (link) {
      let arch_link = $("<a>")
        .addClass("")
        .attr("href", `/search_results/${arch}`);
      arch_link.append(arch_entry);
      div_arch.append(arch_link);
    } else {
      div_arch.append(arch_entry);
    }
  }

  return div_arch;
}

function get_similar_links(entries) {
  let div = $("<div>").addClass("view-links");

  for (const entry of entries) {
    div.append(get_link_div(entry));
  }

  return div;
}

$(document).ready(function () {
  $("#search-form").on("submit", function (event) {
    event.preventDefault();

    const value = $("#search-input").val().trim();

    if (value == "") {
      $("#search-input").val("");
      $("#search-input").focus();
    } else {
      window.location.href = `/search_results/` + encodeURIComponent(value);
    }
  });
});
