let answered = false;


function nextButtonClicked() {
  console.log("Next button clicked");

  if(answered) {
    if(Number(question_id) < Number(last_question)) {
      window.location.href = `/quiz/${(1 + Number(question_id))}`;
      return
    } else {
      window.location.href = '/quiz_results';
    }
  } else {
    answered = true;
    checkAnswer(question);
  }
}


$(document).ready(function () {

  console.log(question_id);
  genQuestion(question);

  $(nextButton).click(function () {
    nextButtonClicked();
  });
});
