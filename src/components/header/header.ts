export function generateHeader(): string {
  return `
      <nav class="header__nav navbar navbar-expand-lg">
        <div class="header__container container">
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
              <button type="button" class="btn-close btn-close" data-bs-dismiss="offcanvas" aria-label="Close">
              </button>
            </div>
            <div class="offcanvas-body">
              <ul class="navbar-nav">
                <li class="nav-item">
                  <a data-i18="btnHome" class="nav-link active" aria-current="page" href="#home">Home</a>
                </li>
                <li class="nav-item">
                  <a data-i18="btnSignUp" class="nav-link" href="#registration">Sign up</a>
                </li>
                <li class="nav-item">
                  <a data-i18="btnLogIn" class="nav-link" href="#profile">Log in</a>
                </li>
                <li class="nav-item">
                  <a data-i18="btnHelp" class="nav-link" href="#help">Help</a>
                </li>
              </ul>
            <div>
          </div>
        </div>
      </nav>
  `
}