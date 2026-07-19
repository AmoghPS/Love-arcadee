let score1 = 0;
let score2 = 0;
let score3 = 0;

// =========================
// Screen Navigation
// =========================
function show(id) {
    document.querySelectorAll(".screen").forEach(screen => {
        screen.classList.remove("active");
    });

    document.getElementById(id).classList.add("active");
}

// =========================
// GAME 1
// =========================
function startGame1() {
    show("game1");
    startHeartGame();
}

const basket = document.getElementById("basket");
const gameArea = document.getElementById("gameArea");

gameArea.addEventListener("touchmove", (e) => {
    basket.style.left = (e.touches[0].clientX - 25) + "px";
});

gameArea.addEventListener("mousemove", (e) => {
    basket.style.left = (e.clientX - 25) + "px";
});

function startHeartGame() {

    score1 = 0;
    document.getElementById("score1").innerHTML = "Score: 0 / 20";

    const interval = setInterval(createHeart, 1200);

    function createHeart() {

        const heart = document.createElement("div");

        heart.innerHTML = "❤️";

        heart.style.position = "absolute";
        heart.style.fontSize = "34px";
        heart.style.left = Math.random() * 90 + "%";
        heart.style.top = "-40px";

        gameArea.appendChild(heart);

        let y = -40;

        const fall = setInterval(() => {

            y += 4;

            heart.style.top = y + "px";

            const heartRect = heart.getBoundingClientRect();
            const basketRect = basket.getBoundingClientRect();

            if (
                heartRect.bottom > basketRect.top &&
                heartRect.left < basketRect.right &&
                heartRect.right > basketRect.left
            ) {

                score1++;

                document.getElementById("score1").innerHTML =
                    "Score: " + score1 + " / 20";

                heart.remove();

                clearInterval(fall);

                if (score1 >= 20) {

                    clearInterval(interval);

                    showTransition(
"You're doing amazing! 💖<br><br>I love you ❤️",
startGame2
);

                }

            }

            if (y > window.innerHeight) {

                heart.remove();
                clearInterval(fall);

            }

        }, 20);

    }

}

// =========================
// GAME 2
// =========================
function startGame2() {

    show("game2");

    score2 = 0;

    const area = document.getElementById("tapArea");

    area.innerHTML = "";

    document.getElementById("score2").innerHTML = "Score: 0 / 25";

    const spawn = setInterval(createHeart, 1000);

    function createHeart() {

        const heart = document.createElement("div");

        heart.innerHTML = "💖";

        heart.style.position = "absolute";
        heart.style.fontSize = "40px";

        heart.style.left = Math.random() * (window.innerWidth - 50) + "px";
        heart.style.top = Math.random() * (window.innerHeight - 200) + "px";

        area.appendChild(heart);

        heart.onclick = () => {

            score2++;

            document.getElementById("score2").innerHTML =
                "Score: " + score2 + " / 25";

            heart.remove();

            if (score2 >=25) {

                clearInterval(spawn);

                showTransition(
"Two games down! 🌸<br><br>You're the cutest kitten ever ❤️",
startGame3
);

            }

        };

        setTimeout(() => {

            if (heart.parentNode) {

                heart.remove();

            }

        }, 1000);

    }

}

// =========================
// GAME 3
// =========================
function startGame3() {

    show("game3");

    score3 = 0;

    const area = document.getElementById("balloonArea");
    area.innerHTML = "";

    document.getElementById("score3").innerHTML = "Score: 0 / 30";

    // Slower spawning
    const spawn = setInterval(createItem, 1200);

    function createItem() {

        const item = document.createElement("div");

        const rand = Math.random();
        let points;

        if (rand < 0.20) {
            item.innerHTML = "💣";
            points = -3;
        }
        else if (rand < 0.40) {
            item.innerHTML = "💔";
            points = -3;
        }
        else if (rand < 0.65) {
            item.innerHTML = "⭐";
            points = 1;
        }
        else {
            item.innerHTML = "❤️";
            points = 1;
        }

        item.style.position = "absolute";
        item.style.fontSize = "45px";

        item.style.left = Math.random() * (window.innerWidth - 70) + "px";
        item.style.top = window.innerHeight + "px";

        area.appendChild(item);

        let y = window.innerHeight;

        const move = setInterval(() => {

            y -= 4; // slower movement
            item.style.top = y + "px";

            if (y < -60) {
                item.remove();
                clearInterval(move);
            }

        }, 20);

        item.onclick = () => {

            score3 += points;

            if (score3 < 0) score3 = 0;

            document.getElementById("score3").innerHTML =
                "Score: " + score3 + " / 30";

            item.remove();
            clearInterval(move);

            if (score3 >= 30) {
                clearInterval(spawn);
                showWin();
                
            }

        };

    }

}
// =========================
// WIN
// =========================
function showWin() {

    show("win");
    
    startConfetti();

}

function showTransition(message, nextGame){

    show("transition");

    document.getElementById("transitionMessage").innerHTML = message;

    let time = 7;

    document.getElementById("countdown").innerHTML =
    "Next game in " + time + "...";

    const timer = setInterval(()=>{

        time--;

        document.getElementById("countdown").innerHTML =
        "Next game in " + time + "...";

        if(time==0){

            clearInterval(timer);

            nextGame();

        }

    },1000);

}

function startConfetti(){

    const container = document.getElementById("confetti");

    setInterval(()=>{

        const piece = document.createElement("div");

        piece.className = "confetti";

        const colors = [
            "#ff4d88",
            "#ffcc00",
            "#66ccff",
            "#66ff99",
            "#ff6666",
            "#cc99ff"
        ];

        piece.style.background =
            colors[Math.floor(Math.random()*colors.length)];

        piece.style.left = Math.random()*100 + "vw";

        piece.style.animationDuration =
            (3 + Math.random()*3) + "s";

        container.appendChild(piece);

        setTimeout(()=>{
            piece.remove();
        },6000);

    },150);

}