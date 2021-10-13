let tetris = document.createElement('div')
tetris.classList.add('tetris')
// document.getElementsByClassName('container')[0].innerHtml = tetris

for(let i = 1; i < 181; i++) {
    let item = document.createElement('div')
    item.classList.add('tetris-item')
    tetris.append(item)
}
let container = document.getElementsByClassName('container')[0]
container.append(tetris)

//item
let item = document.getElementsByClassName('tetris-item')
let itemIndex = 0
for(let y = 18; y> 0; y--) {
    for(let x = 1; x < 11; x++) {
        item[itemIndex].setAttribute('x', x)
        item[itemIndex].setAttribute('y', y)
        itemIndex++
    }
}

let startItemX = 5
let startItemY = 15

let allItems = [
    //erkar@
   [
       [0, 1],
       [0, 2],
       [0, 3],
        //ptuyt 90 deg
       [
            [-1, 1],
            [0, 0],
            [1, -1],
            [2, -2],
       ],
       //ptuyt 180 deg
       [
            [1, -1],
            [0, 0],
            [-1, 1],
            [-2, 2],
       ],
        //ptuyt 270 deg
        [
            [-1, 1],
            [0, 0],
            [1, -1],
            [2, -2],
       ],
       //ptuyt 360 deg
       [
            [1, -1],
            [0, 0],
            [-1, 1],
            [-2, 2],
       ]
   ],

   //qarakusin
   [
       [1, 0],
       [0, 1],
       [1, 1],
       [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
       ],
       [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
       ],
       [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
       ],
       [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
        ]
   ],

   //L
   [
        [1, 0],
        [0, 1],
        [0, 2],
        //ptuyt 90 deg
        [
            [0, 0],
            [-1, 1],
            [1, 0],
            [2, -1],
       ],
        //ptuyt 180 deg
        [
            [1, -1],
            [1, -1],
            [-1, 0],
            [-1, 0],
       ],
        //ptuyt 270 deg
        [
            [-1, 0],
            [0, -1],
            [2, -2],
            [1, -1],
       ],
         //ptuyt 360 deg
         [
            [0, -1],
            [0, -1],
            [-2, 0],
            [-2, 0],
       ]
   ],

     //-L
    [
        [1, 0],
        [1, 1],
        [1, 2],
        [
            [0, 0],
            [0, 0],
            [1, -1],
            [-1, -1]
        ],
        [
            [0, -1],
            [-1, 0],
            [-2, 1],
            [1, 0]
        ],
        [
            [2, 0],
            [0, 0],
            [1, -1],
            [1, -1]
        ],
        [
            [-2, 0],
            [1, -1],
            [0, 0],
            [-1, 1]
        ]
    ],

   //z
   [
       [1, 0],
       [-1, 1],
       [0, 1],
       [
           [0, -1],
           [-1, 0],
           [2, -1],
           [1, 0]
       ],
       [
           [0, 0],
           [1, -1],
           [-2, 0],
           [-1, -1]
       ],
       [
           [0, -1],
           [-1, 0],
           [2, -1],
           [1, 0]
       ],
       [
            [0, 0],
            [1, -1],
            [-2, 0],
            [-1, -1]       
        ]
   ],

   //-z
   [
        [1, 0],
        [1, 1],
        [2, 1],
        [
            [2, -1],
            [0, 0],
            [1, -1],
            [-1, 0]
        ],
        [
            [-2, 0],
            [0, -1],
            [-1, 0],
            [1, -1]
        ],
        [
            [2, -1],
            [0, 0],
            [1, -1],
            [-1, 0]
        ],
        [
            [-2, 0],
            [0, -1],
            [-1, 0],
            [1, -1]
        ]
   ],

   [
       [1, 0],
       [2, 0],
       [1, 1],
       [
           [1, -1],
           [0, 0],
           [0, 0],
           [0, 0]
       ],
       [
           [0, 0],
           [-1, 0],
           [-1, 0],
           [1, -1]
       ],
       [
        [1, -1],
        [1, -1],
        [1, -1],
        [0, 0]
       ],
       [
           [-2, 0],
           [0, -1],
           [0, -1],
           [-1, -11]
       ]
   ]

] 

let currentItem = 0
let currentFullItem = 0
let rotate = 1

function createItem() {
    function randomItem() {
       return  Math.round(Math.random()*(allItems.length - 1))
    }

    rotate = 1
    currentItem = randomItem()

    currentFullItem = [
        document.querySelector(`[x = '${startItemX}'][y = '${startItemY}']`),
        document.querySelector(`[x = '${startItemX + allItems[currentItem][0][0]}'][y = '${startItemY + allItems[currentItem][0][1]}']`),
        document.querySelector(`[x = '${startItemX + allItems[currentItem][1][0]}'][y = '${startItemY + allItems[currentItem][1][1]}']`),
        document.querySelector(`[x = '${startItemX + allItems[currentItem][2][0]}'][y = '${startItemY + allItems[currentItem][2][1]}']`)
    
    ]

    for(let i = 0; i < currentFullItem.length; i++) {
        currentFullItem[i].classList.add('active')
    }
    
}
createItem()

let score = 0;
let input = document.getElementsByTagName('input')[0];
input.value = `Your points: ${score}`

function moveDown() {
    let canMoveDown = true
    let cordinates = [
        [currentFullItem[0].getAttribute('x'), currentFullItem[0].getAttribute('y')],
        [currentFullItem[1].getAttribute('x'), currentFullItem[1].getAttribute('y')],
        [currentFullItem[2].getAttribute('x'), currentFullItem[2].getAttribute('y')],
        [currentFullItem[3].getAttribute('x'), currentFullItem[3].getAttribute('y')]
    ]
    
    for(let i = 0; i < cordinates.length; i++) {
        if(cordinates[i][1] == 1 || document.querySelector(`[x = '${cordinates[i][0]}'][y = '${cordinates[i][1] - 1}']`).classList.contains('fixed')) {
            canMoveDown = false;
            break;
        }
    }
    if(canMoveDown) {
        for(let i = 0; i < currentFullItem.length; i++) {
            currentFullItem[i].classList.remove('active')
        }
        currentFullItem = [
            document.querySelector(`[x = '${cordinates[0][0]}'][y = '${cordinates[0][1] - 1}']`),
            document.querySelector(`[x = '${cordinates[1][0]}'][y = '${cordinates[1][1] - 1}']`),
            document.querySelector(`[x = '${cordinates[2][0]}'][y = '${cordinates[2][1] - 1}']`),
            document.querySelector(`[x = '${cordinates[3][0]}'][y = '${cordinates[3][1] - 1}']`)
        ]
        for(let i = 0; i < currentFullItem.length; i++) {
            currentFullItem[i].classList.add('active')
        }

    } else {
        for(let i = 0; i < currentFullItem.length; i++) {
            currentFullItem[i].classList.remove('active')
            currentFullItem[i].classList.add('fixed')
        }
        //havaqac tox@ jnjum a
        for(let i = 1; i <15; i++) {
            let fullCount = 0
            for(let j =1; j < 11; j ++) {
                if(document.querySelector(`[x = '${j}'][y = '${i}']`).classList.contains('fixed')) {
                    fullCount++;
                    if(fullCount === 10) {
                        score +=10
                        input.value = `Your points: ${score}`

                        for(let k = 1; k < 11; k++) {
                            document.querySelector(`[x = '${k}'][y = '${i}']`).classList.remove('fixed')
                        }
                        let fixed = document.querySelectorAll('.fixed')
                        let newFixed = []
                        for(let m = 0; m < fixed.length; m++) {
                            let fixedCordinates = [fixed[m].getAttribute('x'),fixed[m].getAttribute('y')]
                            if(fixedCordinates[1] > i) {
                                fixed[m].classList.remove('fixed');
                                newFixed.push(document.querySelector(`[x = '${fixedCordinates[0]}'][y = '${fixedCordinates[1] - 1}']`))
                            }
                        }

                        for(let a = 0; a < newFixed.length; a++) {
                            newFixed[a].classList.add('fixed')
                        }

                        i--
                    }
                }
            }
        }
        for(let n = 1; n < 11; n++) {
            if(document.querySelector(`[x = '${n}'][y = '15']`).classList.contains('fixed')) {
                clearInterval(interval)
                alert(`Game Over.Your points: ${score}`);
                break
            }
        }
        createItem()
    }
}

let interval = setInterval(() => {
    moveDown()
}, 300);

let canMoveLeftRight = true
document.addEventListener('keydown',function(e) {
    let cordinatesOne = [currentFullItem[0].getAttribute('x'), currentFullItem[0].getAttribute('y')];
    let cordinatesTwo = [currentFullItem[1].getAttribute('x'), currentFullItem[1].getAttribute('y')];
    let cordinatesTree = [currentFullItem[2].getAttribute('x'), currentFullItem[2].getAttribute('y')];
    let cordinatesFour = [currentFullItem[3].getAttribute('x'), currentFullItem[3].getAttribute('y')];

    function moveLeftRight(param) {
        canMoveLeftRight = true
        let newCurrentFullItem = [
            document.querySelector(`[x = "${+cordinatesOne[0] + param}"][y = "${cordinatesOne[1]}"]`),
            document.querySelector(`[x = "${+cordinatesTwo[0] + param}"][y = "${cordinatesTwo[1]}"]`),
            document.querySelector(`[x = "${+cordinatesTree[0] + param}"][y = "${cordinatesTree[1]}"]`),
            document.querySelector(`[x = "${+cordinatesFour[0] + param}"][y = "${cordinatesFour[1]}"]`)
        ]

        for(let i = 0; i < newCurrentFullItem.length; i++) {
            if(!newCurrentFullItem[i] || newCurrentFullItem[i].classList.contains('fixed')) {
                canMoveLeftRight = false
            }
        }

        if(canMoveLeftRight) {
            for(let i = 0; i < currentFullItem.length; i++) {
                currentFullItem[i].classList.remove('active')
            }

            currentFullItem = newCurrentFullItem
            for(let i = 0; i < currentFullItem.length; i++) {
                currentFullItem[i].classList.add('active')
            }
        }
    }

    function moveRotate(param) {
        canMoveLeftRight = true
        let newCurrentFullItem = [
            document.querySelector(`[x = "${+cordinatesOne[0] + allItems[currentItem][rotate + 2][0][0]}"][y = "${+cordinatesOne[1] + allItems[currentItem][rotate + 2][0][1]}"]`),
            document.querySelector(`[x = "${+cordinatesTwo[0] + allItems[currentItem][rotate + 2][1][0]}"][y = "${+cordinatesTwo[1] + allItems[currentItem][rotate + 2][1][1]}"]`),
            document.querySelector(`[x = "${+cordinatesTree[0] + allItems[currentItem][rotate + 2][2][0]}"][y = "${+cordinatesTree[1] + allItems[currentItem][rotate + 2][2][1]}"]`),
            document.querySelector(`[x = "${+cordinatesFour[0] + allItems[currentItem][rotate + 2][3][0]}"][y = "${+cordinatesFour[1] + allItems[currentItem][rotate + 2][3][1]}"]`)
        ]

        for(let i = 0; i < newCurrentFullItem.length; i++) {
            if(!newCurrentFullItem[i] || newCurrentFullItem[i].classList.contains('fixed')) {
                canMoveLeftRight = false
            }
        }

        if(canMoveLeftRight) {
            for(let i = 0; i < currentFullItem.length; i++) {
                currentFullItem[i].classList.remove('active')
            }

            currentFullItem = newCurrentFullItem
            for(let i = 0; i < currentFullItem.length; i++) {
                currentFullItem[i].classList.add('active')
            }

            if(rotate < 4) {
                rotate++
            } else {
                rotate = 1
            }
        }
    }


    if(e.keyCode === 37) {
        moveLeftRight(-1)
        console.log("aaaaaaa")
    } else if(e.keyCode === 39) {
        moveLeftRight(1)
    } else if(e.keyCode === 40) {
        moveDown()
    } else if(e.keyCode === 38) {
        moveRotate()
    }
})



