import { sceneInitHomePage } from "../../components/canvas/SceneInit";


export function handlers() {
  const countryButtons = document.querySelector(".country-buttons_container") as HTMLElement;
  // console.log(countryButtons);
  countryButtons.addEventListener('click', (event) => {
    const target = event.target as HTMLElement;
    // console.log(target)
    const countryButton = target.closest(".btn");
    if (countryButton) {
      //popUp
      alert(countryButton.innerHTML)
    }
  })

  const langSelect = document.querySelector(".lang_select") as HTMLSelectElement;
  // console.log(langSelect)
  langSelect.addEventListener('change', () => {
    console.log(langSelect.value)
    localStorage.setItem("language", langSelect.value.toLowerCase())
    const lang = localStorage.getItem("language") as string
    console.log(lang)
  })

    /*!
  * Dark Mode Switch v1.0.1 (https://github.com/coliff/dark-mode-switch)
  * Copyright 2021 C.Oliff
  * Licensed under MIT (https://github.com/coliff/dark-mode-switch/blob/main/LICENSE)
  */

  const themeSwitch = document.getElementById("themeSwitch") as HTMLInputElement;
    if (themeSwitch) {
      initTheme();
      themeSwitch.addEventListener("change", function () {
        resetTheme();
        sceneInitHomePage();
        changeIcon();
      });
    }
  ;

  /**
   * Summary: function that adds or removes the attribute 'data-theme' depending if
   * the switch is 'on' or 'off'.
   *
   * Description: initTheme is a function that uses localStorage from JavaScript DOM,
   * to store the value of the HTML switch. If the switch was already switched to
   * 'on' it will set an HTML attribute to the body named: 'data-theme' to a 'dark'
   * value. If it is the first time opening the page, or if the switch was off the
   * 'data-theme' attribute will not be set.
   * @return {void}
   */
  function initTheme() {
    const darkThemeSelected =
      localStorage.getItem("theme") !== null &&
      localStorage.getItem("theme") === "dark";
      themeSwitch.checked = darkThemeSelected;
      darkThemeSelected
      ? document.documentElement.setAttribute("data-bs-theme", "dark")
      : document.documentElement.setAttribute("data-bs-theme", "light");
  }

  /**
   * Summary: resetTheme checks if the switch is 'on' or 'off' and if it is toggled
   * on it will set the HTML attribute 'data-theme' to dark so the dark-theme CSS is
   * applied.
   * @return {void}
   */
  function resetTheme() {
    if (themeSwitch.checked) {
      document.documentElement.setAttribute("data-bs-theme", "dark");
      console.log(document.body)
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.setAttribute("data-bs-theme", "light");
      localStorage.setItem("theme", "light");;
    }
  }
  function changeIcon() {
    const icon = document.querySelector('.theme_icon') as HTMLImageElement;
    const theme = localStorage.getItem('theme') as string;
    if (theme === 'light') {
      icon.src = './assets/icons/light_theme_white.svg'
    }
    icon.src = './assets/icons/dark_theme_white_withStroke.svg'
  }
}