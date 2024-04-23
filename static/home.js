function nextButtonClicked() {
  window.location.href = "/learn/0";
}

function secondButtonClicked() {
  window.location.href = "/quiz/0";
}

$(document).ready(function () {
  genNavLinks("Home");
  $(nextButton).click(function () {
    nextButtonClicked();
  });

  $(secondButton).click(function () {
    secondButtonClicked();
  });
});
