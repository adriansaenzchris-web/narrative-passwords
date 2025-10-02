// Theme data for password generation
const themes = {
    fantasy: {
        titles: ["Wizard", "Elf", "Dragon", "Knight", "Sorcerer", "Druid", "Goblin", "Ranger"],
        places: ["Eldoria", "Mystvale", "Shadowfen", "Silverkeep", "Frostwood", "Sunspire", "Stormhold"],
        symbols: ["*", "#", "@", "$", "%", "&", "+", "!"]
    },
    scifi: {
        titles: ["Captain", "Android", "Pilot", "Commander", "Agent", "Cyborg", "Navigator", "Technician"],
        places: ["Nebula9", "OrionX", "LunaBase", "Starforge", "NovaPrime", "Galactica", "VegaStation"],
        symbols: ["^", "~", "|", ":", ";", "=", "/", ">"]
    },
    noir: {
        titles: ["Detective", "Boss", "Dame", "Gumshoe", "Vixen", "Mobster", "Snitch", "Shadow"],
        places: ["MidnightCity", "Fogtown", "HarborBay", "BackAlley", "JazzClub", "NeonStreet", "OldDocks"],
        symbols: [".", ",", "-", "_", "'", "/", ":", ";"]
    }
};

function randomItem(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function generateStoryPassword(themeKey) {
    const theme = themes[themeKey];
    if (!theme) return '';
    const title = randomItem(theme.titles);
    const place = randomItem(theme.places);
    const symbol = randomItem(theme.symbols);
    const number = Math.floor(Math.random() * 90) + 10; // 2-digit number
    let base = `${title}${symbol}${place}${number}`;
    // Pad if shorter than desired length
    const lengthInput = document.getElementById('length');
    const desiredLength = lengthInput ? parseInt(lengthInput.value, 10) : 12;
    const allChars = [...theme.titles.join(''), ...theme.places.join(''), ...theme.symbols, ...'0123456789'];
    while (base.length < desiredLength) {
        base += randomItem(allChars);
    }
    return base.slice(0, desiredLength);
}

function updateStrengthMeter(password) {
    const strengthDiv = document.getElementById('strength');
    if (!password) {
        strengthDiv.textContent = '';
        return;
    }
    let score = 0;
    if (password.length >= 12) score++;
    if (password.length >= 16) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    let label = '';
    if (score <= 2) label = 'Weak';
    else if (score <= 4) label = 'Moderate';
    else label = 'Strong';
    strengthDiv.textContent = `Strength: ${label}`;
    strengthDiv.style.color = (label === 'Strong') ? '#00e676' : (label === 'Moderate' ? '#ffd600' : '#ff1744');
}

document.getElementById('generate').addEventListener('click', function() {
    const theme = document.getElementById('theme').value;
    const password = generateStoryPassword(theme);
    document.getElementById('result').textContent = password;
    updateStrengthMeter(password);
});

document.getElementById('copy').addEventListener('click', function() {
    const password = document.getElementById('result').textContent;
    if (password) {
        navigator.clipboard.writeText(password).then(() => {
            document.getElementById('copy').textContent = 'Copied!';
            setTimeout(() => {
                document.getElementById('copy').textContent = 'Copy Password';
            }, 1200);
        });
    }
});
