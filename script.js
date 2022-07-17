const realplayer = document.getElementById('realplayer-place');
const users = document.getElementById('users');
let game = [];


function oneplayer(name) {
    this.name = name 
    this.sum = 0
    this.round = []
}

function checkusername(name) {}


function addplayer(name, id = '' ) {
    if (name == 'other') {
        const user = document.getElementById('input-other')
        name = user.value
        user.value = '' 
    } else {
        const user = document.getElementById(id);
        user.classList.toggle('hove');
        user.disabled = true;
    }
    for (let i of game ) {
        if ( i.name == name) {
            return console.log('User with this name exist');
        }
    }
    const adduser = new oneplayer(name);
    game.push(adduser);
    users.innerHTML +=`<div id="table-${name}">${name}<i class="fa-solid fa-xmark" onclick="removeplayer('${name}')"></i></div>`
    console.log(game);
}

function removeplayer(name) {
    console.log(name, "remove")  
    const user = document.getElementById(`table-${name}`);
    user.remove()
    for (let i  = 0; i < game.length ; i++) {
        if ( game[i].name == name) {
            game.splice(i,1);
            console.log(game)
        }
    }
}