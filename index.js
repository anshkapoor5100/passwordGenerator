let password = "";
let passwordLength = 10;
let checkCount = 1;

let slider = document.querySelector(".slider");
let length = document.querySelector(".length-num");
const indicator = document.querySelector(".circle");
const symbol = '~`!@#$%^&*()_-+={[}]|:;"<,>.?/';
let checkBoxes = document.querySelectorAll(".i-am");
let circle = document.querySelector(".circle");

function updateSliderBackground() {
    const percentage = (passwordLength) / (21) * 100;
    slider.style.setProperty('--slider-bg-width', `${percentage}%`);
}
 initialize();
function initialize(){
    circle.style.setProperty("--color", `rgb(204, 204, 204)`)
}

function handleSlider() {
    slider.value = passwordLength;
    length.innerText = passwordLength;
    updateSliderBackground();
}

handleSlider();

function setIndicator(color){
    indicator.style.backgroundColor = color;
    circle.style.setProperty("--color", `${color}`)

}

function getRndInt(min, max){
    return Math.round(Math.random() * (max-min)+min);
}

function generateRndNum(){
    return getRndInt(0,9);
}

function generateLower(){
    return String.fromCharCode(getRndInt(97, 122));
}

function generateUpper(){
    return String.fromCharCode(getRndInt(65, 90));
}

function generateSymbol(){
    let value = symbol.length-1;
    let k = getRndInt(0, value);
    return symbol[k];                           //.charAt    bhai dekhlena
}

const uppercase = document.querySelector('#checkbox1');
const lowercase = document.querySelector('#checkbox2');
const numbers = document.querySelector('#checkbox3');
const symbols = document.querySelector('#checkbox4');

function calcStrength(){
    let hasUpper = false;
    let hasLower = false;
    let hasNumber = false;
    let hasSymbol = false;

    if (uppercase.checked) hasUpper = true;
    if (lowercase.checked) hasLower = true;
    if (numbers.checked) hasNumber = true;
    if (symbols.checked) hasSymbol = true;

    if (hasUpper && hasLower && (hasNumber || hasSymbol) && passwordLength >= 8) {
        setIndicator("#0f0");
    } else if (
        (hasLower || hasUpper) &&
        (hasNumber || hasSymbol) &&
        passwordLength >= 6
    ) {
        setIndicator("#ff0");
    } else {
        setIndicator("#f00");
    }
}

async function copyContent() {
    try {
        await navigator.clipboard.writeText(password);
        alert("Password copied to clipboard");
    } catch (e) {
        alert("Failed to copy password");
    }
}


slider.addEventListener("input", (e)=>{
    passwordLength = e.target.value;
    handleSlider();
})

let copy = document.querySelector(".fa-copy");

copy.addEventListener("click", function () {
    if (password) {
        copyContent();
    }
    else{
        let a = new Error("Click on Generate Password")
        alert(a);
    }
});

checkBoxes.forEach(function(a){
    a.addEventListener("change", function(){
        if(a.checked){
            checkCount++;
        }
        else{
            checkCount--;
        }
        if(passwordLength<checkCount){
            passwordLength = checkCount;
            handleSlider();
        }
    })
})

let generate = document.querySelector(".generate");
let ans = document.querySelector(".password");

function shufflePass(array){
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    let str = "";
    array.forEach((el) => (str += el));
    return str;
}

generate.addEventListener("click", function(){

    if(checkCount==0 || passwordLength==0){
        const a = new Error("Select checkBox or increase Length");
        alert(a);
        return;
    }

    if(passwordLength<checkCount){
        passwordLength = checkCount;
        handleSlider();
    }

    password = "";
    ans.value ="";

    let array = [];
    
    if(uppercase.checked){
        array.push(generateUpper);
    }
    if(lowercase.checked){
        array.push(generateLower);
    }
    if(numbers.checked){
        array.push(generateRndNum);
    }
    if(symbols.checked){
        array.push(generateSymbol);
    }

    // compulsory
    for(let i=0; i<array.length; i++){
        password+=array[i]();
    }

    // remaining
    for(let i=0; i<passwordLength-array.length; i++){
        let randInd = getRndInt(0, array.length-1);
        password+=array[randInd]();
    }

    password = shufflePass(Array.from(password));

    ans.value = password;

    calcStrength();

})