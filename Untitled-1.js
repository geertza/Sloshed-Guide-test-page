let nameInput=''
    zipInput=''
    searchResults=['']
    WeatherSearchResults=['']

   
    // api search 
    //     by 
    //     zipcode


let zipBtn=document.getElementById("searchInput2")
zipBtn.addEventListener("keyup", function(event) {
     if (event.keyCode === 13) {
    zipInput = document.getElementById("searchInput2").value;
    breweryByZip();
    
    $("#searchInput2").val("")
    
    }});
    

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
            //variables to capture API response properties
            
            
        })}
        function searchZipWeather() {
    
            let queryURL = "http://api.openweathermap.org/data/2.5/weather?zip=" + zipInput + "&units=imperial&appid=db5176658b0dab6a2aa19e11a0e01748";
            
        
            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function(response) {
                WeatherSearchResults = response
                console.log(WeatherSearchResults)
                //variables to capture API response properties
                let name = response.name;
                let tempKelvin = response.main.temp;
                let tempC = (tempKelvin - 273.15).toFixed(1);
                let tempF = (tempC * 1.8 + 32).toFixed(0);
        
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
            console.log(queryURL);
        
            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function(response) {
        
                //variables to capture API response properties
                 searchResults = response;
              searchCityWeather();  
            })
        };
        
        
           // Query to "get"  by name weather api data
        function searchCityWeather() {
    
            let queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + nameInput + "&units=imperial&appid=db5176658b0dab6a2aa19e11a0e01748";
            
        
            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function(response) {
                WeatherSearchResults = response

              
        
              addbrew()
            })};



    // function to generate Brewery list in a grid
 function addbrew(){
    $(".brewBox").remove()
    for (i=0; i< searchResults.length; i++){
        $(".brewbox").remove()
      
      
    //   Individual values for each div
        name = searchResults[i].name
      city = searchResults[i].city
      address = searchResults[i].street 
      type = searchResults[i].brewery_type
      phone = phone ='('+ searchResults[i].phone.slice(0,3)+")"+searchResults[i].phone.slice(3,6)+'-'+searchResults[i].phone.slice(6,10)
      website = searchResults[i].website_url
      
    //   creates containers for brewery response data
      newContainer = document.createElement('div')
      newContainer.className = 'brewBox container grid'
      newContainer.id = "brewBox grid"
     
      $(".breweryResults").append(newContainer)
      
       const webButton =  document.createElement('div')
       webButton.classList.add('website')  
       newContainer.append(webButton)
        webButton.outerHTML = "<a class=website href="+website+">"+website+"</a>"
     
     
      // Creats divs for brewery listing
        const varList=[name,address,phone]  
      altVarList=["name",'address','phone']
      for (x=0; x < varList.length; x++){
        g = varList[x] , h = altVarList[x] 
         newDiv = document.createElement('div')
           newDiv.className = h
            newDiv.append(g)  
        newContainer.append(newDiv);
                   // Adds onclick event for website_url    
   
    }}   
      createweather()}



    // display weather information (this is the fun one!!!!)
   function createweather(){
    // document.getElementById('today').style.backgroundImage="url(./lib/"+iconId+"d.png)"
    document.getElementById("sky").style.backgroundImage = "url('./images/moon.jpg')";
    
    let TemperatureDiv = document.createElement("div");
    TemperatureDiv.classList.add("temperature");
    $(".weather").append(TemperatureDiv);
    TemperatureDiv.innerHTML = WeatherSearchResults.main.temp+" "+"F°";
    console.log(TemperatureDiv)
   }