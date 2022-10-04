window.addEventListener("load", () => {
    let lon 
    let lat

    const cont = document.getElementById("contenedor")
    const popUp = document.querySelector(".pop-up")

    const tempValor = document.getElementById("temp-valor")
    const tempDesc = document.getElementById("temp-desc")

    const ubicacion = document.getElementById("ubicacion")
    const pais = document.getElementById("pais")
    const iconAnim = document.getElementById("icon-anim")

    const vientoVelocidad = document.getElementById("viento-velocidad")

    cont.classList.add("off")

    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition( posicion => {
            popUp.classList.add("off")
            cont.classList.remove("off")
            lon = posicion.coords.longitude
            lat = posicion.coords.latitude

            // ubicacion actual
            // const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=04172a466bd267dc6f65ce0b26eeaa3c`
            
            // ubicacion por ciudad
            const url = `https://api.openweathermap.org/data/2.5/weather?q=mar+del+plata&lang=es&units=metric&appid=04172a466bd267dc6f65ce0b26eeaa3c`
            
            // console.log(url);

            fetch(url)
                .then(response => {return response.json() })
                .then( data => {
                    let temp = Math.round(data.main.temp)
                    tempValor.textContent = `${temp} °C`
                    console.log(data.weather[0].description);
                    let desc = data.weather[0].description
                    tempDesc.textContent = desc.toUpperCase()

                    ubicacion.textContent = data.name
                    pais.textContent = data.sys.country

                    vientoVelocidad.textContent = `${data.wind.speed} m/s`
                    
                    // para iconos estaticos
                    // console.log(data.weather[0].icon);
                    // let iconCode = data.weather[0].icon
                    // const urlIcon = `https://openweathermap.org/img/wn/${iconCode}.png`

                    // para iconos animados
                    console.log(data.weather[0].main);
                    switch(data.weather[0].main) {
                        case "Thunderstorm":
                            iconAnim.src = "img/animated/thunder.svg"
                            console.log("Tormenta")
                            break;
                        case "Drizzle":
                            iconAnim.src = "img/animated/rainy-2.svg"
                            console.log("Llovizna")
                            break;
                        case "Rain":
                            iconAnim.src = "img/animated/rainy-7.svg"
                            console.log("Lluvia")
                            break;
                        case "Snow":
                            iconAnim.src = "img/animated/snowy-6.svg"
                            console.log("Nieve")
                            break;
                        case "Clear":
                            iconAnim.src = "img/animated/day.svg"
                            console.log("Limpio")
                            break;
                        case "Atmosphere":
                            iconAnim.src = "img/animated/weather.svg"
                            console.log("Atmosfera")
                            break;
                        case "Clouds":
                            iconAnim.src = "img/animated/cloudy-day-1.svg"
                            console.log("Nubes")
                            break;
                        default: 
                            iconAnim.src = "img/animated/cloudy-day-1.svg"
                            console.log("por defecto")
                            break;
                    }

                })
                .catch(error => {
                    console.log(error);
                })
        })
    }
})