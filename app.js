
window.addEventListener('load', () => {
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let temperatureSection = document.querySelector('.temperature');
    let temperatureSpan = document.querySelector('.degree');
    
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;
            const proxy = "https://cors-anywhere.herokuapp.com/";
            const api = `${proxy}https://api.darksky.net/forecast/4b2a7013cdb4bb2741af73b4b12b6a8c/${lat},${long}`;
            
            fetch(api)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    //DOM elements from API
                     console.log(data);
                    const {temperature, summary ,icon} = data.currently;
                    temperatureDegree.textContent = temperature;
                    temperatureDescription.textContent = summary;
                    locationTimezone.textContent = data.timezone;
                   
                    //Formula for celcius
                    let celsius = (temperature - 32) * (5 / 9);
                    //SET ICON
                    setIcons(icon,document.querySelector('.icon'));
                
                   //Change temperature to celcius
                   temperatureSection.addEventListener("click",()=>{
                      if(temperatureSpan.textContent === "°F"){
                          temperatureSpan.textContent = "°C";
                          temperatureDegree.textContent = Math.floor(celsius);
                      }
                       else{
                          temperatureDegree.textContent = temperature;   
                          temperatureSpan.textContent = "°F"; 
                       }
                          
                   });
                });
        });

    } else {
        h1.textContent = "sorry,this is not working due to xy reason!"
    }
                        
    function setIcons(icon,iconId){
      const skycons = new Skycons({color: "white"});
      const currentIcon = icon.replace(/-/g, "_").toUpperCase();
      skycons.play();
      return skycons.set(iconId, Skycons[currentIcon]);
}  
});
