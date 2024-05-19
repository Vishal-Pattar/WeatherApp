# WeatherApp

A simple and interactive weather dashboard that displays current weather information and a 5-day forecast for a specified location. The app leverages the OpenWeatherMap API to fetch and display weather data.

## Live Demo
Check out the live app [here](https://vishal-pattar.github.io/WeatherApp/).

## Features
- Display current weather including temperature, weather status, wind speed, humidity, and pressure.
- Show sunrise and sunset times.
- 5-day weather forecast with detailed information for each time period.
- Dynamic background and icons based on weather conditions.
- Geolocation support to fetch weather for the user's current location.
- Temperature conversion between Celsius and Fahrenheit.

## Technologies Used
- HTML
- CSS
- JavaScript
- jQuery
- OpenWeatherMap API

## Getting Started

### Prerequisites
To run this project locally, you'll need:
- A modern web browser
- Internet connection

### Installation
1. Clone the repository:
    ```bash
    git clone https://github.com/Vishal-Pattar/WeatherApp.git
    ```
2. Navigate to the project directory:
    ```bash
    cd WeatherApp
    ```
3. Open `index.html` in your web browser to view the app.

## Usage
1. Enter a city name in the search bar and click the search button to fetch and display weather data.
2. Click on the temperature unit (Celsius or Fahrenheit) to toggle between units.
3. If location access is allowed, the app will automatically display weather information for your current location.

## Project Structure
- `index.html`: The main HTML file that contains the structure of the web page.
- `style.css`: The CSS file that styles the web page.
- `script.js`: The JavaScript file that contains the logic for fetching and displaying weather data.

## API Integration
This app uses the OpenWeatherMap API. To use this API, you need an API key which you can get by signing up on the [OpenWeatherMap website](https://openweathermap.org/api).

### Example API Requests
- Current weather data:
    ```url
    https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
    ```
- 5-day weather forecast:
    ```url
    https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}
    ```

## Contributing
Contributions are welcome! Please fork the repository and create a pull request with your changes. 

## License
This project is licensed under the GPL-3.0 License. See the [LICENSE](LICENSE) file for details.

## Acknowledgements
- [OpenWeatherMap](https://openweathermap.org/) for providing the weather API.
- [Google Fonts](https://fonts.google.com/) for the Roboto font.

---

Feel free to explore the code and provide feedback. Happy coding!
