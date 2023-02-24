import { translation } from "../../pages/country/country";
import { quizAnimals, quizFlags } from "./qiuz-images";

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
    <div class="form__item">
      <div class="row mb-3">
        <label data-i18="testCountry" class="col-sm-5 col-form-label text form-label" for="country">Country name</label>
        <div class="col-sm-8">
          <input class="form__input form-control" id="country" type="text" required>
          <div data-i18="testNameFeedback" class="invalid-feedback form__feedback">
            Please enter country name
          </div>
          <div data-i18="regFormValidPass" class="valid-feedback form__feedback">
            Looks good!
          </div>
        </div>
      </div>
    </div>
    <div class="form__item">
      <div class="row mb-3">
        <label data-i18="countryCapital" class="col-sm-5 col-form-label text form-label" for="capital">Capital</label>
        <div class="col-sm-8">
          <input class="form__input form-control" id="capital" type="text" required>
          <div data-i18="testCapitalFeedback" class="invalid-feedback form__feedback">
            Please enter country capital
          </div>
          <div data-i18="regFormValidPass" class="valid-feedback form__feedback">
            Looks good!
          </div>
        </div>
      </div>
    </div>
    <div class="form__item">
      <fieldset class="row mb-3">
        <legend data-i18="testFlag" class="col-form-label col-sm-5 pt-0 text">Country flag</legend>
        <div class="col-sm-8 quiz__item">
          <div class="form-check">
            <input class="form-check-input" type="radio" id="flag-one" type="radio" name="flag" value="1" checked>
            <label class="form-check-label quiz__label-flag quiz__label-flag-one" for="flag-one"></label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="radio" id="flag-two" type="radio" name="flag" value="2">
            <label class="form-check-label quiz__label-flag quiz__label-flag-two" for="flag-two"></label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="radio" id="flag-three" type="radio" name="flag" value="3">
            <label class="form-check-label quiz__label-flag quiz__label-flag-three" for="flag-three"></label>
          </div>
        </div>
      </fieldset>
    </div>
    <div class="form__item">
      <fieldset class="row mb-3">
        <legend data-i18="countryAnimal" class="col-form-label col-sm-5 pt-0 text">National symbol</legend>
        <div class="col-sm-8 quiz__item">
          <div class="form-check">
            <input class="form-check-input" type="radio" id="symbol-one" type="radio" name="symbol" value="1" checked>
            <label class="form-check-label quiz__label-symbol quiz__label-symbol-one" for="symbol-one"></label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="radio" id="symbol-two" type="radio" name="symbol" value="2">
            <label class="form-check-label quiz__label-symbol quiz__label-symbol-two" for="symbol-two"></label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="radio" id="symbol-three" type="radio" name="symbol" value="3">
            <label class="form-check-label quiz__label-symbol quiz__label-symbol-three" for="symbol-three"></label>
          </div>
        </div>
      </fieldset>
    </div>

    <div class="form__item">
      <div class="row mb-3">
        <label data-i18="countryLanguage" class="col-sm-5 col-form-label text form-label" for="language">Official language</label>
        <div class="col-sm-8">
          <input class="form__input form-control" id="language" type="text" required>
          <div data-i18="testLanguageFeedback" class="invalid-feedback form__feedback">
            Please enter language
          </div>
          <div data-i18="regFormValidPass" class="valid-feedback form__feedback">
            Looks good!
          </div>
        </div>
      </div>
    </div>

    <div class="quiz__buttons">
      <button data-i18="btnCheck" class="form__button btn" type="submit">Check</button>
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
