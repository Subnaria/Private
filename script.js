const dog = document.getElementById("dog");
const loveMessage = document.getElementById("love-message");
const messageElement = document.getElementById("message");

let isWalking = false;
let isMoving = false;
let position = window.innerWidth / 2 - 40; // Centre de l'écran au début
let speed = 0.7;
let moveDirection = 1;

// Messages d'amour
const loveMessages = [
    "Je t'aime mon amour 💖",
    "Tu es ma vie, mon amour 😘",
    "Je suis tellement heureux(se) avec toi ! 💕",
    "Je pense à toi tout le temps, Anouk ❤️",
    "Mon cœur bat plus fort pour toi ! 💓",
    "Chaque jour à tes côtés est un cadeau 🎁",
    "Tu es mon soleil ☀️",
    "Je ne veux jamais te quitter 💞",
    "Tu es la personne la plus importante pour moi 💖",
    "Je t'admire tellement, Anouk 😍",
    "Je t'aime de tout mon cœur 💘",
    "Je suis à toi pour toujours 💕",
    "Ma vie est plus belle avec toi 🥰",
    "Je t'adore plus que tout 😻",
    "Tu es mon trésor 💎",
    "Merci d'être là pour moi, je t'aime 😘",
    "Avec toi, je suis complet 💖",
    "Mon amour pour toi grandit chaque jour 💖",
    "Tu es ma moitié 💕",
    "Chaque moment passé avec toi est magique ✨"
];

// Fonction pour générer un message d'amour aléatoire
function getRandomLoveMessage() {
    const randomIndex = Math.floor(Math.random() * loveMessages.length);
    return loveMessages[randomIndex];
}

// Vérification et affichage du message du jour
function checkLastMessageDate() {
    const lastMessageDate = localStorage.getItem("lastMessageDate");
    const today = new Date().toLocaleDateString();

    if (lastMessageDate !== today) {
        localStorage.setItem("lastMessageDate", today);
        messageElement.innerText = getRandomLoveMessage();
        loveMessage.style.opacity = 1;
    } else {
        messageElement.innerText = "Tu as déjà ton mot doux pour aujourd'hui ! 💖";
        loveMessage.style.opacity = 0;
    }
}

// Fonction pour démarrer l'animation de marche
function startWalking() {
    if (!isWalking) {
        dog.style.animation = "walkAnimation 1s steps(8) infinite";
        isWalking = true;
        loveMessage.style.opacity = 0;
        startMoving();
    }
}

// Fonction pour démarrer l'animation de repos (idle)
function startIdle() {
    if (isWalking) {
        dog.style.animation = "idleAnimation 0.8s steps(5) infinite";
        setTimeout(() => {
            loveMessage.style.opacity = 1;
        }, 500);
        isWalking = false;
        stopMoving();
    }
}

// Fonction de mise à jour de la position du message d'amour
function updateMessagePosition() {
    loveMessage.style.left = `${position + 20}px`;
    loveMessage.style.top = `${dog.offsetTop - 30}px`;
}

// Fonction pour déplacer le chien sur l'écran
function moveDog() {
    if (isMoving && isWalking) {
        position += speed * moveDirection;

        if (position > window.innerWidth - 80 || position < 0) {
            moveDirection *= -1;
            dog.style.transform = moveDirection === 1 ? "scaleX(1)" : "scaleX(-1)";
        }

        position = Math.max(0, Math.min(position, window.innerWidth - 80));
        dog.style.left = position + "px";
        updateMessagePosition();

        requestAnimationFrame(moveDog);
    }
}

// Fonction pour démarrer le mouvement
function startMoving() {
    isMoving = true;
    moveDog();
}

// Fonction pour arrêter le mouvement
function stopMoving() {
    isMoving = false;
}


// Décider si le chien doit marcher ou s'arrêter
function decideAction() {
    const randomDecisionTime = Math.random() * (7000 - 3000) + 3000;
    setTimeout(() => {
        if (isWalking) {
            startIdle();
        } else {
            // Si le chien est déjà en idle, on le fait immédiatement marcher
            startWalking();
        }
        decideAction();
    }, randomDecisionTime);
}



// Fonction liée au bouton "Découvre ton message du jour"
function nouveauMessage() {
    checkLastMessageDate(); // Affiche le message du jour lorsqu'on clique sur le bouton
}

// Afficher le menu
function showMenu() {
    document.getElementById("mainContent").style.display = "none";
    document.getElementById("menu").style.display = "block";
}

// Retourner à la page principale
function startPage() {
    document.getElementById("mainContent").style.display = "block";
    document.getElementById("menu").style.display = "none";
}

// Fonction calculant les jours restants pour le premier jour ensemble et l'anniversaire
function updateCountdown() {
    const now = new Date(); // Date actuelle
    
    // Date du premier jour ensemble (20 mars de cette année)
    let firstDay = new Date(now.getFullYear(), 2, 20); // Mois de mars (0-indexé)
    
    // Si le 20 mars de cette année est déjà passé, on prend le 20 mars de l'année suivante
    if (now > firstDay) {
        firstDay = new Date(now.getFullYear() + 1, 2, 20); // 20 mars de l'année prochaine
    }

    // Date de l'anniversaire d'Anouk (9 juin de cette année)
    let anniversary = new Date(now.getFullYear(), 5, 9); // Mois de juin (0-indexé)
    
    // Si le 9 juin de cette année est déjà passé, on prend le 9 juin de l'année suivante
    if (now > anniversary) {
        anniversary = new Date(now.getFullYear() + 1, 5, 9); // 9 juin de l'année prochaine
    }

    // Calcul du nombre de jours restants pour le 20 mars et l'anniversaire d'Anouk
    const firstDayDiff = firstDay - now; // Différence en millisecondes
    const anniversaryDiff = anniversary - now; // Différence en millisecondes

    const daysFirstDay = Math.ceil(firstDayDiff / (1000 * 60 * 60 * 24)); // Conversion des millisecondes en jours
    const daysAnniversary = Math.ceil(anniversaryDiff / (1000 * 60 * 60 * 24)); // Conversion en jours

    // Affichage des jours restants
    document.getElementById("firstDayCountdown").innerText = `Dans ${daysFirstDay} jours, ça feras déjà 1 ans💖`;
    document.getElementById("anniversaryCountdown").innerText = `Dans ${daysAnniversary} jours, avant l'anniversaire de ma femme Capable !💖`;
}


// Initialisation au chargement de la page
window.onload = function() {
    // Initialisation du chien en idle
    dog.style.left = `${position}px`;
    dog.style.animation = "idleAnimation 0.8s steps(5) infinite"; // Idle initiale
    loveMessage.style.opacity = 1;
    updateMessagePosition();
    decideAction();
    // Vérification et affichage du message du jour
    checkLastMessageDate();
    updateCountdown();
};