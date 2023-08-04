var int = 1;
for(var i=0; i < 40; i=i+int){
  var row = document.createElement("tr");
  var dt1 = document.createElement("td");
  var dt2 = document.createElement("td");
  var dt3 = document.createElement("td");
  var dt4 = document.createElement("td");
  var dt5 = document.createElement("td");
  var dt6 = document.createElement("td");
  var dt7 = document.createElement("td");
  var dt6img = document.createElement("img");
  dt6img.setAttribute("height", "80px","width", "80px");
  var table = document.getElementById("ftable");
  row.appendChild(dt1);
  row.appendChild(dt2);
  row.appendChild(dt3);
  row.appendChild(dt4);
  row.appendChild(dt5);
  dt6.appendChild(dt6img);
  row.appendChild(dt6);
  row.appendChild(dt7);
  table.appendChild(row);
}

$(document).ready(function () {
  $(".wrapper").css("margin-top", ($(window).height()) / 5);
  var dt = new Date()
  var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  $('#day').html(days[dt.getDay()]);
  var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
  $('#date').html(months[dt.getMonth()] + " " + dt.getDate() + ", " + dt.getFullYear());
  $('#time').html((dt.getHours() > 12 ? (dt.getHours() - 12) : dt.getHours()).toString() + ":" + ((dt.getMinutes() < 10 ? '0' : '').toString() + dt.getMinutes().toString()) + (dt.getHours() < 12 ? ' AM' : ' PM').toString());

  //CELSIUS TO FAHRENHEIT CONVERTER on Click
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

  $('#sea-button').click(function () {
    var city = $("#city-name").val();
    var j = 7;
    for(var i=0; i < 40; i=i+int){
      $('td').eq(j).html("");
      $('td').eq(j+1).html("");
      $('td').eq(j+2).html("");
      $('td').eq(j+3).html("");
      $('td').eq(j+4).html("");
      $('td').eq(j+6).html("");
      $('img').eq((i/int)+1).attr("src","");
      j += 7;
    }
    $('#city').html("Station, Country");
    $('#weather-status').html("Weather / Weather Status");
    $('.weather-icon').attr("src","https://openweathermap.org/img/wn/02d@2x.png");
    $('#temperature').html("0");
    $('.windspeed').html("0 Km/h")
    $('.humidity').html("0 %");
    $('.pressure').html("0 hPa");
    $('.sunrise-time').html("0:00 AM");
    $('.sunset-time').html("0:00 PM");

    $.getJSON("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=e05350407c68654e63c356494ab9baf0", function (json) {
      $('#city').html(json.name + ", " + json.sys.country);
      $('#weather-status').html(json.weather[0].main + " / " + json.weather[0].description);
      $('.weather-icon').attr("src","https://openweathermap.org/img/wn/"+json.weather[0].icon+"@2x.png");

      temp = (json.main.temp - 273);
      $('#temperature').html(Math.round(temp));
      $('.windspeed').html(json.wind.speed + " Km/h")
      $('.humidity').html(json.main.humidity + " %");
      $('.pressure').html(json.main.pressure + " hPa");
      var sunriseUTC = json.sys.sunrise * 1000;
      var sunsetUTC = json.sys.sunset * 1000;
      var sunriseDt = new Date(sunriseUTC);
      var sunsetDt = new Date(sunsetUTC);
      $('.sunrise-time').html((sunriseDt.getHours() > 12 ? (sunriseDt.getHours() - 12) : sunriseDt.getHours()).toString() + ":" + ((sunriseDt.getMinutes() < 10 ? '0' : '').toString() + sunriseDt.getMinutes().toString()) + (sunriseDt.getHours() < 12 ? ' AM' : ' PM').toString());
      $('.sunset-time').html((sunsetDt.getHours() > 12 ? (sunsetDt.getHours() - 12) : sunsetDt.getHours()).toString() + ":" + ((sunsetDt.getMinutes() < 10 ? '0' : '').toString() + sunsetDt.getMinutes().toString()) + (sunsetDt.getHours() < 12 ? ' AM' : ' PM').toString());
      var myLatitude = json.coord.lat;
      var myLongitude = json.coord.lon;
      $.getJSON("https://api.openweathermap.org/data/2.5/forecast?lat=" + myLatitude + "&lon=" + myLongitude + "&appid=e05350407c68654e63c356494ab9baf0", function(forecast) {
        var j = 7;
        for(var i=0; i < 40; i=i+int){
          var icon = forecast.list[i].weather[0].icon;

          $('td').eq(j).html(forecast.list[i].dt_txt);
          $('td').eq(j+1).html(parseInt(forecast.list[i].main.temp - 273.15)+" &degC");
          $('td').eq(j+2).html(forecast.list[i].main.pressure + " hPa");
          $('td').eq(j+3).html(forecast.list[i].main.humidity + " %");
          $('td').eq(j+4).html(forecast.list[i].wind.speed + " Kmph");
          $('td').eq(j+6).html(forecast.list[i].weather[0].description);
          $('img').eq((i/int)+1).attr("src","https://openweathermap.org/img/wn/"+icon+"@2x.png");
          j += 7;
        }
        document.getElementById('Forcast-data').setAttribute("overflow-y", "scroll");
      });
    });
    });

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var myLatitude = parseFloat(Math.round(position.coords.latitude * 100) / 100).toFixed(2);
      var myLongitude = parseFloat(Math.round(position.coords.longitude * 100) / 100).toFixed(2);
  
      $.getJSON("https://api.openweathermap.org/data/2.5/weather?lat=" + myLatitude + "&lon=" + myLongitude + "&id=524901&appid=e05350407c68654e63c356494ab9baf0", function(json) {
        $('#city').html(json.name + ", " + json.sys.country);
        $('#weather-status').html(json.weather[0].main + " / " + json.weather[0].description);
        $('.weather-icon').attr("src","https://openweathermap.org/img/wn/"+json.weather[0].icon+"@2x.png");

        temp = (json.main.temp -273);
        $('#temperature').html(Math.round(temp));
        $('.windspeed').html(json.wind.speed + " Km/h")
        $('.humidity').html(json.main.humidity + " %");
        $('.pressure').html(json.main.pressure + " hPa");
        var sunriseUTC = json.sys.sunrise * 1000;
        var sunsetUTC = json.sys.sunset * 1000;
        var sunriseDt = new Date(sunriseUTC);
        var sunsetDt = new Date (sunsetUTC);
        $('.sunrise-time').html((sunriseDt.getHours()>12?(sunriseDt.getHours()-12):sunriseDt.getHours()).toString() + ":" + ((sunriseDt.getMinutes() < 10 ? '0' : '').toString() + sunriseDt.getMinutes().toString()) + (sunriseDt.getHours() < 12 ? ' AM' : ' PM').toString());
        $('.sunset-time').html((sunsetDt.getHours()>12?(sunsetDt.getHours()-12):sunsetDt.getHours()).toString() + ":" + ((sunsetDt.getMinutes() < 10 ? '0' : '').toString() + sunsetDt.getMinutes().toString()) + (sunsetDt.getHours() < 12 ? ' AM' : ' PM').toString());
      });

      $.getJSON("https://api.openweathermap.org/data/2.5/forecast?lat=" + myLatitude + "&lon=" + myLongitude + "&appid=e05350407c68654e63c356494ab9baf0", function(forecast) {
        var j = 7;
        for(var i=0; i < 40; i=i+int){
          var icon = forecast.list[i].weather[0].icon;

          $('td').eq(j).html(forecast.list[i].dt_txt);
          $('td').eq(j+1).html(parseInt(forecast.list[i].main.temp - 273.15)+" &degC");
          $('td').eq(j+2).html(forecast.list[i].main.pressure + " hPa");
          $('td').eq(j+3).html(forecast.list[i].main.humidity + " %");
          $('td').eq(j+4).html(forecast.list[i].wind.speed + " Kmph");
          $('td').eq(j+6).html(forecast.list[i].weather[0].description);
          $('img').eq((i/int)+1).attr("src","https://openweathermap.org/img/wn/"+icon+"@2x.png");
          j += 7;
        }
        document.getElementById('Forcast-data').setAttribute("overflow-y", "scroll");
      });
    });
  }

});