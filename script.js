// Function to create table rows and append them to the table
function createTableRows() {
  var int = 1;
  for (var i = 0; i < 40; i += int) {
    var row = document.createElement("tr");
    var dt1 = document.createElement("td");
    var dt2 = document.createElement("td");
    var dt3 = document.createElement("td");
    var dt4 = document.createElement("td");
    var dt5 = document.createElement("td");
    var dt6 = document.createElement("td");
    var dt7 = document.createElement("td");
    var dt6img = document.createElement("img");
    dt6img.setAttribute("height", "80px");
    dt6img.setAttribute("width", "80px");
    
    dt6.appendChild(dt6img);
    
    row.appendChild(dt1);
    row.appendChild(dt2);
    row.appendChild(dt3);
    row.appendChild(dt4);
    row.appendChild(dt5);
    row.appendChild(dt6);
    row.appendChild(dt7);

    var table = document.getElementById("ftable");
    table.appendChild(row);
  }
}

// Document ready function using jQuery
$(document).ready(function () {
  // Adjust the wrapper's margin-top
  $(".wrapper").css("margin-top", $(window).height() / 5);

  // Set current day, date, and time
  var dt = new Date();
  var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  $('#day').html(days[dt.getDay()]);
  var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  $('#date').html(months[dt.getMonth()] + " " + dt.getDate() + ", " + dt.getFullYear());
  $('#time').html((dt.getHours() > 12 ? (dt.getHours() - 12) : dt.getHours()).toString() + ":" + ((dt.getMinutes() < 10 ? '0' : '').toString() + dt.getMinutes().toString()) + (dt.getHours() < 12 ? ' AM' : ' PM').toString());

  // Celsius to Fahrenheit converter on click
  var temp = 0;
  $('#fahrenheit').click(function () {
    $(this).css("color", "white");
    $('#celsius').css("color", "#b0bec5");
    $('#temperature').html(Math.round(temp * 1.8 + 32));
  });

  $('#celsius').click(function () {
    $(this).css("color", "white");
    $('#fahrenheit').css("color", "#b0bec5");
    $('#temperature').html(Math.round(temp));
  });

  // Search button click event
  $('#sea-button').click(function () {
    var city = $("#city-name").val();
    var j = 7;
    for (var i = 0; i < 40; i++) {
      $('td').eq(j).html("");
      $('td').eq(j + 1).html("");
      $('td').eq(j + 2).html("");
      $('td').eq(j + 3).html("");
      $('td').eq(j + 4).html("");
      $('td').eq(j + 6).html("");
      $('img').eq((i / int) + 1).attr("src", "");
      j += 7;
    }
    updateWeatherData(city);
  });

  // Fetch weather data based on city name
  function updateWeatherData(city) {
    $('#city').html("Station, Country");
    $('#weather-status').html("Weather / Weather Status");
    $('.weather-icon').attr("src", "https://openweathermap.org/img/wn/02d@2x.png");
    $('#temperature').html("0");
    $('.windspeed').html("0 Km/h");
    $('.humidity').html("0 %");
    $('.pressure').html("0 hPa");
    $('.sunrise-time').html("0:00 AM");
    $('.sunset-time').html("0:00 PM");

    $.getJSON(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=e05350407c68654e63c356494ab9baf0`, function (json) {
      $('#city').html(json.name + ", " + json.sys.country);
      $('#weather-status').html(json.weather[0].main + " / " + json.weather[0].description);
      $('.weather-icon').attr("src", `https://openweathermap.org/img/wn/${json.weather[0].icon}@2x.png`);

      temp = json.main.temp - 273.15;
      $('#temperature').html(Math.round(temp));
      $('.windspeed').html(json.wind.speed + " Km/h");
      $('.humidity').html(json.main.humidity + " %");
      $('.pressure').html(json.main.pressure + " hPa");

      var sunriseUTC = json.sys.sunrise * 1000;
      var sunsetUTC = json.sys.sunset * 1000;
      var sunriseDt = new Date(sunriseUTC);
      var sunsetDt = new Date(sunsetUTC);
      $('.sunrise-time').html(formatTime(sunriseDt));
      $('.sunset-time').html(formatTime(sunsetDt));

      var myLatitude = json.coord.lat;
      var myLongitude = json.coord.lon;
      fetchForecastData(myLatitude, myLongitude);
    });
  }

  // Fetch weather forecast data
  function fetchForecastData(latitude, longitude) {
    $.getJSON(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=e05350407c68654e63c356494ab9baf0`, function (forecast) {
      var j = 7;
      for (var i = 0; i < 40; i++) {
        var icon = forecast.list[i].weather[0].icon;

        $('td').eq(j).html(forecast.list[i].dt_txt);
        $('td').eq(j + 1).html(parseInt(forecast.list[i].main.temp - 273.15) + " &degC");
        $('td').eq(j + 2).html(forecast.list[i].main.pressure + " hPa");
        $('td').eq(j + 3).html(forecast.list[i].main.humidity + " %");
        $('td').eq(j + 4).html(forecast.list[i].wind.speed + " Kmph");
        $('td').eq(j + 6).html(forecast.list[i].weather[0].description);
        $('img').eq((i / int) + 1).attr("src", `https://openweathermap.org/img/wn/${icon}@2x.png`);
        j += 7;
      }
      document.getElementById('Forcast-data').setAttribute("overflow-y", "scroll");
    });
  }

  // Format time in AM/PM format
  function formatTime(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? ' PM' : ' AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    return hours + ':' + minutes + ampm;
  }

  // Get current location and fetch weather data
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      var myLatitude = parseFloat(position.coords.latitude.toFixed(2));
      var myLongitude = parseFloat(position.coords.longitude.toFixed(2));
      updateWeatherDataByLocation(myLatitude, myLongitude);
    });
  }

  // Fetch weather data based on location coordinates
  function updateWeatherDataByLocation(latitude, longitude) {
    $.getJSON(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&id=524901&appid=e05350407c68654e63c356494ab9baf0`, function (json) {
      $('#city').html(json.name + ", " + json.sys.country);
      $('#weather-status').html(json.weather[0].main + " / " + json.weather[0].description);
      $('.weather-icon').attr("src", `https://openweathermap.org/img/wn/${json.weather[0].icon}@2x.png`);

      temp = json.main.temp - 273.15;
      $('#temperature').html(Math.round(temp));
      $('.windspeed').html(json.wind.speed + " Km/h");
      $('.humidity').html(json.main.humidity + " %");
      $('.pressure').html(json.main.pressure + " hPa");

      var sunriseUTC = json.sys.sunrise * 1000;
      var sunsetUTC = json.sys.sunset * 1000;
      var sunriseDt = new Date(sunriseUTC);
      var sunsetDt = new Date(sunsetUTC);
      $('.sunrise-time').html(formatTime(sunriseDt));
      $('.sunset-time').html(formatTime(sunsetDt));
    });

    fetchForecastData(latitude, longitude);
  }

  // Create table rows on document ready
  createTableRows();
});