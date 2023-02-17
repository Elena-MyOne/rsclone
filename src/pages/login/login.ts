import { setRegistrationHeaderLink } from "../../components/header/header";

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

  if (isSignUp) {
    loginBody.innerHTML = `logout`;
  } else {
    loginBody.append(loginForm);
    initLogInForm(loginBody, loginForm);
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
      <a class="form__github" href="#">
        <span data-i18="autGit" class="form__github-text">Log in with</span>
      </a>
    `
}

function initLogInForm(loginBody: HTMLElement, loginForm: HTMLFormElement): void {
  loginForm.addEventListener('submit', event => {
    event.preventDefault();

    if (!loginForm.checkValidity()) {
      event.stopPropagation();
      localStorage.setItem('signUp', 'false');
    } else {
      handleLogInFormSubmit(loginBody, loginForm);
      console.log('ok');
    }
    loginForm.classList.add('was-validated');
  }, false)
}

function handleLogInFormSubmit(loginBody: HTMLElement, loginForm: HTMLFormElement): void {
  if (loginForm) {
    const { elements } = loginForm
    //================
    //TODO ready to send throw fetch() to the server
    const formDataLogIn = new FormData(loginForm)

    Array.from(elements).forEach((element: Element) => {
      if (element instanceof HTMLInputElement) {
        const { name, value } = element as HTMLInputElement;
        if (!formDataLogIn.has(name)) {
          formDataLogIn.append(name, value);
        }
      }
    });

    const dataCompare = Array.from(formDataLogIn.entries());
    //================
    const loginEmail = checkUserData(dataCompare, 'email');
    const loginPassword = checkUserData(dataCompare, 'password');

    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      const userData = JSON.parse(storedUserData);
      const userEmail = checkUserData(userData, 'email');
      const userPassword = checkUserData(userData, 'password');

      if (loginEmail === userEmail && loginPassword === userPassword) {
        localStorage.setItem('signUp', 'true');

        // loginBody.innerHTML = '';
        loginBody.innerHTML = `logout`;
        showSuccessMessage();
        setRegistrationHeaderLink();

      } else {
        localStorage.setItem('signUp', 'false');
        showFailureMessage();
      }
    }
  }
}

function checkUserData(data: [string, FormDataEntryValue][], dataItem: string) {
  const userDataResult = data.filter((item: [string, FormDataEntryValue]) => {
    if (item.includes(dataItem)) {
      return item;
    }
  });
  return userDataResult[0][1];
}

function showSuccessMessage() {
  console.log('Ok');
  // translation();
}

function showFailureMessage() {
  console.log('Failure');
  // translation();
}