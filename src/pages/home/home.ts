import { getCountriesNames } from "../../api/requests";
import { buttonHandlers } from "./home-page-handlers";

export function generateHomePage() {

  

  const root = document.querySelector('.root') as HTMLElement;
  root.classList.add('main_home-page');
  const content = document.createElement("div");
  content.className = 'home-page';

  content.innerHTML = `
  <canvas class="home-page"></canvas>
  <div class="container py-2 text-center">
      <div class="home-page__container row container">
        <div class="col-2 country-buttons_container position-relative">
        </div>
        <div class="col-10">
          <h4 class="home-page__title py-2 display-3 fst-italic fw-semibold" data-i18="titleChoice">
            Choose the country
          </h4>
        </div>
        
      </div>
    
  </div>
  `;
//get coutries
  const lang = localStorage.getItem("language") || "en"
  addCountriesButtons(lang);
  
  return content;
}

const getString = (el:HTMLElement) => el.outerHTML;

export const addCountriesButtons = (lang: string) => {
  getCountriesNames(lang).then((res) => {
    // console.log(res);
    const div: HTMLElement = document.createElement("div");
    div.className = "d-grid gap-2 position-absolute";
    div.role = "group";
    div.ariaLabel = "Vertical button group";
    // let prop: keyof typeof res
    // for (prop in res) {
    for (let i= 0; i < res.data.length; i++) {
      const button: HTMLButtonElement = document.createElement("button");
      button.type = "button";
      button.className = "btn btn-info";
      button.innerText = res.data[i];
      button.id = `${i + 1}`
      div.append(button);
    }
    // console.log(div)
    const column = document.querySelector('.country-buttons_container') as HTMLElement;
    column.innerHTML = ``;
    column.innerHTML = `${getString(div)}`;

    buttonHandlers();
  });
}
