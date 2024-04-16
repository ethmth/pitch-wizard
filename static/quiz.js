function nextButtonClicked() {
  console.log("Next button clicked");
}


$(document).ready(function () {
  genQuestion(question);

  $(nextButton).click(function () {
    nextButtonClicked();
  });
});
