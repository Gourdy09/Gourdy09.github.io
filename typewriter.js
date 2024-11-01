function sleep(ms){
    return new Promise((resolve) => setTimeout(resolve, ms));
}

const phrases = ["OM PATEL", "STUDENT", "DEVELOPER", "GAMER", "YOUTUBER"];
const element = document.getElementById("typewriter");

let sleepTimeMs = 100;
let index = 0;

const writeLoop = async() =>{
    while(true){
        let word = phrases[index];

        for (let i = 0; i < word.length; i++) {
            element.innerText = word.substring(0, i+1);
            await sleep(sleepTimeMs);
        }

        await sleep(sleepTimeMs * 10);

        for (let i = word.length; i > 0; i--) {
            element.innerText = word.substring(0, i-1);
            await sleep(sleepTimeMs);
        }

        await sleep(sleepTimeMs * 10);

        if(index === phrases.length - 1){
            index = 0;
        } else { index++; }
    }
};

writeLoop();