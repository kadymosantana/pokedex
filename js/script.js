const form = document.querySelector("form");
const input = document.querySelector('[type="text"]');
const buttonSubmit = document.querySelector('[type="submit"]');
const feedbackError = document.querySelector(".error");
const buttonPrev = document.querySelector('.prev')
const buttonNext = document.querySelector('.next')

const pokemonIMG = document.querySelector("img");
const pokemonName = document.querySelector(".pokemon-name");
const pokemonID = document.querySelector(".pokemon-id");

let searchPokemon = 1

form.addEventListener("submit", (e) => {
  e.preventDefault();
  formSubmit(input.value.toLowerCase());
});

async function formSubmit(pokemon) {

  try {

    feedbackError.style.opacity = "0";
    const resp = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemon}`
    );
    const respData = await resp.json();
    renderDate();

    function renderDate() {
      searchPokemon = respData.id

      pokemonIMG.src =
        respData["sprites"]["versions"]["generation-v"]["black-white"][
          "animated"
        ]["front_default"];

      pokemonID.innerText = `#${respData.id}`;
      pokemonName.innerText = respData.name;

      input.value = "";
    }
    
  } catch {
    feedbackError.style.opacity = "1";
  }
}

buttonPrev.addEventListener('click', () => {
  
  if(searchPokemon > 1) {
  searchPokemon -= 1
  formSubmit(searchPokemon)
  }
})

buttonNext.addEventListener('click', () => {
  searchPokemon += 1
  formSubmit(searchPokemon)
})

formSubmit(searchPokemon);
