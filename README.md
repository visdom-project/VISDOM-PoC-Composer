<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/visdom-project/VISDOM-PoC-Composer">
    <img src="./src/assets/images/visdom_logo.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">VISDOM Architecture - Dashboard Composer</h3>

  <p align="center">
    VISDOM architecture infrastructure for a configurable dashboard.
    <br />
    <a href="https://github.com/visdom-project/VISDOM-PoC-Composer"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://iteavisdom.org/dashboard/composer">View Demo</a>
    ·
    <a href="https://github.com/visdom-project/VISDOM-PoC-Composer/issues">Report Bug or Request Fureate</a>
  </p>
</p>

## Table of Contents

* [About the Project](#about-the-project)
  * [Built With](#built-with)
* [Getting Started](#getting-started)
  * [Prerequisites](#prerequisites)
  * [Installation](#installation)
* [Usage](#usage)
* [Roadmap](#roadmap)
* [Contributing](#contributing)
* [License](#license)
* [Contact](#contact)
* [Acknowledgements](#acknowledgements)

## About The Project

![Screen Shot](./src/assets/images/readme-screenshot.png)

This project demonstrates the dashboard composer logic for the [VISDOM](https://iteavisdom.org) project reference architecture. The composer is responsible for two main tasks. The first is selecting the correct visualizations for the current user based on multiple criteria such as role and user preferences. The second task is to handle the dashboard layout and rendering logic. The available visualizations are configured as separate [microfrontends](https://single-spa.js.org/docs/microfrontends-concept/) in the composer and rendered according to user needs.

The composer is deployed in combination with the [Root-Config](https://github.com/visdom-project/VISDOM-PoC-Root-Config) project. The Root-config is responsible for [providing the necessary infrastructure](https://single-spa.js.org/docs/configuration/) for [registering applications](https://single-spa.js.org/docs/building-applications) to the VISDOM-ecosystem, such as this composer-application. These different applications are registered as microfrontends and can be developed separately by different teams.

### Built With

The Composer is built with the following frameworks:
* [Single SPA](https://single-spa.js.org/). 
A javascript router for front-end microservices.
* [Bootstrap](https://getbootstrap.com). HTML, CSS, and JS framework.
* [React](https://reactjs.org/). 
A JavaScript library for building user interfaces.
* [Redux](https://redux.js.org/). 
A Predictable State Container for JS Apps.

## Getting Started

Complete the following steps to get started. Please see the [Single SPA](https://single-spa.js.org/docs/getting-started-overview) resources for further information on the framework's internals and about [creating your own](https://single-spa.js.org/docs/create-single-spa) visualization services. You can find examples of Single-SPA applications [here]( https://single-spa.js.org/docs/examples/).

This project uses [React](https://reactjs.org/) and [Yarn](https://yarnpkg.com/) as the default development tools. Please note that other registered applications may use whatever frameworks they want, as long as they are created as Single-SPA applications.

### Prerequisites

You need [Yarn](https://yarnpkg.com/) and/or [npm](https://www.npmjs.com/). This guide is written with Yarn in mind.

### Installation

This repository assumes you are using Linux or Mac. Windows users are on their own. However, the setup should not differ that much.

1. Clone the repo
```sh
git clone https://github.com/visdom-project/VISDOM-PoC-Composer.git
```
2. Navigate to the directory
```sh
cd VISDOM-PoC-Composer
```
3. Install packages
```sh
yarn install
```

## Usage

Single SPA applications can be developed either separately or all together.

### Local development

Please see [full documentation](https://single-spa.js.org/docs/recommended-setup#local-development) from the SPA documents.

There are two ways to do local development. It is preferred to do one module at a time, whenever possible.

#### One module at a time

```sh
cd VISDOM-PoC-Composer
yarn install
yarn start --env.baseName=/dashboard   
```

Go to https://localhost:9071/visdom-poc-composer.js and verify that you are able to load the file without any SSL problems. To solve SSL problems, see [these instructions](https://improveandrepeat.com/2016/09/allowing-self-signed-certificates-on-localhost-with-chrome-and-firefox/).

Now, go to your production server (or use the microfrontends [demo](https://iteavisdom.org/dashboard/composer)). In the browser console, run the following:

```js
localStorage.setItem("devtools", true);
```

Refresh the page. Click on the tan / beige rectangle:

![image](./src/assets/images/readme-rectangle.png)

Set an [import map override](https://github.com/joeldenning/import-map-overrides/) to `9071`.

![image](./src/assets/images/readme-override.png)

Refresh the page. Your local code for this module will now be running on your production server (or in the [demo](https://iteavisdom.org/dashboard/composer)). You may make changes locally and refresh the page to see them.

#### All modules together

Run the [root-config](https://github.com/visdom-project/VISDOM-PoC-Root-Config) project locally:

```
git clone https://github.com/visdom-project/VISDOM-PoC-Root-Config.git
cd VISDOM-PoC-Root-Config
yarn install
yarn start
```

Now follow the steps above for "One module at a time" for each of the modules you wish to work on, including this one.

## Contributing

You can contribute to this project with the following steps:

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Contact

Research project link: [https://iteavisdom.org/](https://iteavisdom.org/)

Repository Link: [https://github.com/visdom-project/VISDOM-PoC-Composer](https://github.com/visdom-project/VISDOM-PoC-Composer)

## Acknowledgements
* [React root-config](https://github.com/react-microfrontends/root-config)
* [React microfrontends](https://react.microfrontends.app/)
