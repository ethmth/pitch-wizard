$(document).ready(function () {
  const videoPlayer = document.getElementById("videoPlayer");
  const videoContainer = document.getElementById("videoContainer");

  videoPlayer.addEventListener("play", () => {
    videoContainer.classList.add("active");
  });

  videoPlayer.addEventListener("ended", () => {
    videoContainer.classList.remove("active");
  });
});
