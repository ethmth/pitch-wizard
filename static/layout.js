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
// const ACCENT_COLOR = "B99470"

const navRoutes = {
  Intro: "/learn/0",
  "Learn Fastball": "/learn/1",
  "Learn Changeup": "/learn/2",
  "Learn Curveball": "/learn/3",
  "Learn Knuckleball": "/learn/4",
  Quiz: "/quiz/0",
};

let overlayShown = false;

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

async function setOverlayShown(new_value) {
  await new Promise((resolve) => setTimeout(resolve, 50));

  overlayShown = new_value;
}

function showOverlay() {
  $(overlay).addClass("overlay-shown");
  $("body").css("pointer-events", "none");
  $("body").addClass("scroll-y");
  $(overlay).css("pointer-events", "auto");
  $(backdrop).addClass("backdrop-shown");
  setOverlayShown(true);
}

function hideOverlay() {
  overlayShown = false;
  $(overlay).removeClass("overlay-shown");
  $("body").css("pointer-events", "auto");
  $("body").removeClass("scroll-y");
  $(overlay).css("pointer-events", "none");
  $(backdrop).removeClass("backdrop-shown");
}

function setOverlay(media, option_id = -1) {
  $(overlay).empty();
  let container_div = $("<div>").addClass("container container-main");

  let row_x = $("<div>").addClass("row media-close");
  let btn_div = $("<div>").addClass();
  let btn_x = $("<button>").addClass("button button-accent").text("Close");
  btn_x.click(function () {
    hideOverlay();
  });

  btn_div.append(btn_x);
  row_x.append(btn_div);

  let row_div = $("<div>").addClass("row");
  let media_div = genMediaDiv(media, 1, option_id, true, false);

  row_div.append(media_div);
  container_div.append(row_div, row_x);
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

  slide_source.attr("type", "video/mp4");
  slide_source.attr("src", videoURL);
  if (media["caption"]) {
    slide_caption.text(media["caption"]);
  }

  slide_video.append(slide_source);
  if (captionLocation == "bottom") {
    slide_col.append(slide_video);
    if (media["caption"]) {
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
    } else {
      play_icon.removeClass("fa-pause");
      play_icon.addClass("fa-play");
      pauseVideo(slide_video);
    }
  });

  slide_video.click(function () {
    if (slide_video.data("playing")) {
      play_icon.removeClass("fa-pause");
      play_icon.addClass("fa-play");
      pauseVideo(slide_video);
    } else {
      play_icon.removeClass("fa-play");
      play_icon.addClass("fa-pause");
      playVideo(slide_video);
    }
  });

  let media_controls = $("<div>").addClass("media-controls row");
  media_controls.attr("id", `media-controls-${option_id}`);

  let before_div = $("<div>").addClass("media-before-div").text("");

  let play_div = $("<div>").addClass("media-button-div");
  let play_button = $("<button>").addClass(
    "play-button button media-button button-accent"
  );
  let play_icon = $("<i>").addClass("fa fa-play");
  play_button.append(play_icon);
  play_button.click(function () {
    if (slide_video.data("playing")) {
      play_icon.removeClass("fa-pause");
      play_icon.addClass("fa-play");
      pauseVideo(slide_video);
    } else {
      play_icon.removeClass("fa-play");
      play_icon.addClass("fa-pause");
      playVideo(slide_video);
    }
  });
  play_div.append(play_button);

  let restart_div = $("<div>").addClass("media-button-div");
  let restart_button = $("<button>").addClass(
    "restart-button button media-button"
  );
  let restart_icon = $("<i>").addClass("fa fa-arrows-spin");
  restart_button.append(restart_icon);
  restart_button.click(function () {
    slide_video.get(0).currentTime = 0;
    play_icon.removeClass("fa-play");
    play_icon.addClass("fa-pause");
    playVideo(slide_video);
  });
  restart_div.append(restart_button);

  let speed_div = $("<div>").addClass("speed-slider-div");
  let speed_value = $("<span>").addClass("").text("Speed: 1.00x");
  let speed_slider = $("<input>").addClass("speed-slider");
  speed_slider.attr("type", "range");
  speed_slider.attr("min", "0.25");
  speed_slider.attr("max", "2.00");
  speed_slider.attr("step", "0.1");
  speed_slider.attr("value", 1);
  speed_slider.on("input", function () {
    speed_value.text(`Speed: ${this.value}x`);
    slide_video.get(0).playbackRate = parseFloat(this.value);
  });
  speed_div.append(speed_value, speed_slider);

  let fullscreen_div = $("<div>").addClass("media-button-div");
  let fullscreen_button = $("<button>").addClass(
    "fullscreen-button button media-button button-accent"
  );
  let fullscreen_icon = $("<i>").addClass("fa fa-expand");
  fullscreen_button.append(fullscreen_icon);
  fullscreen_button.click(function () {
    play_icon.removeClass("fa-pause");
    play_icon.addClass("fa-play");
    pauseVideo(slide_video);
    setOverlay(media, option_id);
  });
  fullscreen_div.append(fullscreen_button);

  let after_div = $("<div>").addClass("media-after-div").text("");

  media_controls.append(before_div, play_div, restart_div, speed_div);

  if (fullscreen_option) {
    media_controls.append(fullscreen_div);
  }

  media_controls.append(after_div);

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
  overlayShown = false;

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

  $(window).click(function () {
    if (overlayShown) {
      hideOverlay();
    }
  });
  $(overlay).click(function (event) {
    if (overlayShown) {
      event.stopPropagation();
    }
  });
});
