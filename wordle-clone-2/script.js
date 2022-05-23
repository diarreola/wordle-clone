const tileDisplay = document.querySelector('.tile-container')
const keyboard = document.querySelector('.keyboard-container')
const messageDisplay = document.querySelector('.message-container')

const wordle = 'super'
const TILE_LENGTH = 5
const ROW_LENGTH = 6

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
let currentRow = 0
let currentTile = 0

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
    buttonElement.setAttribute('id', key.toLowerCase())
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
    deleteLetter()
    return
  }
  addLetter(e.target.textContent)
}

function handleKeyPress(e) {
  if (e.key === 'Enter') {
    submitGuess()
    return
  }
  if (e.key === 'Delete' || e.key === 'Backspace') {
    deleteLetter()
    return
  }
  if (e.key.match(/^[a-z]$/)) {
    addLetter(e.key)
    return
  }
}

function submitGuess() {
  if (currentTile <= (TILE_LENGTH - 1)) {
    showMessage('not long enough')
    currentRow++
    currentTile = 0
    return
  }
  const guess = guessRows[currentRow].join('')
  // if (!dictionary.includes(guess)) {
  //   showMessage("Not in word list")
  // currentRow++
  //   currentTile = 0
  //   return
  // }
  checkGuess(guess)
}

function checkGuess(guess) {
  flipTile()
  if (wordle === guess) {
    showMessage('Magnificent')
    stopGame()
    return
  }

  if (currentRow >= (ROW_LENGTH - 1)) {
    showMessage('Game over, word is: ', wordle)
    stopGame()
    return
  }
  if (wordle != guess && currentRow < (ROW_LENGTH - 1)) {
    showMessage('Incorrect')
    currentRow++
    currentTile = 0
  }
}

function deleteLetter() {
  if (currentTile > 0) {
    currentTile--
    const tile = document.getElementById('guessRow-' + currentRow + '-tile-' + currentTile)
    tile.textContent = ''
    guessRows[currentRow][currentTile] = ''
    tile.setAttribute('data', '')
  }
}

function addLetter(letter) {
  if (currentTile < 5 && currentRow < 6) {
    const tile = document.getElementById('guessRow-' + currentRow + '-tile-' + currentTile)
    tile.textContent = letter.toLowerCase()
    guessRows[currentRow][currentTile] = letter.toLowerCase()
    tile.setAttribute('data', letter.toLowerCase())
    currentTile++
  }
}

function showMessage(message) {
  const messageElement = document.createElement('p')
  messageElement.textContent = message
  messageDisplay.append(messageElement)
  setTimeout(() => messageDisplay.removeChild(messageElement), 2000)
}

function flipTile() {
  const rowTiles = document.querySelector('#guessRow-' + currentRow).childNodes
  let checkWordle = wordle
  guess = []

  rowTiles.forEach(tile => {
    guess.push({letter: tile.getAttribute('data'), color: 'grey-overlay'})
  })

  guess.forEach((guess, index) => {
    if (guess.letter == wordle[index]) {
      guess.color = 'green-overlay'
      checkWordle = checkWordle.replace(guess.letter, '')
    }
  })

  guess.forEach(guess => {
    if (checkWordle.includes(guess.letter)){
      guess.color = 'yellow-overlay'
      checkWordle = checkWordle.replace(guess.letter, '')
    }
  })

  rowTiles.forEach((tile, index) => {
    setTimeout(() => {
      tile.classList.add(guess[index].color)
      addColorToKey(guess[index].letter, guess[index].color)
    }, 500 * index)
  })
}

function addColorToKey(keyLetter, color) {
  const key = document.getElementById(keyLetter)
  key.classList.add(color)
}
