const divViewRating = "#view-entry-rating";
const divViewDifficulty = "#view-entry-difficulty";
const divViewArches = "#view-entry-arches";

const inputSlider = "#edit-entry-rating";
const labelSlider = "#edit-entry-rating-value";

const sourceImage = "#edit-entry-image-current";
const inputImage = "#edit-entry-image";

const buttonArch = "#edit-entry-arch-button";
const inputArch = "#edit-entry-arch-add";
const errorArch = "#edit-entry-arch-error";

function set_rating(rating) {
  $(divViewRating).empty();
  let div = get_rating_div(rating);
  $(divViewRating).append(div);
}

function set_difficulty(experience_level) {
  $(divViewDifficulty).empty();
  let div = get_experience_div(experience_level, true);
  $(divViewDifficulty).append(div);
}

function set_arches(architectures) {
  $(divViewArches).empty();
  let div = get_architectures_div(architectures, "", true, true);
  $(divViewArches).append(div);
}

function show_success_banner(id, name) {
  $("#success-banner").empty();

  let div_shown = $("<div>").addClass("success-banner-shown");
  let div_message = $("<div>").addClass("");

  let span_before = $("<span>")
    .addClass("")
    .text(`New item successfully creaed. View ${name} `);
  let link_entry = $("<a>")
    .addClass("banner-link")
    .attr("href", `/view/${id}`)
    .text(`here`);
  let span_after = $("<span>").addClass("").text(".");

  div_message.append(span_before, link_entry, span_after);
  div_shown.append(div_message);

  $("#success-banner").append(div_shown);
}

function clear_inputs() {
  global_architectures = [];
  set_rating(5);
  set_arches(global_architectures);

  add_dropdowns();

  $(errorArch).empty();
  $(errorArch).html("&nbsp;");
  $(inputArch).val("");

  $("#edit-entry-title-error").empty();
  $("#edit-entry-title-error").html("&nbsp;");
  $("#edit-entry-title").val("");
  $("#edit-entry-title").focus();

  $("#edit-entry-description-error").empty();
  $("#edit-entry-description-error").html("&nbsp;");
  $("#edit-entry-description").val("");

  $("#edit-entry-year-error").empty();
  $("#edit-entry-year-error").html("&nbsp;");
  $("#edit-entry-year").val("");

  $("#edit-entry-image-error").empty();
  $("#edit-entry-image-error").html("&nbsp;");
  $("#edit-entry-image").val("");
}

function add_data(new_entry) {
  $.ajax({
    type: "POST",
    url: "/add_data",
    dataType: "json",
    contentType: "application/json; charset=utf-8",
    data: JSON.stringify(new_entry),
    success: function (response) {
      show_success_banner(response["id"], response["name"]);
      clear_inputs();
    },
    error: function (request, status, error) {
      console.log("Error");
      console.log(request);
      console.log(status);
      console.log(error);
    },
  });
}

function handle_image_changes() {
  $(inputImage).on("input propertychange paste", function () {
    $(sourceImage).attr("src", $(inputImage).val());
  });
}

function handle_rating_changes() {
  $(inputSlider).on("input propertychange paste", function () {
    let div = get_rating_div(Number($(inputSlider).val()));
    $(divViewRating).empty();
    $(divViewRating).append(div);
  });
}

function arch_error(message) {
  $(errorArch).empty();
  $(errorArch).text(message);
  $(inputArch).focus();
}

function add_arch() {
  const new_arch = $(inputArch).val().trim();

  if (new_arch == "") {
    arch_error("Arch cannot be empty");
    return;
  }

  if (global_architectures.includes(new_arch)) {
    arch_error("Arch already added");
    return;
  }

  $(errorArch).empty();
  $(errorArch).html("&nbsp;");
  $(inputArch).val("");
  $(inputArch).focus();

  global_architectures.push(new_arch);

  set_arches(global_architectures);
}

function handle_arch() {
  $(inputArch).on("input propertychange paste", function () {
    $(errorArch).empty();
    $(errorArch).html("&nbsp;");
  });
  $(inputArch).on("keypress", function (e) {
    if (e.which == 13) {
      add_arch();
    }
  });
  $(buttonArch).click(function () {
    add_arch();
  });
}

function create_dropdown(label_id, label, options, entry_val = "blahblahnah") {
  let div_row = $("<div>").addClass("row edit-entry-dropdown-row");
  let div_label = $("<div>")
    .addClass("col-3 view-entry-table-left")
    .text(label);
  let div_dropdown = $("<div>").addClass("col-9 view-entry-table-right");

  let select = $("<select>")
    .addClass("edit-entry-dropdown")
    .attr("id", `edit-entry-${label_id}`);
  for (const option of options) {
    let option_element = $("<option>").addClass("").val(option).text(option);

    if (option == entry_val) {
      option_element.attr("selected", "selected");
    }
    select.append(option_element);
  }
  div_dropdown.append(select);

  div_row.append(div_label, div_dropdown);
  return div_row;
}

function add_dropdowns() {
  let family_div = create_dropdown("family", "Family", family_options);
  let package_manager_div = create_dropdown(
    "package-manager",
    "Package Manager",
    package_manager_options
  );
  let default_desktop_div = create_dropdown(
    "default-desktop",
    "Default Desktop",
    default_desktop_options
  );
  let upgrade_style_div = create_dropdown(
    "upgrade-style",
    "Upgrade Style",
    upgrade_style_options
  );
  let init_system_div = create_dropdown(
    "init-system",
    "Init System",
    init_system_options
  );

  $("#edit-entry-dropdowns").empty();
  $("#edit-entry-dropdowns").append(
    family_div,
    package_manager_div,
    default_desktop_div,
    upgrade_style_div,
    init_system_div
  );
}

function error_check_name(name) {
  if (name == "") {
    const message = "Title cannot be empty";

    $("#edit-entry-title-error").empty();
    $("#edit-entry-title-error").text(message);
    $("#edit-entry-title").focus();

    return true;
  }

  $("#edit-entry-title-error").empty();
  $("#edit-entry-title-error").html("&nbsp;");

  return false;
}

function error_check_image(image) {
  if (image == "") {
    const message = "Image cannot be empty";

    $("#edit-entry-image-error").empty();
    $("#edit-entry-image-error").text(message);
    $(inputImage).focus();

    return true;
  }

  $("#edit-entry-image-error").empty();
  $("#edit-entry-image-error").html("&nbsp;");

  return false;
}

function error_check_description(description) {
  if (description == "") {
    const message = "Description cannot be empty";

    $("#edit-entry-description-error").empty();
    $("#edit-entry-description-error").text(message);
    $("#edit-entry-description").focus();

    return true;
  }

  $("#edit-entry-description-error").empty();
  $("#edit-entry-description-error").html("&nbsp;");

  return false;
}

function error_check_year(year) {
  if (isNumeric(year) && Number(year) >= 0 && Number(year) <= 2024) {
    $("#edit-entry-year-error").empty();
    $("#edit-entry-year-error").html("&nbsp;");

    return false;
  } else {
    const message = "Must be a valid year";

    $("#edit-entry-year-error").empty();
    $("#edit-entry-year-error").text(message);
    $("#edit-entry-year").focus();

    return true;
  }
}

function error_check_architectures(architectures) {
  if (architectures.length == 0) {
    const message = "Must have at least 1";

    $(errorArch).empty();
    $(errorArch).text(message);
    $(inputArch).focus();

    return true;
  }

  $(errorArch).empty();
  $(errorArch).html("&nbsp;");

  return false;
}

function data_submit() {
  const name = $("#edit-entry-title").val().trim();
  const name_error = error_check_name(name);
  if (name_error) {
    return;
  }

  const image = $(inputImage).val().trim();
  const image_error = error_check_image(image);
  if (image_error) {
    return;
  }

  const description = $("#edit-entry-description").val().trim();
  const description_error = error_check_description(description);
  if (description_error) {
    return;
  }

  const architectures = global_architectures;
  const architectures_error = error_check_architectures(architectures);
  if (architectures_error) {
    return;
  }

  const year = $("#edit-entry-year").val().trim();
  const year_error = error_check_year(year);
  if (year_error) {
    return;
  }

  const rating = $(inputSlider).val();
  const experience_level = $("#edit-entry-difficulty").val();

  const family = $("#edit-entry-family").val();
  const package_manager = $("#edit-entry-package-manager").val();
  const default_desktop = $("#edit-entry-default-desktop").val();
  const upgrade_style = $("#edit-entry-upgrade-style").val();
  const init_system = $("#edit-entry-init-system").val();

  const new_entry = {
    name: name,
    logo: image,
    description: description,
    release_year: Number(year),
    expert_rating: Number(rating),
    family: family,
    package_manager: package_manager,
    architectures: architectures,
    default_desktop: default_desktop,
    upgrade_style: upgrade_style,
    init_system: init_system,
    experience_level: experience_level,
  };

  add_data(new_entry);
}

function handle_submit() {
  $(inputImage).on("input propertychange paste", function (e) {
    $("#edit-entry-image-error").empty();
    $("#edit-entry-image-error").html("&nbsp;");
  });
  $("#edit-entry-title").on("input propertychange paste", function (e) {
    $("#edit-entry-title-error").empty();
    $("#edit-entry-title-error").html("&nbsp;");
  });
  $("#edit-entry-year").on("input propertychange paste", function (e) {
    $("#edit-entry-year-error").empty();
    $("#edit-entry-year-error").html("&nbsp;");
  });
  $("#edit-entry-description").on("input propertychange paste", function (e) {
    $("#edit-entry-description-error").empty();
    $("#edit-entry-description-error").html("&nbsp;");
  });

  $(inputImage).on("keypress", function (e) {
    if (e.which == 13) {
      data_submit();
    }
  });
  $("#edit-entry-title").on("keypress", function (e) {
    if (e.which == 13) {
      data_submit();
    }
  });
  $("#edit-entry-year").on("keypress", function (e) {
    if (e.which == 13) {
      data_submit();
    }
  });
  $("#edit-entry-description").on("keypress", function (e) {
    if (e.which == 13) {
      data_submit();
    }
  });
  $("#edit-entry-button").click(function () {
    data_submit();
  });
}

$(document).ready(function () {
  $("#edit-entry-title").focus();
  global_architectures = [];
  set_rating(5);
  set_arches(global_architectures);

  add_dropdowns();

  handle_rating_changes();
  handle_image_changes();
  handle_arch();

  handle_submit();
});
