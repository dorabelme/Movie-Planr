[![Netlify Status](https://api.netlify.com/api/v1/badges/fca0462a-391b-4d20-9d01-ee538235c806/deploy-status)](https://app.netlify.com/sites/movie-planr/deploys)

# Movie Route Planr 🗺️

**[Movie Route Planr](https://movie-planr.netlify.app/)** is a simple app built with Google Maps and React.JS. It helps you visit movie sites in San Francisco.

- Explore famous sites in San Francisco on the map.
- Add locations between start and end destinations of your route and see which movies were filmed at the chosen location.

## How to run locally? 💻

1. Clone and cd into the repo.
2. Run `npm install` to download dependencies.
3. Run `npm start` to start the development server.
4. Open your browser and point to http://localhost:3000/.

## Demo ✨

![App-example](movierouteplanr.gif)

## Tech Stack 🤖

- ReactJS (Hooks)
- React-Google-Maps
- Magic for authentication
- Google Maps (Geocoding API, Maps JavaScript API, Directions API)
- Ant Design
- Node-Sass
- Axios

# Environment Variables 🔌

```
REACT_APP_GOOGLE_API_KEY - for google map api key, go to https://developers.google.com/maps/documentation/javascript/get-api-key.
REACT_APP_MAGIC_KEY - to get your own Magic key, go to https://magic.link/.
```

## Testing 📍

The following libraries are used for testing:

- testing-library/react
- cypress

## Other Scripts 📱

    * build - creates a build of the application
    * start - starts the production server after a build is created
    * test - runs tests in **tests** directory
    * eject - copy the configuration files and dependencies into the project so you have full control over them

# Contributing 🖊️

When contributing to this repository, please first discuss the change you wish to make via issue, email, or any other method with the owners of this repository before making a change.

Please note we have a [code of conduct](./CODE_OF_CONDUCT.md). Please follow it in all your interactions with the project.

## Issue/Bug Request 📝

**If you are having an issue with the existing project code, please submit a bug report under the following guidelines:**

- Check first to see if your issue has already been reported.
- Check to see if the issue has recently been fixed by attempting to reproduce the issue using the latest master branch in the repository.
- Create a live example of the problem.
- Submit a detailed bug report including your environment & browser, steps to reproduce the issue, actual and expected outcomes, where you believe the issue is originating from, and any potential solutions you have considered.

### Feature Requests 📋

We would love to hear from you about new features which would improve this app and further the aims of our project. Please provide as much detail and information as possible to show us why you think your new feature should be implemented.

### Pull Requests 📓

If you have developed a patch, bug fix, or new feature that would improve this app, please submit a pull request. It is best to communicate your ideas with the developers first before investing a great deal of time into a pull request to ensure that it will mesh smoothly with the project.

Remember that this project is licensed under the MIT license, and by submitting a pull request, you agree that your work will be, too.

#### Pull Request Guidelines 📑

- Ensure any install or build dependencies are removed before the end of the layer when doing a build.
- Update the README.md with details of changes to the interface, including new plist variables, exposed ports, useful file locations and container parameters.
- Ensure that your code conforms to our existing code conventions and test coverage.
- Include the relevant issue number, if applicable.
- You may merge the Pull Request in once you have the sign-off of two other developers, or if you do not have permission to do that, you may request the second reviewer to merge it for you.

### Attribution

These contribution guidelines have been adapted from [this good-Contributing.md-template](https://gist.github.com/PurpleBooth/b24679402957c63ec426).
