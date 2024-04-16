const nextButton = "#next-button";

function nextButtonClicked() {
    window.location.href = "/learn/1";
}

$(document).ready(function () {

  $(nextButton).click(function() {
    nextButtonClicked();
  });
});
