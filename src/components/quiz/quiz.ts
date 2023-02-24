import { AxiosResponse } from "axios";
import { getCountry } from "../../api/requests";
import { Country, QuizInfoInputs, QuizInfoCheckboxes } from "../../models/interfaces";
import { translation } from "../../pages/country/country";
import { quizAnimals, quizFlags } from "./qiuz-images";

export function generateQuiz(countryName: string): HTMLElement {
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
          <div class="form-check">
            <input class="form-check-input" type="radio" id="flag-four" type="radio" name="flag" value="4">
            <label class="form-check-label quiz__label-flag quiz__label-flag-four" for="flag-four"></label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="radio" id="flag-five" type="radio" name="flag" value="5">
            <label class="form-check-label quiz__label-flag quiz__label-flag-five" for="flag-five"></label>
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
          <div class="form-check">
            <input class="form-check-input" type="radio" id="symbol-four" type="radio" name="symbol" value="4">
            <label class="form-check-label quiz__label-symbol quiz__label-symbol-four" for="symbol-four"></label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="radio" id="symbol-five" type="radio" name="symbol" value="5">
            <label class="form-check-label quiz__label-symbol quiz__label-symbol-five" for="symbol-five"></label>
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
    event.preventDefault();
    if (!quizForm.checkValidity()) {
      event.stopPropagation()
    } else {
      checkAnswers(countryName, quizForm)
    }

    quizForm.classList.add('was-validated')
  }, false)

  return quizBlock;
}

function checkAnswers(countryName: string, quizForm: HTMLFormElement) {
  const answersRadio = checkAnswersRadio(countryName, quizForm);
  console.log('answersRadio', answersRadio);

  checkAnswersInputs(countryName, quizForm).then((res) => {
    // console.log(res);
    if (res && answersRadio) {
      showWinMessage();
    } else {
      showFailureMessage();
    }
  })
}

function checkAnswersInputs(countryName: string, quizForm: HTMLFormElement): Promise<boolean> {
  let lang = localStorage.getItem('language') || 'en';
  const countryId = Number(countryName);
  // console.log(countryId);

  const { country, capital, language } = quizForm.elements as typeof quizForm.elements & {
    country: HTMLInputElement;
    capital: HTMLInputElement;
    language: HTMLInputElement;
  };

  const formValues: QuizInfoInputs = {
    country: country.value.toLocaleLowerCase(),
    capital: capital.value.toLocaleLowerCase(),
    language: language.value.toLocaleLowerCase(),
  }

  // console.log(formValues);

  const countryData = getCountry(countryId, lang).then((res: AxiosResponse<Country>) => {
    const { name, capital, language} = res.data;

    // console.log(name, capital, language);

    if (formValues.country === name.toLocaleLowerCase() 
      && formValues.capital === capital.toLocaleLowerCase()
      && formValues.language === language.toLocaleLowerCase()) {
        // console.log('OK');
        return true
    } else {
      return false
    }
  })

  return countryData
}

function checkAnswersRadio(countryName: string, quizForm: HTMLFormElement): boolean {
  const { flag, symbol} = quizForm.elements as typeof quizForm.elements & {
    flag: HTMLInputElement;
    symbol: HTMLInputElement;
  };

  const formValues: QuizInfoCheckboxes = {
    flag: flag.value,
    symbol: symbol.value,
  }

  if (formValues.flag === countryName && formValues.symbol === countryName) {
    // console.log('OK');
    return true
  }

  // console.log(formValues);
  return false
}

function showWinMessage() {
  console.log('Win');
  //TODO показывать попап если все ок
}

function showFailureMessage() {
  console.log('Lost');
  //TODO показывать попап если все плохо
}