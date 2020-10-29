const word = document.getElementById('word');
const text = document.getElementById('text');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const endgameEl = document.getElementById('end-game-container');
const settingsBtn = document.getElementById('settings-btn');
const settings = document.getElementById('settings');
const settingsForm = document.getElementById('settings-form');
const difficultySelect = document.getElementById('difficulty');

// List of words for game
const words = [
  'sigh',
  'tense',
  'airplane',
  'ball',
  'pies',
  'juice',
  'warlike',
  'bad',
  'north',
  'dependent',
  'steer',
  'silver',
  'highfalutin',
  'superficial',
  'quince',
  'eight',
  'feeble',
  'admit',
  'drag',
  'loving'
];

let randomWord;

let score = 0;

let time = 10;

// let difficulty = localStorage.getItem('difficult') !== null ? localStorage.getItem('difficult') : 'medium';

difficultySelect.value = localStorage.getItem('difficult') !== null ? localStorage.getItem('difficult') : 'medium';

text.focus();

const getRandomWord = () => words[Math.floor(Math.random() * words.length)];

const addWordToDOM = () => {
  randomWord = getRandomWord();
  word.innerHTML = randomWord
};

const updateScore = () => {
  score++;
  scoreEl.innerHTML = String(score);
};

const updateTime = _ => {
  time--;
  timeEl.innerHTML = time + 's';

  if (time === 0) {
    clearInterval(timeInterval);
    gameOver();
  }
};

const timeInterval = setInterval(updateTime, 1000);

const gameOver = () => {
  endgameEl.style.display = 'flex';
  endgameEl.innerHTML = `
    <h1>Time ran out!</h1> 
    <p>Your final score is ${score}</p>
    <button onclick="location.reload()">Play Again!</button>
  `;
};

addWordToDOM();

text.addEventListener('input', e => {
  const inputedText = e.target.value;
  if (inputedText === randomWord) {
    addWordToDOM();

    updateScore();
    e.target.value = '';

    if(difficultySelect.value === 'hard') time += 2;
    else if (difficultySelect.value === 'medium') time += 3;
    else time += 5;

    updateTime();
  }
});

settingsBtn.addEventListener('click', _ => settings.classList.toggle('hide'));

// settingsForm.addEventListener('change', e => {
//   difficulty = e.target.value;
//
//   localStorage.setItem('difficult', difficulty);
// });

difficultySelect.addEventListener('change', e => {
  difficultySelect.value = e.target.value;
  console.log(difficultySelect.value);

  localStorage.setItem('difficult', difficultySelect.value)

});



















