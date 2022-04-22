const url_root_pokeAPI = "https://pokeapi.co/api/v2/pokemon/";

const btnAddPokemon = document.getElementById("btnAddPokemon");
const pokemonContainer = document.getElementById("pokemonContainer");
const pokemon = document.getElementsByClassName("column-pokemon");

const searchPokemon = (valueInput) => {
  if (valueInput.length > 0) {
    return fetch(`${url_root_pokeAPI}${valueInput.toLowerCase()}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .catch((e) => {
        Swal.showValidationMessage(
          `Ha ocurrido un error: No se encontró Pokemon `
        );
      });
  } else {
    return Swal.showValidationMessage(`Ingrese el nombre del pokemon`);
  }
};

const handledAddPokemon = () => {
  Swal.fire({
    title: "Nuevo Pokemon",
    text: "Ingresá un Pokemon",
    input: "text",
    confirmButtonText: "OK",
    showLoaderOnConfirm: true,
    showCloseButton: true,
    allowOutsideClick: false,
    preConfirm: (valueInput) => searchPokemon(valueInput),
  }).then((result) => {
    if (result.isConfirmed) {
      const { id, name, sprites, types } = result?.value;
      createPokemon(id, name, sprites?.front_default, types[0]?.type.name);
    }
  });
};

const createPokemon = (id = "", name = "", img = "", type = "") => {
  const pokemon = document.createElement("div");
  const { typeSpanish, color } = getColorAndTypePokemon(type);
  pokemon.className = "col-3 pokemon";
  pokemon.innerHTML = ` <div class="card-pokemon ${color}" id=${id}>
  <img src=${img} alt="pokemon" class="card-img">
  <div class="card-name">${capitalizeFirstLetter(name)}</div>
  <div class="card-type">${typeSpanish}</div>
  </div>`;
  pokemonContainer.appendChild(pokemon);
};

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const getColorAndTypePokemon = (typePokemon) => {
  switch (typePokemon) {
    case "electric":
      return { typeSpanish: "Electrico", color: "color-electric" };
    case "poison":
      return { typeSpanish: "Venenoso", color: "color-poison" };
    case "fire":
      return { typeSpanish: "Fuego", color: "color-fire" };
    case "water":
      return { typeSpanish: "Agua", color: "color-water" };
    case "grass":
      return { typeSpanish: "Planta", color: "color-grass" };
    case "normal":
      return { typeSpanish: "Normal", color: "color-normal" };
    case "ground":
      return { typeSpanish: "Tierra", color: "color-ground" };
    case "bug":
      return { typeSpanish: "Insecto", color: "color-bug" };
    default:
      return { typeSpanish: "Otro", color: "color-default" };
  }
};

btnAddPokemon.addEventListener("click", handledAddPokemon);
