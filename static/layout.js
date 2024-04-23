const slideDiv = "#slide";
const nextButton = "#next-button";
const secondButton = "#second-button";
const navLinkDiv = "#nav-link-div";
const navTitle = "#navbar-title";
const footerDiv = "#footer";
const footerHolder = "#footer-holder";
const overlay = "#overlay";
const videoPlayer = "#video-player"
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

function genMediaDiv(media, option_id = -1) {
  const videoURL = VIDEO_DOMAIN + media["filename"];

  let captionLocation = "bottom";
  if (media["captionLocation"]) {
    captionLocation = media["captionLocation"];
  }

  let slide_col = $("<div>").addClass("col-12");

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
      slide_col.append(slide_caption);
    }
  } else {
    if (media["caption"]) {
      slide_col.append(slide_caption);
    }
    slide_col.append(slide_video);
  }

  // TODO GEN MEDIA CONTROLS

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
        console.log("Clearning session failed");
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

  $(videoPlayer).on("play", function () {
    $(overlay).addClass("overlay-shown");
  })

  $(videoPlayer).on("ended", function () {
    $(overlay).removeClass("overlay-shown");
  })
  // videoPlayer.addEventListener("play", () => {
  //   videoContainer.classList.add("active");
  // });

  // videoPlayer.addEventListener("ended", () => {
  //   videoContainer.classList.remove("active");
  // });
});
