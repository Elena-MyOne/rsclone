export function generateQuiz(): HTMLElement {
  const quizBlock = document.createElement('section');
  quizBlock.classList.add('quiz');
  const quizBody = document.createElement('div');
  quizBody.classList.add('quiz__body');

  const quizForm = document.createElement('form') as HTMLFormElement;
  quizForm.classList.add('quiz__form', 'row', 'g-4', 'needs-validation');
  quizForm.setAttribute('novalidate', '');

  quizForm.innerHTML = `
  <button type="button" class="btn-close quiz__close" aria-label="Close"></button>
    <h4 data-i18="titleTest" class="quiz__title">Country Quiz</h4>
      <div class="quiz__item">
      <label data-i18="testCountry" class="quiz__label text form-label" for="country">Country name</label>
      <input class="quiz__input form-control" id="country" type="text" required>
      <div class="invalid-feedback quiz__feedback">
        Please enter country name
      </div>
      <div class="valid-feedback quiz__feedback">
        Looks good!
      </div>
    </div>
    <div class="quiz__item">
      <label data-i18="countryCapital" class="quiz__label text form-label" for="capital">Capital</label>
      <input class="quiz__input form-control" id="capital" type="text" required>
      <div class="invalid-feedback quiz__feedback">
        Please enter country capital
      </div>
      <div class="valid-feedback quiz__feedback">
        Looks good!
      </div>
    </div>
    <div class="quiz__item">
      <span data-i18="testFlag" class="text">Choose country flag</span>
      <div class="quiz__flag form-check">
        <input class="quiz__radio form-check-input" id="flag-one" type="radio" name="flag">
        <label for="flag-one" class="quiz__label quiz__label-flag quiz__label-flag-one form-check-label"></label>
      </div>
      <div class="quiz__flag form-check">
        <input class="quiz__radio form-check-input" id="flag-two" type="radio" name="flag">
        <label for="flag-two" class="quiz__label quiz__label-flag quiz__label-flag-two"></label>
      </div>
      <div class="quiz__flag form-check">
        <input class="quiz__radio form-check-input" id="flag-three" type="radio" name="flag">
        <label for="flag-three" class="quiz__label quiz__label-flag quiz__label-flag-three"></label>
      </div>
    </div>
    <div class="quiz__item">
      <span data-i18="countryAnimal" class="text">National symbol</span>
      <span class="quiz__symbol">
        <input class="quiz__radio form-check-input" id="symbol-one" type="radio" name="symbol">
        <label for="symbol-one" class="quiz__label quiz__label-symbol quiz__label-symbol-one"></label>
      </span>
      <span class="quiz__symbol">
        <input class="quiz__radio form-check-input" id="symbol-two" type="radio" name="symbol">
        <label for="symbol-two" class="quiz__label quiz__label-symbol quiz__label-symbol-two"></label>
      </span>
      <span class="quiz__symbol">
        <input class="quiz__radio form-check-input" id="symbol-three" type="radio" name="symbol">
        <label for="symbol-three" class="quiz__label quiz__label-symbol quiz__label-symbol-three"></label>
      </span>
    </div>
    <div class="quiz__item">
      <label data-i18="countryLanguage" class="quiz__label text form-label" for="language">Official language</label>
      <input class="quiz__input form-control" id="language" type="text" required>
      <div class="invalid-feedback quiz__feedback">
        Please enter language
      </div>
      <div class="valid-feedback quiz__feedback">
        Looks good!
      </div>
    </div>
    <div class="quiz__buttons">
      <button data-i18="btnCheck" class="quiz__button btn" type="submit">Check</button>
    </div>
  `;

  quizBody.append(quizForm);
  quizBlock.append(quizBody);

  quizForm.addEventListener('submit', event => {
    if (!quizForm.checkValidity()) {
      event.preventDefault()
      event.stopPropagation()
    }

    quizForm.classList.add('was-validated')
  }, false)

  return quizBlock;
}
// TODO для перевода вставить функцию translation()
