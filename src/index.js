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

    drawPlayerPokemon(){
        this.context.drawImage(this.image, 30, 170, this.canvas.width/3, this.canvas.height/3);
        this.context.font = "35px Comic Sans MS";
        this.context.fillText(`${this.name.toUpperCase()}`, 375, 210);
        this.context.fillRect(422, 258, this.hp, 10);
    }

    drawPcPokemon(){
        this.context.drawImage(this.image, 450, 0, this.canvas.width/3, this.canvas.height/3);
        this.context.font = "35px Comic Sans MS";
        this.context.fillText(`${this.name.toUpperCase()}`, 85, 36);
        this.context.fillRect(157, 76, this.hp, 10);
    }

    playerHpBar(hp){
        this.context.clearRect(422, 258, 210, 10)
        this.context.fillRect(422, 258, hp, 10);
    }

    pcHpBar(hp){
        this.context.clearRect(157, 76, 210, 10)
        this.context.fillRect(157, 76, hp, 10);
    }

    fight(attack, defense){
        return ((3*attack-defense)/4);
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
        if(document.querySelector('#start').innerHTML === "Restart"){            
            document.querySelector('#start').onclick = () => {
                location.reload()
            }
        }
    }

    endGame(winner){
        console.log('acabou')
        console.log(winner)

        if(winner === "player"){
            // const audio = new Audio("./music/battlemusic.mp3");
            audio.pause();
            this.context.drawImage(this.winGameImage, 0, 0, this.canvas.width, this.canvas.height);
            const audioWon = new Audio("./music/youwonsound.mp3");
            audioWon.play();
        } else if(winner === "PC"){
            // const audio = new Audio("./music/battlemusic.mp3");
            audio.pause();
            this.context.drawImage(this.looseGameImage, 0, 0, this.canvas.width, this.canvas.height);
            const audioLoose = new Audio("./music/youlose.wav");
            audioLoose.play();
        }
        document.querySelector('#fight').style.display = 'none'
        document.querySelector('#attack').style.display = 'none'
        document.querySelector('#defense').style.display = 'none'
        document.querySelector('#playertext').style.display = 'none'
        document.querySelector('#pctext').style.display = 'none'
    }
}

const audio = new Audio("./music/battlemusic.mp3");

window.onload = () => {
    if(document.querySelector('#start').innerHTML === "Play!"){

        document.querySelector('#start').onclick = () => {
            audio.play();
            document.querySelector('#start').innerHTML = "Restart"
            const canvas = document.querySelector('canvas')
            const context = canvas.getContext('2d')
            const bgImage = new Image();
            bgImage.src = './images/battle-BG.png'
            bgImage.onload = () =>{
                document.querySelector('#fight').style.display = 'block'
                document.querySelector('#attack').style.display = 'block'
                document.querySelector('#defense').style.display = 'block'
                
    
                const game = new Game(canvas, context, playerFirstPokemon, pcFirstPokemon, bgImage)
                game.startGame()
            }
        } 
        
    }
}
    

function randomPcMove(playerPokemon, pcPokemon){
    const pcMoves = ['fight', 'attack', 'defense']
    const pcMovesIndex = [Math.floor(Math.random()*pcMoves.length)]
    console.log(pcMoves[pcMovesIndex])
    switch (pcMoves[pcMovesIndex]){
        case "fight":
            console.log('teste1')
            console.log(playerPokemon.hp)
            document.querySelector('#pctext').innerHTML = `${pcPokemon.name} attacked`
            playerPokemon.hp -= ((3*pcPokemon.attack-playerPokemon.defense)/3)
            return playerPokemon.hp
        case "attack":
            console.log('teste2')
            console.log(pcPokemon.attack)
            document.querySelector('#pctext').innerHTML = `${pcPokemon.name} +att`
            pcPokemon.attack += 20
            return pcPokemon.attack
        case "defense":
            console.log('teste3')
            console.log(playerPokemon.defense)
            document.querySelector('#pctext').innerHTML = `${playerPokemon.name} -def`
            playerPokemon.defense -= 10
            return playerPokemon.defense
    }
}


document.querySelector('#fight').onclick = () =>{
    const canvas = document.querySelector('canvas')
    const context = canvas.getContext('2d')
    const bgImage = new Image();
    bgImage.src = './images/battle-BG.png'
    const game = new Game(canvas, context, playerFirstPokemon, pcFirstPokemon, bgImage)
    // console.log('player hp antes '+playerFirstPokemon.hp)
    // console.log('pc hp antes '+pcFirstPokemon.hp)

    if(playerFirstPokemon.speed >= pcFirstPokemon.speed){
        if(pcFirstPokemon.hp>0){
            document.querySelector('#playertext').innerHTML = `${playerFirstPokemon.name} attacked`
            pcFirstPokemon.hp -= playerFirstPokemon.fight(playerFirstPokemon.attack, pcFirstPokemon.defense)
            pcFirstPokemon.pcHpBar(pcFirstPokemon.hp)
            // console.log("damage " + playerFirstPokemon.fight(playerFirstPokemon.attack, pcFirstPokemon.defense))
            if(pcFirstPokemon.hp<=0){
                return game.endGame("player")
            } else{
                randomPcMove(playerFirstPokemon,pcFirstPokemon)
                // playerFirstPokemon.hp -= pcFirstPokemon.fight(pcFirstPokemon.attack, playerFirstPokemon.defense)
                playerFirstPokemon.playerHpBar(playerFirstPokemon.hp)               
            }
            if(playerFirstPokemon.hp<=0){
                return game.endGame("PC")
            }
            // console.log('player hp depois '+playerFirstPokemon.hp)
            // console.log('pc hp depois '+pcFirstPokemon.hp)
            return playerFirstPokemon.hp, pcFirstPokemon.hp
        } 
    } else {
        if(playerFirstPokemon.hp>0){
            randomPcMove(playerFirstPokemon,pcFirstPokemon)

            // playerFirstPokemon.hp -= pcFirstPokemon.fight(pcFirstPokemon.attack, playerFirstPokemon.defense)
            playerFirstPokemon.playerHpBar(playerFirstPokemon.hp)
            // console.log("damage " + pcFirstPokemon.fight(pcFirstPokemon.attack, playerFirstPokemon.defense))
            if(playerFirstPokemon.hp<=0){
                return game.endGame("PC")
            } else{
                document.querySelector('#playertext').innerHTML = `${playerFirstPokemon.name} attacked`
                pcFirstPokemon.hp -= playerFirstPokemon.fight(playerFirstPokemon.attack, pcFirstPokemon.defense)
                pcFirstPokemon.pcHpBar(pcFirstPokemon.hp)
            }
            if(pcFirstPokemon.hp<=0){
                return game.endGame("player")
            } 
            // console.log('player hp depois '+playerFirstPokemon.hp)
            // console.log('pc hp depois '+pcFirstPokemon.hp)
            return playerFirstPokemon.hp, pcFirstPokemon.hp
        } 
    }
}

document.querySelector('#attack').onclick = () =>{
    const canvas = document.querySelector('canvas')
    const context = canvas.getContext('2d')
    const bgImage = new Image();
    bgImage.src = './images/battle-BG.png'
    const game = new Game(canvas, context, playerFirstPokemon, pcFirstPokemon, bgImage)

    if(playerFirstPokemon.speed >= pcFirstPokemon.speed){
        if(pcFirstPokemon.hp>0){
            document.querySelector('#playertext').innerHTML = `${playerFirstPokemon.name} +att`

            playerFirstPokemon.attack += 20
            randomPcMove(playerFirstPokemon,pcFirstPokemon)
            playerFirstPokemon.playerHpBar(playerFirstPokemon.hp)               
            
            if(playerFirstPokemon.hp<=0){
                return game.endGame("PC")
            }

            return playerFirstPokemon.hp, playerFirstPokemon.attack
        } 
    } else {
        if(playerFirstPokemon.hp>0){
            randomPcMove(playerFirstPokemon,pcFirstPokemon)
            playerFirstPokemon.playerHpBar(playerFirstPokemon.hp)
            if(playerFirstPokemon.hp<=0){
                return game.endGame("PC")
            } else{
                document.querySelector('#playertext').innerHTML = `${playerFirstPokemon.name} +att`
                playerFirstPokemon.attack += 20
            }
    
            return playerFirstPokemon.hp, playerFirstPokemon.attack
        } 
    }
    
}

document.querySelector('#defense').onclick = () =>{
    const canvas = document.querySelector('canvas')
    const context = canvas.getContext('2d')
    const bgImage = new Image();
    bgImage.src = './images/battle-BG.png'
    const game = new Game(canvas, context, playerFirstPokemon, pcFirstPokemon, bgImage)

    if(playerFirstPokemon.speed >= pcFirstPokemon.speed){
        if(pcFirstPokemon.hp>0){
            document.querySelector('#playertext').innerHTML = `${pcFirstPokemon.name} -def`
            pcFirstPokemon.defense -= 10
            randomPcMove(playerFirstPokemon,pcFirstPokemon)
            playerFirstPokemon.playerHpBar(playerFirstPokemon.hp)               
            
            if(playerFirstPokemon.hp<=0){
                return game.endGame("PC")
            }

            return playerFirstPokemon.hp, playerFirstPokemon.defense
        } 
    } else {
        if(playerFirstPokemon.hp>0){
            randomPcMove(playerFirstPokemon,pcFirstPokemon)
            playerFirstPokemon.playerHpBar(playerFirstPokemon.hp)
            if(playerFirstPokemon.hp<=0){
                return game.endGame("PC")
            } else{
                document.querySelector('#playertext').innerHTML = `${pcFirstPokemon.name} -def`

                pcFirstPokemon.defense -= 10
            }
    
            return playerFirstPokemon.hp, playerFirstPokemon.defense
        } 
    }
    
}

