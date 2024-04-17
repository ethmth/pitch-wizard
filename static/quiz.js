let checked = false;


function nextButtonClicked() {
  console.log("Next button clicked");

  if(checked) {
    if(Number(question_id) < Number(last_question)) {
      window.location.href = `/quiz/${(1 + Number(question_id))}`;
      return
    } else {
      window.location.href = '/quiz_results';
    }
  } else {
    let answered = checkIfAnswered(question);

    if(answered) {
      checked = true;
      setNextButtonText("Continue");
      checkAnswer(question);
    }
    else {
      showNextButtonErrorMessage("Please Answer the Question");
    }
  }
}


$(document).ready(function () {
  genQuestion(question);

  $(nextButton).click(function () {
    nextButtonClicked();
  });
});
