Weather Test
============

This project is a koa.js wrapper around the OpenWeatherMap API.

Setup
-----
To run the project you will need to ensure that the OPENWEATHERMAP_API_KEY
environment variable is set to your own key.

For ease of development the application will parse a ```.env``` file if it
exists in ```src/web```.  The file should look like this:

```OPENWEATHERMAP_API_KEY=[key]```