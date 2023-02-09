// import { addCountriesButtons } from "./home";

export function handlers() {
  const countryButtons = document.querySelector(".button_container") as HTMLElement;
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
}