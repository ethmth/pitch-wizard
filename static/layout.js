const slideDiv = "#slide";
const nextButton = "#next-button";
const secondButton = "#second-button";
const navLinkDiv = "#nav-link-div";
const navTitle = "#navbar-title";
const footerDiv = "#footer";
const footerHolder = "#footer-holder";
const overlay = "#overlay";
const backdrop = "#backdrop";
const videoPlayer = "#video-player";
const clearSessionButton = "#clear-session-button";
const slideNavigation = "#slide-navigation";

const VIDEO_DOMAIN = "https://droplet.ethanmt.com/pitching/media/";

const navRoutes = {
  Intro: "/learn/0",
  "Learn Fastball": "/learn/1",
  "Learn Changeup": "/learn/2",
  "Learn Curveball": "/learn/3",
  "Learn Knuckleball": "/learn/4",
  Quiz: "/quiz/0",
};

// CITATION - https://github.com/yixizhang/seed-shuffle/blob/master/index.js
function deterministicShuffle(array, seed = 44) {
  let currentIndex = array.length,
    temporaryValue,
    randomIndex;
  seed = seed || 1;
  let random = function () {
    var x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
  };
  while (0 !== currentIndex) {
    randomIndex = Math.floor(random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

function playVideo(video_div) {
  video_div.trigger("play");
  video_div.data("playing", true);
}
function pauseVideo(video_div) {
  video_div.trigger("pause");
  video_div.data("playing", false);
}

function showOverlay() {
  $(overlay).addClass("overlay-shown");
  $("body").css("pointer-events", "none");
  $("body").addClass("no-scroll");
  $(overlay).css("pointer-events", "auto");
  $(backdrop).addClass("backdrop-shown");
}

function hideOverlay() {
  $(overlay).removeClass("overlay-shown");
  $("body").css("pointer-events", "auto");
  $("body").removeClass("no-scroll");
  $(overlay).css("pointer-events", "none");
  $(backdrop).removeClass("backdrop-shown");
}

function setOverlay(media, option_id = -1) {
  $(overlay).empty();
  let container_div = $("<div>").addClass("container");
  let row_x = $("<div>").addClass("row float-right");
  let btn_div = $("<div>").addClass();
  let btn_x = $("<button>").text("X");
  btn_x.click(function () {
    hideOverlay();
  });

  btn_div.append(btn_x);
  row_x.append(btn_div);

  let row_div = $("<div>").addClass("row");
  let media_div = genMediaDiv(media, 1, option_id, true, false);

  row_div.append(media_div);
  container_div.append(row_x, row_div);
  $(overlay).append(container_div);

  showOverlay();
}

function genMediaDiv(
  media,
  vids_in_row = 1,
  option_id = -1,
  restart_on_end = true,
  fullscreen_option = false
) {
  const videoURL = VIDEO_DOMAIN + media["filename"];

  let captionLocation = "bottom";
  if (media["captionLocation"]) {
    captionLocation = media["captionLocation"];
  }

  let slide_col = $("<div>").addClass("col-12");
  if (vids_in_row == 2) {
    slide_col = $("<div>").addClass("col-6");
  } else if (vids_in_row == 3) {
    slide_col = $("<div>").addClass("col-4");
  }

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
  if (media["caption"]) {
    slide_caption.text(media["caption"]);
  }

  slide_video.append(slide_source);
  if (captionLocation == "bottom") {
    slide_col.append(slide_video);
    if (media["caption"]) {
      // slide_col.append(slide_caption);
    }
  } else {
    if (media["caption"]) {
      slide_col.append(slide_caption);
    }
    slide_col.append(slide_video);
  }

  slide_video.on("ended", function () {
    if (restart_on_end) {
      playVideo(slide_video);
    }
  });

  let media_controls = $("<div>").addClass("media-controls");
  media_controls.attr("id", `media-controls-${option_id}`);

  let play_button = $("<button>").addClass("play-button");
  play_button.text("Play");
  play_button.click(function () {
    if (slide_video.data("playing")) {
      pauseVideo(slide_video);
    } else {
      playVideo(slide_video);
    }
  });

  let restart_button = $("<button>").addClass("restart-button");
  restart_button.text("Restart");
  restart_button.click(function () {
    slide_video.get(0).currentTime = 0;
    playVideo(slide_video);
  });

  let speed_slider = $("<input>").addClass("speed-slider");
  speed_slider.attr("type", "range");
  speed_slider.attr("min", "0.25");
  speed_slider.attr("max", "2");
  speed_slider.attr("step", "0.1");
  speed_slider.attr("value", 1);
  speed_slider.on("input", function () {
    slide_video.get(0).playbackRate = parseFloat(this.value);
  });

  let fullscreen_button = $("<button>").addClass("fullscreen-button");
  fullscreen_button.text("Fullscreen");
  fullscreen_button.click(function () {
    pauseVideo(slide_video);
    setOverlay(media, option_id);
  });

  media_controls.append(play_button, restart_button, speed_slider);

  if (fullscreen_option) {
    media_controls.append(fullscreen_button);
  }

  slide_col.append(media_controls);

  if (option_id >= 0) {
    slide_col.data("option_id", option_id);
  }
  return slide_col;
}

function setNextButtonText(new_text) {
  let message = "Next";
  if (new_text) {
    message = new_text;
  }
  $(nextButton).text(message);
}

function setSecondButtonText(new_text) {
  let message = "Next";
  if (new_text) {
    message = new_text;
  }
  $(secondButton).text(message);
}

function showNextButtonErrorMessage(message) {
  console.log("showNextButtonErrorMessage: " + message);
}

function clearSession(newPage = null) {
  let request = { clear: "me" };
  $.ajax({
    type: "POST",
    url: "/clear_session",
    dataType: "json",
    contentType: "application/json; charset=utf-8",
    data: JSON.stringify(request),
    success: function (response) {
      if (response["success"]) {
        if (newPage) {
          window.location.href = newPage;
        } else {
          window.location.reload(true);
        }
      } else {
        console.log("Clearing session failed");
      }
    },
    error: function (request, status, error) {
      console.log("Error");
      console.log(request);
      console.log(status);
      console.log(error);
    },
  });
}

function genNavLinks(current = "") {
  if (current == "Home") {
    $(navTitle).addClass("navbar-title-active");
  } else {
    $(navTitle).removeClass("navbar-title-active");
  }

  $(navLinkDiv).empty();

  for (const navRoute in navRoutes) {
    const href = navRoutes[navRoute];

    let navLink = $("<a>").addClass("nav-link");
    navLink.text(navRoute);
    navLink.attr("href", href);
    if (navRoute == current) {
      navLink.addClass("nav-link-current");
    }

    $(navLinkDiv).append(navLink);
  }
}

function handleResizeFooter() {
  if (document.body.clientHeight <= window.innerHeight + 10) {
    $(footerDiv).removeClass("footer-fixed");
    $(footerHolder).removeClass("footer-holder-active");
  } else {
    $(footerDiv).addClass("footer-fixed");
    $(footerHolder).addClass("footer-holder-active");
  }
}

$(document).ready(function () {
  $("img").on("dragstart", function (event) {
    event.preventDefault();
  });

  handleResizeFooter();
  $(window).on("resize", function () {
    handleResizeFooter();
  });
  $(clearSessionButton).click(function () {
    clearSession();
  });

  $(document).keydown(function (e) {
    if (e.key === "Escape") {
      hideOverlay();
    }
  });
});
