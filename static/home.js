const nextButton = "#next-button";

function nextButtonClicked() {
    window.location.href = "/learn/0";
}

$(document).ready(function () {

  $(nextButton).click(function() {
    nextButtonClicked();
  });
});
