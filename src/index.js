class Pokemon {
    constructor(canvas, context, name, posX, posY, image, attack, defense, speed, hp){
        this.canvas = canvas;
        this.context = context;
        this.name = name;
        this.posX = posX;
        this.posY = posY;
        this.image = image;
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
        this.winGameImage.src = "./images/You-Win.png"
        this.looseGameImage = new Image();
        this.looseGameImage.src = "./images/You-Loose.png"
    }

    drawField(){
        this.context.drawImage(this.backgroundImage, 0, 0, this.canvas.width, this.canvas.height);
    }
    
    startGame(){
        this.drawField()
        this.playerPokemon[0].drawPlayerPokemon() 
        this.pcPokemon[0].drawPcPokemon()
        if(document.querySelector('#start').innerHTML === "Restart"){            
            document.querySelector('#start').onclick = () => {
                location.reload()
            }
        }
    }

    changePokemon(name, plPokemons,pPokemons){
        if(name === "PC"){
            if(pcPokemons[0].hp<=0 && pcPokemons[1].hp<=0 && pcPokemons[2].hp<=0){
                return this.endGame("player")
            } else if (pcPokemons[0].hp<=0 && pcPokemons[1].hp<=0 && pcPokemons[2].hp>0){
                this.drawField()
                plPokemons.drawPlayerPokemon()
                pcPokemons[2].drawPcPokemon()
            } else if(pcPokemons[0].hp<=0 && pcPokemons[1].hp>0 && pcPokemons[2].hp>0){
                this.drawField()
                plPokemons.drawPlayerPokemon()
                pcPokemons[1].drawPcPokemon()
            }
        } else if(name === "player"){
            if(playerPokemons[0].hp<=0 && playerPokemons[1].hp<=0 && playerPokemons[2].hp<=0){
                return this.endGame("PC")
            } else if (playerPokemons[0].hp<=0 && playerPokemons[1].hp<=0 && playerPokemons[2].hp>0){
                this.drawField()
                pPokemons.drawPcPokemon()
                playerPokemons[2].drawPlayerPokemon()
            } else if(playerPokemons[0].hp<=0 && playerPokemons[1].hp>0 && playerPokemons[2].hp>0){
                this.drawField()
                pPokemons.drawPcPokemon()
                playerPokemons[1].drawPlayerPokemon()
            }
        }
    }

    endGame(winner){
        if(winner === "player"){
            audio.pause();
            this.context.drawImage(this.winGameImage, 0, 0, this.canvas.width, this.canvas.height);
            const audioWon = new Audio("./music/youwonsound.mp3");
            audioWon.play();
        } else if(winner === "PC"){
            audio.pause();
            this.context.drawImage(this.looseGameImage, 0, 0, this.canvas.width, this.canvas.height);
            const audioLoose = new Audio("./music/youlose.wav");
            audioLoose.play();
        }
        document.querySelector('#fight').style.display = 'none'
        document.querySelector('#attack').style.display = 'none'
        document.querySelector('#defense').style.display = 'none'
        document.querySelector('#hp').style.display = 'none'
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
                document.querySelector('#hp').style.display = 'block'
    
                const game = new Game(canvas, context, playerPokemons, pcPokemons, bgImage)
                game.startGame()
            }
        } 
        
    }
}

function randomPcMove(playerPokemon, pcPokemon){
    const pcMoves = ['fight', 'attack', 'hp']
    const pcMovesIndex = [Math.floor(Math.random()*pcMoves.length)]
    switch (pcMoves[pcMovesIndex]){
        case "fight":
            document.querySelector('#pctext').innerHTML = `${pcPokemon.name} attacked`
            playerPokemon.hp -= ((3*pcPokemon.attack-playerPokemon.defense)/3)
            return playerPokemon.hp
        case "attack":
            document.querySelector('#pctext').innerHTML = `${pcPokemon.name} +att`
            pcPokemon.attack += 30
            return pcPokemon.attack
        case "hp":
            if(pcPokemon.hp === 210){
                document.querySelector('#pctext').innerHTML = `${pcPokemon.name} attacked`
                playerPokemon.hp -= ((3*pcPokemon.attack-playerPokemon.defense)/3)
                return playerPokemon.hp 
            }
            document.querySelector('#pctext').innerHTML = `${pcPokemon.name} +HP`
            if(pcPokemon.hp > 160){
                pcPokemon.hp = 210
                return pcPokemon.hp
            } else {
                pcPokemon.hp += 50
                return pcPokemon.hp
            }
               
    }
}



function buttons(buttonName, playerPokemons, pcPokemons){
    const canvas = document.querySelector('canvas')
    const context = canvas.getContext('2d')
    const bgImage = new Image();
    bgImage.src = './images/battle-BG.png'
    const game = new Game(canvas, context, playerPokemons, pcPokemons, bgImage)

    if(playerPokemons.speed >= pcPokemons.speed){
        if(pcPokemons.hp>0){
            switch(buttonName){
                case "#fight":
                    document.querySelector('#playertext').innerHTML = `${playerPokemons.name} attacked`
                    pcPokemons.hp -= playerPokemons.fight(playerPokemons.attack, playerPokemons.defense)
                    pcPokemons.pcHpBar(pcPokemons.hp)
                    break
                case "#attack":
                    document.querySelector('#playertext').innerHTML = `${playerPokemons.name} +att`
                    playerPokemons.attack += 20
                    break
                case "#defense":
                    document.querySelector('#playertext').innerHTML = `${pcPokemons.name} -def`
                    pcPokemons.defense -= 10
                    break
                case "#hp":
                    document.querySelector('#playertext').innerHTML = `${playerPokemons.name} +HP`
                    if(playerPokemons.hp > 190){
                        console.log("teste1")
                        playerPokemons.hp = 210
                        playerPokemons.pcHpBar(playerPokemons.hp)
                        break
                    } else {
                        console.log("teste2")
                        playerPokemons.hp += 20
                        playerPokemons.playerHpBar(playerPokemons.hp)
                        break
                    }
            }        
            if(pcPokemons.hp<=0){
                return game.changePokemon("PC", playerPokemons,pcPokemons)
            } else {
                randomPcMove(playerPokemons,pcPokemons)
                playerPokemons.playerHpBar(playerPokemons.hp)
                pcPokemons.pcHpBar(pcPokemons.hp)  
            }
            if(playerPokemons.hp<=0){
                return game.changePokemon("player", playerPokemons,pcPokemons)
            }
            return playerPokemons.hp, playerPokemons.attack, playerPokemons.defense, pcPokemons.hp
        } 
    } else {
        if(playerPokemons.hp>0){
            randomPcMove(playerPokemons,pcPokemons)
            playerPokemons.playerHpBar(playerPokemons.hp)
            pcPokemons.pcHpBar(pcPokemons.hp) 
            if(playerPokemons.hp<=0){
                return game.changePokemon("player", playerPokemons,pcPokemons)
            } else{
                switch(buttonName){
                    case "#fight":
                        document.querySelector('#playertext').innerHTML = `${playerPokemons.name} attacked`
                        pcPokemons.hp -= playerPokemons.fight(playerPokemons.attack, playerPokemons.defense)
                        pcPokemons.pcHpBar(pcPokemons.hp)
                        break
                    case "#attack":
                        document.querySelector('#playertext').innerHTML = `${playerPokemons.name} +att`
                        playerPokemons.attack += 20
                        break
                    case "#defense":
                        document.querySelector('#playertext').innerHTML = `${pcPokemons.name} -def`
                        pcPokemons.defense -= 10
                        break
                    case "#hp":
                        document.querySelector('#playertext').innerHTML = `${playerPokemons.name} +HP`
                        if(playerPokemons.hp > 190){
                            console.log("teste3")

                            playerPokemons.hp = 210
                            playerPokemons.playerHpBar(playerPokemons.hp)
                            break
                        } else {
                            console.log("teste4")

                            playerPokemons.hp += 20
                            playerPokemons.playerHpBar(playerPokemons.hp)
                            break
                        }             
                }  
            }
            if(pcPokemons.hp<=0){
                return game.changePokemon("PC", playerPokemons,pcPokemons)
            } 
            return playerPokemons.hp, playerPokemons.attack, playerPokemons.defense, pcPokemons.hp
        } 
    }
}

function isHpPositive(pokemonArray){
    if(pokemonArray[0].hp<=0 && pokemonArray[1].hp<=0){
        return pokemonArray[2]
    } else if(pokemonArray[0].hp<=0){
        return pokemonArray[1]
    } else {
        return pokemonArray[0]
    }
}

document.querySelector('#fight').onclick = () =>{
    buttons("#fight", isHpPositive(playerPokemons), isHpPositive(pcPokemons))
}

document.querySelector('#attack').onclick = () =>{
    buttons("#attack", isHpPositive(playerPokemons), isHpPositive(pcPokemons))
}

document.querySelector('#defense').onclick = () =>{
    buttons("#defense", isHpPositive(playerPokemons), isHpPositive(pcPokemons))
}

document.querySelector('#hp').onclick = () =>{
    buttons("#hp", isHpPositive(playerPokemons), isHpPositive(pcPokemons))
}

