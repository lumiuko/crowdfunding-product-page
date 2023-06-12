import IMask from 'imask'

const menuBtn = document.getElementById('menu-btn')
const iconHamburger = document.getElementById('icon-hamburger')
const iconCloseMenu = document.getElementById('icon-close-menu')
const mobileMenu = document.getElementById('mobile-menu')
const bookmarkBtn = document.getElementById('bookmark-btn')
const bookmarkText = document.getElementById('bookmark-text')
const openModalBtn = document.getElementById('open-modal')
const overlay = document.getElementById('modal-overlay')
const modal = document.getElementById('modal')
const closeModalBtn = document.getElementById('close-modal')
const plans = document.querySelectorAll('.plan')
const backForm = document.getElementById('back-form')
const modalSuccess = document.getElementById('modal-success')
const modalSuccessBtn = document.getElementById('modal-success-btn')
const rewardBtns = document.querySelectorAll('[data-reward]')
const numberInputs = document.querySelectorAll('input[type="number"]')

const pledgeValue = document.getElementById('pledge-value')
const pledgeGoal = document.getElementById('pledge-goal')
const pledgeBackers = document.getElementById('pledge-backers')
const pledgeDays = document.getElementById('pledge-days')
const pledgeProgress = document.getElementById('pledge-progress')

let isMenuOpen = false
let isBookmarked = false
let isModalOpen = false
let isSuccessModalOpen = false

const stats = {
  backed: {
    current: 89_914,
    goal: 100_000
  },
  backers: 5007,
  daysLeft: 56
}

function renderStats() {
  pledgeValue.textContent = `$${stats.backed.current.toLocaleString('en-US')}`
  pledgeGoal.textContent = `$${stats.backed.goal.toLocaleString('en-US')}`
  pledgeBackers.textContent = stats.backers.toLocaleString('en-US')
  pledgeDays.textContent = stats.daysLeft
  pledgeProgress.style.width = `${(stats.backed.current / stats.backed.goal) * 100}%`
}

function handleOpenModalClick(event) {
  event.stopPropagation()
  isModalOpen = true
  renderModals()
}

numberInputs.forEach(input => {
  IMask(input, {
    mask: Number,
    min: input.min,
    max: input.max
  })
})

function toggleClass(element, className, condition) {
  if (condition) {
    element.classList.add(className)
  } else {
    element.classList.remove(className)
  }
}

function toggleMenu() {
  isMenuOpen = !isMenuOpen

  toggleClass(iconHamburger, 'hidden', isMenuOpen)
  toggleClass(iconCloseMenu, 'hidden', !isMenuOpen)
  toggleClass(mobileMenu, 'menu-hidden', !isMenuOpen)
  toggleClass(document.body, 'no-scroll', isMenuOpen)

  if (isMenuOpen) {
    document.documentElement.scrollTop = 0
  }
}

function toggleBookmark() {
  isBookmarked = !isBookmarked

  toggleClass(bookmarkBtn, 'bookmarked', isBookmarked)
  bookmarkBtn.setAttribute('aria-pressed', isBookmarked.toString())
  bookmarkText.textContent = isBookmarked ? 'Bookmarked' : 'Bookmark'
}

function renderModals() {
  toggleClass(overlay, 'overlay-hidden', !isModalOpen && !isSuccessModalOpen)
  toggleClass(modal, 'modal-hidden', !isModalOpen)
  toggleClass(modalSuccess, 'modal-hidden', !isSuccessModalOpen)
  toggleClass(document.body, 'no-scroll', isModalOpen || isSuccessModalOpen)
}

function closeModals() {
  isModalOpen = false
  isSuccessModalOpen = false
  renderModals()
}

function handleInputChange(event) {
  document.querySelectorAll('.plan').forEach(item => {
    const planBottom = item.querySelector('.plan-bottom')
    item.classList.remove('selected')
    planBottom.style.maxHeight = '0px'
  })

  const plan = event.target.closest('.plan')
  const planLabel = plan.querySelector('label')
  const planBottom = plan.querySelector('.plan-bottom')
  plan.classList.add('selected')
  planBottom.style.maxHeight = `${planBottom.scrollHeight}px`

  setTimeout(() => {
    planLabel.scrollIntoView({ behavior: 'smooth' })
  }, 500)
}

function handleDocumentClick(event) {
  if (event.target === overlay) closeModals()
}

function handleKeydown(event) {
  if (event.key === 'Escape') closeModals()
}

function handleSubmit(event) {
  event.preventDefault()
  const formData = new FormData(event.target)
  const type = formData.get('type')
  const value = formData.get(`amount[${type}]`)
  const input = document.querySelectorAll('input[type="number"]')[type]

  if (!value) {
    input.parentElement.classList.add('validation-error')
    return
  }

  input.parentElement.classList.remove('validation-error')
  stats.backed.current += Number(value)
  stats.backers++
  renderStats()

  isModalOpen = false
  renderModals()

  setTimeout(() => {
    isSuccessModalOpen = true
    renderModals()
  }, 200)
}

renderStats()

plans.forEach(plan => {
  plan.querySelector('input[type="radio"]').addEventListener('change', handleInputChange)
})

rewardBtns.forEach(item =>
  item.addEventListener('click', event => {
    const btn = event.target
    const rewardIndex = btn.dataset.reward
    isModalOpen = true
    renderModals()
    document.querySelectorAll('.plan > div > label')[rewardIndex].click()
  })
)

menuBtn.addEventListener('click', toggleMenu)
bookmarkBtn.addEventListener('click', toggleBookmark)
closeModalBtn.addEventListener('click', closeModals)
modalSuccessBtn.addEventListener('click', closeModals)
backForm.addEventListener('submit', handleSubmit)
document.addEventListener('keydown', handleKeydown)
document.addEventListener('click', handleDocumentClick)
openModalBtn.addEventListener('click', handleOpenModalClick)
