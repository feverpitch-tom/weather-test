# Weather Test

## Overview
This project is a koa.js wrapper around the OpenWeatherMap API.

It adds the capability to retrieve weather based on a GeoIP lookup, either for 
an explicitly specified IP address or based on the caller's remote IP - if the 
latter is detected to be a private range then the application attempts to 
determine the external IP by routing out of NAT to [ipify](http://ipify.org),
an Internet based IP service.

## env file
The application will parse a ```.env``` file if it exists the application root.

The env file is excluded from source control for security reasons.

## API Keys
You will need to ensure that the OPENWEATHERMAP_API_KEY environment variable is 
set to your own key.

The environment variable can be set using an env file (see above), or 
otherwise in the normal way for your OS.

## Running the application locally
### Command Line
The application can be run from the command line by running the following command
in the repository root:

```npm start```

### Visual Studio Code
A `launch.json` file exists that will allow for the application to debugged when the
repository is opened in [Visual Studio Code](https://code.visualstudio.com)

### Docker
The application can be built and run in docker.  Docker will *not* include the env
file in the build.  

The easiest way to run the application in docker is by using [Docker Compose](https://docs.docker.com/compose/). 
Simply running `docker-compose up` in the repository root will build and run
a container.  To run using this method an env file in the application root is essential.
Docker Compose will load the variables from this file.  See above for details on the env file
process.

## Testing the application
The application is deployed in AWS as a Docker Cloud managed service.  It is accessible
at the endpoint `http://weather-1403da8d.7780da50.svc.dockerapp.io/`.

It is set up for continuous deployment; merges into the repository's master branch
will result in Docker Cloud building a new image and redeploying to AWS.

### Geo-IP
`http://[endpoint]/api/ip/[:address]`

Retrieved the forecast for the given IP address, or if it is not specified then 
for the IP address of the calling application/user.  Attempts to resolve external
IP address when the caller is on a local IP address (see the Overview above).

- [Example - Jersey IP Address](http://weather-1403da8d.7780da50.svc.dockerapp.io/api/ip/213.133.202.18)
- [Example - Your current detected IP](http://weather-1403da8d.7780da50.svc.dockerapp.io/api/ip)

### Co-ordinates
`http://[endpoint]/api/coords/:lat/:lon`

Retrieves the forecast for a latitude + longitude.

- [Example - The White House, Washington DC](http://weather-1403da8d.7780da50.svc.dockerapp.io/api/coords/38.8977/-77.0365)

### Location (City + Country)
`http://[endpoint]/api/location/:country/:city`

Retrieves the forecast for a city + country.

- [Example - London, GB](http://weather-1403da8d.7780da50.svc.dockerapp.io/api/location/gb/london)

### ID
`http://[endpoint]/api/id/:id`

Retrieves the forecast for a city by OpenWeatherMap ID.

- [Example - Paris (id 2988507)](http://weather-1403da8d.7780da50.svc.dockerapp.io/api/id/2988507)

## Technical debt

Future areas for focus include:

- [Swagger](http://swagger.io) documentation
- Unit + integration tests
- Demonstration UI