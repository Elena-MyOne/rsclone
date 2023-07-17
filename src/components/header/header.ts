export function generateHeader(): string {

  return `
      <nav class="header__nav navbar navbar-expand-lg navbar-dark">
        <div class="container-fluid container">
          <a class="header__logo navbar-brand" href="#home">Amazing Trip</a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#navbarNav"
            aria-controls="offcanvasDarkNavbar"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="offcanvas offcanvas-top" id="navbarNav">
            <div class="offcanvas-header">
              <a class="header__logo navbar-brand" href="#home">Amazing Trip</a>
              <button type="button" class="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close">
              </button>
            </div>
            <div class="offcanvas-body">
              <ul class="navbar-nav">
                <li class="nav-item">
                  <a data-i18="btnHome" class="nav-link active" aria-current="page" href="#home">Home</a>
                </li>
                <li class="nav-item nav-item-signup">
                  <a data-i18="btnSignUp" class="nav-link" href="#registration">Sign up</a>
                </li>
                <li class="nav-item nav-item-profile" hidden>
                  <a data-i18="btnProfile" class="nav-link" href="#profile">Profile</a>
                </li>
                <li class="nav-item nav-item-login">
                  <a data-i18="btnLogIn" class="nav-link" href="#login">Log in</a>
                </li>
                <li class="nav-item nav-item-logout" hidden>
                  <a data-i18="btnLogOut" class="nav-link" href="#login">Log out</a>
                </li>
                <li class="nav-item">
                  <a data-i18="btnHelp" class="nav-link" href="#help">Help</a>
                </li>
              </ul>
              <form class="header-form d-flex">
                <select class="form-select lang_select">
                  <option class="lang-option" value="EN">EN</option>
                  <option class="lang-option" value="BE">BE</option>
                  <option class="lang-option" value="RU">RU</option>
                </select>
                <button type="button" class="button theme-button" id="themeSwitch">
                  </button>
              </form>
            </div>
            
          </div>
        </div>
      </nav>
  `
}

export function changeHeaderOnSignUp(): void {
  const signUp = localStorage.getItem('signUp');
  let isSignUp = signUp ? JSON.parse(signUp) : false;

  const signup = document.querySelector('.nav-item-signup');
  const login = document.querySelector('.nav-item-login');
  const profile = document.querySelector('.nav-item-profile');
  const logout = document.querySelector('.nav-item-logout');

  if (signup && profile && login && logout) {
    if (isSignUp) {
      profile.removeAttribute('hidden');
      logout.removeAttribute('hidden');
      signup.setAttribute('hidden', '');
      login.setAttribute('hidden', '');
    } else {
      signup.removeAttribute('hidden');
      login.removeAttribute('hidden');
      profile.setAttribute('hidden', '');
      logout.setAttribute('hidden', '');
    }
  }
}