import { generateLogInBlock } from "./profile-page-login";

export function generateProfilePage(): HTMLElement {
  let signUp = localStorage.getItem('signUp');
  let isSignUp = signUp ? JSON.parse(signUp) : false;

  const profilePage = document.createElement('section');

  if (isSignUp) {
    profilePage.innerHTML = '';
    const profile = generateProfileBlock()
    profilePage.append(profile);
  } else {
    profilePage.innerHTML = '';
    const loginForm = generateLogInBlock(profilePage)
    profilePage.append(loginForm);
  }

  return profilePage
}

export function generateProfileBlock(): HTMLElement {
  const profileBlock = document.createElement('div');
  //..........
  return profileBlock
}