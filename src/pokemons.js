const canvas = document.querySelector('canvas')
const context = canvas.getContext('2d')

const pokedexImages = ["blastoise", "charizard", "corongo", "dragonite", "gengar", "gyarados", "mewtwo", "onix", "pidgeot", "vax", "venusaur", "alakazam", "arcanine", "blaziken","crobat","feraligatr","gardevoir","glalie","machamp","manectric","meganium","metagross","nidoking","nidoqueen","pikachu","salamence","sceptile","scizor","snorlax","swampert","typhlosion","tyranitar"]

const imagesArray = pokedexImages.map((name)=>{
    const image = new Image();
    image.src = `./images/${name}.png`
    return image
})

const blastoise = new Pokemon(canvas, context, 'blastoise', 0, 0, imagesArray[0], 95, 115, 78, 210)
const charizard = new Pokemon(canvas, context, 'charizard', 0, 0, imagesArray[1], 109, 85, 100, 210)
const corongo = new Pokemon(canvas, context, 'corongo', 0, 0, imagesArray[2], 80, 120, 100, 210)
const dragonite = new Pokemon(canvas, context, 'dragonite', 0, 0, imagesArray[3], 115, 100, 80, 210)
const gengar = new Pokemon(canvas, context, 'gengar', 0, 0, imagesArray[4], 110, 75, 110, 210)
const gyarados = new Pokemon(canvas, context, 'gyarados', 0, 0, imagesArray[5], 115, 105, 79, 210)
const mewtwo = new Pokemon(canvas, context, 'mewtwo', 0, 0, imagesArray[6], 124, 90, 115, 210)
const onix = new Pokemon(canvas, context, 'onix', 0, 0, imagesArray[7], 75, 145, 60, 210)
const pidgeot = new Pokemon(canvas, context, 'pidgeot', 0, 0, imagesArray[8], 85, 80, 100, 210)
const vax = new Pokemon(canvas, context, 'vax', 0, 0, imagesArray[9], 120, 100, 80, 210)
const venusaur = new Pokemon(canvas, context, 'venusaur', 0, 0, imagesArray[10], 105, 105, 80, 210)
const alakazam = new Pokemon(canvas, context, 'alakazam', 0, 0, imagesArray[11], 110, 75, 110, 210)
const arcanine = new Pokemon(canvas, context, 'arcanine', 0, 0, imagesArray[12], 120, 80, 95, 210)
const blaziken = new Pokemon(canvas, context, 'blaziken', 0, 0, imagesArray[13], 120, 70, 90, 210)
const crobat = new Pokemon(canvas, context, 'crobat', 0, 0, imagesArray[14], 100, 70, 120, 210)
const feraligatr = new Pokemon(canvas, context, 'feraligatr', 0, 0, imagesArray[15], 110, 100, 78, 210)
const gardevoir = new Pokemon(canvas, context, 'gardevoir', 0, 0, imagesArray[16], 105, 100, 80, 210)
const glalie = new Pokemon(canvas, context, 'glalie', 0, 0, imagesArray[17], 90, 90, 90, 210)
const machamp = new Pokemon(canvas, context, 'machamp', 0, 0, imagesArray[18], 120, 90, 62, 210)
const manectric = new Pokemon(canvas, context, 'manectric', 0, 0, imagesArray[19], 95, 80, 110, 210)
const meganium = new Pokemon(canvas, context, 'meganium', 0, 0, imagesArray[20], 90, 110, 80, 210)
const metagross = new Pokemon(canvas, context, 'metagross', 0, 0, imagesArray[21], 110, 105, 80, 210)
const nidoking = new Pokemon(canvas, context, 'nidoking', 0, 0, imagesArray[22], 100, 100, 75, 210)
const nidoqueen = new Pokemon(canvas, context, 'nidoqueen', 0, 0, imagesArray[23], 95, 100, 80, 210)
const pikachu = new Pokemon(canvas, context, 'pikachu', 0, 0, imagesArray[24], 90, 70, 110, 210)
const salamence = new Pokemon(canvas, context, 'salamence', 0, 0, imagesArray[25],110, 90, 100, 210)
const sceptile = new Pokemon(canvas, context, 'sceptile', 0, 0, imagesArray[26],100, 75, 115, 210)
const scizor = new Pokemon(canvas, context, 'scizor', 0, 0, imagesArray[27],100, 110, 70, 210)
const snorlax = new Pokemon(canvas, context, 'snorlax', 0, 0, imagesArray[28],105, 125, 50, 210)
const swampert = new Pokemon(canvas, context, 'swampert', 0, 0, imagesArray[29],110, 95, 75, 210)
const typhlosion = new Pokemon(canvas, context, 'typhlosion', 0, 0, imagesArray[30],105, 85, 100, 210)
const tyranitar = new Pokemon(canvas, context, 'tyranitar', 0, 0, imagesArray[31],105, 130, 65, 210)


const pokedex = [blastoise, charizard, corongo, dragonite, gengar, gyarados, mewtwo, onix, pidgeot, vax, venusaur, alakazam, blaziken, crobat, feraligatr, gardevoir, glalie, machamp, manectric, meganium, metagross, nidoking, nidoqueen, pikachu, salamence, sceptile, scizor, snorlax, swampert, typhlosion, tyranitar]

function pickPokemon(pokedex){
    const playerPokemonIndex = Math.floor(Math.random()*pokedex.length)
    const playerPokemon = pokedex[playerPokemonIndex]
    pokedex.splice(playerPokemonIndex, 1)
    
    return playerPokemon
}

function pickPcPokemon(pokedex){
    const pcPokemonIndex = Math.floor(Math.random()*pokedex.length)
    const pcPokemon = pokedex[pcPokemonIndex]
    pokedex.splice(pcPokemonIndex, 1)

    return pcPokemon

}

const playerFirstPokemon = pickPokemon(pokedex)
const playerSecondPokemon = pickPokemon(pokedex)
const playerThirdPokemon = pickPokemon(pokedex)

const pcFirstPokemon = pickPcPokemon(pokedex)
const pcSecondPokemon = pickPcPokemon(pokedex)
const pcThirdPokemon = pickPcPokemon(pokedex)



