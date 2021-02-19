class Pokemon {
    constructor(canvas, context, name, posX, posY, image, attack, defense, speed, hp){
        this.canvas = canvas;
        this.context = context;
        this.name = name;
        this.posX = posX;
        this.posY = posY;
        this.image = image;
        this.height = 10;
        this.width = 10;
        this.attack = attack;
        this.defense = defense;
        this.speed = speed;
        this.hp = hp;
    }

    // pickPlayerPokemon(pokedex){
    //     const playerFirstPokemonIndex = Math.floor(Math.random()*pokedex.length)
    //     pokedex.splice(playerFirstPokemonIndex, 1)

    //     return pokedex[playerFirstPokemonIndex]
    // }

    // pickPcPokemon(pokedex){
    //     const pcFirstPokemonIndex = Math.floor(Math.random()*pokedex.length)
    //     pokedex.splice(pcFirstPokemonIndex, 1)

    //     return pokedex[pcFirstPokemonIndex]
    // }

    drawPlayerPokemon(){
        this.context.drawImage(this.image, 30, 140, this.canvas.width/3, this.canvas.height/3);
        this.context.font = "35px Comic Sans MS";
        this.context.fillText(`${this.name.toUpperCase()}`, 375, 210);
        this.context.fillRect(440, 220, this.hp, 10);
    }

    drawPcPokemon(){
        this.context.drawImage(this.image, 450, 0, this.canvas.width/3, this.canvas.height/3);
        this.context.font = "35px Comic Sans MS";
        this.context.fillText(`${this.name.toUpperCase()}`, 70, 80);
        this.context.fillRect(147, 15, this.hp, 10);
    }

    hpBar(){
        // this.context.fillStyle = "#FF0000"
        // this.context.lineWidth = 5
        // this.context.beginPath();
        // this.context.moveTo(377, 25);
        // this.context.lineTo(277, 25);
        // this.context.stroke();
        // this.context.closePath();
        
        this.context.clearRect(147, 15, this.hp, 10);
        // this.context.clearRect(440, 220, this.hp, 10);
        const bgImage = new Image();
        bgImage.src = './images/Battle BG.png'
        this.context.drawImage(bgImage, 0, 0, this.canvas.width, this.canvas.height);
    }

    fight(attack, defense){
        return ((3*attack-defense)/2);
    }
}

class Game {
    constructor(canvas, context, playerPokemon, pcPokemon, backgroundImage) {
        this.canvas = canvas;
        this.context = context;
        this.playerPokemon = playerPokemon;
        this.pcPokemon = pcPokemon;
        this.backgroundImage = backgroundImage;
        this.winGameImage = new Image();
        this.winGameImage.src = "./images/You-win.png"
        this.looseGameImage = new Image();
        this.looseGameImage.src = "./images/You-loose.png"
    }

    drawField(){
        this.context.drawImage(this.backgroundImage, 0, 0, this.canvas.width, this.canvas.height);
    }
    
    startGame(){
        this.drawField()
        this.playerPokemon.drawPlayerPokemon() 
        this.pcPokemon.drawPcPokemon()
    }

    endGame(winner){
        if(winner === "player"){
            this.playerPokemon = 230;
            this.pcPokemon = 230;
            this.context.drawImage(this.winGameImage, 0, 0, this.canvas.width, this.canvas.height);
        } else if(winner === "PC"){
            this.playerPokemon = 230;
            this.pcPokemon = 230;
            this.context.drawImage(this.looseGameImage, 0, 0, this.canvas.width, this.canvas.height);
        }
        document.querySelector('#fight').style.display = 'none'
    }
}


window.onload = () => {
    if(document.querySelector('#start').innerHTML === "Play!"){

        document.querySelector('#start').onclick = () => {
            document.querySelector('#start').innerHTML = "Restart"
            const canvas = document.querySelector('canvas')
            const context = canvas.getContext('2d')
            const bgImage = new Image();
            bgImage.src = './images/Battle BG.png'
            const playerFirstPokemon = pickPokemon(pokedex)
            const pcFirstPokemon = pickPcPokemon(pokedex)
            bgImage.onload = () =>{
                document.querySelector('#fight').style.display = 'block'
    
                const game = new Game(canvas, context, playerFirstPokemon, pcFirstPokemon, bgImage)
                game.startGame()
            }
        } 
        
    // } else if(document.querySelector('#start').innerHTML === "Restart"){
    //     document.querySelector('#start').onclick = () => {
    //         document.querySelector('#start').innerHTML = "Restart"
    //         const canvas = document.querySelector('canvas')
    //         const context = canvas.getContext('2d')
    //         const bgImage = new Image();
    //         bgImage.src = './images/Battle BG.png'
    //         const newRandomPokemon = pickPokemon(pokedex)
    //         const newRandomPcPokemon = pickPcPokemon(pokedex)
    
    //         bgImage.onload = () =>{
    //             document.querySelector('#fight').style.display = 'block'
    
    //             const game = new Game(canvas, context, newRandomPokemon, newRandomPcPokemon, bgImage)
    //             game.startGame()
    //         }
    //     } 
    }
    
}


document.querySelector('#fight').onclick = () =>{
    const canvas = document.querySelector('canvas')
    const context = canvas.getContext('2d')
    const bgImage = new Image();
    bgImage.src = './images/Battle BG.png'
    const game = new Game(canvas, context, playerFirstPokemon, pcFirstPokemon, bgImage)
    console.log('player hp antes '+playerFirstPokemon.hp)
    console.log('pc hp antes '+pcFirstPokemon.hp)

    if(playerFirstPokemon.speed >= pcFirstPokemon.speed){
        if(pcFirstPokemon.hp>0){
            pcFirstPokemon.hp -= playerFirstPokemon.fight(playerFirstPokemon.attack, pcFirstPokemon.defense)
            console.log("damage " + playerFirstPokemon.fight(playerFirstPokemon.attack, pcFirstPokemon.defense))
            if(pcFirstPokemon.hp<=0){
                return game.endGame("player")
            } else{
                playerFirstPokemon.hp -= pcFirstPokemon.fight(pcFirstPokemon.attack, playerFirstPokemon.defense)
            }
            if(playerFirstPokemon.hp<=0){
                return game.endGame("PC")
            }
            console.log('player hp depois '+playerFirstPokemon.hp)
            console.log('pc hp depois '+pcFirstPokemon.hp)
            return playerFirstPokemon.hp, pcFirstPokemon.hp
        } 
    } else {
        if(playerFirstPokemon.hp>0){
            playerFirstPokemon.hp -= pcFirstPokemon.fight(pcFirstPokemon.attack, playerFirstPokemon.defense)
            console.log("damage " + pcFirstPokemon.fight(pcFirstPokemon.attack, playerFirstPokemon.defense))
            if(playerFirstPokemon.hp<=0){
                return game.endGame("PC")
            } else{
                pcFirstPokemon.hp -= playerFirstPokemon.fight(playerFirstPokemon.attack, pcFirstPokemon.defense)
            }
            if(pcFirstPokemon.hp<=0){
                return game.endGame("player")
            } 
            console.log('player hp depois '+playerFirstPokemon.hp)
            console.log('pc hp depois '+pcFirstPokemon.hp)
            return playerFirstPokemon.hp, pcFirstPokemon.hp
        } 
    }
    // pcFirstPokemon.hpBar()
}