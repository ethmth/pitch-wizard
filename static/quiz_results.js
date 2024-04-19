function nextButtonClicked() {
    clearSession("/quiz/0")
}

$(document).ready(function () {

  $(nextButton).click(function() {
    nextButtonClicked();
  });
});
