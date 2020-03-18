const messageOne=document.querySelector('#message-1');
const messageTwo=document.querySelector('#message-2');
//const messageThree=document.querySelector('#message-3');
const search=document.querySelector('#location');

const weatherForm=document.querySelector('#form').addEventListener('submit',(e)=>{
    e.preventDefault();
    messageOne.textContent="Loading..";
    messageTwo.textContent="";
    //messageThree.textContent="";
    const location=search.value;
    fetch(`/weather?location=${location}`)
    .then((response)=>{
        return response.json();
    })
    .then((data)=>{
        if(data.error){
            messageOne.textContent=data.error;
            messageTwo.textContent="";
            //messageThree.textContent="";
        }else{
            messageOne.textContent=data.location.location;
            messageTwo.textContent= data.TemperatureDaily.data[0].summary+". It is currently "+data.TemperatureData.temperature+" degrees out.";  
            //messageThree.textContent=data.TemperatureDaily.data[0].temperatureHigh;  
        }      
    })

});


