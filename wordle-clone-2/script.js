const tileDisplay = document.querySelector('.tile-container')
const keyboard = document.querySelector('.keyboard-container')

// create keyboard
const keys = [
  'Q',
  'W',
  'E',
  'R',
  'T',
  'Y',
  'U',
  'I',
  'O',
  'P',
  'A',
  'S',
  'D',
  'F',
  'G',
  'H',
  'J',
  'K',
  'L',
  'ENTER',
  'Z',
  'X',
  'C',
  'V',
  'B',
  'N',
  'M',
  '«',
]

keys.forEach(key => {
  const buttonElement = document.createElement('button')
  buttonElement.textContent = key
  buttonElement.setAttribute('id', key)
  buttonElement.addEventListener('click', handleClick)
  document.addEventListener('keydown', handleKeyPress)
  keyboard.append(buttonElement)
})

// startInteraction()
// function startInteraction() {
//   document.addEventListener('click', handleClick)
//   document.addEventListener('keydown', handleKeyPress)
// }

function stopGame() {


}

function handleClick(e) {
  if (e.target.textContent === 'ENTER') {
    submitGuess()
    return
  }
  if (e.target.textContent === '«') {
    deleteKey()
    return
  }
  console.log('clicked')
}

function handleKeyPress(e) {
  if (e.key === 'ENTER') {
    submitGuess()
    return
  }
  if (e.key === '«') {
    deleteKey()
    return
  }
}

function submitGuess() {
  console.log('enter')
  return
}
function deleteKey() {
  console.log('delete')
  return
}
// keyboard interaction + onclick interaction