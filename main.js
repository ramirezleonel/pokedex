const url_root_pokeAPI = "https://pokeapi.co/api/v2/pokemon/";

const btnAddPokemon = document.getElementById("btnAddPokemon");
const pokemonContainer = document.getElementById("pokemonContainer");
const pokemon = document.getElementsByClassName("column-pokemon");
const btnPrueba = document.getElementById("btnPrueba");

const handledPrueba = () => {};

const handledAddPokemon = () => {
  Swal.fire({
    title: "Nuevo Pokemon",
    text: "Ingresá un Pokemon",
    input: "text",
    confirmButtonText: "OK",
    showLoaderOnConfirm: true,
    showCloseButton: true,
    allowOutsideClick: false,
    preConfirm: (valueInput) => {
      return fetch(`${url_root_pokeAPI}${valueInput}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error(response.statusText);
          }
          return response.json();
        })
        .catch((error) => {
          Swal.showValidationMessage(
            `Ha ocurrido un error: No se encontró Pokemon `
          );
        });
    },
  }).then((result) => {
    if (result.isConfirmed) {
      const { id, name, sprites, types } = result?.value;
      console.log(types);
      createPokemon(id, name, sprites?.back_default,types[0].type.name);
    }
  });
};

btnAddPokemon.addEventListener("click", handledAddPokemon);
btnPrueba.addEventListener("click", handledPrueba);

const createPokemon = (id = "", name = "", img = "", type = "") => {
  const pokemon = document.createElement("div");
  pokemon.className = "col-3 pokemon";
  pokemon.innerHTML = ` <div class="card-pokemon" id=${id}>
  <img src=${img} alt="pokemon" class="card-img">
  <div class="card-name">${capitalizeFirstLetter(name)}</div>
  <div class="card-type">${translateNamePokemon(type)}</div>
  </div>`;
  pokemonContainer.appendChild(pokemon);
};

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const translateNamePokemon = (pokemon) => {
  switch (pokemon) {
    case "electric":
      return "Electrico";
    case "poison":
      return "Venenoso";
    default:
      return "Otro";
  }
};
