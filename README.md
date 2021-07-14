## ShortLink 

ShortLink is a URL shortening service where you enter a URL such as https://indicina.co and it
returns a short URL such as http://short.est/GeAi9K. Visiting the shortened URL should redirect
the user to the long URL. Using the example above, visiting http://short.est/GeAi9K should
redirect the user to https://indicina.co.

## Tools Needed
- Docker

## Setup

- Clone repo
- Change to the application's directory `$ cd shortlink`
- RUN `yarn install`
- Start the docker containers `$ docker-compose up -d --build`
- Visit the URL [http://localhost:3000](http://localhost:3000) to confirm set up was successful.


## How to test

1. Complete all steps in the [SETUP](https://github.com/profchydon/shortlink#setup) section.

2. You can refer to the API documentation [here](https://documenter.getpostman.com/view/2916524/Tzm9katE)

3. ***ENCODE A URL:***  Using postman, Make a HTTP POST request to `http://localhost:3000/url/encode` as below:

    ```
        POST /url/encode
        // body
        {
            "url": "https://indicina.co/"
        }
    ```

    Take note of the shortUrl link and url code sent back as response. You will need it in the next section.
     
4. ***DECODE A URL:***  Make a HTTP GET request to `http://localhost:3000/url/decode` as below:

    ```
        POST /url/decode
        // body
        {
            "shortUrl" : "http://localhost:3000/_oXG8X"
        }
    ```

5. ***VIEW URL STATISTICS:***  Make a HTTP GET request to `http://localhost:3000/url/statistics/_oXG8X`:

**NOTE:** _oXG8X is the URL code returned when the URL was encoded. Make use of what you have on your end.


6. ***VISIT SHORT URL:***  Visit [http://localhost:3000/_oXG8X](http://localhost:3000/_oXG8X) 

Perform step 5 to view latest statistics