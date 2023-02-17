import { handleFormSubmit } from "../registration/registration";
import { translation } from "../country/country";

export function generateLogInBlock(): HTMLElement {
  let logIn = localStorage.getItem('logIn');
  let isLogIn = logIn ? JSON.parse(logIn) : false;
  
  console.log('logIn', isLogIn);

  const logInBlock = document.createElement('section');
  logInBlock.classList.add('login', 'container');

  const loginBody = document.createElement('div');
  loginBody.classList.add('login__body');

  const loginForm = document.createElement('form') as HTMLFormElement;
  loginForm.classList.add('login__form', 'form', 'row', 'g-2', 'needs-validation');
  loginForm.setAttribute('novalidate', '');
  loginForm.innerHTML = 
    `
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
      <a class="form__github" href="#">
        <span data-i18="autGit" class="form__github-text">Log in with</span>
      </a>
    `
  logInBlock.append(loginBody);
  loginBody.append(loginForm);

  initLogInForm(loginForm);

  return logInBlock
}

function initLogInForm(loginForm: HTMLFormElement): void {
  loginForm.addEventListener('submit', event => {
    event.preventDefault();

    if (!loginForm.checkValidity()) {
      event.stopPropagation();
      localStorage.setItem('logIn', 'false');
    } else {
      localStorage.setItem('logIn', 'true');
      handleFormSubmit(loginForm);
      // setRegistrationHeaderLink();
      showSuccessMessage();
      translation();
    }
    loginForm.classList.add('was-validated');
  }, false)
}

function showSuccessMessage() {

}