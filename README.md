<h1 align="center">
  <br>
	<a href="https://zenroom.dyne.org">
		<img src="assets/zenroomjs.svg" width="200" alt="zenroom js">
	</a>
  <br>
  Zenroomjs
  <br>
</h1>

<table><tr><td>
<h3 align="center">
Zenroomjs provides a javascript wrapper of <a href="https://zenroom.dyne.org">Zenroom</a>, a secure and small virtual machine for crypto language processing.
</h3>
  
<p align="center">
	<a href="https://travis-ci.com/puria/zenroomjs">
		<img src="https://travis-ci.org/puria/zenroomjs.svg?branch=master"
			 alt="Build Status">
	</a>
  <a href="https://coveralls.io/github/puria/zenroomjs?branch=master">
    <img src="https://coveralls.io/repos/github/puria/zenroomjs/badge.svg?branch=master"
			 alt="Coverage Status">
	</a>
    <a href="https://dyne.org">
        <img src="https://img.shields.io/badge/%3C%2F%3E%20with%20%E2%9D%A4%20by-Dyne.org-blue.svg" alt="Dyne.org">
    </a>
</p>

<div align="center">
  <h3>
    <a href="#snowboarder-getting-started">:snowboarder: Getting started</a>
    <span> • </span>
    <a href="#video_game-usage">:video_game: Usage</a>
    <span> • </span>
    <a href="#heart_eyes-acknowledgements">:heart_eyes: Acknowledgements</a>
    <span> • </span>
    <a href="#busts_in_silhouette-contributing">:busts_in_silhouette: Contributing</a>
    <span> • </span>
    <a href="#briefcase-license">:briefcase: License</a>
  </h3>
</div>

Zenroom and Zenroomjs are software in **ALPHA stage** and are part of the [DECODE project](https://decodeproject.eu) about data-ownership and [technological sovereignty](https://www.youtube.com/watch?v=RvBRbwBm_nQ). Our effort is that of improving people's awareness of how their data is processed by algorithms, as well facilitate the work of developers to create along [privacy by design principles](https://decodeproject.eu/publications/privacy-design-strategies-decode-architecture) using algorithms that can be deployed in any situation without any change.

</td></tr></table>

## :snowboarder: Getting started

```js
yarn add zenroom
```
***
## :video_game: Usage

To start using the zenroom module just

    import zenroom from 'zenroom'

the zenroomjs module is architectured as a [Revealing Module Pattern](https://addyosmani.com/resources/essentialjsdesignpatterns/book/#revealingmodulepatternjavascript) this also means that once you set some options it will remain till the object lifetime, unless you reset or overwrite them.

Another used paradigm is method chaining this means that you can chain the different methods, let's see some hello worldish example:

    import zenroom from 'zenroom'

    const zencode = `print("hello world from zenroom in nodejs")`
    zenroom.zencode(zencode).exec()
    
    // prints in the console.log "hello world from zenroom in nodejs"

To initialize the options there are two ways, the one with the chaining that we saw before or a handy `init()` method to make them in one shot

    // method chaining
    zenroom.zencode('print("hello world")')
           .verbosity(1)
           .success(() => { console.log('everything goes smooth') })
           .error(() => { console.error('something very bad happened') })
           .exec()
           .reset() // cleans up the session




    // using the init() method
    options = {
      zencode: 'print("hello world")',
      verbosity: 1,
      success: () => { console.log('everything goes smooth') },
      error: () => { console.error('something very bad happened') }
    }

    zenroom.init(options).exec()


All the available options and method are covered in the next API section

***

### API



***
## :heart_eyes: Acknowledgements

Copyright (C) 2018 by [Dyne.org](https://www.dyne.org) foundation, Amsterdam

Designed, written and maintained by Puria Nafisi Azizi.

<img src="https://zenroom.dyne.org/img/ec_logo.png" class="pic" alt="Project funded by the European Commission">

This project is receiving funding from the European Union’s Horizon 2020 research and innovation programme under grant agreement nr. 732546 (DECODE).

***
## :busts_in_silhouette: Contributing

Please first take a look at the [Dyne.org - Contributor License Agreement](CONTRIBUTING.md) then

1. [FORK IT](https://github.com/puria/zenroomjs/fork)
1. Create your feature branch `git checkout -b feature/branch`
1. Commit your changes `git commit -am 'Add some fooBar'`
1. Push to the branch `git push origin feature/branch`
1. Create a new Pull Request
1. Thank you

***
## :briefcase: License

     Copyright 2018 Dyne.org foundation, Amsterdam

     Licensed under the Apache License, Version 2.0 (the "License");
     you may not use this file except in compliance with the License.
     You may obtain a copy of the License at

         http://www.apache.org/licenses/LICENSE-2.0

     Unless required by applicable law or agreed to in writing, software
     distributed under the License is distributed on an "AS IS" BASIS,
     WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     See the License for the specific language governing permissions and
     limitations under the License.

