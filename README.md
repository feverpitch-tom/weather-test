# Weather Test
This project is a koa.js wrapper around the OpenWeatherMap API.

## env file
The application will parse a ```.env``` file if it exists the application root.

The env file is excluded from source control for security reasons.

## API Keys
To run the application you will need to ensure that the OPENWEATHERMAP_API_KEY
environment variable is set to your own key.

The environment variable can be set using an env file (see above), or 
otherwise in the normal way for your OS.

## Running the application
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
a container.  To run using this method an env file in the applicaiton root is essential.
Docker Compose will load the variables from this file.  See above for details on the env file
process.


