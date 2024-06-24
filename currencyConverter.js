const base_url ='https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@2024.3.2/v1/currencies'

const dropdown = document.querySelectorAll(".dropdown select");
const btn=document.querySelector("form button");
const fromCurr=document.querySelector(".from select");
const toCurr=document.querySelector(".to select");
const msg =document.querySelector(".msg");


for(let select of dropdown){
    for(currCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText=currCode;
        newOption.value=currCode;
        select.append(newOption);
        if(select.name==="from" && currCode==="USD"){
            newOption.selected="selected"
        }
        else if(select.name==="to" && currCode==="INR"){
            newOption.selected="selected"
        }
    }

    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
    })

}

const updateExchangeRate= async()=>{
    let amount=document.querySelector(".amount input");
    let amountVal=amount.value;

    if(amountVal==="" || amountVal < 0){
        amountVal=1;
        amount.value="1";
    }

    // console.log(toCurr.value.toLowerCase());
   
    
    const URL = `${base_url}/${fromCurr.value.toLowerCase()}.json`
    let responce = await fetch(URL);
    console.log(responce);
    let data = await responce.json();
    let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
    console.log(rate);
    let finalAmount=amountVal*rate;
    msg.innerText = `${amountVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
}


const updateFlag=(element)=>{
    let currCode = element.value;
    let countryCode= countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img =element.parentElement.querySelector("img");
    img.src=newSrc;
};

btn.addEventListener("click",(evt)=>{
    evt.preventDefault();
    updateExchangeRate();

});

window.addEventListener("load",()=>{
    updateExchangeRate();
})



