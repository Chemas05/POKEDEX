const pokeContent = document.getElementById('pokemonContent');
const pokeForm = document.getElementById('searchPokemon');
const generationshow = 1
const modalSearch = document.getElementById('pokemonContent')
const divGeneration = document.getElementById('textGen')


function showPokemonGen(generation) {
    const pokemonGen = {
        1: [1, 150],
    };

    const generacion = pokemonGen[generation] || pokemonGenDefault;
    return generacion;

}

const pokemonGeneration = showPokemonGen(generationshow)


/*cambiar de generacion*/

const arrowRight = document.getElementById('arrow-right').addEventListener('click', e => {

    if (generationshow < 4) {
        modalSearch.innerHTML = '';
        generationshow += 1
        pokemonGeneration = showPokemonGen(generationshow)
        divGeneration.innerHTML = 'Gen' + generationshow
        drawPokemon()
    }
})


const arrowleft = document.getElementById('arrow-left').addEventListener('click', e => {

    if (generationshow > 0) {
        modalSearch.innerHTML = '';
        generationshow -= 1
        pokemonGeneration = showPokemonGen(generationshow)
        divGeneration.innerHTML = 'Gen ' + generationshow
        drawPokemon()
        console.log(generationshow)
    }
})


const drawPokemon = async () => {
    for (let i = pokemonGeneration[0]; i <= pokemonGeneration[1]; i++) {
        await getPokemon(i);
    }
}

const getPokemon = async (name, modal) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${name}`;
    const rest = await fetch(url);
    const pokemon = await rest.json();
    createPokemon(pokemon, modal);
}

/*pintar card pokemon*/
const colors = {
    fire: '#FFA05D',
    grass: '#8FD594',
    electric: '#FFE43B',
    water: '#7E97C0',
    ground: '#CAAC4D',
    rock: '#90642D',
    poison: '#9D5B9B',
    bug: '#EAFD71',
    dragon: '#97b3e6',
    psychic: '#FF96B5',
    flying: '#CDCDCD',
    fighting: '#FF5D5D',
    normal: '#FFFFFF'
}

const main_types = Object.keys(colors)


function createPokemon(pokemon, modal) {
    const pokemonEl = document.createElement('div');

    pokemonEl.classList.add('pokemon');

    const pokemon_types = pokemon.types.map(type => type.type.name);
    const type = main_types.find(type => pokemon_types.indexOf(type) > -1);
    const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
    const color = colors[type];

    pokemonEl.style.backgroundColor = color;



    if (modal !== true) {
        const pokeInnerHTML = `
        <div class="img-container">
            <img src="https://pokeres.bastionbot.org/images/pokemon/${pokemon.id
            }.png" alt="${name}" />
        </div>
        <div class="info">
            <span class="number">#${pokemon.id
                .toString()
                .padStart(3, '0')}</span>
            <h3 class="name">${name}</h3>
            <small class="type">Tipo: <span>${type}</span></small>
        </div>
    `;
        pokemonEl.innerHTML = pokeInnerHTML;
        pokeContent.appendChild(pokemonEl);
    }

    else {
        const pokeInnerHTML = `
        <div class="modal" id="modalPokemon">
        <div class="pokemon">
        <div class="img-container">
            <img src="https://pokeres.bastionbot.org/images/pokemon/${pokemon.id
            }.png" alt="${name}" />
        </div>
        <div class="info">
            <span class="number">#${pokemon.id
                .toString()
                .padStart(3, '0')}</span>
            <h3 class="name">${name}</h3>
            <small class="type">Tipo: <span>${type}</span></small>
        </div>
        </div>
    
    </div>`;


        modalSearch.innerHTML = pokeInnerHTML;

    }
}

drawPokemon()


/*Buscar pokemon*/

pokeForm.addEventListener('submit', e => {
    e.preventDefault();
    let searchPokemon = document.getElementById('pokemon').value;
    getPokemon(searchPokemon, true);
})

function exitModal() {
    const modalPokemon = document.getElementById('modalPokemon');
    modalPokemon.style.display = 'none'
    drawPokemon()
}


getPokemon();