import { AxiosResponse } from "axios";
import { getCountry } from "../../api/requests";
import { Country, QuizInfoInputs, QuizInfoCheckboxes } from "../../models/interfaces";

export function generateQuiz(countryName: string): HTMLElement {
  const quizBlock = document.createElement('section');
  quizBlock.classList.add('quiz');
  const quizBody = document.createElement('div');
  quizBody.classList.add('quiz__body');

  const quizForm = document.createElement('form') as HTMLFormElement;
  quizForm.classList.add('quiz__form', 'row', 'g-4', 'needs-validation');
  quizForm.setAttribute('novalidate', '');

  const country = getCountryName(countryName);

  quizForm.innerHTML = `
  <button type="button" class="btn-close quiz__close" aria-label="Close"></button>
    <h4 data-i18="progress${country}" class="quiz__title"></h4>
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

  quizBlock.addEventListener('click', (e: Event) => {
    const target = e.target as HTMLElement;
    const profileWrapperQuiz = document.querySelector('.profile__wrapper-quiz')
      if (target.classList.contains('quiz__close')) {
        if (profileWrapperQuiz) {
          profileWrapperQuiz.classList.remove('profile__wrapper-quiz_active');
        }
      }
  })

  quizForm.addEventListener('submit', event => {
    event.preventDefault();
    if (!quizForm.checkValidity()) {
      event.stopPropagation()
    } else {
      checkAnswers(countryName, quizForm, quizBody)
    }
    quizForm.classList.add('was-validated')
  }, false)

  return quizBlock;
}

function getCountryName(countryName: string): string {
  let result: string;
  switch(countryName) {
    case '1':
      result = 'Australia'
      break
    case '2':
      result = 'Brazil'
      break
    case '3':
      result = 'China'
      break
    case '4':
      result = 'Russia'
      break
    default: 
    result = 'Usa'
  }
  return result;
}

function checkAnswers(countryName: string, quizForm: HTMLFormElement, quizBlock: HTMLElement) {
  const answersRadio = checkAnswersRadio(countryName, quizForm, quizBlock);
  checkAnswersInputs(countryName, quizForm).then((res) => {
    const result = answersRadio + res;
    if (result) {
      quizBlock.innerHTML = showWinMessage(result);
    }
  })
}

function checkAnswersInputs(countryName: string, quizForm: HTMLFormElement): Promise<number> {
  let lang = localStorage.getItem('language') || 'en';
  const countryId = Number(countryName);

  const { capital, language } = quizForm.elements as typeof quizForm.elements & {
    capital: HTMLInputElement;
    language: HTMLInputElement;
  };

  const formValues: QuizInfoInputs = {
    capital: capital.value.toLocaleLowerCase(),
    language: language.value.toLocaleLowerCase(),
  }

  const countryData = getCountry(countryId, lang).then((res: AxiosResponse<Country>) => {
    const {capital, language} = res.data;
    const questionsNumber = 4;
    const correctAnswers = (100 / questionsNumber);
    const wrongAnswers = 0;

    const capitalValue = (formValues.capital === capital.toLocaleLowerCase()) ? correctAnswers : wrongAnswers;
    const languageValue = (formValues.language === language.toLocaleLowerCase()) ? correctAnswers : wrongAnswers;

    return capitalValue + languageValue
  })

  return countryData
}

function checkAnswersRadio(countryName: string, quizForm: HTMLFormElement, quizBody: HTMLElement): number {
  const questionsNumber = 4;
    const correctAnswers = (100 / questionsNumber);
    const wrongAnswers = 0;

  const { flag, symbol} = quizForm.elements as typeof quizForm.elements & {
    flag: HTMLInputElement;
    symbol: HTMLInputElement;
  };

  const formValues: QuizInfoCheckboxes = {
    flag: flag.value,
    symbol: symbol.value,
  }

  const flagValue = (formValues.flag === countryName) ? correctAnswers : wrongAnswers;
  const symbolValue = (formValues.symbol === countryName) ? correctAnswers : wrongAnswers;
  return flagValue + symbolValue
}

function showWinMessage(result: number): string {
  const numberAvatar = localStorage.getItem('userAvatar') || '7';
  localStorage.setItem('quizResult', String(result))
  
  return `
    <div class="quiz__win">
    <button type="button" class="btn-close quiz__close quiz__close-results" aria-label="Close"></button>
      <p class="quiz__photo photo">
        <img class="quiz__photo-image photo__img" src="./assets/images/avatars/avatar${numberAvatar}.jpg" alt="Avatar">
      </p>
      <h5 class="quiz__title">Results: ${result}%</h5>
    </div>
  `
}