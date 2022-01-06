//creating h1 tag :
const mainh1=document.createElement('h1');
mainh1.innerHTML="Pokemon Info's";
document.body.append(mainh1);

/* creating a div for all the pokemons to be displayed within the div  :
const maindiv=document.createElement('div');
maindiv.className="pkmon_container";
document.body.append(maindiv);*/

//total pokemon :
var id = 50;

 displayPokemon();


//Getting pokemon data and fetching api:
 
            async function getAllPokemonData() {
                         try {
                        const data = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${id}`, 
                                {
                                 method: "GET",
                                });

                        const pokemons = await data.json();
                                return pokemons;
                     } catch (err) {
                        console.log("Error", err);
                                    }
                                }


        //Displaying the  pokemon data in card format:
 
                    async function displayPokemon() {
                            try {
                            const pokemonDataArr = [];
                            const pokemons = await getAllPokemonData();
                        
                // Create pokemon card
                    let createPokemonCard = (name, image, abilities, moves, weight) => {
                        return `
                            <div class="image-wrapper">
                                <img src="${image}" />
                            </div>
                    
                        <div class="description">
                            <p class="fw-bolder pokemon-name">
                                     ${name}
                            </p>
                            <p><strong>Abilities</strong>: ${abilities}</p>
                            <p><strong>Moves</strong>: ${moves}</p>
                            <p><strong>Weight</strong>: ${weight} lbs</p>
                        </div>
                                `;
                                };

                // Display data
                    document.querySelector(".Pk_list").innerHTML = "";

                    // Iterate over the fetched list of pokemons
                        pokemons.results.forEach((pokemon) => 
                        {
      
                            // Filter ability, moves, wright
                        const pokemonObj = filterPokemonAttributes(pokemon);

                                 pokemonObj
                                    .then((pokemon) => {
                                     let div = document.createElement("div");
                                        div.className = "pokemon-card";
                                 div.innerHTML = createPokemonCard(pokemon.name, pokemon.image,
                                     pokemon.abilities, pokemon.moves, pokemon.weight);

                    // Appending the card created on the webpage
                                     document.querySelector(".Pk_list").append(div);
                                             pokemonDataArr.push(pokemon);
                                          })
                                  .catch((err) => {
                                     console.log("Error while filtering pokemon attributes: ", err);
                                    });
                                         });
                                 } catch (err) {
                                               console.log("Error while diplaying data: ", err);
                                                     }
                                }

//  name, abilities, moves and weight of a pokemon :
 
async function filterPokemonAttributes(pokemon) {
  try {
    const data = await fetch(`${pokemon.url}`, {
      method: "GET",
    });
  
    const pokemonAttributes = await data.json();
  
    //  abilites
    const pokemonAbilities = pokemonAttributes.abilities;
    const pokemonAbilitiesArr = [];
  
    for (let i = 0; i < pokemonAbilities.length; i++) {
      pokemonAbilitiesArr.push(pokemonAbilities[i].ability.name);
    }
  
    //  weight
    const pokemonWeight = pokemonAttributes.weight;
  
    //  moves
    const pokemonMoves = pokemonAttributes.moves;
    const pokemonMovesArr = [];
  
    for (let i = 0; i < 3; i++) {
      pokemonMovesArr.push(pokemonMoves[i].move.name);
    }
  
    const pokemonObj = {
      name: pokemon.name,
      image: pokemonAttributes.sprites.other.dream_world.front_default,
      abilities: pokemonAbilitiesArr,
      moves: pokemonMovesArr,
      weight: pokemonWeight,
      
    };
  
    return pokemonObj;
  } catch (err) {
    console.log("Error in displaying the data: ", err);
  }
}





//  Creating the content within the div 
 
let pokemoncontent = document.createElement("div");
pokemoncontent.className = "allpkmon-content";
pokemoncontent.innerHTML = `
                    `;
document.querySelector(".allcontent").append(pokemoncontent);

window.onload = displayPokemon();