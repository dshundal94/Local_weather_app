/*First I need to get the current location of the user, I do this by the API that finds the current IP address of the user*/
$.getJSON("http://ip-api.com/json", function(json) {
    var latitude = json.lat;
    var longitude = json.lon;
    var city = json.city;
    var state = json.region;
  var urlAPI = "http://api.openweathermap.org/data/2.5/weather?";
  var apikey = "e45f7f3a4b788e7849492e0d427d095f";
  var callAPI = urlAPI + "lat=" + latitude + "&lon=" + longitude + "&appid=" + apikey;
  /*Then I get the JSON data from the weather API and sort through the information to give me details about the current weather*/
  $.getJSON(callAPI, function(response) {
    var iconIMG = response.weather[0].icon; 
    var description = response.weather[0].description;
    var temp = Math.round((response.main.temp * 1.8) - 459.67);
  $("#temp").html(temp + "&deg;F");
    /*Here I'm using the icon id to get an image of the current weather to display to my user*/
    var iconURL = "http://openweathermap.org/img/w/" + iconIMG + ".png";
    var img = new Image();
    img.src = iconURL;
    img.setAttribute("class", "icon");
    img.setAttribute("alt", "effy");
  document.getElementById("icon").appendChild(img);
    $("#cityState").html(city + ", " + state);
    $("#description").html(description);
    /*Here I use the buttons to convert my temperature from celsius to F or vice versa*/
    document.getElementById('toC').onclick = function() {
      var cTemp = Math.round(response.main.temp - 273.15);
      $("#temp").html(cTemp + "&deg;C");
    };
    document.getElementById('toF').onclick = function() {
      var fTemp = Math.round((response.main.temp * 1.8) - 459.67);;
      $("#temp").html(fTemp + "&deg;F");
    };
  });
});