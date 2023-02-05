export function generateHeader(): string {
  return `
      <header class="header">
      <nav class="header__nav navbar navbar-expand-lg navbar-dark" data-bs-theme="dark">
        <div class="header__container container">
          <a class="header__logo navbar-brand" href="#home">Amazing Trip</a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item">
                <a data-18i="btnHome" class="nav-link active" aria-current="page" href="#home">Home</a>
              </li>
              <li class="nav-item">
                <a data-18i="btnSignUp" class="nav-link" href="#">Sign up</a>
              </li>
              <li class="nav-item">
                <a data-18i="btnLogIn" class="nav-link" href="#profile">Log in</a>
              </li>
              <li class="nav-item">
                <a data-18i="btnHelp" class="nav-link" href="#help">Help</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  `
}