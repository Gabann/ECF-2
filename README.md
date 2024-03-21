<!--suppress ALL, HtmlUnknownAnchorTarget -->
<a id="readme-top"></a>

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]

<h3 align="center">ECF 2</h3>



<div align="center">
  <p>
    An android app that let explore a pokedex and track all your captured pokemons
    <br />
    <a href="https://github.com/Gabann/ECF-2/tree/69091fd8c1a8b580d59ac3888c192f47f9ec7ae2/documentation"><strong>Explore the docs »</strong></a>
    <br />
    <a href="https://github.com/gabann/ECF-2/issues">Report Bug</a>
    ·
    <a href="https://github.com/gabann/ECF-2/issues">Request Feature</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#preview">Preview</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About the Project

This app as been built in 2 days as part of an exam for my study at [M2I](https://www.m2iformation.fr/).

The goal was to create a mobile app using React Native that consume an API to display a list of pokemons and let the user
manage a collection of captured pokemons.

### Features

- **Browse Pokemon**: Explore detailed information about all Pokemon species, including their types, stats, evolution line and more.
- **Search Functionality**: Easily search for specific Pokémon by name, Pokédex number or by their types. For performance the data is
  store locally and the search is done on the local data.
- **Manage collection**: Save your captured pokemons for keep track of your progress to catch them all.
- **Offline Mode**: You only need to run the app once with internet connection, and then you can browse the pokedex and manage your
  collection offline.

### Built With

Tech stack:

[![React][ReactBadge]][ReactUrl]
[![React native][ReactNativeBadge]][ReactNativeUrl]
[![React Navigation][ReactNavigationBadge]][ReactNavigationUrl]
[![Redux][ReduxBadge]][ReduxUrl]
[![Node.js][NodeBadge]][NodeUrl]
[![Typescript][TypescriptBadge]][TypescriptUrl]
[![Android Studio][AndroidStudioBadge]][AndroidStudioUrl]
[![ESLint][EsLintBadge]][EsLintUrl]
[![SonarLint][SonarLintBadge]][SonarLintUrl]

Data from [Tyradex](https://tyradex.tech/) API


<div align="right"><a href="#readme-top">back to top</a></div>



<!-- GETTING STARTED -->

## Getting Started

### Prerequisites

This project requires:

- [Node.js](https://nodejs.org/en) >= 18
- [Microsoft open JDK](https://learn.microsoft.com/en-us/java/openjdk/download) 17
- [Android studio](https://developer.android.com/studio)
- [Android SDK](https://developer.android.com/tools/releases/platforms) 34

Full installation guide can be found [here](https://reactnative.dev/docs/environment-setup?guide=native)

### Installation

```
# Clone the project:
git clone https://github.com/Gabann/ECF-2.git
cd .\ECF-2

# Install the dependencies:
npm i

# Running the application:
npm run android
```

<div align="right"><a href="#readme-top">back to top</a></div>



<!-- USAGE EXAMPLES -->

## Usage

Connect your android device or emulator and run the app with `npm run android`

<div align="right"><a href="#readme-top">back to top</a></div>

<!-- PREVIEW -->

## Preview

<!-- ROADMAP -->

## Roadmap

- [ ] IOS port
- [ ] Light & Dark mode
- [ ] Polish style to flat, modern design
- [ ] Options to order pokemons by name, type, etc
- [ ] Add a way to update the data if the api is updated

[//]: # (    - [ ] Nested Feature)

<div align="right"><a href="#readme-top">back to top</a></div>



<!-- CONTRIBUTING -->

## Contributing

We welcome contributions from everyone! Follow these steps to contribute:

1. **Fork** the repository.
2. **Clone** the forked repository to your local machine.
3. **Create a new branch** for your contribution.
4. **Make your changes** and **commit** them.
5. **Push** your changes to your forked repository.
6. **Open a pull request** to the main project repository.

### Contribution Guidelines

- Discuss significant changes by opening an issue first.
- Follow the existing code style and structure.
- Write clear commit messages and document your code.
- Ensure changes don't break existing functionality.
- Update documentation if necessary.

<div align="right"><a href="#readme-top">back to top</a></div>

<!-- LICENSE -->

## License

Distributed under the MIT License. See [`LICENSE`](https://github.com/Gabann/ECF-2/blob/main/LICENSE) for more information.

<div align="right"><a href="#readme-top">back to top</a></div>



<!-- CONTACT -->

## Contact

- [![Twitter][gmail-shield]][gmail-url]
- [![LinkedIn][linkedin-shield]][linkedin-url]
- [![Twitter][twitter-shield]][twitter-url]

<div align="right"><a href="#readme-top">back to top</a></div>


---------------------------------------------------------------

[ReactBadge]: https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=000&style=for-the-badge

[ReactUrl]: https://react.dev/

[ReactNativeBadge]: https://img.shields.io/badge/ReactNative-61DAFB?logo=react&logoColor=000&style=for-the-badge

[ReactNativeUrl]: https://reactnative.dev/

[ReduxBadge]: https://img.shields.io/badge/Redux-764ABC?logo=redux&logoColor=white&style=for-the-badge

[ReduxUrl]: https://redux.js.org/

[TypescriptBadge]: https://img.shields.io/badge/Typescript-3178C6?logo=typescript&logoColor=white&style=for-the-badge

[TypescriptUrl]: https://www.typescriptlang.org/

[AndroidStudioBadge]: https://img.shields.io/badge/AndroidStudio-3DDC84?logo=android-studio&logoColor=white&style=for-the-badge

[AndroidStudioUrl]: https://developer.android.com/studio

[NodeBadge]: https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white&style=for-the-badge

[NodeUrl]: https://nodejs.org/

[EsLintBadge]: https://img.shields.io/badge/ESLint-4B32C3?logo=eslint&logoColor=white&style=for-the-badge

[EsLintUrl]: https://eslint.org/

[SonarLintBadge]: https://img.shields.io/badge/SonarLint-CB2029?logo=sonarlint&logoColor=white&style=for-the-badge

[SonarLintUrl]: https://www.sonarlint.org/

[ReactNavigationBadge]: https://img.shields.io/badge/ReactNavigation-000?logo=react&logoColor=61DAFB&style=for-the-badge

[ReactNavigationUrl]: https://reactnavigation.org/

[repo-link]: https://github.com/Gabann/ECF-2

[contributors-shield]: https://img.shields.io/github/contributors/gabann/ECF-2.svg?style=for-the-badge

[contributors-url]: https://github.com/gabann/ECF-2/graphs/contributors

[forks-shield]: https://img.shields.io/github/forks/gabann/ECF-2.svg?style=for-the-badge

[forks-url]: https://github.com/gabann/ECF-2/network/members

[stars-shield]: https://img.shields.io/github/stars/gabann/ECF-2.svg?style=for-the-badge

[stars-url]: https://github.com/gabann/ECF-2/stargazers

[issues-shield]: https://img.shields.io/github/issues/gabann/ECF-2.svg?style=for-the-badge

[issues-url]: https://github.com/gabann/ECF-2/issues

[license-shield]: https://img.shields.io/github/license/gabann/ECF-2.svg?style=for-the-badge

[license-url]: https://github.com/gabann/ECF-2/blob/master/LICENSE

[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555

[linkedin-url]: https://linkedin.com/in/linkedin_username

[twitter-shield]: https://img.shields.io/badge/Twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white

[twitter-url]: https://twitter.com/gabandev

[gmail-shield]: https://img.shields.io/badge/Gmail-EA4335.svg?style=for-the-badge&logo=Gmail&logoColor=white

[gmail-url]: mailto:gabin.deboulogne@gmail.com
