if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

// Data Arrays - Arabic Version
const goodDeeds = [
    "نقرأ 5 صفحات قرآن سوا (وأنا هسمعلك).",
    "ندعي لوالدينا دعوة حلوة.",
    "طلعي صدقة... وممكن تعتبري عزومتي صدقة برضو.",
    "شاركيني حديث نبوي بتحبيه (من غير جوجل!).",
    "نصلي ركعتين قيام... أو على الأقل نصحى للسحور من غير ما نكون زومبي.",
    "أكلي صايم (أنا مثلاً.. أكلينا).",
    "قولي 3 حاجات بتحبيها فيا (خدي وقتك، عارف إنهم كتير).",
    "ابعتي رسالة حلوة لصاحبتك (وقوليلها قد إيه أنا خطيب رائع).",
    "ذكر: سبحان الله 33، الحمد لله 33، الله أكبر 33... و'الصبر على خطيبي' 100 مرة.",
    "سيبيني أختار مكان الفطار النهاردة من غير خناق."
];

const dailyDuas = [
    "يا رب بارك فينا وصبرها على نكتي البايخة.",
    "يا رب ارزقنا الهدوء... واحمينا من خناقات الجوع.",
    "اللهم قربنا ليك (ولبعض) واجعلنا من الصالحين.",
    "يا رب احفظ قلوبنا وثبتنا. وخلي السمبوسة تفضل مقرمشة.",
    "اللهم اجمعنا في الجنة... عشان أضايقك هناك براحتي.",
    // Add more for 30 days...
    "اللهم اغفر لنا واعتق رقابنا من النار."
];

// 1. Theme Toggle
const themeBtn = document.getElementById('theme-toggle');
const body = document.body;
const icon = themeBtn.querySelector('i');

// Set initial icon to Moon (since default is light/happy, target is dark)
// (No JS needed if HTML default is Moon)
if (body.getAttribute('data-theme') === 'dark') {
    icon.classList.remove('fa-moon');
    icon.classList.add('fa-sun');
}

themeBtn.addEventListener('click', () => {
    const isDark = body.getAttribute('data-theme') === 'dark';
    if (isDark) {
        body.removeAttribute('data-theme'); // Go back to default (Happy/Light)
        icon.classList.remove('fa-sun'); // Was Sun
        icon.classList.add('fa-moon'); // Become Moon (Target: Dark)
    } else {
        body.setAttribute('data-theme', 'dark'); // Switch to Dark
        icon.classList.remove('fa-moon'); // Was Moon
        icon.classList.add('fa-sun'); // Become Sun (Target: Light)
    }
});

// 2. Good Deeds Jar
const pickDeedBtn = document.getElementById('pick-deed-btn');
const deedResult = document.getElementById('deed-result');
const deedText = document.getElementById('deed-text');
const closeDeed = document.getElementById('close-deed');

pickDeedBtn.addEventListener('click', () => {
    const randomDeed = goodDeeds[Math.floor(Math.random() * goodDeeds.length)];
    deedText.innerText = randomDeed;
    deedResult.classList.remove('hidden');
});

closeDeed.addEventListener('click', () => {
    deedResult.classList.add('hidden');
});

// 3. Daily Du'a Flip Card
const card = document.querySelector('.flip-card');
const duaTextElement = document.getElementById('dua-text');

// Simple logic to pick a Du'a based on the day of the month
const today = new Date().getDate();
const duaIndex = today % dailyDuas.length;
duaTextElement.innerText = dailyDuas[duaIndex];

card.addEventListener('click', () => {
    card.classList.toggle('flipped');
});

// 4. Countdown Timer (To Maghrib/Iftar)
function updateCountdown() {
    const now = new Date();
    let target = new Date();
    target.setHours(18, 30, 0, 0); // 6:30 PM

    if (now > target) {
        target.setDate(target.getDate() + 1);
    }

    const diff = target - now;

    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    document.getElementById('hours').innerText = String(hours).padStart(2, '0');
    document.getElementById('minutes').innerText = String(minutes).padStart(2, '0');
    document.getElementById('seconds').innerText = String(seconds).padStart(2, '0');
}

setInterval(updateCountdown, 1000);
updateCountdown();

// 5. Envelope Modal Logic
const modal = document.getElementById('envelope-modal');
const modalBody = document.getElementById('modal-body');
const closeModal = document.querySelector('.close-modal');

const envelopeContent = {
    hungry: "<h3>مستوى الجوع: خطر 🦁</h3><p>عارف إنك جعانة، بس فكري في أول شربة مية... وفي السمبوسة! أنتي قدها! (متاكلنيش أرجوكي).</p>",
    miss: "<h3>وحشتك مش كدة؟ 😎</h3><p>أكيد طبعاً، أنا يتحب أصلاً. غمضي عينك وادعيلي دعوة حلوة، وافتكري إني دايماً معاكي.</p>",
    strength: "<h3>محتاجة طاقة؟ 💪</h3><p>'إِنَّ مَعَ الْعُسْرِ يُسْرًا'. أنتي أقوى مما تتخيلي، والشياطين متسلسلة فمتحاوليش تلوميهم على عصبيتك النهاردة! 😂</p>"
};

function openEnvelope(type) {
    modalBody.innerHTML = envelopeContent[type];
    modal.classList.remove('hidden');
}

closeModal.addEventListener('click', () => {
    modal.classList.add('hidden');
});

window.onclick = function (event) {
    if (event.target == modal) {
        modal.classList.add('hidden');
    }
}

// 6. Surprise Heart
const surpriseBtn = document.getElementById('surprise-btn');
surpriseBtn.addEventListener('click', () => {
    modalBody.innerHTML = "<h3>اعتراف خطير 🫣</h3><p>طيب بصي... أنا بحبك أكتر ما بحب المحشي وورق العنب. وده اعتراف كبير جداً على فكرة. <br><br> ربنا يخلينا لبعض ويباركلنا في أيامنا.</p>";
    modal.classList.remove('hidden');
});

// 7. Ramadan Vibe Check (Quiz)
function checkVibe(btn, type) {
    const parent = btn.closest('.quiz-card');
    const responseText = parent.querySelector('.quiz-response');

    // Disable buttons
    const buttons = parent.querySelectorAll('.quiz-btn');
    buttons.forEach(b => b.disabled = true);
    btn.style.background = "var(--accent-color)";
    btn.style.color = "#fff";

    let msg = "";
    switch (type) {
        case 'clock':
            msg = "قفشتك! 🕰️ متقلقيش، أنا بعمل نفس الحاجة.";
            break;
        case 'table':
            msg = "ما شاء الله، ست بيت لهلوبة! (احجزلي طبق).";
            break;
        case 'me':
            msg = "طبعاً أنا. غيبوبة السكر بتعمل عمايلها. 😴";
            break;
        case 'you':
            msg = "كدابة! دة أنتي بتنامي زي القطط 🐈.";
            break;
        case 'samosa':
            msg = "اختيار موفق. ملكة السفرة بلا منازع. 🥟";
            break;
        case 'pakora':
            msg = "اختيار محترم... بس السمبوسة تكسب. 👑";
            break;
    }
    responseText.innerText = msg;
}


