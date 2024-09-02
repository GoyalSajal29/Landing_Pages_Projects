let password_display = document.querySelector(".password_display")
let copy_btn = document.querySelector(".copy_btn")
let copied_click_text = document.querySelector(".copied_click_text")
let password_length = document.querySelector(".password_length")
let password_slider = document.querySelector(".slider")
let uppercase = document.querySelector(".uppercase")
let lowercase = document.querySelector(".lowercase")
let numbers = document.querySelector(".numbers")
let symbols = document.querySelector(".symbols")
let strength_clr = document.querySelector(".strength_clr")
let generate_password  = document.querySelector(".generate_password")
let allCheckBox = document.querySelectorAll("input[type=checkbox]")

let password = ""
let passwordLength = 10
let checkCount=0
//set circle color to grey
handleSlider()
setIndicator("#ccc")

let symbol = "`~!@#$%^&*()-_=+/*{[}]|\:;<,>.?/'"

function handleSlider(){
    password_slider.value=passwordLength
    password_length.innerText = passwordLength
    let min = password_slider.min;
    let max = password_slider.max;
    password_slider.style.backgroundSize = ((passwordLength-min)*100/(max-min))+"% 100%"

}

function setIndicator(color){
    strength_clr.style.backgroundColor = color 
}

function getRandomInteger(min,max){
    return Math.floor(Math.random()*(max-min))+min
}

function getRandomNumber(){
    return getRandomInteger(0,9);
}

function getUppercase(){
    return String.fromCharCode(getRandomInteger(65,90))
}

function getLowercase(){
    return String.fromCharCode(getRandomInteger(97,122))
}

function getSymbol(){
    return symbol.charAt(getRandomInteger(0,symbol.length-1))
}

function calcStrength(){
    let hasUppercase = false;
    let hasLowercase = false;
    let hasNumber = false;
    let hasSymbol = false;

    if(uppercase.checked){
        hasUppercase=true
    }
    if(lowercase.checked){
        hasLowercase=true
    }
    if(numbers.checked){
        hasNumber=true
    }
    if(symbols.checked){
        hasSymbol=true
    }

    if(hasUppercase && hasLowercase && (hasNumber || hasSymbol) && passwordLength>=8){
        setIndicator("#0f0")
    }
    else if((hasUppercase || hasLowercase) && (hasNumber || hasSymbol) && passwordLength>=6){
        setIndicator("#ff0")
    }
    else{
        setIndicator("#f00")
    }
}

async function copyContent(){
    try{
        await navigator.clipboard.writeText(password_display.value)
         copied_click_text.innerText="Copied";
    }
    catch(e){
        copied_click_text.innerText="Failed";
    }
    // to make span visible
    copied_click_text.classList.add("active");
    
    // to make span invisible
    setTimeout(function(){
        copied_click_text.classList.remove("active")
    },2000)
}

password_slider.addEventListener('input',function(e){
    passwordLength=e.target.value
    handleSlider()
})

copy_btn.addEventListener('click',function(){
    if(password_display.value){
        copyContent()
    }
})

function shufflePassword(array) {
    //Fisher Yates Method
    for (let i = array.length - 1; i > 0; i--) {
        //random J, find out using random function
        const j = Math.floor(Math.random() * (i + 1));
        //swap number at i index and j index
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
    allCheckBox.forEach((checkbox) => {
        if(checkbox.checked){
            checkCount++
        }
    })
    if(passwordLength<checkCount){
        passwordLength=checkCount;
        handleSlider()
    }
}

// uppercase.addEventListener('change',handleCheckBoxChange)
// lowercase.addEventListener('change',handleCheckBoxChange)
// numbers.addEventListener('change',handleCheckBoxChange)
// symbols.addEventListener('change',handleCheckBoxChange)

allCheckBox.forEach( (checkbox) => {
    checkbox.addEventListener('change', handleCheckBoxChange);
})

generate_password.addEventListener('click',function(){
    //none of the checkbox selected
    if(checkCount==0) 
    return;
    if(passwordLength<checkCount){
        passwordLength=checkCount;
        handleSlider()
    }

    //lets start the new passowrd

    //remove old password
    password=""

    // lets put the stuff by checkboxes
    funcArr=[]

    if(uppercase.checked){
        funcArr.push(getUppercase)
    }

    if(lowercase.checked){
        funcArr.push(getLowercase)
    }

    if(symbols.checked){
        funcArr.push(getSymbol)
    }
    if(numbers.checked){
        funcArr.push(getRandomNumber)
    }

    // compulsory one
    for(let i=0;i< funcArr.length;i++){
        password+= funcArr[i]()
    }

    //random one
    for(let i=0;i<passwordLength-funcArr.length;i++){
        password+= funcArr[getRandomInteger(0,funcArr.length)]();
    }

    //shuffle password
    password = shufflePassword(Array.from(password));

    // show in UI
    password_display.value = password

    // calculate strength
    calcStrength()
})






