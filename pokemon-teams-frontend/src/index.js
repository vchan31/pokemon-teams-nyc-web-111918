document.addEventListener('DOMContentLoaded', () => {
const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const pokemonContainer = document.getElementsByTagName('ul')
const pokeMain = document.querySelector('main')
console.log(pokemonContainer)
let all_trainers = []
let all_pokemon;

function renderSinglePokemon(pokemon){
	return`<li>${pokemon.nickname} (${pokemon.species}) <button class="release" data-id="${pokemon.id}">Release</button></li>`
}
function renderAllPokemon(collection){
	return  collection.map(renderSinglePokemon)	
}

fetch('http://localhost:3000/trainers', {method: 'GET'}).then(res => (res.json()))
.then(test => {
	all_trainers = test
// console.log(all_trainers)

pokeMain.innerHTML = all_trainers.map(trainer =>{

	const pokemon = renderAllPokemon(trainer.pokemons).join("")
	// console.log(pokemon)
	return `<div class="card" data-id=${trainer.id}><p>${trainer.name}</p>
  <button data-id='${trainer.id}'>Add Pokemon</button>
  <ul>
   	${pokemon}
  </ul>
</div>`
}).join('')
})

pokeMain.addEventListener('click',function(e){

if (e.target.innerText === 'Release'){
	e.target.parentNode.remove()

	fetch(`http://localhost:3000/pokemons/${e.target.dataset.id}`, {method: 'DELETE'})


// fetch('http://localhost:3000/trainers', {method: 'GET'}).then(res => (res.json()))
// .then(test => {
// 	all_trainers = test
// // console.log(all_trainers)

// pokeMain.innerHTML = all_trainers.map(trainer =>{

// 	const pokemon = renderAllPokemon(trainer.pokemons).join("")
// 	// console.log(pokemon)
// 	return `<div class="card" data-id=${trainer.id}><p>${trainer.name}</p>
//   <button data-trainer-id='${trainer.id}'>Add Pokemon</button>
//   <ul>
//    	${pokemon}
//   </ul>
// </div>`
// }).join('')
// })
}

else if (e.target.innerText === 'Add Pokemon'){
	const target_trainer_ul = e.target.parentNode.querySelector('ul')

	fetch('http://localhost:3000/pokemons', {

		method: 'POST',
		headers:
{
  'Content-Type': 'application/json'
},

body:
JSON.stringify({
  trainer_id: e.target.dataset.id
})
}).then(res=>res.json())
	.then(parsedRes=>{
		if(!parsedRes.error){
			target_trainer_ul.innerHTML+=renderSinglePokemon(parsedRes)
		}
	})
}




})


})//end of DOM content loader bracket