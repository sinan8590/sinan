// Navigation functions
function goToAlphabet() {
    window.location.href = 'alphabet.html';
}

function goHome() {
    window.location.href = 'index.html';
}

function goToOrgans() {
    window.location.href = 'body-organs.html';
}

function goToBodyActivities() {
    window.location.href = 'body-activities.html';
}

// Audio functionality
let currentAudio = null;
let isPlayingAll = false;
let playAllInterval = null;

// Statistics tracking
let letterStats = {};
let totalClicks = 0;
let uniqueLetters = new Set();
let wordsLearned = 0;

// Enhanced letter data with multiple words and examples
const letterData = {
    'A': { 
        words: ['Apple', 'Ant', 'Airplane', 'Alligator', 'Angel'],
        emojis: ['🍎', '🐜', '✈️', '🐊', '👼'],
        audio: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/a--_gb_1.mp3'
    },
    'B': { 
        words: ['Ball', 'Bear', 'Bird', 'Butterfly', 'Banana'],
        emojis: ['⚽', '🐻', '🐦', '🦋', '🍌'],
        audio: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/b--_gb_1.mp3'
    },
    'C': { 
        words: ['Cat', 'Car', 'Cow', 'Cake', 'Cloud'],
        emojis: ['🐱', '🚗', '🐄', '🍰', '☁️'],
        audio: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/c--_gb_1.mp3'
    },
    'D': { 
        words: ['Dog', 'Duck', 'Dinosaur', 'Doll', 'Diamond'],
        emojis: ['🐕', '🦆', '🦕', '🧸', '💎'],
        audio: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/d--_gb_1.mp3'
    },
    'E': { 
        words: ['Elephant', 'Egg', 'Eagle', 'Earth', 'Eye'],
        emojis: ['🐘', '🥚', '🦅', '🌍', '👁️'],
        audio: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/e--_gb_1.mp3'
    },
    'F': { 
        words: ['Fish', 'Flower', 'Fox', 'Frog', 'Fire'],
        emojis: ['🐠', '🌸', '🦊', '🐸', '🔥'],
        audio: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/f--_gb_1.mp3'
    },
    'G': { 
        words: ['Giraffe', 'Girl', 'Goat', 'Gift', 'Garden'],
        emojis: ['🦒', '👧', '🐐', '🎁', '🌺'],
        audio: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/g--_gb_1.mp3'
    },
    'H': { 
        words: ['House', 'Heart', 'Horse', 'Hat', 'Hand'],
        emojis: ['🏠', '❤️', '🐎', '👒', '✋'],
        audio: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/h--_gb_1.mp3'
    },
    'I': { 
        words: ['Ice Cream', 'Ice', 'Igloo', 'Insect', 'Island'],
        emojis: ['🍦', '🧊', '🏠', '🦗', '🏝️'],
        audio: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/i--_gb_1.mp3'
    },
    'J': { 
        words: ['Jellyfish', 'Jump', 'Jacket', 'Jelly', 'Jewel'],
        emojis: ['🪼', '🦘', '🧥', '🍯', '💎'],
        audio: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/j--_gb_1.mp3'
    },
    'K': { 
        words: ['Kangaroo', 'King', 'Kite', 'Key', 'Kitten'],
        emojis: ['🦘', '👑', '🪁', '🔑', '🐱'],
        audio: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/k--_gb_1.mp3'
    },
    'L': { 
        words: ['Lion', 'Lemon', 'Leaf', 'Lamp', 'Love'],
        emojis: ['🦁', '🍋', '🍃', '💡', '💕'],
        audio: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/l--_gb_1.mp3'
    },
    'M': { 
        words: ['Monkey', 'Moon', 'Milk', 'Music', 'Mouse'],
        emojis: ['🐒', '🌙', '🥛', '🎵', '🐭'],
        audio: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/m--_gb_1.mp3'
    },
    'N': { 
        words: ['Nest', 'Night', 'Nose', 'Number', 'Nurse'],
        emojis: ['🪺', '🌙', '👃', '🔢', '👩‍⚕️'],
        audio: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/n--_gb_1.mp3'
    },
    'O': { 
        words: ['Orange', 'Owl', 'Ocean', 'Octopus', 'Orange'],
        emojis: ['🍊', '🦉', '🌊', '🐙', '🍊'],
        audio: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/o--_gb_1.mp3'
    },
    'P': { 
        words: ['Panda', 'Pizza', 'Pig', 'Pencil', 'Puppy'],
        emojis: ['🐼', '🍕', '🐷', '✏️', '🐶'],
        audio: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/p--_gb_1.mp3'
    },
    'Q': { 
        words: ['Queen', 'Quack', 'Question', 'Quilt', 'Quail'],
        emojis: ['👑', '🦆', '❓', '🛏️', '🐦'],
        audio: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/q--_gb_1.mp3'
    },
    'R': { 
        words: ['Rainbow', 'Rabbit', 'Rose', 'Rain', 'Robot'],
        emojis: ['🌈', '🐰', '🌹', '🌧️', '🤖'],
        audio: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/r--_gb_1.mp3'
    },
    'S': { 
        words: ['Star', 'Sun', 'Snake', 'Snow', 'Ship'],
        emojis: ['⭐', '☀️', '🐍', '❄️', '🚢'],
        audio: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/s--_gb_1.mp3'
    },
    'T': { 
        words: ['Tree', 'Tiger', 'Train', 'Toy', 'Turtle'],
        emojis: ['🌳', '🐯', '🚂', '🧸', '🐢'],
        audio: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/t--_gb_1.mp3'
    },
    'U': { 
        words: ['Umbrella', 'Unicorn', 'Up', 'Under', 'Uncle'],
        emojis: ['☂️', '🦄', '⬆️', '⬇️', '👨'],
        audio: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/u--_gb_1.mp3'
    },
    'V': { 
        words: ['Violin', 'Van', 'Vase', 'Vegetable', 'Vampire'],
        emojis: ['🎻', '🚐', '🏺', '🥕', '🧛'],
        audio: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/v--_gb_1.mp3'
    },
    'W': { 
        words: ['Whale', 'Water', 'Wolf', 'Window', 'Worm'],
        emojis: ['🐋', '💧', '🐺', '🪟', '🪱'],
        audio: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/w--_gb_1.mp3'
    },
    'X': { 
        words: ['Xylophone', 'X-ray', 'X marks', 'Xylophone', 'Xylophone'],
        emojis: ['🎵', '📷', '❌', '🎵', '🎵'],
        audio: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/x--_gb_1.mp3'
    },
    'Y': { 
        words: ['Yellow', 'Yacht', 'Yoga', 'Yawn', 'Yummy'],
        emojis: ['💛', '⛵', '🧘', '😴', '😋'],
        audio: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/y--_gb_1.mp3'
    },
    'Z': { 
        words: ['Zebra', 'Zoo', 'Zipper', 'Zigzag', 'Zebra'],
        emojis: ['🦓', '🦁', '🤐', '⚡', '🦓'],
        audio: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/z--_gb_1.mp3'
    }
};

// Function to get random word and emoji for a letter
function getRandomWordAndEmoji(letter) {
    const data = letterData[letter];
    if (!data || !data.words || !data.emojis) {
        return { word: letter, emoji: '🔤' };
    }
    
    const randomIndex = Math.floor(Math.random() * data.words.length);
    return {
        word: data.words[randomIndex],
        emoji: data.emojis[randomIndex]
    };
}

// Function to play individual letter audio
function playLetter(letter) {
    // Stop any currently playing audio
    if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
    }
    
    // Update statistics
    updateStats(letter);
    
    // Add click animation
    const letterCard = document.querySelector(`[data-letter="${letter}"]`);
    if (letterCard) {
        letterCard.classList.add('clicked');
        setTimeout(() => {
            letterCard.classList.remove('clicked');
        }, 300);
        
        // Update the word and emoji randomly
        const { word, emoji } = getRandomWordAndEmoji(letter);
        const wordElement = letterCard.querySelector('.word');
        const emojiElement = letterCard.querySelector('.emoji');
        
        if (wordElement) wordElement.textContent = word;
        if (emojiElement) emojiElement.textContent = emoji;
    }
    
    // Create and play audio
    try {
        currentAudio = new Audio(letterData[letter].audio);
        currentAudio.play().catch(error => {
            console.log('Audio playback failed, using fallback method');
            // Fallback: Use speech synthesis
            speakLetter(letter);
        });
    } catch (error) {
        console.log('Audio creation failed, using speech synthesis');
        speakLetter(letter);
    }
}

// Function to update statistics
function updateStats(letter) {
    // Update letter stats
    if (!letterStats[letter]) {
        letterStats[letter] = 0;
        uniqueLetters.add(letter);
    }
    letterStats[letter]++;
    
    // Update total clicks
    totalClicks++;
    wordsLearned++;
    
    // Update click count on letter card
    const letterCard = document.querySelector(`[data-letter="${letter}"]`);
    if (letterCard) {
        const clickCountElement = letterCard.querySelector('.click-count');
        if (clickCountElement) {
            clickCountElement.textContent = letterStats[letter];
        }
    }
    
    // Update display
    updateStatsDisplay();
}

// Function to update statistics display
function updateStatsDisplay() {
    const totalClicksElement = document.getElementById('total-clicks');
    const uniqueLettersElement = document.getElementById('unique-letters');
    const favoriteLetterElement = document.getElementById('favorite-letter');
    const wordsLearnedElement = document.getElementById('words-learned');
    const lettersClickedElement = document.getElementById('letters-clicked');
    
    if (totalClicksElement) totalClicksElement.textContent = totalClicks;
    if (uniqueLettersElement) uniqueLettersElement.textContent = uniqueLetters.size;
    if (wordsLearnedElement) wordsLearnedElement.textContent = `Words Learned: ${wordsLearned}`;
    if (lettersClickedElement) lettersClickedElement.textContent = `Letters Clicked: ${uniqueLetters.size}`;
    
    // Find favorite letter
    let favoriteLetter = '-';
    let maxClicks = 0;
    for (const [letter, clicks] of Object.entries(letterStats)) {
        if (clicks > maxClicks) {
            maxClicks = clicks;
            favoriteLetter = letter;
        }
    }
    if (favoriteLetterElement) favoriteLetterElement.textContent = favoriteLetter;
}

// Function to reset statistics
function resetStats() {
    letterStats = {};
    totalClicks = 0;
    uniqueLetters.clear();
    wordsLearned = 0;
    
    // Reset click counts on all letter cards
    const letterCards = document.querySelectorAll('.letter-card');
    letterCards.forEach(card => {
        const clickCountElement = card.querySelector('.click-count');
        if (clickCountElement) {
            clickCountElement.textContent = '0';
        }
    });
    
    updateStatsDisplay();
}

// Fallback function using speech synthesis
function speakLetter(letter) {
    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(letter);
        utterance.rate = 0.8;
        utterance.pitch = 1.2;
        utterance.volume = 1;
        speechSynthesis.speak(utterance);
    }
}

// Function to play all letters in sequence
function playAllLetters() {
    if (isPlayingAll) {
        stopAudio();
        return;
    }
    
    isPlayingAll = true;
    const letters = Object.keys(letterData);
    let currentIndex = 0;
    
    // Update button text
    const playAllButton = document.querySelector('.play-all-button');
    if (playAllButton) {
        playAllButton.textContent = '⏸️ Pause All';
    }
    
    function playNextLetter() {
        if (!isPlayingAll || currentIndex >= letters.length) {
            isPlayingAll = false;
            if (playAllButton) {
                playAllButton.textContent = '🎵 Play All Letters';
            }
            return;
        }
        
        const letter = letters[currentIndex];
        playLetter(letter);
        
        // Highlight current letter
        const letterCard = document.querySelector(`[data-letter="${letter}"]`);
        if (letterCard) {
            letterCard.style.transform = 'translateY(-15px) scale(1.1)';
            letterCard.style.boxShadow = '0 20px 40px rgba(255, 107, 157, 0.4)';
            letterCard.style.borderColor = '#ff6b9d';
            
            setTimeout(() => {
                letterCard.style.transform = '';
                letterCard.style.boxShadow = '';
                letterCard.style.borderColor = '';
            }, 2000);
        }
        
        currentIndex++;
        
        // Schedule next letter
        playAllInterval = setTimeout(playNextLetter, 2500);
    }
    
    playNextLetter();
}

// Function to stop all audio
function stopAudio() {
    isPlayingAll = false;
    
    if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
        currentAudio = null;
    }
    
    if (playAllInterval) {
        clearTimeout(playAllInterval);
        playAllInterval = null;
    }
    
    // Reset button text
    const playAllButton = document.querySelector('.play-all-button');
    if (playAllButton) {
        playAllButton.textContent = '🎵 Play All Letters';
    }
    
    // Reset all letter cards
    const letterCards = document.querySelectorAll('.letter-card');
    letterCards.forEach(card => {
        card.style.transform = '';
        card.style.boxShadow = '';
        card.style.borderColor = '';
    });
}

// Add keyboard support for letter navigation
document.addEventListener('keydown', function(event) {
    const key = event.key.toUpperCase();
    if (letterData[key]) {
        playLetter(key);
    }
    
    // Space bar to play/pause all
    if (event.code === 'Space') {
        event.preventDefault();
        if (isPlayingAll) {
            stopAudio();
        } else {
            playAllLetters();
        }
    }
    
    // Escape to stop all
    if (event.code === 'Escape') {
        stopAudio();
    }
});

// Add touch/click feedback for mobile devices
document.addEventListener('DOMContentLoaded', function() {
    // Add ripple effect to letter cards
    const letterCards = document.querySelectorAll('.letter-card');
    
    letterCards.forEach(card => {
        card.addEventListener('touchstart', function(e) {
            this.style.transform = 'scale(0.95)';
        });
        
        card.addEventListener('touchend', function(e) {
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
    
    // Add welcome page animations
    const welcomeSection = document.querySelector('.welcome-section');
    if (welcomeSection) {
        // Add some interactive elements
        const startButton = document.querySelector('.start-button');
        if (startButton) {
            startButton.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-8px) scale(1.05)';
            });
            
            startButton.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        }
    }
    
    // Add confetti effect for successful interactions
    function createConfetti() {
        const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3'];
        const confettiCount = 50;
        
        for (let i = 0; i < confettiCount; i++) {
            const confetti = document.createElement('div');
            confetti.style.position = 'fixed';
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.top = '-10px';
            confetti.style.width = '10px';
            confetti.style.height = '10px';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.borderRadius = '50%';
            confetti.style.pointerEvents = 'none';
            confetti.style.zIndex = '9999';
            confetti.style.animation = `fall ${Math.random() * 3 + 2}s linear forwards`;
            
            document.body.appendChild(confetti);
            
            setTimeout(() => {
                confetti.remove();
            }, 5000);
        }
    }

    // Trigger confetti on special interactions
    letterCards.forEach((card, index) => {
        card.addEventListener('click', function() {
            if (index % 5 === 0) { // Every 5th letter
                createConfetti();
            }
        });
    });
});

// Add accessibility features
function addAccessibilityFeatures() {
    // Add ARIA labels to letter cards
    const letterCards = document.querySelectorAll('.letter-card');
    letterCards.forEach(card => {
        const letter = card.getAttribute('data-letter');
        const word = letterData[letter]?.words?.[0] || letter;
        card.setAttribute('aria-label', `Letter ${letter} for ${word}. Click to hear the sound.`);
        card.setAttribute('role', 'button');
        card.setAttribute('tabindex', '0');
        
        // Add keyboard support
        card.addEventListener('keydown', function(e) {
            if (e.code === 'Enter' || e.code === 'Space') {
                e.preventDefault();
                playLetter(letter);
            }
        });
    });
}

// Initialize accessibility features when DOM is loaded
document.addEventListener('DOMContentLoaded', addAccessibilityFeatures);

// Body Organs functionality
let organStats = {};
let totalOrganClicks = 0;
let uniqueOrgans = new Set();
let organsLearned = 0;

// External body parts data with descriptions
const organData = {
    'Head': { 
        description: 'The top part of your body',
        audio: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/head--_gb_1.mp3'
    },
    'Hair': { 
        description: 'Grows on your head',
        audio: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/hair--_gb_1.mp3'
    },
    'Face': { 
        description: 'The front part of your head',
        audio: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/face--_gb_1.mp3'
    },
    'Eyes': { 
        description: 'Help you see the world',
        audio: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/eye--_gb_1.mp3'
    },
    'Ears': { 
        description: 'Help you hear sounds',
        audio: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/ear--_gb_1.mp3'
    },
    'Nose': { 
        description: 'Help you smell and breathe',
        audio: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/nose--_gb_1.mp3'
    },
    'Mouth': { 
        description: 'Help you eat and talk',
        audio: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/mouth--_gb_1.mp3'
    },
    'Tongue': { 
        description: 'Help you taste food',
        audio: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/tongue--_gb_1.mp3'
    },
    'Teeth': { 
        description: 'Help you chew food',
        audio: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/tooth--_gb_1.mp3'
    },
    'Neck': { 
        description: 'Connects your head to your body',
        audio: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/neck--_gb_1.mp3'
    },
    'Shoulders': { 
        description: 'Where your arms connect',
        audio: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/shoulder--_gb_1.mp3'
    },
    'Arms': { 
        description: 'Help you reach and move',
        audio: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/arm--_gb_1.mp3'
    },
    'Hands': { 
        description: 'Help you hold things',
        audio: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/hand--_gb_1.mp3'
    },
    'Fingers': { 
        description: 'Help you touch and grab',
        audio: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/finger--_gb_1.mp3'
    },
    'Chest': { 
        description: 'The front part of your body',
        audio: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/chest--_gb_1.mp3'
    },
    'Belly': { 
        description: 'Your tummy area',
        audio: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/belly--_gb_1.mp3'
    },
    'Legs': { 
        description: 'Help you stand and move',
        audio: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/leg--_gb_1.mp3'
    },
    'Feet': { 
        description: 'Help you walk and run',
        audio: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/foot--_gb_1.mp3'
    },
    'Toes': { 
        description: 'Help you balance',
        audio: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/toe--_gb_1.mp3'
    },
    'Knees': { 
        description: 'Help you bend your legs',
        audio: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/knee--_gb_1.mp3'
    },
    'Elbows': { 
        description: 'Help you bend your arms',
        audio: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/elbow--_gb_1.mp3'
    }
};

// Function to play organ audio
function playOrgan(organ) {
    // Stop any currently playing audio
    if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
    }
    
    // Update organ statistics
    updateOrganStats(organ);
    
    // Add click animation
    const organCard = document.querySelector(`[data-organ="${organ}"]`);
    if (organCard) {
        organCard.classList.add('clicked');
        setTimeout(() => {
            organCard.classList.remove('clicked');
        }, 300);
    }
    
    // Create and play audio
    try {
        currentAudio = new Audio(organData[organ].audio);
        currentAudio.play().catch(error => {
            console.log('Audio playback failed, using fallback method');
            // Fallback: Use speech synthesis
            speakOrgan(organ);
        });
    } catch (error) {
        console.log('Audio creation failed, using speech synthesis');
        speakOrgan(organ);
    }
}

// Fallback function using speech synthesis for organs
function speakOrgan(organ) {
    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(organ);
        utterance.rate = 0.8;
        utterance.pitch = 1.2;
        utterance.volume = 1;
        speechSynthesis.speak(utterance);
    }
}

// Function to update organ statistics
function updateOrganStats(organ) {
    // Update organ stats
    if (!organStats[organ]) {
        organStats[organ] = 0;
        uniqueOrgans.add(organ);
    }
    organStats[organ]++;
    
    // Update total clicks
    totalOrganClicks++;
    organsLearned++;
    
    // Update click count on organ card
    const organCard = document.querySelector(`[data-organ="${organ}"]`);
    if (organCard) {
        const clickCountElement = organCard.querySelector('.click-count');
        if (clickCountElement) {
            clickCountElement.textContent = organStats[organ];
        }
    }
    
    // Update display
    updateOrganStatsDisplay();
}

// Function to update organ statistics display
function updateOrganStatsDisplay() {
    const totalOrganClicksElement = document.getElementById('total-organ-clicks');
    const uniqueOrgansElement = document.getElementById('unique-organs');
    const favoriteOrganElement = document.getElementById('favorite-organ');
    const organsLearnedElement = document.getElementById('organs-learned');
    const organsClickedElement = document.getElementById('organs-clicked');
    
    if (totalOrganClicksElement) totalOrganClicksElement.textContent = totalOrganClicks;
    if (uniqueOrgansElement) uniqueOrgansElement.textContent = uniqueOrgans.size;
    if (organsLearnedElement) organsLearnedElement.textContent = `Organs Learned: ${organsLearned}`;
    if (organsClickedElement) organsClickedElement.textContent = `Organs Clicked: ${uniqueOrgans.size}`;
    
    // Find favorite organ
    let favoriteOrgan = '-';
    let maxClicks = 0;
    for (const [organ, clicks] of Object.entries(organStats)) {
        if (clicks > maxClicks) {
            maxClicks = clicks;
            favoriteOrgan = organ;
        }
    }
    if (favoriteOrganElement) favoriteOrganElement.textContent = favoriteOrgan;
}

// Function to reset organ statistics
function resetOrganStats() {
    organStats = {};
    totalOrganClicks = 0;
    uniqueOrgans.clear();
    organsLearned = 0;
    
    // Reset click counts on all organ cards
    const organCards = document.querySelectorAll('.organ-card');
    organCards.forEach(card => {
        const clickCountElement = card.querySelector('.click-count');
        if (clickCountElement) {
            clickCountElement.textContent = '0';
        }
    });
    
    updateOrganStatsDisplay();
}

// Function to play all organs in sequence
function playAllOrgans() {
    if (isPlayingAll) {
        stopAudio();
        return;
    }
    
    isPlayingAll = true;
    const organs = Object.keys(organData);
    let currentIndex = 0;
    
    // Update button text
    const playAllOrgansButton = document.querySelector('.play-all-organs-button');
    if (playAllOrgansButton) {
        playAllOrgansButton.textContent = '⏸️ Pause All';
    }
    
    function playNextOrgan() {
        if (!isPlayingAll || currentIndex >= organs.length) {
            isPlayingAll = false;
            if (playAllOrgansButton) {
                playAllOrgansButton.textContent = '🎵 Play All Organs';
            }
            return;
        }
        
        const organ = organs[currentIndex];
        playOrgan(organ);
        
        // Highlight current organ
        const organCard = document.querySelector(`[data-organ="${organ}"]`);
        if (organCard) {
            organCard.style.transform = 'translateY(-15px) scale(1.1)';
            organCard.style.boxShadow = '0 20px 40px rgba(78, 205, 196, 0.4)';
            organCard.style.borderColor = '#4ecdc4';
            
            setTimeout(() => {
                organCard.style.transform = '';
                organCard.style.boxShadow = '';
                organCard.style.borderColor = '';
            }, 2000);
        }
        
        currentIndex++;
        
        // Schedule next organ
        playAllInterval = setTimeout(playNextOrgan, 3000);
    }
    
    playNextOrgan();
}

// Body Activities functionality
let activityStats = {};
let totalActivityClicks = 0;
let uniqueActivities = new Set();
let activitiesCompleted = 0;

// Activity data with instructions and sounds
const activityData = {
    'Clap Hands': { 
        instruction: 'Clap your hands together!',
        sound: '👏 Clap! Clap! Clap!',
        audio: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/clap--_gb_1.mp3'
    },
    'Wave Hello': { 
        instruction: 'Wave your hand back and forth!',
        sound: '👋 Hello! Hello!',
        audio: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/wave--_gb_1.mp3'
    },
    'Touch Nose': { 
        instruction: 'Touch your nose with your finger!',
        sound: '👃 Touch your nose!',
        audio: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/touch--_gb_1.mp3'
    },
    'Touch Eyes': { 
        instruction: 'Touch your eyes gently!',
        sound: '👀 Touch your eyes!',
        audio: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/touch--_gb_1.mp3'
    },
    'Touch Ears': { 
        instruction: 'Touch your ears!',
        sound: '👂 Touch your ears!',
        audio: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/touch--_gb_1.mp3'
    },
    'Open Mouth': { 
        instruction: 'Open your mouth wide!',
        sound: '😮 Open your mouth!',
        audio: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/open--_gb_1.mp3'
    },
    'Stick Out Tongue': { 
        instruction: 'Stick out your tongue!',
        sound: '😛 Stick out your tongue!',
        audio: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/tongue--_gb_1.mp3'
    },
    'Touch Head': { 
        instruction: 'Touch your head!',
        sound: '👶 Touch your head!',
        audio: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/touch--_gb_1.mp3'
    },
    'Touch Shoulders': { 
        instruction: 'Touch your shoulders!',
        sound: '👤 Touch your shoulders!',
        audio: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/touch--_gb_1.mp3'
    },
    'Touch Belly': { 
        instruction: 'Touch your belly!',
        sound: '🤰 Touch your belly!',
        audio: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/touch--_gb_1.mp3'
    },
    'Touch Knees': { 
        instruction: 'Touch your knees!',
        sound: '🦵 Touch your knees!',
        audio: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/touch--_gb_1.mp3'
    },
    'Touch Feet': { 
        instruction: 'Touch your feet!',
        sound: '🦶 Touch your feet!',
        audio: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/touch--_gb_1.mp3'
    },
    'Jump': { 
        instruction: 'Jump up and down!',
        sound: '🦘 Jump! Jump! Jump!',
        audio: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/jump--_gb_1.mp3'
    },
    'Spin Around': { 
        instruction: 'Spin around in circles!',
        sound: '🌀 Spin around!',
        audio: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/spin--_gb_1.mp3'
    },
    'Dance': { 
        instruction: 'Dance to the music!',
        sound: '💃 Dance! Dance! Dance!',
        audio: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/dance--_gb_1.mp3'
    },
    'Stretch': { 
        instruction: 'Stretch your arms up high!',
        sound: '🧘 Stretch up high!',
        audio: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/stretch--_gb_1.mp3'
    },
    'Bend Down': { 
        instruction: 'Bend down and touch the ground!',
        sound: '⬇️ Bend down low!',
        audio: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/bend--_gb_1.mp3'
    },
    'Wiggle Fingers': { 
        instruction: 'Wiggle your fingers!',
        sound: '👆 Wiggle your fingers!',
        audio: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/wiggle--_gb_1.mp3'
    },
    'Wiggle Toes': { 
        instruction: 'Wiggle your toes!',
        sound: '🦶 Wiggle your toes!',
        audio: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/wiggle--_gb_1.mp3'
    },
    'Blink Eyes': { 
        instruction: 'Blink your eyes!',
        sound: '😉 Blink! Blink! Blink!',
        audio: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/blink--_gb_1.mp3'
    }
};

// Function to play activity audio
function playActivity(activity) {
    // Stop any currently playing audio
    if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
    }
    
    // Update activity statistics
    updateActivityStats(activity);
    
    // Add click animation
    const activityCard = document.querySelector(`[data-activity="${activity}"]`);
    if (activityCard) {
        activityCard.classList.add('clicked');
        setTimeout(() => {
            activityCard.classList.remove('clicked');
        }, 300);
    }
    
    // Create and play audio
    try {
        currentAudio = new Audio(activityData[activity].audio);
        currentAudio.play().catch(error => {
            console.log('Audio playback failed, using fallback method');
            // Fallback: Use speech synthesis
            speakActivity(activity);
        });
    } catch (error) {
        console.log('Audio creation failed, using speech synthesis');
        speakActivity(activity);
    }
}

// Fallback function using speech synthesis for activities
function speakActivity(activity) {
    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(activityData[activity].instruction);
        utterance.rate = 0.8;
        utterance.pitch = 1.2;
        utterance.volume = 1;
        speechSynthesis.speak(utterance);
    }
}

// Function to update activity statistics
function updateActivityStats(activity) {
    // Update activity stats
    if (!activityStats[activity]) {
        activityStats[activity] = 0;
        uniqueActivities.add(activity);
    }
    activityStats[activity]++;
    
    // Update total clicks
    totalActivityClicks++;
    activitiesCompleted++;
    
    // Update click count on activity card
    const activityCard = document.querySelector(`[data-activity="${activity}"]`);
    if (activityCard) {
        const clickCountElement = activityCard.querySelector('.click-count');
        if (clickCountElement) {
            clickCountElement.textContent = activityStats[activity];
        }
    }
    
    // Update display
    updateActivityStatsDisplay();
}

// Function to update activity statistics display
function updateActivityStatsDisplay() {
    const totalActivityClicksElement = document.getElementById('total-activity-clicks');
    const uniqueActivitiesElement = document.getElementById('unique-activities');
    const favoriteActivityElement = document.getElementById('favorite-activity');
    const activitiesCompletedElement = document.getElementById('activities-completed');
    const totalMovesElement = document.getElementById('total-moves');
    
    if (totalActivityClicksElement) totalActivityClicksElement.textContent = totalActivityClicks;
    if (uniqueActivitiesElement) uniqueActivitiesElement.textContent = uniqueActivities.size;
    if (activitiesCompletedElement) activitiesCompletedElement.textContent = `Activities Completed: ${activitiesCompleted}`;
    if (totalMovesElement) totalMovesElement.textContent = `Total Moves: ${totalActivityClicks}`;
    
    // Find favorite activity
    let favoriteActivity = '-';
    let maxClicks = 0;
    for (const [activity, clicks] of Object.entries(activityStats)) {
        if (clicks > maxClicks) {
            maxClicks = clicks;
            favoriteActivity = activity;
        }
    }
    if (favoriteActivityElement) favoriteActivityElement.textContent = favoriteActivity;
}

// Function to reset activity statistics
function resetActivityStats() {
    activityStats = {};
    totalActivityClicks = 0;
    uniqueActivities.clear();
    activitiesCompleted = 0;
    
    // Reset click counts on all activity cards
    const activityCards = document.querySelectorAll('.activity-card');
    activityCards.forEach(card => {
        const clickCountElement = card.querySelector('.click-count');
        if (clickCountElement) {
            clickCountElement.textContent = '0';
        }
    });
    
    updateActivityStatsDisplay();
}

// Function to play all activities in sequence
function playAllActivities() {
    if (isPlayingAll) {
        stopAudio();
        return;
    }
    
    isPlayingAll = true;
    const activities = Object.keys(activityData);
    let currentIndex = 0;
    
    // Update button text
    const playAllActivitiesButton = document.querySelector('.play-all-activities-button');
    if (playAllActivitiesButton) {
        playAllActivitiesButton.textContent = '⏸️ Pause All';
    }
    
    function playNextActivity() {
        if (!isPlayingAll || currentIndex >= activities.length) {
            isPlayingAll = false;
            if (playAllActivitiesButton) {
                playAllActivitiesButton.textContent = '🎵 Play All Activities';
            }
            return;
        }
        
        const activity = activities[currentIndex];
        playActivity(activity);
        
        // Highlight current activity
        const activityCard = document.querySelector(`[data-activity="${activity}"]`);
        if (activityCard) {
            activityCard.style.transform = 'translateY(-15px) scale(1.1)';
            activityCard.style.boxShadow = '0 20px 40px rgba(254, 202, 87, 0.4)';
            activityCard.style.borderColor = '#feca57';
            
            setTimeout(() => {
                activityCard.style.transform = '';
                activityCard.style.boxShadow = '';
                activityCard.style.borderColor = '';
            }, 2000);
        }
        
        currentIndex++;
        
        // Schedule next activity
        playAllInterval = setTimeout(playNextActivity, 3000);
    }
    
    playNextActivity();
} 