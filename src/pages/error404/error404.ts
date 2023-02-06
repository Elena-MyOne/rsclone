export function generateError404Page(): string {
  return `
    <section class="error-page container">
      <div class="error-page__body">
        <h1 class="error-page__title">404</h1>
        <p data-i18="errorText" class="error-page__text">Page not found</p>
        <p class="error-page__text">
          <a data-i18="errorLink" href="#home" class="error-page__link">Go back to Home page</a>
        </p>
      </div>
    </section>
  `
}