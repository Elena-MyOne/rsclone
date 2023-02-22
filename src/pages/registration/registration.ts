import { changeHeaderOnSignUp } from "../../components/header/header";
import { translation } from "../country/country";
import { content } from "../../constants/i18n";
import { generateProfilePage } from "../profile/profile";
import { userInfo } from "../../models/interfaces";
import { createUser } from "../../api/requests";
import { AxiosResponse } from "axios";

export function generateRegistrationPage(): HTMLElement {
  let signUp = localStorage.getItem('signUp');
  let isSignUp = signUp ? JSON.parse(signUp) : false;

  const regBlog = document.createElement('section');
  regBlog.classList.add('registration');
  const regBody = document.createElement('div');
  regBody.classList.add('registration__body');

  const regForm = document.createElement('form') as HTMLFormElement;
  regForm.classList.add('registration__form', 'form', 'row', 'g-2', 'needs-validation');
  regForm.setAttribute('novalidate', '');
  regForm.innerHTML = createRegistrationForm();

  const profile = generateProfilePage();

  if (isSignUp) {
    regBlog.append(profile);
  } else {
    regBody.append(regForm);
    initRegistrationForm(regForm, profile, regBody, regBlog);
    setIncognitoHandler(regBlog, regForm, profile, regBody)
  }

  regBlog.append(regBody);
  return regBlog;
}

function createRegistrationForm(): string {
  return `
  <h5 data-i18="titleRegistration" class="form__title">Registration</h5>
  <div class="form__item">
    <label data-i18="regName" class="form__label text form-label" for="name">Name</label>
    <input class="form__input form-control" id="name" type="text" name="name" required>
    <div data-i18="regFormValidName" class="invalid-feedback form__feedback">
      Name is required
    </div>
    <div data-i18="regFormValidPass" class="valid-feedback form__feedback">
      Looks good!
    </div>
  </div>
  <div class="form__item">
    <label data-i18="regEmail" class="form__label text form-label" for="email">Email</label>
    <input class="form__input form-control" id="email" type="email" name="email" placeholder="name@example.com" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" required>
    <div data-i18="regFormValidEmail" class="invalid-feedback form__feedback">
      Please input valid email
    </div>
    <div data-i18="regFormValidPass" class="valid-feedback form__feedback">
      Looks good!
    </div>
  </div>
  <div class="form__item">
    <label data-i18="regPassword" class="form__label text form-label" for="password">Password</label>
    <input class="form__input form-control" id="password" type="password" name="password" required>
    <div data-i18="regFormValidPassword" class="invalid-feedback form__feedback">
      Please enter a password
    </div>
    <div data-i18="regFormValidPass" class="valid-feedback form__feedback">
      Looks good!
    </div>
  </div>
  <div class="form__buttons">
    <button data-i18="btnRegistration" class="form__button btn sbmt-btn" type="submit">Sign up</button>
    <span data-i18="btnIncognito" class="form__button form__button-incognito btn">Travel incognito</span>
  </div>
  <a class="form__github" href="#">
    <span data-i18="regGit" class="form__github-text">Log in with</span>
  </a>
  `
}

function initRegistrationForm(regForm: HTMLFormElement, profile: HTMLElement, regBody: HTMLElement, regBlog: HTMLElement): void {
  regForm.addEventListener('submit', event => {
    event.preventDefault()

    if (!regForm.checkValidity()) {
      event.stopPropagation();
      localStorage.setItem('signUp', 'false');
    } else {
      localStorage.setItem('signUp', 'true');
      handleFormSubmit(regForm, regBlog, profile, regBody);
    }
    regForm.classList.add('was-validated');
  }, false);
}

export function handleFormSubmit(regForm: HTMLFormElement, regBlog: HTMLElement, profile: HTMLElement, regBody: HTMLElement): void {
  const defaultAvatar = '7';
  if (regForm) {
    const { name, email, password } = regForm.elements as typeof regForm.elements & {
      name: HTMLInputElement;
      email: HTMLInputElement;
      password: HTMLInputElement;
    };

    const formValues: userInfo = {
      name: name.value,
      email: email.value,
      password: password.value,
      avatar: defaultAvatar
    };

    localStorage.setItem('userName', formValues.name);
    localStorage.setItem('userAvatar', defaultAvatar);

    if (formValues.password) {
      setLoginUser(formValues.name, formValues.email, formValues.password, regBlog, profile, regBody)
    }
  }
}

function setLoginUser(name: FormDataEntryValue, email: FormDataEntryValue, password: FormDataEntryValue, regBlog: HTMLElement, profile: HTMLElement, regBody: HTMLElement) {
  createUser(name, email, password).then((res: AxiosResponse<userInfo>) => {
    // console.log(res.data);
    changeHeaderOnSignUp();
    showWelcomeMessage(regBlog, profile, regBody);
    translation();
  })
}

//if registration was successful 
function showWelcomeMessage(regBlog: HTMLElement, profile: HTMLElement, regBody: HTMLElement): void {
  //TODO 'Name' comes from localStorage / guthub / maybe backend
  regBody.innerHTML = `
    <div class="registration__welcome welcome">
      <h5 class="welcome__title"><span data-i18="regWelcomeTitle">Welcome</span> ${getUserName()}</h5>
      <div class="welcome__close">
        <img class="welcome__close-image" src="../assets/icons/close.svg"></div>
      <div class="welcome__body">
        <p data-i18="regWelcomeText" class="welcome__text">We are happy to have you on board</p>
        <img class="welcome__image" src="../assets/images/registration/1.png">
      </div>
    </div>
  `

  const close = document.querySelector('.welcome__close');
  if (close) {
    close.addEventListener('click', () => {
      closeWelcomeMessage(regBlog, profile)
    })
  }
}

function closeWelcomeMessage(regBlog: HTMLElement, profile: HTMLElement): void {
  regBlog.innerHTML = '';
  regBlog.append(profile);
  translation();
}

function getUserName(): string {
  const name = localStorage.getItem('userName');
  if (name) {
    return name
  }
  return translateUserDefaultName();
}

function translateUserDefaultName(): string {
  const language = localStorage.getItem('language') || 'en';
  switch(language) {
    case 'ru':
      return content.ru.regWelcomeTitleName
    case 'be':
      return content.be.regWelcomeTitleName
    default:
      return content.en.regWelcomeTitleName
  }
}

function setIncognitoHandler(regBlog: HTMLElement, regForm: HTMLFormElement, profile: HTMLElement, regBody: HTMLElement): void {
  regForm.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    const defaultUserName = translateUserDefaultName();
    if (target) {
      if (target.closest('.form__button-incognito')) {
        localStorage.setItem('signUp', 'true');
        localStorage.setItem('userName', defaultUserName);
        regBody.innerHTML = '';
        showWelcomeMessage(regBlog, profile, regBody)
        translation();
        changeHeaderOnSignUp();
      }
    }
  })
}

//регистрация через гитхаб https://vk.com/@webcreature-avtorizaciya-na-saite-cherez-github