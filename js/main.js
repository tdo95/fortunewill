let fortuneBtn = document.querySelector('.fortune-btn');
let input = document.querySelector('.question-input');
let errorTextBox = document.querySelector('.error-box')

fortuneBtn.addEventListener('click', processRequest)

function processRequest() {
    //validate text
   let validQuestion = validateQuestion(input.value);
   if (!validQuestion) return;

   //get response from server

   //show loading animation

   //display fortune

   //save fortune in local storage
}



// validates text, if not valid shows error message in the DOM
function validateQuestion(question) {
    let questionWordList = question.split(' ');
    
    if (!question) {
        errorTextBox.innerText = 'Please enter a question';
        return false; 
    } else if (questionWordList.length < 2) { 
        errorTextBox.innerText = 'Please ask a valid question';
        return false;
    } else if (question.at(-1) !== '?') {
        errorTextBox.innerText = 'Please end your question with a question mark';
        return false;
    } else return true;

}
