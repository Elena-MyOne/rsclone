import { getCountriesNames } from "../../api/requests";
import { handlers } from "./home-page-handlers";

export function generateHomePage() {

  //get coutries
  let lang = localStorage.getItem("language") || "en"
  addCountriesButtons(lang);
 
  const root = document.querySelector('.root') as HTMLElement;
  root.classList.add('main_home-page');
  // root.dataset.dsTheme = 'dark';
  const content = document.createElement("div");
  // content.className = "position-relative";
  content.innerHTML = `
  <canvas class="home-page"></canvas>
  <div class="container py-2 text-center">
    <div class="home-page__container container">
      <div class="row">
        <div class="col-2 country-buttons_container">
        </div>
        <div class="col-7">
          <h4 class="home-page__title py-2 display-3 fst-italic fw-semibold" data-i18="titleChoice">
            Choose the country
          </h4>
        </div>
        <div class="col-2 select_container">
          <select class="form-select lang_select" aria-label="Default select example">
            <option value="EN">EN</option>
            <option value="RU">RU</option>
            <option value="BE">BE</option>
          </select>
        </div>
        <div class="col-1 theme_container">
          <button type="button" class="button theme-button" id="themeSwitch">
          </button>
        </div>
      </div>
    </div>
  </div>
  `;
  //add handlers
  // document.body.scrollHeight = document.body.clientHeight

  return content;
}

const getString = (el:HTMLElement) => el.outerHTML;
export const addCountriesButtons = (lang: string) => {
  getCountriesNames(lang).then((res) => {
    const div: HTMLElement = document.createElement("div");
    div.className = "d-grid gap-2";
    div.role = "group";
    div.ariaLabel = "Vertical button group";
    let prop: keyof typeof res
    for (prop in res) {
      // console.log(`db.${prop} = ${db[prop]}`);
      const button: HTMLButtonElement = document.createElement("button");
      button.type = "button";
      button.className = "btn btn-info";
      button.innerText = res[prop];
      div.append(button);
    }
    // console.log(div)
    const column = document.querySelector('.country-buttons_container') as HTMLElement;
    column.innerHTML = `${getString(div)}`;

    handlers();
  });
}
