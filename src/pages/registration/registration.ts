export function generateRegistrationPage(): HTMLElement {
  //from localStorage (email: name)
  // если есть бэк, отправляем запрос на сервер 
  let signUp = true;

  const regBlog = document.createElement('section');
  regBlog.classList.add('registration');
  const regBody = document.createElement('div');
  regBody.classList.add('registration__body');

  if (signUp) {

    const regForm = document.createElement('form') as HTMLFormElement;
    regForm.classList.add('registration__form', 'form', 'row', 'g-2', 'needs-validation');
    regForm.setAttribute('novalidate', '');
    // regForm.innerHTML = createRegistrationForm();
    regForm.innerHTML = createRegistrationForm();
    regBody.append(regForm);

    regForm.addEventListener('submit', event => {
      if (!regForm.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }
  
      regForm.classList.add('was-validated')
    }, false)

  } else {

    const regLogOut = document.createElement('div') as HTMLElement;
    regLogOut.classList.add('registration__logout', 'logout');
    regLogOut.innerHTML = showLogOutMessage();
    regBody.append(regLogOut);

  }

  regBlog.append(regBody);

  return regBlog;
}

function createRegistrationForm(): string {
  return `
  <h5 data-i18="titleRegistration" class="form__title">Registration</h5>
  <div class="form__item">
    <label data-i18="regName" class="form__label text form-label" for="name">Name</label>
    <input class="form__input form-control" id="name" type="text" required>
    <div data-i18="regFormValidName" class="invalid-feedback form__feedback">
      Name is required
    </div>
    <div data-i18="regFormValidPass" class="valid-feedback form__feedback">
      Looks good!
    </div>
  </div>
  <div class="form__item">
    <label data-i18="regEmail" class="form__label text form-label" for="email">Email</label>
    <input class="form__input form-control" id="email" type="email" placeholder="name@example.com" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" required>
    <div data-i18="regFormValidEmail" class="invalid-feedback form__feedback">
      Please input valid email
    </div>
    <div data-i18="regFormValidPass" class="valid-feedback form__feedback">
      Looks good!
    </div>
  </div>
  <div class="form__item">
    <label data-i18="regPassword" class="form__label text form-label" for="password">Password</label>
    <input class="form__input form-control" id="password" type="password" required>
    <div data-i18="regFormValidPassword" class="invalid-feedback form__feedback">
      Please enter a password
    </div>
    <div data-i18="regFormValidPass" class="valid-feedback form__feedback">
      Looks good!
    </div>
  </div>
  <div class="form__buttons">
    <button data-i18="btnRegistration" class="form__button btn sbmt-btn" type="submit">Sign up</button>
    <span data-i18="btnIncognito" class="form__button btn">Travel incognito</span>
  </div>
  <a class="form__github" href="#">
    <span data-i18="regGit" class="form__github-text">Log in with</span>
  </a>
  `
}

//TODO change header if login
function showLogOutMessage(): string {
  return `
  <div class="logout__body">
    <p data-i18="regLogOut" class="logout__text">Are you sure you want to log out?</p>
    <button data-i18="btnLogOut" class="logout__button form__button btn">Log out</button>
  </div>
  `
}

//if registration was successful 
function showWelcomeMessage(signUp: boolean): string {
  //TODO 'Name' comes from localStorage / guthub / maybe backend
  let userName = signUp ? 'Stranger' : 'Name';

  return `
    <div class="registration__welcome welcome">
      <h5 class="welcome__title"><span data-i18="regWelcomeTitle">Welcome</span> <span data-i18="regWelcomeTitleName">${userName}</span></h5>
      <div class="welcome__body">
        <p data-i18="regWelcomeText" class="welcome__text">We are happy to have you on board</p>
        <img class="welcome__image" src="../../assets/images/registration/planet.png">
      </div>
      
    </div>
  `
}

//регистрация через гитхаб https://vk.com/@webcreature-avtorizaciya-na-saite-cherez-github