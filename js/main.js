let fortuneBtn = document.querySelector('.fortune-btn');
let input = document.querySelector('.question-input');
let errorTextBox = document.querySelector('.error-box')

fortuneBtn.addEventListener('click', processRequest)

async function processRequest() {
    //validate text
   let validQuestion = validateQuestion(input.value);
   if (!validQuestion) return;

   //get response from server
   let response = await fetchFortuneResponse()
   console.log(response);

   //show loading animation

   //display fortune

   //save fortune in local storage
}



// validates text, if not valid shows error message in the DOM
function validateQuestion(question) {
    let questionWordList = question.toLowerCase().split(' ');
    let starterWords = ['will', 'am', 'is'];
    
    if (!question) {
        errorTextBox.innerText = 'Please enter a question';
        return false; 
    } else if (questionWordList.length < 2) { 
        errorTextBox.innerText = 'Please ask a valid question';
        return false;
    } else if (!starterWords.includes(questionWordList[0])) {
        errorTextBox.innerText = 'Please ask a yes or no question';
        return false;
    } else return true;

}

async function fetchFortuneResponse() {
    let response = await fetch('/api');
    let data = await response.json();
    return data.response;
}