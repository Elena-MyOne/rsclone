export function generateLoginPage(): HTMLElement {
  const loginBlock = document.createElement('section');
  loginBlock.classList.add('login', 'container');
  loginBlock.innerHTML = 'log in'

  return loginBlock
}