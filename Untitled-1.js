let searchInput=''
    searchResults=['']
    WeatherSearchResults=['']


let BtnInput=document.getElementById("searchInput2")
BtnInput.addEventListener("keyup", function(event) {
     if (event.keyCode === 13) {
    searchInput = document.getElementById("searchInput1").value;
    breweryByZip();
    
    $("#searchInput1").val("Enter thy jolly time zip")
    
    }});
    

    function breweryByZip() {
    
        let queryURL = "https://api.openbrewerydb.org/breweries?by_postal=97209";
        console.log(queryURL);
    
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response){  
            
    
    
             searchResults = response;
           
            addbrew()
            //variables to capture API response properties
            
            
        })}

     

 // function for brewery list
 function addbrew(){
    for (i=0; i< searchResults.length; i++){
        $(".brewbox").remove()
      name = searchResults[i].name
      city = searchResults[i].city
      address = searchResults[i].street 
      type = searchResults[i].brewery_type
      phone = phone ='('+ searchResults[i].phone.slice(0,3)+")"+searchResults[i].phone.slice(3,6)+'-'+searchResults[i].phone.slice(6,10)
      website = searchResults[i].website_url
      
    //   creates containers for brewery response data
      newContainer = document.createElement('div')
      newContainer.className = 'brewBox container grid'
      newContainer.id = "brewBox"+i
      $(".breweryResults").append(newContainer)
       // Creats divs for brewery listing
      
      const varList=[name,city,address,phone]  
      altVarList=["name",'city','address','phone']
      for (x=0; x < varList.length; x++){
        g = varList[x] , h = altVarList[x] 
         newDiv = document.createElement('div')
           newDiv.className = h
            newDiv.append(g)  
        newContainer.append(newDiv);
                   
    }
        
        // Adds onclick event for website_url    
    const webButton =  document.createElement('a')
        newContainer.append(webButton)
        webButton.outerHTML = "<a class=website href="+website+">"+website+"</a>"
    }       
     displayCityWeather()     
    
   }





        //   Weather
        //             api
        //                     section
        // Query function to "get" weather info
        function displayCityWeather() {
    
            let queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + "Denver" + "&appid=db5176658b0dab6a2aa19e11a0e01748";
            console.log(queryURL);
        
            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function(response) {
        
                //variables to capture API response properties
                let name = response.name;
                let tempKelvin = response.main.temp;
                let tempC = (tempKelvin - 273.15).toFixed(1);
                let tempF = (tempC * 1.8 + 32).toFixed(0);
        
                console.log(name);
                console.log(tempKelvin);
                console.log(tempC);
                console.log(tempF);
            })
        };
    
   