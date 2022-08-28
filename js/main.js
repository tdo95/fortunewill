let fortuneBtn = document.querySelector('.fortune-btn');
let input = document.querySelector('.question-input');
let errorTextBox = document.querySelector('.error-box');
let crystalBall = document.querySelector('.crystal-ball');
let entryScreen = document.querySelector('.entry-screen');
let responseScreen = document.querySelector('.response-screen');
let questionBox = document.querySelector('.question');
let answerBox = document.querySelector('.answer');
let newQuestionBtn = document.querySelector('.new-question');


newQuestionBtn.addEventListener('click', () => {
    toggleResponseScreen()
    loadPastFortunes() 
});

fortuneBtn.addEventListener('click', async () => processRequest());

async function processRequest() {
    let question = input.value;
    //validate text
    let validQuestion = validateQuestion(question);
    if (!validQuestion) return;
    //get response from server
    let response = await fetchFortuneResponse();
    //set fortune response in display
    setFortuneResponse(question, response);
    console.log(response);

    //TODO: show loading animation

    //TODO: unhide response screen
    toggleResponseScreen();

    //wait 1 seconds
    await waitFor(1000);

    //TODO: hide loading animation

    //TODO: save fortune in local storage
    saveFortuneInLocalStorage();
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

//get fortune response from server
async function fetchFortuneResponse() {
    let response = await fetch('/api');
    let data = await response.json();
    return data.response;
}

//set response in display
function setFortuneResponse(question, answer) {
    questionBox.innerText = question;
    answerBox.innerText = answer;
}

function toggleResponseScreen() {
    let classList = responseScreen.classList;
    if (classList.contains('hidden')) classList.remove('hidden');
    //display transition
    else {
        //hide entry screen

        //fade out response screen

        //fade in entry screen
    }
}

//load past fortunes into DOM using local storage - loads last 5 responses
function loadPastFortunes() {

}

//save fortune into local storage storing question and response in an object
function saveFortuneInLocalStorage() {


}

waitFor = async (delay) => new Promise(resolve => setTimeout(resolve, delay));