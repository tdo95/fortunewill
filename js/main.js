let fortuneBtn = document.querySelector('.fortune-btn');
let input = document.querySelector('.question-input');
let errorTextBox = document.querySelector('.error-box');
let crystalBall = document.querySelector('.crystal-ball');
let entryScreen = document.querySelector('.entry-screen');
let responseScreen = document.querySelector('.response-screen');
let questionBox = document.querySelector('.question');
let answerBox = document.querySelector('.answer');
let newQuestionBtn = document.querySelector('.new-question');
let intro = document.querySelector('.intro')
let pastFortunes = document.querySelector('.past-fortunes');

newQuestionBtn.addEventListener('click', () => {
    //clear old question
    input.value = "";
    //unhide entry screen
    responseScreen.classList.add('hidden');
    entryScreen.classList.remove('hidden');
    intro.classList.remove('flip');

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

    //TODO: unhide response screen
    await toggleResponseScreen();
    

    //save fortune into local storage storing question and response in an object
    localStorage.setItem(localStorage.length + 1, `${question}|${response}`);

}



// validates text, if not valid shows error message in the DOM
function validateQuestion(question) {
    let questionWordList = question.toLowerCase().split(' ');
    let starterWords = ['will', 'am', 'is', 'are'];
    
    if (!question) {
        errorTextBox.innerText = 'Please enter a question';
        return false; 
    } else if (questionWordList.length < 2) { 
        errorTextBox.innerText = 'Please ask a valid question';
        return false;
    } else if (question.includes('|')) {
        errorTextBox.innerText = 'You cannot include a pipe character in your question';
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

async function toggleResponseScreen() {
    let classList = responseScreen.classList;
    
    if (classList.contains('hidden')) {
        entryScreen.classList.add('hidden');
        intro.classList.add('flip');
        await waitFor(1300)
        classList.remove('hidden');
        // Promise.resolve().then(() => intro.classList.remove('flip'));
    }
    
}

//load past fortunes into DOM using local storage - loads last 5 responses
function loadPastFortunes() {
    pastFortunes.innerHTML = "<h3 class='cursive-font'>Past <br> Fortunes</h3>"
    
    let stopNum = (localStorage.length - 5) > 0 ? localStorage.length - 5 : 0;
  
    for (let i = localStorage.length; i > stopNum; i--) {
        let [question, response] = localStorage[i].split("|");
      
        let card = document.createElement('div');
        card.classList.add('past-fortune-box', 'card-gray')
        card.innerHTML = `<h4 class='cursive-font no-margin medium-font'>${question}</h4><p class="no-margin">${response}</p>`;
        pastFortunes.appendChild(card);
    }
}

waitFor = async (delay) => new Promise(resolve => setTimeout(resolve, delay));

//loads past fortunes on page load
loadPastFortunes();