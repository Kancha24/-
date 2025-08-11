// --- 1. ประกาศตัวแปรและข้อมูลที่ใช้ในเกม ---
const startMenu = document.getElementById('start-menu');
const descriptionScreen = document.getElementById('description-screen');
const loadingScreen = document.getElementById('loading-screen');
const gameScreen = document.getElementById('game-screen');

// ข้อมูลเกม (ตัวอย่างด่านเดียว)
const gameData = [
    {
        story: "ทีมนักพัฒนาโปรแกรมกำลังแก้ไขปัญหาที่ซับซ้อน ( ) โปรแกรมหยุดทำงานโดยไม่มีสาเหตุ",
        choices: ["เมื่อ", "ตั้งแต่", "หรือ", "ดังนั้น", "และ"],
        correctChoice: "เมื่อ",
        gif: "gif_เมื่อ_โปรแกรมหยุดทำงาน.gif"
    },
    {
        story: "พวกเขาตรวจสอบโค้ดทุกบรรทัด ( ) ก็ยังไม่พบข้อผิดพลาด",
        choices: ["แต่", "หากแต่", "และ", "หรือ", "ดังนั้น"],
        correctChoice: "แต่",
        gif: "gif_แต่_ก็ยังไม่พบข้อผิดพลาด.gif"
    }
];

let currentLevel = 0;

// --- 2. ฟังก์ชันหลักในการจัดการการแสดงผลหน้าจอ ---
function showScreen(screenId) {
    const allScreens = document.querySelectorAll('.screen');
    allScreens.forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(screenId).classList.add('active');
}

// --- 3. ฟังก์ชันสำหรับส่วนเล่นเกม ---
function loadGameLevel(level) {
    // โค้ดส่วนนี้จะสร้างประโยคและปุ่มคำศัพท์
    const currentData = gameData[level];
    const storySentenceElement = document.getElementById('story-sentence');
    const choiceButtonsElement = document.getElementById('choice-buttons');
    const characterGifElement = document.getElementById('character-gif');
    
    // ตั้งค่าประโยค
    storySentenceElement.textContent = currentData.story;
    
    // สร้างปุ่มคำศัพท์
    choiceButtonsElement.innerHTML = ''; // ล้างปุ่มเก่า
    currentData.choices.forEach(choice => {
        const button = document.createElement('button');
        button.textContent = choice;
        button.onclick = () => handleChoice(choice, currentData); // เมื่อคลิกปุ่มจะเรียกฟังก์ชัน handleChoice
        choiceButtonsElement.appendChild(button);
    });

    // ตั้งค่า GIF เริ่มต้น
    characterGifElement.src = 'placeholder.gif';
}

function handleChoice(chosenWord, currentData) {
    const characterGifElement = document.getElementById('character-gif');
    
    // เปลี่ยน GIF ตามคำที่เลือก (ไม่ว่าจะถูกหรือผิด)
    // คุณต้องมีไฟล์ GIF ที่ชื่อตรงกับ logic นี้
    characterGifElement.src = `gif_${chosenWord}_${currentData.story.split('(')[0].trim()}.gif`;

    // (ส่วนนี้เป็นแค่ตัวอย่าง) ถ้าจะทำระบบเฉลยทันทีก็ใส่ตรงนี้
    // if (chosenWord === currentData.correctChoice) {
    //     alert('ถูกต้อง!');
    // } else {
    //     alert('ลองดูท่าทางอีกทีนะ');
    // }

    // เปลี่ยนไปด่านต่อไป
    setTimeout(() => {
        currentLevel++;
        if (currentLevel < gameData.length) {
            loadGameLevel(currentLevel);
        } else {
            alert('จบด่านแล้ว!');
            // โค้ดสำหรับแสดงหน้าสรุปคะแนน
        }
    }, 2000); // รอ 2 วินาทีเพื่อให้ GIF เล่นจบ
}

// --- 4. การจัดการ Event Listener เมื่อคลิกปุ่ม ---
document.getElementById('start-btn').addEventListener('click', () => {
    showScreen('loading-screen');
    setTimeout(() => {
        showScreen('game-screen');
        loadGameLevel(currentLevel);
    }, 1000); // จำลองการโหลด 1 วินาที
});

document.getElementById('description-btn').addEventListener('click', () => {
    showScreen('description-screen');
});

document.getElementById('back-btn').addEventListener('click', () => {
    showScreen('start-menu');
});