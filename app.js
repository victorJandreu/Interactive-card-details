const addingName = document.getElementById("name")
const addingNumer = document.getElementById("number")
const addingMonth = document.getElementById("month")
const addingYear = document.getElementById("year")
const addingCvc = document.getElementById("cvc")


const cardName = document.getElementById("cardName")
const cardNumer = document.getElementById("cardNumber")
const cardMonth = document.getElementById("monthCard")
const cardYear = document.getElementById("yearCard")
const cardCvc = document.getElementById("csvCard")

const formulario = document.getElementById("formulario")

// CHECK FORMULARIO

let currentYear = new Date().getFullYear()
currentYear = currentYear.toString().split("")
const yearTwoLastDigit = Number (currentYear[2] + currentYear [3])



addingName.addEventListener("input", () =>  changeTexto(addingName, cardName, "Jane Appleseed"))

addingNumer.addEventListener("input", function(){
    const arrayCardNumber = cardNumer.textContent.split(" ").join("").split("")
    addNumberToCardSameTime(arrayCardNumber)
    cardNumer.textContent = arrayCardNumber.join("").match(/.{1,4}/g).join(" ")
})

addingMonth.addEventListener("input", function(){
    eliminateElement("monthNumber")
    changeTexto(addingMonth, cardMonth, "00")

    if(checkNumber(addingMonth.value, addingMonth, "monthNumber")) {
           
            if(addingMonth.value > 12) {
                addAlert(addingMonth, "monthNumber", "insert a number below 12")
            }
    }
})

addingYear.addEventListener("input", function(){
    eliminateElement("yearNumber")
    changeTexto(addingYear, cardYear, "00")

    if(checkNumber(addingYear.value, addingYear, "yearNumber")) {
            if(addingYear.value.length > 1) {
                if(addingYear.value < yearTwoLastDigit) {
                    addAlert(addingYear, "yearNumber", "it seems your card is expired")
                }
            }
    }
})


addingCvc.addEventListener("input", function(){
    eliminateElement("cvcNumber")
    checkNumber(addingCvc.value, addingCvc, "cvcNumber") 
    changeTexto(addingCvc, cardCvc, "000")
})


// BUTTON

formulario.addEventListener("submit", function(e){
    e.preventDefault()
    console.log("hola")
    document.querySelector(".thank").style.display = "block"
    formulario.style.display = "none"
  
})


// FUNCIONES

function addNumberToCardSameTime(arrayCard){
    const arrayInsertNumber = addingNumer.value.split(" ").join("").split("")
    eliminateElement("cardParrafo")
    checkNumber(arrayInsertNumber.join(""), addingNumer, "cardParrafo")

    for(let i = 0; i < 16; i++){
        if(i < arrayInsertNumber.length ) {
            arrayCard[i] = arrayInsertNumber[i]
        } else {
            arrayCard[i] = 0
        }
    }
}

function changeTexto(introductionElement, copyPlace, defaultText){
    if(introductionElement.value.length > 0) {
        copyPlace.textContent = introductionElement.value
    }
    else {copyPlace.textContent = defaultText}
}

function checkNumber(string, place, newId){
    //eliminate possible wrong state
    place.classList.remove("borde")
    place.style.removeProperty("border")
    // chech if is a number
    if(isNaN(Number(string)) && string.length > 0) { 
        const parrafo = document.createElement("p")
        parrafo.classList.add("advert")
        parrafo.setAttribute("id", newId)
        parrafo.textContent = "Worng format, numbers only"
        if(place === addingMonth) 
             {addingYear.after(parrafo)}
        else{place.after(parrafo)}
        place.style.border = "2px solid red"
        place.classList.add("borde")
        return false
    } else {return true}
}

function addAlert(place, newId, texto){
    const parrafo = document.createElement("p")
    parrafo.classList.add("advert")
    parrafo.setAttribute("id", newId)
    parrafo.textContent = texto
    if(place === addingMonth) 
        {addingYear.after(parrafo)}
    else{place.after(parrafo)}
    place.style.border = "2px solid red"
    place.classList.add("borde")
}


function eliminateElement(id){
    let advertMesaje = document.getElementById(id)
    if(advertMesaje) {advertMesaje.remove()}
    
}

