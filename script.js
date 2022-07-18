const realplayer = document.getElementById('realplayer-place');
const users = document.getElementById('users');
const start = document.getElementById('startbutton');
const place = document.getElementById('darts');
let game = [];
let hod = 1;
let round = 1;


function oneplayer(name) {
    this.name = name 
    this.sum = () => this.round.reduce((a,b) => a+b,0) 
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
        start.disabled =true;
        start.classList.toggle('hove');
        start.classList.toggle('downbutton');

    };
    button.classList.toggle('hove');
    button.classList.toggle('downbutton');
    button.disabled = false;
}

function startgame() {
    document.getElementById('pretstart').remove(); 
    let gamestr = '';
    let defvalsum = '';
    let defvalo = '';
    let num = 1;
    gamestr = `
                <div class="realplayer" id="realplayer">
                    <div class="row" id="realplayer-place" >
                        <p id="hodtext">walkin now , ${game[0].name}</p>
                        <input class="playername" type="text" id="input-move" >
                        <button class="butAddPlayer" id="button-move" onclick="hoduser()"> move </button>
                    </div>
                </div>
                <div class="tabel" id="table">
                    <div class="name"> 
                        <div>#</div>
                `
    for (let i of game) {
        if (num == 1) {
            gamestr +=  i.name.length > 5?`<div class="target" id="user-${num}">${i.name.slice(0,3)}..</div>`:`<div class="target" id="user-${num}">${i.name}</div>`;
            defvalsum += `<div class="target" id='sum-${num}'>0</div>`;
            defvalo += `<div class="target" id='pole-1-${num}'>0</div>`;
        } else {
            gamestr +=  i.name.length > 5?`<div id="user-${num}">${i.name.slice(0,3)}..</div>`:`<div id="user-${num}" >${i.name}</div>`;
            defvalsum += `<div id='sum-${num}'>0</div>`;
            defvalo += `<div id='pole-1-${num}'>0</div>`;
        }
        num++;
    }
    gamestr += `
            </div>
        </div>
        <div class="rounds" id="summas"> 
            <div class="round" id="sum" >
                <div>sum</div>
                ${defvalsum}
            </div>
        </div>
        <div class="rounds" id="rounds"> 
            <div class="round" id="round-1" >
                <div>1)</div>
                ${defvalo}
            </div>
        </div>
        <div class="realplayer" >
            <div class="row" id="realplayer-place" >
                <button id="startbutton" class="hove" onclick="finishgame()" > game finish</button>
            </div>
        </div>
        `
    darts.innerHTML = gamestr;    
}

function createround() {
    const poleround = document.getElementById('rounds')
    let str = `<div class="round" id="round-${round}" >
                    <div>${round})</div>`;
    for (let i = 1; i <= game.length; i++ ) {
        str += `<div id='pole-${round}-${i}'>0</div>`;
    }
    str += '</div>'
    poleround.innerHTML = str + poleround.innerHTML
}

function hoduser() {
    const userinput = document.getElementById('input-move');
    if (userinput.value == '' ||  isNaN(+userinput.value)) {
        return console.log('miss input')
    }
    const nametext = document.getElementById('hodtext');
    let sum = document.getElementById(`sum-${hod}`);
    let roundsum = document.getElementById(`pole-${round}-${hod}`);
    let usertarget = document.getElementById(`user-${hod}`);
    game[hod-1].round.push(+userinput.value);
    sum.innerHTML = game[hod-1].sum();
    roundsum.innerHTML = userinput.value;
    sum.classList.remove('target');
    roundsum.classList.remove('target');
    usertarget.classList.remove('target');
    userinput.value = ''
    if (hod + 1 > game.length ) {
        hod = 1;
        round++;
        createround();
    } else {
        hod++;
    }
    nametext.innerHTML = `walking now, ${game[hod-1].name}`
    sum = document.getElementById(`sum-${hod}`);
    roundsum = document.getElementById(`pole-${round}-${hod}`);
    usertarget = document.getElementById(`user-${hod}`)
    sum.classList.add('target')
    roundsum.classList.add('target');
    usertarget.classList.add('target');
}