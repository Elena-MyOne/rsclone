export function startPageHandlers() {
  const helpButton = document.querySelector('.help-button') as HTMLButtonElement;
  // console.log(helpButton)
  helpButton.addEventListener('click', () => {
    window.location.hash = 'help'
  })

  window.addEventListener('keypress', (event) => {
    if (event.keyCode === 13) {
      window.location.hash = 'main'
    }
  })
}