const tileDisplay = document.querySelector('.tile-container')
const keyboard = document.querySelector('.keyboard-container')
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

const guessRows = [
  ['', '', '', '', ''],
  ['', '', '', '', ''],
  ['', '', '', '', ''],
  ['', '', '', '', ''],
  ['', '', '', '', ''],
  ['', '', '', '', '']
]

startGame()

function startGame () {
  buildKeyboard()
  buildTiles()
  document.addEventListener('keydown', handleKeyPress)
}

function stopGame() {
  document.removeEventListener("keydown", handleKeyPress)
  const keyboardButtons = keyboard.querySelectorAll("button")
  keyboardButtons.forEach(keyboardButton => {
    keyboardButton.removeEventListener('click', handleClick)
  })
}

function buildKeyboard() {
  keys.forEach(key => {
    const buttonElement = document.createElement('button')
    buttonElement.textContent = key
    buttonElement.setAttribute('id', key)
    buttonElement.addEventListener('click', handleClick)
    keyboard.append(buttonElement)
  })
}

function buildTiles() {
  guessRows.forEach((guessRow, guessRowIndex) => {
    const rowElement = document.createElement('div')
    rowElement.setAttribute('id', 'guessRow-' + guessRowIndex)
    guessRow.forEach((_guess, guessIndex) => {
        const tileElement = document.createElement('div')
        tileElement.setAttribute('id', 'guessRow-' + guessRowIndex + '-tile-' + guessIndex)
        tileElement.classList.add('tile')
        rowElement.append(tileElement)
    })
    tileDisplay.append(rowElement)
  })
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
  pressKey(e.target.key)
}

function handleKeyPress(e) {
  console.log('key:', e.key)
  if (e.key === 'Enter') {
    submitGuess()
    return
  }
  if (e.key === 'Delete' || e.key === 'Backspace') {
    deleteKey()
    return
  }
  if (e.key.match(/^[a-z]$/)) {
    pressKey(e.key)
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

function pressKey() {

}
