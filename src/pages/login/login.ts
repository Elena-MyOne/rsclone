import { translation } from "../country/country";
import { changeHeaderOnSignUp } from "../../components/header/header";
import { setLoginUser } from "../../api/requests";
import { AxiosResponse } from "axios";
import { UserInfo } from "../../models/interfaces";
import { ROUTER_PATH } from "../../constants/enums";

export function generateLoginPage(): HTMLElement {
  let signUp = localStorage.getItem('signUp');
  let isSignUp = signUp ? JSON.parse(signUp) : false;

  const loginBlock = document.createElement('section');
  loginBlock.classList.add('login', 'container');
  const loginBody = document.createElement('div');
  loginBody.classList.add('login__body');

  const loginForm = document.createElement('form') as HTMLFormElement;
  loginForm.classList.add('registration__form', 'form', 'row', 'g-2', 'needs-validation');
  loginForm.setAttribute('novalidate', '');
  loginForm.innerHTML = generateLoginForm();

  const regLogOut = document.createElement('div') as HTMLElement;
  regLogOut.classList.add('registration__logout', 'logout');
  regLogOut.innerHTML = showLogOutMessage();

  if (isSignUp) {
    loginBody.append(regLogOut);
    setLogoutHandler(loginBody, regLogOut, loginForm)
  } else {
    loginBody.append(loginForm);
    initLogInForm(loginBody, regLogOut, loginForm);
  }

  loginBlock.append(loginBody);

  return loginBlock
}

function generateLoginForm(): string {
  return `
      <h5 data-i18="titleAuthorization" class="form__title">Log in</h5>
      <div class="form__item">
        <label data-i18="autEmail" class="form__label text form-label" for="email">Email</label>
        <input class="form__input form-control" id="email" type="email" name="email" placeholder="name@example.com" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" required>
        <div data-i18="regFormValidEmail" class="invalid-feedback form__feedback">
          Please input valid email
        </div>
        <div data-i18="regFormValidPass" class="valid-feedback form__feedback">
          Looks good!
        </div>
      </div>
      <div class="form__item">
        <label data-i18="autPassword" class="form__label text form-label" for="password">Password</label>
        <input class="form__input form-control" id="password" type="password" name="password" required>
        <div data-i18="regFormValidPassword" class="invalid-feedback form__feedback">
          Please enter a password
        </div>
        <div data-i18="regFormValidPass" class="valid-feedback form__feedback">
          Looks good!
        </div>
      </div>
      <div class="form__buttons">
        <button data-i18="autLogin" class="form__button btn sbmt-btn" type="submit">Log in</button>
      </div>
    `
}

function showLogOutMessage(): string {
  return `
  <div class="logout__body">
    <p data-i18="regLogOut" class="logout__text">Are you sure you want to log out?</p>
    <div class="failure__buttons form__buttons">
      <a href="#home" data-i18="btnLogOut" class="logout__button form__button btn">Log out</a>
      <a href="#home" data-i18="btnHome" class="form__button btn" >Home</a>
    </div>
  </div>
  `
}

function initLogInForm(loginBody: HTMLElement, regLogOut: HTMLElement, loginForm: HTMLFormElement): void {
  loginForm.addEventListener('submit', event => {
    event.preventDefault();

    if (!loginForm.checkValidity()) {
      event.stopPropagation();
      localStorage.setItem('signUp', 'false');
    } else {
      handleLogInFormSubmit(loginBody, regLogOut, loginForm);
    }
    loginForm.classList.add('was-validated');
  }, false)
}

function handleLogInFormSubmit(loginBody: HTMLElement, regLogOut: HTMLElement, loginForm: HTMLFormElement): void {
  if (loginForm) {
    const { email, password } = loginForm
    const loginEmail = email.value;
    const loginPassword = password.value;
    generateLoginResponse(loginEmail, loginPassword, loginBody, regLogOut, loginForm);
    email.value = '';
    password.value = '';
  }
}

function generateLoginResponse(email: string, password: string, loginBody: HTMLElement, regLogOut: HTMLElement, loginForm: HTMLFormElement): void {
  setLoginUser(email, password).then((res: AxiosResponse<UserInfo>) => {
    const data = res.data;
    localStorage.setItem('signUp', 'true');
    localStorage.setItem('userName', data.name);
    localStorage.setItem('userId', data.id);
    localStorage.setItem('userAvatar', data.avatar);
    window.location.hash = `#${ROUTER_PATH.PROFILE}`;
  }).catch((error) => {
    showFailureMessage(email, loginBody);
    setFailureHandler(loginBody, regLogOut, loginForm)
    translation();
  })
}

function showFailureMessage(email: FormDataEntryValue, loginBody: HTMLElement): void {
  loginBody.innerHTML = `
  <div class="failure">
    <div class="failure__body">
      <p class="failure__icon"><img src="../assets/icons/failure.svg" alt="something goes wrong"></p>
      <p class="failure__text"><span data-i18="autTextUser">User</span> ${email} <span data-i18="autTextExist">do not exist</span></p>
      <p class="failure__text" data-i18="autTextTry">Would you like to sign up or try again?</p>
      <div class="failure__buttons form__buttons">
        <a href="#registration" class="failure__link form__button btn" data-i18="btnRegistration">Sign up</a>
        <a href="#login" class="failure__link failure__link-login form__button btn" data-i18="autLogin">Log in</a>
      </div>
    </div>
  </div>
  `
}

function getLogInForm(loginBody: HTMLElement, regLogOut: HTMLElement, loginForm: HTMLFormElement): void {
  loginBody.innerHTML = '';
  localStorage.setItem('signUp', 'false');
  loginBody.append(loginForm);
  initLogInForm(loginBody, regLogOut, loginForm);
  changeHeaderOnSignUp();
  localStorage.removeItem('userName');
  localStorage.removeItem('userAvatar');
  localStorage.removeItem('quizResult');
  localStorage.removeItem('userId');
  translation();
}

function setLogoutHandler(loginBody: HTMLElement, regLogOut: HTMLElement, loginForm: HTMLFormElement): void {
  loginBody.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    if (target) {
      if (target.closest('.logout__button')) {
        getLogInForm(loginBody, regLogOut, loginForm);
      }
    }
  })
}

function setFailureHandler(loginBody: HTMLElement, regLogOut: HTMLElement, loginForm: HTMLFormElement): void {
  const failureLogin = document.querySelector('.failure__link-login');
  if (failureLogin) {
    failureLogin.addEventListener('click', () => {
      getLogInForm(loginBody, regLogOut, loginForm);
    }) 
  }
}
