function nextButtonClicked() {
    clearSession("/quiz/0")
}

$(document).ready(function () {
  genNavLinks("Quiz");
  $(nextButton).click(function() {
    nextButtonClicked();
  });
});
