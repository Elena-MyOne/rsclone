export function generateError404Page(): HTMLElement {
  const errorBlock = document.createElement('section');
  errorBlock.classList.add('error-page', 'container');
  errorBlock.innerHTML =
    `
      <div class="error-page__body">
        <h1 class="error-page__title">404</h1>
        <p data-i18="errorText" class="error-page__text">Page not found</p>
        <p class="error-page__text">
          <a data-i18="errorLink" href="#home" class="error-page__link">Go back to Home page</a>
        </p>
      </div>
    `;
  return errorBlock;
}