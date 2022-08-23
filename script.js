const smallCups = document.querySelectorAll('.cup-small')
const liters = document.getElementById('liters')
const percentage = document.getElementById('percentage')
const remained = document.getElementById('remained')
const restart = document.getElementById('restart')
const text = document.querySelector('.text')

updateBigCup()

smallCups.forEach((cup, idx) => {
  cup.addEventListener('click', () => highlightCups(idx)) //bu sekilde yazmazsak assagidaki fonksiyon dogru calismiyor
})

function highlightCups(idx) {
  // console.log(idx)
  // above idx of cup that we clicked on !!!
  // !smallCups : doesn't contain yapar. !true; returns false. !false; returns true
  // nextElementSibling? : ? to check if the nextsibling is  not null

  if (
    smallCups[idx].classList.contains('full') &&
    !smallCups[idx].nextElementSibling?.classList.contains('full')
  ) {
    idx--
  }

  smallCups.forEach((cup, idx2) => {
    if (idx2 <= idx) {
      cup.classList.add('full')
    } else {
      cup.classList.remove('full')
    }
  })

  updateBigCup()

  const drankCups = document.querySelectorAll('.cup-small.full').length

  const set = localStorage.setItem('drankCups', drankCups)
}

document.addEventListener('DOMContentLoaded', () => {
  let leftCups = +localStorage.getItem('drankCups')

  smallCups.forEach((cup, idx3) => {
    if (leftCups - 1 >= idx3) {
      cup.classList.add('full')
    } else {
      cup.classList.remove('full')
    }
  })

  updateBigCup()
})

function updateBigCup() {
  const fullCups = document.querySelectorAll('.cup-small.full').length
  const totalCups = smallCups.length //8

  if (fullCups === 0) {
    percentage.style.visibility = 'hidden' //check notes!!!
    percentage.style.height = 0
  } else {
    percentage.style.visibility = 'visible'
    percentage.style.height = `${(fullCups / totalCups) * 330}px`
    percentage.innerText = `${(fullCups / totalCups) * 100}%`
  }

  if (fullCups / totalCups === 1) {
    remained.style.visibility = 'hidden'
    remained.style.height = 0
    text.innerText = 'Congratulations!'
  } else {
    remained.style.visibility = 'visible'
    liters.innerText = `${2 - 0.25 * fullCups} L` //innerText style degil !!!
    text.innerText = 'Select how many glasses of water that you have drank'
  }
}

restart.addEventListener('click', () => {
  localStorage.removeItem('drankCups')
  smallCups.forEach(cup => {
    cup.classList.remove('full')
  })
  updateBigCup()
})
