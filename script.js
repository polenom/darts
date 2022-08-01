let realplayer = document.getElementById('realplayer-place');
const users = document.getElementById('users');
const start = document.getElementById('startbutton');
const place = document.getElementById('darts');
let game = [];
let hod = 1;
let round = 1;


function checkSaveGame() {
   if  (localStorage['game'] ) {
        document.getElementById('return-game').innerHTML += `<button   onclick="returnGame()" > Return game</button>`
   }
}


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
            defvalo += `<div class="target" id='pole-1-${num}' >0</div>`;
        } else {
            gamestr +=  i.name.length > 5?`<div id="user-${num}">${i.name.slice(0,3)}..</div>`:`<div id="user-${num}" >${i.name}</div>`;
            defvalsum += `<div id='sum-${num}'>0</div>`;
            defvalo += `<div  id='pole-1-${num}' >0</div>`;
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
            <div class="row" id="finishtbutton" >
                <button  class="hove" onclick="finishgame()" > game finish</button>
            </div>
        </div>
        `
    darts.innerHTML = gamestr;    
}

function createround() {
    const poleround = document.getElementById('rounds')
    let str = `<div class="round " id="round-${round}" >
                    <div>${round})</div>`;
    for (let i = 1; i <= game.length; i++ ) {
        str += `<div сlass="click" id='pole-${round}-${i}' >0</div>`;
    }
    str += '</div>'
    poleround.innerHTML = str + poleround.innerHTML
}

function hoduser(value = undefined) {
    let userinput;
    console.log(value, 777)
    if (value == undefined) {
        userinput = document.getElementById('input-move');
        if (userinput.value == '' ||  isNaN(+userinput.value)) {
            return console.log('miss input')
        } else if ( 0 > +userinput.value || 180 < +userinput.value ) {
            userinput.value = 'invalid range';
            return console.log('invalid range');
        } 
        console.log(game[hod-1].sum + +userinput.value, 'summmmmmmmmmm')
        if (game[hod-1].sum() + +userinput.value > 501 ){
            userinput.value = 0
        }
        game[hod-1].round.push(+userinput.value);
    } else {
        console.log('value', value)
        userinput = {};
        userinput.value = value;
    }
    const nametext = document.getElementById('hodtext');
    let sum = document.getElementById(`sum-${hod}`);
    let roundsum = document.getElementById(`pole-${round}-${hod}`);
    let usertarget = document.getElementById(`user-${hod}`);
    saveGame();
    sum.innerHTML = game[hod-1].sum();
    roundsum.innerHTML = userinput.value;
    sum.classList.remove('target');
    roundsum.classList.remove('target');
    roundsum.setAttribute('ondblclick', `changePoint(${round}, ${hod})`);
    roundsum.classList.add('click');
    usertarget.classList.remove('target');
    userinput.value = ''
    if (hod + 1 > game.length ) {
        let sum = [];
        for (let i = 0 ; i < game.length ; i++) {
            if (game[i].sum() == 501) {
                sum.push(game[i])
            }
        }
        if (sum.length > 0) {
            document.getElementById('realplayer-place').innerHTML = ''
            document.getElementById('realplayer-place').innerHTML = `<p id="hodtext">WINNER${sum.length > 1?'S':''} , ${sum.map(a=> a.name).join(', ')}!!!!!!!!!!</p>`
            localStorage.removeItem('game')
            return undefined;
        }
        else {
            hod = 1;
            round++; 
            createround();
        }
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

function changePoint(r, h) {
    const getelem = document.getElementById(`pole-${r}-${h}`)
    getelem.innerHTML = `
        <input type="text" value="${getelem.innerHTML}" id="inputok-${r}-${h}">
        <button id="" class="hove" onclick="changePointOK(${r},${h})" > OK</button>
    `
    getelem.removeAttribute('ondblclick');
}

function changePointOK(r,h) {
    const getelemok = document.getElementById(`inputok-${r}-${h}`).value;
    if (getelemok == '' || isNaN(+getelemok)) {
        console.log('miss input')
    } 
    const getelem = document.getElementById(`pole-${r}-${h}`);
    getelem.innerHTML = `${getelemok}`;
    getelem.setAttribute('ondblclick', `changePoint(${r},${h})`);
    game[h-1]['round'][r-1] = +getelemok;
    saveGame();
    const getsum = document.getElementById(`sum-${h}`);
    getsum.innerHTML = game[h-1].sum();
   
}

function finishgame(yes=false) {
    console.log('yes', yes)
    if (!yes) {
        console.log(321)
        const elemfinish = document.getElementById('finishtbutton');
        elemfinish.innerHTML = `
        <p>Do you want finish game?</p>
        <button  class="hove" onclick="finishgame('yes')" > yes</button>
        <button  class="hove" onclick="finishgame('no')" > no, game</button>
    `
    } else if ( yes == 'yes') {
        location.reload()
    } else if ( yes == 'no') {
        const elemfinish = document.getElementById('finishtbutton');
        elemfinish.innerHTML = '<button  class="hove" onclick="finishgame()" > game finish</button>'
    }
}

function saveGame() {
    localStorage['game'] = JSON.stringify(game)
}

function returnGame() {
    console.log('return game');
    let gamejson = JSON.parse(localStorage['game']);
    game = []
    for (let i = 0; i < gamejson.length; i++ ) {
        const user = new oneplayer(gamejson[i].name);
        user.round = gamejson[i].round
        game.push(user)
    }
    startgame();
    console.log(game[0].round.length, game.length, 123 );
    for (let r = 0; r < game[0].round.length; r++) {
        console.log(r, 'rrrrrrrrrrrrrrrrrrrrrrrrrrr')
        for (let h =0; h < game.length; h++) {
            console.log(game[h].round[r], 'res')
            if (game[h].round[r] >= 0) {
                hoduser(game[h].round[r])
            }
        }
    }

}


checkSaveGame()