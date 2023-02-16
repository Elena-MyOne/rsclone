import { setRegistrationHeaderLink } from "../../components/header/header";
import { translation } from "../country/country";
import { content } from "../../constants/i18n";

export function generateRegistrationPage(): HTMLElement {
  // если есть бэк, отправляем запрос на сервер 
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

  const regLogOut = document.createElement('div') as HTMLElement;
  regLogOut.classList.add('registration__logout', 'logout');
  regLogOut.innerHTML = showLogOutMessage();

  if (isSignUp) {
    regBody.append(regLogOut);
    setLogoutHandler(regForm, regLogOut, regBody);

  } else {
    regBody.append(regForm);
    initRegistrationForm(regForm, regLogOut, regBody);
    //========================================================
    setIncognitoHandler(regForm, regLogOut, regBody)
    //========================================================
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

function showLogOutMessage(): string {
  return `
  <div class="logout__body">
    <p data-i18="regLogOut" class="logout__text">Are you sure you want to log out?</p>
    <a data-i18="btnLogOut" class="logout__button form__button btn">Log out</a>
  </div>
  `
}

function initRegistrationForm(regForm: HTMLFormElement, regLogOut: HTMLElement, regBody: HTMLElement): void {
  regForm.addEventListener('submit', event => {
    event.preventDefault()

    if (!regForm.checkValidity()) {
      event.stopPropagation();
      localStorage.setItem('signUp', 'false');
    } else {
      localStorage.setItem('signUp', 'true');
      handleFormSubmit(regForm);
      setRegistrationHeaderLink();
      showWelcomeMessage(regForm, regLogOut, regBody);
      translation();
      
    }
    regForm.classList.add('was-validated');
  }, false);
}

//TODO check why data is duplicate
function handleFormSubmit(regForm: HTMLFormElement): void {
  if (regForm) {
    // console.log('handleFormSubmit called with form:', regForm);
    const { elements } = regForm

    // const data: { name: string; value: string; }[] = [];

    //TODO ready to send throw fetch() to the server
    const formData = new FormData(regForm)

    Array.from(elements).forEach((element: Element) => {
      if (element instanceof HTMLInputElement) {
        const { name, value } = element as HTMLInputElement;
        if (!formData.has(name)) {
          formData.append(name, value);
        }
      }
    });

    const dataStore = Array.from(formData.entries());
    localStorage.setItem('userData', JSON.stringify(dataStore));

    // console.log(Array.from(formData.entries()))
  }
}

//if registration was successful 
function showWelcomeMessage(regForm: HTMLFormElement, regLogOut: HTMLElement, regBody: HTMLElement): void {
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
      closeWelcomeMessage(regForm,regLogOut, regBody)
    })
  }
}

function closeWelcomeMessage(regForm: HTMLFormElement, regLogOut: HTMLElement, regBody: HTMLElement): void {
  regBody.innerHTML = '';
  regBody.append(regLogOut);
  showLogOutMessage();
  setLogoutHandler(regForm, regLogOut, regBody);
}

function getUserName(): string {
  const userData = localStorage.getItem('userData');
  if (userData) {
    const userDataParse: string[] = JSON.parse(userData);
    const nameDataName = userDataParse.filter((item) => {
      if (item.includes('name')) {
        return item;
      }
    })
    return nameDataName[0][1];
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

function setLogoutHandler(regForm: HTMLFormElement, regLogOut: HTMLElement, regBody: HTMLElement): void {
  regBody.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    if (target) {
      if (target.closest('.logout__button')) {
        regBody.innerHTML = '';
        localStorage.setItem('signUp', 'false');
        regBody.append(regForm);
        initRegistrationForm(regForm, regLogOut, regBody);
        setRegistrationHeaderLink();
        translation();
      }
    }
  })
}

function setIncognitoHandler(regForm: HTMLFormElement, regLogOut: HTMLElement, regBody: HTMLElement): void {
  regForm.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    if (target) {
      if (target.closest('.form__button-incognito')) {
        console.log('ok');
        
      }
    }
  })
}

//регистрация через гитхаб https://vk.com/@webcreature-avtorizaciya-na-saite-cherez-github