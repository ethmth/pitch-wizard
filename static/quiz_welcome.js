function nextButtonClicked() {
    window.location.href = "/quiz/1";
}

$(document).ready(function () {

  $(nextButton).click(function() {
    nextButtonClicked();
  });
});
