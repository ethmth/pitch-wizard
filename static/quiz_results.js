function nextButtonClicked() {
    window.location.href = "/";
}

$(document).ready(function () {

  $(nextButton).click(function() {
    nextButtonClicked();
  });
});
