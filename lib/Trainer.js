const Pokemon = require('./Pokemon')

class Trainer {
    constructor(name){
        this.name = name;
        this.pokemon = [];
    }
    addPokemon(name, hp, atk){
        let newPokemon = new Pokemon(name, hp, atk)
        this.pokemon.push(newPokemon)
    }
    getRandomPokemon(){
        return this.pokemon[Math.floor(Math.random() * this.pokemon.length)]
    }
}

module.exports = Trainer;