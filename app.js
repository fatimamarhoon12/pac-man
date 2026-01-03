document.addEventListener('DOMContentLoaded', () => {
    const scoreDisplay = document.getElementById('score');
    const timeDisplay = document.getElementById('time');
    const livesDisplay = document.getElementById('lives');
    const width = 28;
    const PacmanStart = 490;
    let score = 0;
    let Timer = 180;
    let timerId = null;
    let lives = 4;
    //let isPaused = false;
    const grid = document.querySelector('.grid');

    const layout = [
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
        1, 3, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 3, 1,
        1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
        1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
        1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
        1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 1, 1, 2, 2, 1, 1, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 2, 2, 2, 2, 2, 2, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
        4, 4, 4, 4, 4, 4, 0, 0, 0, 4, 1, 2, 2, 2, 2, 2, 2, 1, 4, 0, 0, 0, 4, 4, 4, 4, 4, 4,
        1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 2, 2, 2, 2, 2, 2, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
        1, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
        1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
        1, 3, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 3, 1,
        1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1,
        1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1,
        1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1,
        1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1,
        1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1,
        1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1

    ]
    livesDisplay.innerHTML=lives;

    // 0 - pac-dots
    // 1 - wall
    // 2 - ghost-lair
    // 3 - power-pellet
    // 4 - empty

    const squares = [];

    function createBoard() {
        for (let i = 0; i < layout.length; i++) {
            const square = document.createElement('div');
            square.id = i;
            grid.appendChild(square);
            squares.push(square);

            //layout 
            if (layout[i] === 0) {
                squares[i].classList.add('pac-dot');
            }
            if (layout[i] === 1) {
                squares[i].classList.add('wall');
            }
            if (layout[i] === 2) {
                squares[i].classList.add('ghost-lair');
            }
            if (layout[i] === 3) {
                squares[i].classList.add('power-pellet');
            }
        }
    }
    createBoard();

    //creat character
    let pacmanCurrentIndex = PacmanStart; //pac-man at index 490 
    squares[pacmanCurrentIndex].classList.add('pac-man');

    function movePacman(e) {
        squares[pacmanCurrentIndex].classList.remove('pac-man'); // to remove pac man form the privious index يعني لما يتحرك تنشال الصورة القبلية مالته 
        switch (e.key) {
            case 'ArrowLeft':
                if (pacmanCurrentIndex % width !== 0 && !squares[pacmanCurrentIndex - 1].classList.contains('wall') && !squares[pacmanCurrentIndex - 1].classList.contains('ghost-lair')) {

                    pacmanCurrentIndex -= 1;
                }
                if (squares[pacmanCurrentIndex - 1] === squares[363]) {
                    pacmanCurrentIndex = 391;
                }
                break;
            case 'ArrowRight':
                if (pacmanCurrentIndex % width < width - 1 && !squares[pacmanCurrentIndex + 1].classList.contains('wall') && !squares[pacmanCurrentIndex + 1].classList.contains('ghost-lair')) {
                    pacmanCurrentIndex += 1;
                }
                if (squares[pacmanCurrentIndex + 1] === squares[392]) {
                    pacmanCurrentIndex = 364;
                }
                break;
            case 'ArrowUp':
                if (pacmanCurrentIndex - width >= 0 && !squares[pacmanCurrentIndex - width].classList.contains('wall') && !squares[pacmanCurrentIndex - width].classList.contains('ghost-lair')) {
                    pacmanCurrentIndex -= width;
                }

                break;
            case 'ArrowDown':
                if (pacmanCurrentIndex + width < width * width && !squares[pacmanCurrentIndex + width].classList.contains('wall') && !squares[pacmanCurrentIndex + width].classList.contains('ghost-lair')) {
                    pacmanCurrentIndex += width;
                }

                break;
        }
        squares[pacmanCurrentIndex].classList.add('pac-man');
        pacDotEaten();
        powerPelletEaten();
        KillPacman();
        checkForWin();
        checkForGameOver();
    }
    document.addEventListener('keydown', movePacman);



    function pacDotEaten() {
        if (squares[pacmanCurrentIndex].classList.contains('pac-dot')) {
            // dose pac man eat the dot ? 
            score++; // if yes , ++ socre 
            scoreDisplay.innerHTML = score;
            squares[pacmanCurrentIndex].classList.remove('pac-dot'); // to remove the pac dot if eat it 
        }
    }
    function powerPelletEaten() {
        if (squares[pacmanCurrentIndex].classList.contains('power-pellet')) {
            // same as the dot , but here ++ 10 
            score += 10;
            scoreDisplay.innerHTML = score; // to display the number at the score 
            ghosts.forEach(ghost => ghost.isScared = true); // pac man can eat the ghost for some times 10s 
            setTimeout(unScareGhosts, 10000); // after the  10s == isScared== flase 

            squares[pacmanCurrentIndex].classList.remove('power-pellet');
        }
    }
    function unScareGhosts() {
        ghosts.forEach(ghost => ghost.isScared = false); // the ghost back to normal 
    }
    class Ghost {
        constructor(className, startIndex, speed) {
            this.className = className;
            this.startIndex = startIndex;
            this.speed = speed;
            this.currentIndex = startIndex;
            this.isScared = false;
            this.timerId = NaN;
        }

        respawn() {
            squares[this.currentIndex].classList.remove(this.className);
            squares[this.currentIndex].classList.remove('ghost');
            this.currentIndex = this.startIndex;
        }
    }
    ghosts = [
        new Ghost('blinky', 348, 250),
        new Ghost('pinky', 376, 400),
        new Ghost('inky', 351, 300),
        new Ghost('clyde', 379, 500)

    ]
    ghosts.forEach(ghost => {
        squares[ghost.startIndex].classList.add(ghost.className);
    });

    ghosts.forEach(ghost => moveGhost(ghost));

    function moveGhost(ghost) {

        const directions = [-1, +1, -width, +width]; //-1 move left , +1 right , -width up , +width down
        let direction = directions[Math.floor(Math.random() * directions.length)];

        ghost.timerId = setInterval(function () {
            if ( //make sure  move next seq is not wall and there are no ghost 
                !squares[ghost.currentIndex + direction].classList.contains('ghost') &&
                !squares[ghost.currentIndex + direction].classList.contains('wall')
            ) {
                squares[ghost.currentIndex].classList.remove(ghost.className, 'ghost', 'scared-ghost');
                ghost.currentIndex += direction; // update the current direction 
                squares[ghost.currentIndex].classList.add(ghost.className, 'ghost');
            } else direction = directions[Math.floor(Math.random() * directions.length)];

            if (ghost.isScared) {
                squares[ghost.currentIndex].classList.add('scared-ghost'); //if the ghosts scared pac man can eat them
            }

            if (ghost.isScared && squares[ghost.currentIndex].classList.contains('pac-man')) {
                squares[ghost.currentIndex].classList.remove(ghost.className, 'ghost', 'scared-ghost');
                ghost.currentIndex = ghost.startIndex;
                score += 100;
                scoreDisplay.innerHTML = score;
                squares[ghost.currentIndex].classList.add(ghost.className, 'ghost'); // if pac man eat the ghost , return back the ghost to the startIndex to start again 
            }
            checkForGameOver(); // if the ghost eat pac man == game over 

        }, ghost.speed);
    }

    // live<=0 , timer < =0 , die
    function checkForGameOver() {
        if (lives <= 0 || Timer <= 0) {
            ghosts.forEach(ghost => clearInterval(ghost.timerId)); // stop the move of the ghost if eat pac man 
            document.removeEventListener('keydown', movePacman); // stop pac man move
            clearInterval(timerId);
            setTimeout(function () {
                alert('Game Over! Your score is ' + score);
            }, 500);
        }

    }
    function checkForWin() {
        if (score >= 274) {
            ghosts.forEach(ghost => clearInterval(ghost.timerId));
            document.removeEventListener('keydown', movePacman);
            setTimeout(function () {
                alert('You Win! Your score is ' + score);
            }, 500);
        }
    }
    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}:${secs.toString().padStart(2, '0')}`;
    }
    function startTimer() {

        timerId = setInterval(function () {
            Timer--;
            timeDisplay.innerHTML = formatTime(Timer);
        }, 1000);

    }
    startTimer();

    function KillPacman() {
        if (squares[pacmanCurrentIndex].classList.contains('ghost') &&
            !squares[pacmanCurrentIndex].classList.contains('scared-ghost')) {
            ghosts.forEach(ghost => ghost.respawn());
            squares[pacmanCurrentIndex].classList.remove('pac-man');
            pacmanCurrentIndex = PacmanStart;
            squares[pacmanCurrentIndex].classList.add('pac-man');
            lives--;
            livesDisplay.innerHTML = lives;
            console.log("number"+lives);

        }
        

    }


});

