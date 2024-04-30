function nextButtonClicked() {
  clearSession("/quiz/1");
}

$(document).ready(function () {
  genNavLinks("Quiz");
  $(nextButton).click(function () {
    nextButtonClicked();
  });
});
