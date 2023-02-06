// import { generateHeader } from "../../components/header/header";

export function generateHomePage(): string {
  return `
  <canvas class="home-page"></canvas>
  <div class=" container py-5 text-center">
    <div class="col-md-1">
      <button type="button" class="button help-button">
        <img src="./assets/icons/light_theme_white.svg" alt="help">
      </button>
    </div>
    <div class="col-md-9">
      <h3 class="display-1 fw-semibold" data-18i="titleChoice">
        Choose the country
      </h3>
    </div>
    <div class="col-md-2">
      <select class="form-select" aria-label="Default select example">
        <option value="1" selected>EN</option>
        <option value="2">RU</option>
        <option value="3">BE</option>
      </select>
    </div>
  </div>
  `
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
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