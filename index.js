const inquirer = require('inquirer')
const Trainer = require('./lib/Trainer')
let trainerArr = [new Trainer('Joe'), new Trainer('Louis')]

const question1 = [
    {
        type: 'list',
        message: 'What would you like to do?',
        choices: ['Add Trainer', 'Add Pokemon', 'Get Random Pokemon', 'Quit'],
        name: 'initial'
    }
]

const addTrainer = [
    {
        type: 'input',
        message: 'what is your trainer name',
        name: 'trainer'
    },
]

const getRandom = [
    {
        type: 'list',
        choices: trainerArr,
        message: 'Which Trainer',
        name: 'random'
    }
]

const addPokemon = [
    {
        type: 'list',
        choices: trainerArr,
        message: 'Which trainer does this Pokemon belong to?',
        name: 'pokeTrainer'
    },
    {
        type: 'input',
        message: 'What is the Pokemons name?',
        name: 'pokemon'
    },
    {
        type: 'number',
        message: 'What is the hp?',
        name: 'hp'
    },
    {
        type: 'number',
        message: 'What is the atk pwr?',
        name: 'atk'
    }
]


const game = async () => {
    let again = true;
    do {
        const answerSetOne = await inquirer.prompt(question1)
        const { initial } = answerSetOne
        let answerSetTwo
        let newTrainer
        let me
        switch (initial) {
            case 'Add Trainer':
                answerSetTwo = await inquirer.prompt(addTrainer)
                const { trainer } = answerSetTwo;
                newTrainer = new Trainer(trainer)
                trainerArr.push(newTrainer)
                console.table(trainerArr);
                break;
            case 'Add Pokemon':
                answerSetTwo = await inquirer.prompt(addPokemon)
                const { pokeTrainer, pokemon, hp, atk } = answerSetTwo
                me = trainerArr.filter(({name}) => name === pokeTrainer)
                console.log(pokemon, hp, atk)
                me[0].addPokemon(pokemon, hp, atk)
                console.table(JSON.stringify(trainerArr, null, 4))
                break;
            case 'Get Random Pokemon':
                answerSetTwo = await inquirer.prompt(getRandom)
                const { random } = answerSetTwo
                me = trainerArr.filter(({name}) => name === random)
                if(me[0].pokemon <= 0){
                    console.log('You have no Pokemon, go catch one you scrub!')
                } else {
                    let retPokemon = me[0].getRandomPokemon()
                    const { name, hp, atk, level} = retPokemon
                    console.log('------------------');
                    console.log(name,'\n', hp,'\n', atk,'\n', level)
                    console.log('------------------');
                }
                break;
            case 'Quit':
                again = false;
                break;

            default:
                throw new Error("You broke the thing")
        }

    } while (again == true)
}

game()