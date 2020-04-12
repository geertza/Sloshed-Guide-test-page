let nameInput=''
    zipInput=''
    searchResults=['']
    WeatherSearchResults=['']

   
    // api search 
    //     by 
    //     zipcode

//  event listener for zipcode input2
let zipBtn=document.getElementById("searchInput2")
zipBtn.addEventListener("keyup", function(event) {
     if (event.keyCode === 13) {
    zipInput = document.getElementById("searchInput2").value;
    breweryByZip();
    $("#searchInput2").val("")
    }});
    
        // api Query
    function breweryByZip() {
    
        let queryURL = "https://api.openbrewerydb.org/breweries?by_postal="+zipInput;
        console.log(zipInput)
        console.log(queryURL)
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response){  
            searchResults = response;
           searchZipWeather()
              
        })}
        function searchZipWeather() {
          let queryURL = "https://api.openweathermap.org/data/2.5/weather?zip=" + zipInput + "&units=imperial&appid=db5176658b0dab6a2aa19e11a0e01748";
            
        $.ajax({ url: queryURL,method: "GET"})
         .then(function(response) {
                WeatherSearchResults = response
                console.log(WeatherSearchResults)
                addbrew()
            })};

// search
//     by  
//        Name


            // get values from name button
     let nameBtn=document.getElementById("searchInput1")
    nameBtn.addEventListener("keyup", function(event) {
         if (event.keyCode === 13) {
        nameInput = document.getElementById("searchInput1").value;
        breweryBySearchTerm();
        
        $("#searchInput1").val("")
        }});




                // Query to "get" brewery by name api data
        function breweryBySearchTerm() {
              let queryURL = "https://api.openbrewerydb.org/breweries/search?query="+nameInput;
           
              $.ajax({url: queryURL,method: "GET"})
              .then(function(response) {
          //variables to capture API response properties
                 searchResults = response;
              searchCityWeather();  
            })};
        
        // Query to "get"  by name weather api data
        function searchCityWeather() {
            let queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + nameInput + "&units=imperial&appid=db5176658b0dab6a2aa19e11a0e01748";
                $.ajax({url: queryURL,method: "GET"
            }).then(function(response) {
                WeatherSearchResults = response
                   addbrew()
            })};



    // function to generate Brewery list in a grid
 function addbrew(){
    $(".brewBox").remove()
    for (i=0; i< searchResults.length; i++){
      // remove previous search 
      $(".brewbox").remove()
      
      //   Individual values for each div
        name = searchResults[i].name
      city = searchResults[i].city
      address = searchResults[i].street 
      type = searchResults[i].brewery_type
      phone = phone ='('+ searchResults[i].phone.slice(0,3)+")"+searchResults[i].phone.slice(3,6)+'-'+searchResults[i].phone.slice(6,10)
      website = searchResults[i].website_url
      
    //   creates button for brewery response data
      newBtn = document.createElement('button')
      newBtn.className = 'brewBox  grid'
      newBtn.onclick = function() { window.open(website); }; 
      $(".breweryResults").append(newBtn)
       
      // Creats divs for brewery listing
        const varList=[name,website,address,phone]  
      altVarList=["name",'website','address','phone']
      for (x=0; x < varList.length; x++){
        g = varList[x] , h = altVarList[x] 
         newDiv = document.createElement('div')
           newDiv.className = h
            newDiv.append(g)  
        newBtn.append(newDiv);
                   // Adds onclick event for website_url    
   
    }}   
      createweather()}



    // display weather information (this is the fun one!!!!)
   function createweather(){
    // document.getElementById('today').style.backgroundImage="url(./lib/"+iconId+"d.png)"
    iconId=WeatherSearchResults.weather[0].icon.slice(0,2)
    icon=""

    var skyIcon;
    switch (iconId ){
      case 01:
    //   clear skys 
      icon= "lightning.jpg";
        break;
      case 02:
    //   few clouds 
      icon= "02.jpg";
        break;
      case 03:
    //   cloudy  
      icon = "03-clouds.jpg";
        break;
      case 04:
    //   cloudy  
      icon = "03-clouds.jpg";
        break;
      case 09:
    //   rain  
      icon= "09-rain.jpg";
        break;
      rain
        case 10:
    //   rain  
      icon="09-rain.jpg";
        break;
      case 11:
    //   thunder  
      icon="lightning.jpg";
        break;
        case 13:
      default:
    //   snow  
      icon= "01.jpg";
      break;
      case 50:
    //   mist
        icon="01.jpg" 
    }
  
    // document.getElementById('sky').style.backgroundImage="url(./images/09-rain.jpg)";
    document.getElementById('sky').style.backgroundImage="url(./images/"+icon+")";
    document.getElementById('city').style.backgroundImage="url(./images/city.png)";
    let TemperatureDiv = document.createElement("div");
    TemperatureDiv.classList.add("temperature");
    $(".weather").append(TemperatureDiv);
    TemperatureDiv.innerHTML = WeatherSearchResults.main.temp+" "+"F°";
   }