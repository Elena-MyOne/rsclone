import { generateLogInBlock } from "./profile-page-login";

export function generateProfilePage(): HTMLElement {
  let logIn = localStorage.getItem('logIn');
  let isLogIn = logIn ? JSON.parse(logIn) : false;

  if (isLogIn) {

    const profileBlock = document.createElement('section');
    //..........
    return profileBlock

  }

  return generateLogInBlock();
}