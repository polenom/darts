const realplayer = document.getElementById('realplayer-place');
const users = document.getElementById('users');
const start = document.getElementById('startbutton')
let game = [];


function oneplayer(name) {
    this.name = name 
    this.sum = 0
    this.round = []
}

function checkusername(name) {}


function addplayer(name, id = '' ) {
    if (name == 'other') {
        const user = document.getElementById('input-other');
        if ( user.value == '') {
            return console.log('username missing')
        }
        name = user.value
        user.value = '' 
    } else {
        const user = document.getElementById(id);
        user.classList.toggle('downbutton');
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
    
    if (game.length >= 2 && start.disabled) {
        start.disabled = false;
        start.classList.toggle('hove');
        start.classList.toggle('downbutton');
    } ;
    users.innerHTML +=`<div id="table-${name}"><span class="num">${game.length})</span> ${name}<i class="fa-solid fa-xmark" onclick="removeplayer('${name}')"></i></div>`
    console.log(game);
}

function removeplayer(name) {
    console.log(name, "remove")  
    const user = document.getElementById(`table-${name}`);
    user.remove()
    for (let i  = 0; i < game.length ; i++) {
        if ( game[i].name == name) {
            game.splice(i,1);
        }
    }
    const numbers = document.querySelectorAll("span.num");
    const button = document.getElementById(`button-${name}`);
    let num = 1;
    for (let i of numbers) {
        i.innerHTML = `${num}) `;
        num++;
    }
    if ( game.length < 2 && !start.disabled) {
        console.log('hhhhhhhhhhh')
        start.disabled =true;
        start.classList.toggle('hove');
        start.classList.toggle('downbutton');

    };
    button.classList.toggle('hove');
    button.classList.toggle('downbutton');
    button.disabled = false;
}