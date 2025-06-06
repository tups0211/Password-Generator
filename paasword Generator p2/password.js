const inputSlider=document.querySelector("[data-lengthSlider]");    //cutsome attribute use krto tevha [] use krav lagt tsa syntax ch ahe 
const lengthDisplay=document.querySelector("[data-lengthNumber]");

const passwordDisplay = document.querySelector("[data-password-Display]");
const copyBtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copyMsg]");
const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numbersCheck = document.querySelector("#numbers");
const symbolsCheck = document.querySelector("#symbols");
const indicator = document.querySelector("[data-indicator]");
const generateBtn = document.querySelector(".generateButton");
const allCheckBox = document.querySelectorAll("input[type=checkbox]");
const symbols = '~`!@#$%^&*()_-+={[}]|:;"<,>.?/';


let password="";
let passwordLength=10;
let checkCount=0;
handleSlider();

//indicator sathi color

setIndicator("#CCC");

// fun handleSlider password chi length set krto 
function handleSlider(){
   inputSlider.value = passwordLength;
    lengthDisplay.innerText = passwordLength;
    const min = inputSlider.min;
    const max = inputSlider.max;
    inputSlider.style.backgroundSize = ( (passwordLength - min)*100/(max - min)) + "% 100%"
}

function setIndicator(color){
    indicator.style.backgroundColor = color;

    indicator.style.boxShadow = `0px 0px 12px 1px ${color}`;
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;     //floor= value roundoff krnyasathi use krtat.
}


function generateRandomNumber(){
 return getRndInteger(0,9);
}

function generateLowerCase(){
    return String.fromCharCode(getRndInteger(97,123))
}

function generateUpperCase() {  
    return String.fromCharCode(getRndInteger(65,91))
}

function generateSymbol() {
    const randNum = getRndInteger(0, symbols.length);
    return symbols.charAt(randNum);   //kontya index vr kont character ahe te sangt 
}


function calcStrength() {
    let hasUpper = false;
    let hasLower = false;
    let hasNum = false;
    let hasSym = false;
    if (uppercaseCheck.checked) hasUpper = true;
    if (lowercaseCheck.checked) hasLower = true;
    if (numbersCheck.checked) hasNum = true;
    if (symbolsCheck.checked) hasSym = true;
  
    if (hasUpper && hasLower && (hasNum || hasSym) && passwordLength >= 8) {
      setIndicator("#0f0");
    } else if (
      (hasLower || hasUpper) &&
      (hasNum || hasSym) &&
      passwordLength >= 6
    ) {
      setIndicator("#ff0");
    } else {
      setIndicator("#f00");
    }
}


async function copyContent(){      //async fun asel trch await work krt so use 
    try{
           await navigator.clipboard.writeText(passwordDisplay.value);
           copyMsg.innerText="copied";
    } 
    catch(e){
             copyMsg.innerText="Failed";
        }
   copyMsg.classList.add("active");   //ya linemule span visible hoto  
    
   setTimeout(() => {
       copyMsg.classList.remove("active")
   },2000);
}


function shufflePassword(array){
    //fisher yates method
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

function handleCheckBoxChange(){
  checkCount=0;
  allCheckBox.forEach((checkbox)=>{
    if(checkbox.checked)
        checkCount++;
  });
  
    //special condition
    if(passwordLength<checkCount){
        passwordLength=checkCount;
        handleSlider();
    }

}

allCheckBox.forEach((checkbox)=>{
  checkbox.addEventListener('change',handleCheckBoxChange);
})

inputSlider.addEventListener('input',(e)=>{         //yamule slider chi value change hotey 
    passwordLength=e.target.value;
    handleSlider();
})


copyBtn.addEventListener('click', () => {
    if(passwordDisplay.value)
     copyContent();
})
    

generateBtn.addEventListener("click", () =>  {
    
    //none of the checkbox are selected
    if(checkCount == 0) 
        return;

    if(passwordLength<checkCount){
        passwordLength=checkCount;
        handleSlider();
    }

    //lets start the journey to find new password 
         
        console.log("starting the journey");
    //remove old paasword

      password="";

      //lets put the stuff mentioned by checkboxes

     let funcArr=[];

          if(uppercaseCheck.checked)
        funcArr.push(generateUpperCase);

         // if(lowercaseCheck.checked)
       // funcArr.push(getLowerCase);


    if(lowercaseCheck.checked)
        funcArr.push(generateLowerCase);

    if(numbersCheck.checked)
        funcArr.push(generateRandomNumber);

    if(symbolsCheck.checked)
        funcArr.push(generateSymbol);

        //compulsory addition 

        for(let i=0;i<funcArr.length;i++){
            password+=funcArr[i]();

        }

        console.log("compulsory addition done");
        //remainig addition
        for(let i=0;i<passwordLength-funcArr.length;i++){
            let randIndex = getRndInteger(0,funcArr.length);
            console.log("randIndex"+randIndex);
            password+=funcArr[randIndex]();
        }
            
        console.log("remaning addition done");
        //shuffle the password
        password=shufflePassword(Array.from(password));
         
        console.log("shuffling done");
        //password show in UI

       passwordDisplay.value= password;

      console.log("UI addition done  ");
        //calculate strength

        calcStrength();
});






















