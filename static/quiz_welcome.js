function nextButtonClicked() {
  window.location.href = "/quiz/1";
}

$(document).ready(function () {
  genNavLinks("Quiz");
  $(nextButton).click(function () {
    nextButtonClicked();
  });
});
