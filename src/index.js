class Pokemon {
    constructor(canvas, context, posX, posY, image){
        this.canvas = canvas;
        this.context = context;
        this.posX = posX;
        this.posY = posY;
        this.image = image;
        this.height = 10;
        this.width = 10;
    }
    drawPokemon(/*precisa receber o pokemon*/){
        this.context.drawImage(this.image, 30, 140, this.canvas.width/3, this.canvas.height/3);
    }

    pickMyPokemon(){

    }
    pickPcPokemon(){

    }
}

class Game {
    constructor(canvas, context, pokemon, backgroundImage) {
        this.canvas = canvas;
        this.context = context;
        this.pokemon = pokemon;
        this.backgroundImage = backgroundImage;
    }

    drawField(){
        this.context.drawImage(this.backgroundImage, 0, 0, this.canvas.width, this.canvas.height);
    }

    startGame(){
        this.drawField()
        console.log(this.pokemon)
        this.pokemon.drawPokemon()
    }
}


window.onload = () => {
    document.querySelector('#start').onclick = () => {
        const canvas = document.querySelector('canvas')
        const context = canvas.getContext('2d')
        const bgImage = new Image();
        bgImage.src = './images/Battle BG.png'

        bgImage.onload = () =>{
            const game = new Game(canvas, context, blastoise, bgImage)
            // console.log(game)
            game.startGame()

        }
    }
}