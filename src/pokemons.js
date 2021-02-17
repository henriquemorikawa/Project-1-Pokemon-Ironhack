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

const blastoise = new Pokemon(canvas, context, 0, 0, blastoiseImage)
const charizard = new Pokemon(canvas, context, 0, 0, charizardImage)
const corongo = new Pokemon(canvas, context, 0, 0, corongoImage)
const dragonite = new Pokemon(canvas, context, 0, 0, dragoniteImage)
const gengar = new Pokemon(canvas, context, 0, 0, gengarImage)
const mewtwo = new Pokemon(canvas, context, 0, 0, mewtwoImage)
const onix = new Pokemon(canvas, context, 0, 0, onixImage)
const pidgeot = new Pokemon(canvas, context, 0, 0, pidgeotImage)
const vax = new Pokemon(canvas, context, 0, 0, vaxImage)
const venusaur = new Pokemon(canvas, context, 0, 0, venusaurImage)

// console.log(blastoise)