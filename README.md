# Tutorial

This project was made using React.js, MUI for the UI components, json-server as a placeholder server, and Redux Saga for state management and Api calls.

## How to run the app

1- First step is to get the json-server running. The json file is located on the Data folder. Once you cd into it run the following command "json-server --port 5000 --watch data.json" to start the server on port 5000.
2- On another terminal run "npm start" where you will be redirected to the login page. Use the credentials:
    1- email:balan@test.com and password:test1234@B to log in as a seeker
    2- email:bburr@test.com and password:test1234@B to log in as a poster
Alternatively you can register as a seeker and poster

## Notes
Application form for seekers has an upload cv button but that cv is not received as a file from the job poster since this app does not have a proper server. For now the job poster receives only the cv file name. It was still included as a UI choice since most job posting pages have a CV upload section for detailed information on the user.