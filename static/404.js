const countdown = "#countdown";

function nextButtonClicked() {
  window.location.href = "/";
}

$(document).ready(function () {
  let countdownValue = 5;
  $(countdown).text(countdownValue);

  let interval = setInterval(function () {
    countdownValue--;
    $(countdown).text(countdownValue);
    if (countdownValue <= 0) {
      clearInterval(interval);
      window.location.href = "/"; // Change this URL to your desired homepage
    }
  }, 1000);

  $(nextButton).click(function () {
    nextButtonClicked();
  });
});
