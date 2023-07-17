import { translation } from "../../pages/country/country";
import { addCountriesButtons } from "../../pages/home/home";
import { changeHeaderOnSignUp } from "./header";
import { ROUTER_PATH } from "../../constants/enums";
import { clickOnCountryButton } from "../../pages/home/home-page-handlers";
import { sceneInitHomePage } from "../canvas/SceneInit";




export function header_handlers() {
  const lang = localStorage.getItem('language') || 'EN'
  setSelected(lang);

  const langSelect = document.querySelector(".lang_select") as HTMLSelectElement;
  langSelect.addEventListener('change', () => {
    const currentLang = langSelect.value as string;
    localStorage.setItem("language", currentLang.toLowerCase())

    changeHeaderOnSignUp();
    changeActiveLink();
    location.reload();


    // if (window.location.hash.slice(1).split('/')[0] === ROUTER_PATH.HOME) {
    //   //remove eventListener
    //   const countryButtons = document.querySelector(".country-buttons_container") as HTMLElement;
    //   countryButtons.removeEventListener('click', clickOnCountryButton);

    // addCountriesButtons(currentLang.toLowerCase());
    // };
    

  })

  const themeSwitch = document.getElementById("themeSwitch") as HTMLButtonElement;
    initStorage();
    initTheme();
    initIcon();
    if (window.location.hash.slice(1).split('/')[0] === ROUTER_PATH.HOME) {
      sceneInitHomePage();
    };
    themeSwitch.addEventListener("click", function () {
      changeStorage();
      initTheme();
      initIcon();
      if (window.location.hash.slice(1).split('/')[0] === ROUTER_PATH.HOME) {
        sceneInitHomePage();
      };
      
    });
}


function initStorage() {
  if (!localStorage.getItem("theme")) {
    localStorage.setItem("theme", "light")
  }
}

function initTheme() {
  const darkThemeSelected =
    localStorage.getItem("theme") === "dark";
  // console.log(localStorage.getItem("theme"))
  darkThemeSelected
    ? document.documentElement.setAttribute("data-bs-theme", "dark")
    : document.documentElement.setAttribute("data-bs-theme", "light");
}

function initIcon() {
  const button = document.querySelector('.theme-button') as HTMLElement;
  button.innerHTML = '';

  const darkThemeSelected =
    localStorage.getItem("theme") === "dark";
    // console.log(localStorage.getItem("theme"))

  if (darkThemeSelected) {
    button.classList.add("darkMode")
    button.innerHTML = `<?xml version="1.0" encoding="utf-8"?>
    <svg width="40px" height="40px" viewBox="0 0 24 24" stroke="white" stroke-width="0.2" fill="black" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="5.09677" fill="black"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M12.9556 3.08065C12.9556 2.55286 12.5277 2.125 12 2.125C11.4722 2.125 11.0443 2.55286 11.0443 3.08065L11.0443 5.64078C11.3561 5.59432 11.6753 5.57024 12 5.57024C12.3247 5.57024 12.6438 5.59431 12.9556 5.64076L12.9556 3.08065ZM12.9556 18.3594C12.6438 18.4059 12.3247 18.4299 12 18.4299C11.6753 18.4299 11.3561 18.4058 11.0443 18.3594L11.0443 20.9194C11.0443 21.4471 11.4722 21.875 12 21.875C12.5277 21.875 12.9556 21.4471 12.9556 20.9194L12.9556 18.3594Z" fill=""/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M20.9194 12.9556C21.4471 12.9556 21.875 12.5277 21.875 12C21.875 11.4722 21.4471 11.0443 20.9194 11.0443L18.3592 11.0443C18.4057 11.3561 18.4298 11.6753 18.4298 12C18.4298 12.3247 18.4057 12.6438 18.3592 12.9556L20.9194 12.9556ZM5.6406 12.9556C5.59415 12.6438 5.57008 12.3247 5.57008 12C5.57008 11.6753 5.59416 11.3561 5.64062 11.0443L3.08064 11.0443C2.55286 11.0443 2.125 11.4722 2.125 12C2.125 12.5277 2.55286 12.9556 3.08064 12.9556L5.6406 12.9556Z" fill=""/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M18.9828 6.36876C19.356 5.99555 19.356 5.39047 18.9828 5.01727C18.6096 4.64407 18.0045 4.64407 17.6313 5.01727L15.8209 6.82764C16.0743 7.01528 16.3169 7.22391 16.5466 7.45354C16.7762 7.68315 16.9848 7.92581 17.1724 8.17912L18.9828 6.36876ZM8.17898 17.1725C7.92567 16.9849 7.68302 16.7763 7.45341 16.5467C7.22378 16.3171 7.01514 16.0744 6.82751 15.8211L5.01742 17.6311C4.64422 18.0043 4.64422 18.6094 5.01742 18.9826C5.39062 19.3558 5.9957 19.3558 6.36891 18.9826L8.17898 17.1725Z" fill=""/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M6.36888 5.01722C5.99568 4.64402 5.3906 4.64402 5.01739 5.01722C4.64419 5.39043 4.64419 5.99551 5.01739 6.36871L6.82776 8.17908C7.0154 7.92574 7.22403 7.68306 7.45366 7.45342C7.68327 7.22381 7.92593 7.0152 8.17924 6.82758L6.36888 5.01722ZM17.1727 15.821C16.9851 16.0743 16.7764 16.317 16.5468 16.5466C16.3172 16.7762 16.0745 16.9849 15.8212 17.1725L17.6313 18.9826C18.0045 19.3558 18.6095 19.3558 18.9828 18.9826C19.356 18.6094 19.356 18.0043 18.9828 17.6311L17.1727 15.821Z" fill=""/>
    </svg>`
  } else {
    button.classList.add("lightMode")
    button.innerHTML = `<?xml version="1.0" encoding="utf-8"?>
    <svg width="40px" height="40px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="5.09677" fill="#ffffff"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M12.9556 3.08065C12.9556 2.55286 12.5277 2.125 12 2.125C11.4722 2.125 11.0443 2.55286 11.0443 3.08065L11.0443 5.64078C11.3561 5.59432 11.6753 5.57024 12 5.57024C12.3247 5.57024 12.6438 5.59431 12.9556 5.64076L12.9556 3.08065ZM12.9556 18.3594C12.6438 18.4059 12.3247 18.4299 12 18.4299C11.6753 18.4299 11.3561 18.4058 11.0443 18.3594L11.0443 20.9194C11.0443 21.4471 11.4722 21.875 12 21.875C12.5277 21.875 12.9556 21.4471 12.9556 20.9194L12.9556 18.3594Z" fill="#ffffff"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M20.9194 12.9556C21.4471 12.9556 21.875 12.5277 21.875 12C21.875 11.4722 21.4471 11.0443 20.9194 11.0443L18.3592 11.0443C18.4057 11.3561 18.4298 11.6753 18.4298 12C18.4298 12.3247 18.4057 12.6438 18.3592 12.9556L20.9194 12.9556ZM5.6406 12.9556C5.59415 12.6438 5.57008 12.3247 5.57008 12C5.57008 11.6753 5.59416 11.3561 5.64062 11.0443L3.08064 11.0443C2.55286 11.0443 2.125 11.4722 2.125 12C2.125 12.5277 2.55286 12.9556 3.08064 12.9556L5.6406 12.9556Z" fill="#ffffff"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M18.9828 6.36876C19.356 5.99555 19.356 5.39047 18.9828 5.01727C18.6096 4.64407 18.0045 4.64407 17.6313 5.01727L15.8209 6.82764C16.0743 7.01528 16.3169 7.22391 16.5466 7.45354C16.7762 7.68315 16.9848 7.92581 17.1724 8.17912L18.9828 6.36876ZM8.17898 17.1725C7.92567 16.9849 7.68302 16.7763 7.45341 16.5467C7.22378 16.3171 7.01514 16.0744 6.82751 15.8211L5.01742 17.6311C4.64422 18.0043 4.64422 18.6094 5.01742 18.9826C5.39062 19.3558 5.9957 19.3558 6.36891 18.9826L8.17898 17.1725Z" fill="#ffffff"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M6.36888 5.01722C5.99568 4.64402 5.3906 4.64402 5.01739 5.01722C4.64419 5.39043 4.64419 5.99551 5.01739 6.36871L6.82776 8.17908C7.0154 7.92574 7.22403 7.68306 7.45366 7.45342C7.68327 7.22381 7.92593 7.0152 8.17924 6.82758L6.36888 5.01722ZM17.1727 15.821C16.9851 16.0743 16.7764 16.317 16.5468 16.5466C16.3172 16.7762 16.0745 16.9849 15.8212 17.1725L17.6313 18.9826C18.0045 19.3558 18.6095 19.3558 18.9828 18.9826C19.356 18.6094 19.356 18.0043 18.9828 17.6311L17.1727 15.821Z" fill="#ffffff"/>
    </svg>`
  }
}

function changeStorage() {
  const darkThemeSelected =
    localStorage.getItem("theme") === "dark";

  darkThemeSelected
    ? localStorage.setItem("theme", "light")
    : localStorage.setItem("theme", "dark");
}

function setSelected(lang: string) {
  ((document.querySelectorAll('.lang-option')) as NodeListOf<HTMLOptionElement>).forEach((element) => {
    if (element.innerHTML === lang.toUpperCase()) {
      element.selected = true;
    }
  });
}



export function changeActiveLink() {
  window.addEventListener('hashchange', () => {
    setActiveLink()
  });
  window.addEventListener('load', () => {
    setActiveLink()
  });
}

function setActiveLink() {
  const allNavLinks = document.querySelectorAll('.nav-link');
    if (allNavLinks) {
      Array.from(allNavLinks).forEach((item) => {
        item.classList.remove('active');
        item.removeAttribute('aria-current');
  
        const linkHash = item.getAttribute('href');
        if (location.hash === linkHash) {
          item.classList.add('active');
          item.setAttribute('aria-current', 'page');
        }
      })
    }
}