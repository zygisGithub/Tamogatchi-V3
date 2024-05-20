const sprite = document.getElementById('sprite') as HTMLElement
const room = document.getElementById('room') as HTMLElement
const funBar1 = document.getElementById('funBar') as HTMLElement
const funDisplay1 = document.getElementById('funDisplay') as HTMLElement
const hungerBar1 = document.getElementById('hungerBar') as HTMLElement
const hungerDisplay1 = document.getElementById('hungerDisplay') as HTMLElement
const hpBar1 = document.getElementById('hpBar') as HTMLElement
const hpDisplay1 = document.getElementById('hpDisplay') as HTMLElement

let posX:number = 0
let posY:number = 0
let attacking:boolean = false
let posLeft:number = 400
let hunger:number = 100
let fun:number = 100
let health:number = 100
let gameActive:boolean = true

setInterval(function () {
    if (gameActive) {
        if (!(fun <= 0)) {
            fun --
            updateFun()
        }
        if (!(hunger <= 0)) {
            hunger --
            updateHunger()
        }
        if (fun === 0 && !(health <=0)) {
            health --
            updateHp()
        }
        if (hunger === 0 && !(health <=0)) {
            health --
            updateHp()
        }
    }
},1000)

setInterval(() => {
    sprite.style.backgroundPosition = `${posX}px ${posY}px`
    posX-= 100
    if (posY  === -160 && posX < -500) {
        posX = 0
    }
    if (posX < -600) {
        posX = 0
    }
},200)

document.addEventListener('keydown',(event) => {
    if (event.key === "ArrowLeft") {
        sprite.style.transform = 'scaleX(-1)'
        posY = -80
        posLeft -=4
        sprite.style.left = `${posLeft}px`
    }else if (event.key === 'ArrowRight') {
        sprite.style.transform = 'scaleX(1)'
        posY = -80
        posLeft +=4
        sprite.style.left = `${posLeft}px`
    }else if (event.key === ' ' && !attacking) {
        posX = 0
        posY = -160
        attacking = true
        setTimeout(function () {
            posY = 0
            posX = 0
            attacking = false
            if (fun < 100) {
                fun+=10
                updateFun()
            }
        },1200)
    }
})

document.addEventListener('keyup', (event) => {
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
        posY = 0
        posX = 0
    }
})


function spawnBread() {
    const randomNumber: number = Math.floor(Math.random() * (room.clientWidth - 50))
    const bread = document.createElement('div') as HTMLElement
    bread.className = 'bread fall'
    bread.style.top = '0px'
    bread.style.left = `${randomNumber}px`
    room.append(bread);
    bread.addEventListener('animationend', () => {
        bread.remove()
    })
}

function checkCollision() {
    const spriteRect = sprite.getBoundingClientRect()
    const breads = document.querySelectorAll('.bread')

    breads.forEach(bread => {
        const breadRect = bread.getBoundingClientRect()

        if (
            spriteRect.left < breadRect.right &&
            spriteRect.right > breadRect.left &&
            spriteRect.top < breadRect.bottom &&
            spriteRect.bottom > breadRect.top
        ) {
            bread.remove()
            if (hunger<100) {
                hunger +=20
                updateHunger()
            }
        }
    });
}

setInterval(spawnBread, 3000)
setInterval(checkCollision, 100)

function updateFun () {
    funBar1.style.width = `${fun}%`
    funDisplay1.innerHTML = `100/${fun}`
}
function updateHunger () {
    hungerBar1.style.width = `${hunger}%`
    hungerDisplay1.innerHTML = `100/${hunger}`
}
function updateHp () {
    hpBar1.style.width = `${health}%`
    hpDisplay1.innerHTML = `100/${health}`
}
function gameOver () {
    if (health <= 0) {
        alert('U lost')
        location.reload()
    }
}



