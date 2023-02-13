export function generateHelpPage(): HTMLElement {
  const helpBlock = document.createElement('section');
  helpBlock.className = 'help container';
  helpBlock.innerHTML = `  
  <h1 class="help__title" data-i18="helpTitle">Welcome to app Amazing Trip!</h1>
  <p data-i18="helpAdvice">We recommend that you go through the registration, consisting of the "Sign up" on the top bar. So the progress of our journey will be saved and you can participate in discussion with other users.</p>
  <div class="accordion" id="accordionExample">
    <div class="accordion-item">
      <h2 class="accordion-header" id="headingOne">
        <button data-i18="helpStart" class="accordion-button help__btn" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
          Start page
        </button>
      </h2>
      <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
        <div data-i18="helpStartText" class="accordion-body">
        Here you can see the beauty and perfection of our planet. Rotate it as you like, zoom in and out. Don't worry, it's not dangerous and has no effect on the real planet 😉 To start the journey, press the Enter key.
        </div>
      </div>
    </div>
    <div class="accordion-item">
      <h2 class="accordion-header" id="headingTwo">
        <button data-i18="helpMain" class="accordion-button help__btn collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
          Home
        </button>
      </h2>
      <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
        <div data-i18="helpMainText" class="accordion-body">
        Rotate the planet by holding the left mouse button. Choose the country you want to go to and click on it. You will see brief information about the country, to visit it, click the “Visit” button. Also on the Home page you can change the time of day (not really 😉) and change the interface language.
        </div>
      </div>
    </div>
    <div class="accordion-item">
      <h2 class="accordion-header" id="headingThree">
        <button data-i18="helpCountry" class="accordion-button help__btn collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
          Country page
        </button>
      </h2>
      <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
        <div data-i18="helpCountryText" class="accordion-body">
        Here are collected all the most important and beautiful about countries! You can enjoy stunning views in the gallery, and find out about the country's interesting places. Be sure you remember the national symbol (you will need it later). Also here you can learn a few phrases in the official language! And do not forget to leave a comment about the country (only for registered users).
        </div>
      </div>
    </div>
    <div class="accordion-item">
      <h2 class="accordion-header" id="headingFive">
        <button data-i18="helpTest" class="accordion-button help__btn collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
          Test
        </button>
      </h2>
      <div id="collapseFive" class="accordion-collapse collapse" aria-labelledby="headingFive" data-bs-parent="#accordionExample">
        <div data-i18="helpTestText" class="accordion-body">
        This is a very simple test, take it and find out how good is your memory. After you pass it, you can see the percentage bar, both in your profile and progress page, that will display how deep are your knowledge.
        </div>
      </div>
    </div>
    <div class="accordion-item">
      <h2 class="accordion-header" id="headingSix">
        <button data-i18="helpProfile" class="accordion-button help__btn collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseSix" aria-expanded="false" aria-controls="collapseSix">
          Profile
        </button>
      </h2>
      <div id="collapseSix" class="accordion-collapse collapse" aria-labelledby="headingSix" data-bs-parent="#accordionExample">
        <div data-i18="helpProfileText" class="accordion-body">
        Everything is simple here. There is your avatar (if you chose one), your name (if you wrote one), and your travel progress (if you “traveled” somewhere). Here you will see a complete country's list, opposite the visited country there is a button “Test” (be sure to click it!). If you haven't visited any of the countries yet, you can go there by clicking on the name of the country. However, already visited countries are also available for visiting again, you can click on them 🙂 You can change the time of day and interface language.
        </div>
      </div>
    </div>
  </div>
  <h3 data-i18="helpWish" class="wish">Have a nice trip!</h3>
      <div  class="creators">
        <p data-i18="helpCreators">Cats worked on this app</p>
        <a class="tooltips" href="https://github.com/AlexKabanau" target="_blank"> <img class="creators__link" src="./assets/icons/github_logo_black.svg" alt="github logo"><span class="tooltiptext">AlexKabanau</span></a>
        <a class="tooltips" href="https://github.com/Elena-MyOne" target="_blank"><img class="creators__link" title="Elena-MyOne" src="./assets/icons/github_logo_black.svg" alt="github logo"><span class="tooltiptext">Elena-MyOne</span></a>
        <a class="tooltips" href="https://github.com/shipu4ka" target="_blank"><img class="creators__link " title="shipu4ka" src="./assets/icons/github_logo_black.svg" alt="github logo"><span class="tooltiptext">shipu4ka</span></a>
      </div>
      <div class="rsschool">
        <span data-i18="helpSchool">Has gathered everyone together:</span>
        <a href="https://rs.school/js/"><img class="rsschool__link" src="./assets/icons/rs_logo_white.svg" alt="RSSchool logo"></a>
      </div>
      </div>`;
  return helpBlock;
}