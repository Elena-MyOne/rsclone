import { getCountriesNames } from "../../api/requests";

export function generateHomePage() {
  //get coutries
  const names = getCountriesNames('en');
  console.log(names);
  // names.then((res) => console.log([...res]))
  names.then((res) => {
    console.log(res)
    const div: HTMLElement = document.createElement("div");
    div.className = "d-grid gap-2";
    div.role = "group";
    div.ariaLabel = "Vertical button group";
    let prop: keyof typeof res
    for (prop in res) {
      // console.log(`db.${prop} = ${db[prop]}`);
      const button: HTMLButtonElement = document.createElement("button");
      button.type = "button";
      button.className = "btn btn-primary";
      button.innerText = res[prop];
      div.append(button);
    }
    console.log(div)
  });

  // const db = {
  //   '1': 'Australia',
  //   '2': 'Brazil',
  //   '3': 'China',
  //   '4': 'Russia',
  //   '5': 'USA',
  // };
  
  const getString = (el:HTMLElement) => el.outerHTML;
  const content = document.createElement("div");
  // content.className = "position-relative";
  content.innerHTML = `
  <canvas class="home-page"></canvas>
  <div class="container py-2 text-center">
    <div class="home-page__container">
      <div class="row ">
        <div class="col-2">
          
        </div>
        <div class="col-7">
          <h4 class="home-page__title display-2 fw-semibold" data-18i="titleChoice">
            Choose the country
          </h4>
        </div>
        <div class="col-2">
          <select class="form-select" aria-label="Default select example">
            <option value="1" selected>EN</option>
            <option value="2">RU</option>
            <option value="3">BE</option>
          </select>
        </div>
        <div class="col-1">
          <button type="button" class="button theme-button">
            <img src="./assets/icons/light_theme_white.svg" alt="help">
          </button>
        </div>
      </div>
    </div>
  </div>
  `;
  //add handlers

  return content;

  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  // const db = {
  //   '1': 'Australia',
  //   '2': 'Brazil',
  //   '3': 'China',
  //   '4': 'Russia',
  //   '5': 'USA',
  // };
  // const div: HTMLElement = document.createElement("div");
  // div.className = "d-grid gap-2";
  // div.role = "group";
  // div.ariaLabel = "Vertical button group";
  // let prop: keyof typeof db
  // for (prop in db) {
  //   // console.log(`db.${prop} = ${db[prop]}`);
  //   const button: HTMLButtonElement = document.createElement("button");
  //   button.type = "button";
  //   button.className = "btn btn-primary";
  //   button.innerText = db[prop];
  //   div.append(button);
  // }
  // // console.log(ul);
  // const getString = (el:HTMLElement) => el.outerHTML;
  // return `
  // <div class="container">
  // <div class="row">
  //   <div class="col-md-3" style="background-color: #ff9999;">
  //     <h3>Left</h3>
  //     ${getString(div)}
  //   </div>
  //   <div class="col-md-7"  style="background-color: #ffccff;">Middle</div>
  //   <div class="col-md-2"  style="background-color: #00cc99;">right</div>
  // </div>
  // </div>
  // `
}