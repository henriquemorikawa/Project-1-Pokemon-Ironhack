const canvas = document.querySelector('canvas')
const context = canvas.getContext('2d')

const blastoiseImage = new Image();
blastoiseImage.src = './images/Blastoise.png' // possivelmente refatorar

const charizardImage = new Image();
charizardImage.src = './images/Charizard.png'

const corongoImage = new Image();
corongoImage.src = './images/Corongo.png'

const dragoniteImage = new Image();
dragoniteImage.src = './images/Dragonite.png'

const gengarImage = new Image();
gengarImage.src = './images/Gengar.png'

const mewtwoImage = new Image();
mewtwoImage.src = './images/Mewtwo.png'

const onixImage = new Image();
onixImage.src = './images/Onix.png'

const pidgeotImage = new Image();
pidgeotImage.src = './images/Pidgeot.png'

const vaxImage = new Image();
vaxImage.src = './images/Vax.png'

const venusaurImage = new Image();
venusaurImage.src = './images/Venusaur.png'

const blastoise = new Pokemon(canvas, context, 'blastoise', 0, 0, blastoiseImage, 85, 105, 78, 210)
const charizard = new Pokemon(canvas, context, 'charizard', 0, 0, charizardImage, 109, 85, 100, 210)
const corongo = new Pokemon(canvas, context, 'corongo', 0, 0, corongoImage, 80, 120, 100, 210)
const dragonite = new Pokemon(canvas, context, 'dragonite', 0, 0, dragoniteImage, 115, 100, 80, 210)
const gengar = new Pokemon(canvas, context, 'gengar', 0, 0, gengarImage, 110, 75, 110, 210)
const mewtwo = new Pokemon(canvas, context, 'mewtwo', 0, 0, mewtwoImage, 124, 90, 115, 210)
const onix = new Pokemon(canvas, context, 'onix', 0, 0, onixImage, 55, 140, 70, 210)
const pidgeot = new Pokemon(canvas, context, 'pidgeot', 0, 0, pidgeotImage, 80, 75, 101, 210)
const vax = new Pokemon(canvas, context, 'vax', 0, 0, vaxImage, 120, 100, 80, 210)
const venusaur = new Pokemon(canvas, context, 'venusaur', 0, 0, venusaurImage, 100, 100, 80, 210)

const pokedex = [blastoise, charizard, corongo, dragonite, gengar, mewtwo, onix, pidgeot, vax, venusaur]

function pickPokemon(pokedex){
    const playerFirstPokemonIndex = Math.floor(Math.random()*pokedex.length)
    const playerFirstPokemon = pokedex[playerFirstPokemonIndex]
    // pokedex.splice(playerFirstPokemonIndex, 1)
    
    return playerFirstPokemon
}

function pickPcPokemon(pokedex){
    const pcFirstPokemonIndex = Math.floor(Math.random()*pokedex.length)
    const pcFirstPokemon = pokedex[pcFirstPokemonIndex]

    return pcFirstPokemon

}

const playerFirstPokemon = pickPokemon(pokedex)
const pcFirstPokemon = pickPcPokemon(pokedex)
// console.log(pickPokemon(pokedex))
