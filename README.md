[![symbiosis.js logo](https://raw.githubusercontent.com/kennethlynne/symbiosis.js/master/logo.png)](https://raw.githubusercontent.com/kennethlynne/symbiosis.js) [![Build Status](https://travis-ci.org/kennethlynne/symbiosis.js.svg?branch=master)](https://travis-ci.org/kennethlynne/symbiosis.js)

----------------------
Preliminary readme(!) to serve as an arcitechture and design proposal,
and to give an overall impression of how the API will look in the future.

Private discussion regarding this project is to be found here: https://sockless.slack.com/messages/orm/
send me (kenneth.lynne@gmail.com) a request if you want to take part in the discussion.

-----------------------------------

A framework agnostic and easily extendible object relational mapping framework for the next generation of web-applications.

It will help you to abstract and implement business logic in intuitive entities. It handles object relational mapping
and helps you create maintanable code for interfacing with different resources (memory, REST API, localStorage etc.).
It works just as good in the context of an Angular application as in an ember, vanilla and the-next-big-thing.
It handles validation, associations, caching and more to make your day awesome!

You can have data spread out over different resources, be it firebase, an API and local storage, but ORM handles all the hard stuff
and lets you focus on the business logic and making your application awesome.
With a framework agnostic approach it is possible to reuse all of your models and business logic across different frameworks.
Moving your codebase from Angular 1.x.x to Angular 2? It will *just work*.
Drivers and adapters are the only thing that needs to adapt.

Written in ES6 (also transpiled into ES5 Common JS and AMD modules).

# Table of contents
* [Features](#features)
* [Roadmap](#roadmap)
* [Installation](#installation)
* [Model](src/model/README.md) - domain logic, collection of properties
* [Properties](src/property/README.md) - serialization logic
* [Associations](src/property/README.md#associations) - special properties to handle associations
* [Validation](src/validation/README.md) - validation of properties
* [Adapter](src/validation/README.md) - (VERY unstable) business logic and driver interaction, 
* [Driver](src/driver/README.md) - (VERY unstable) resource wrapper
* [CacheProvider](src/cacheprovider/README.md) - (VERY unstable) cache handling

For adapters and down to drivers and cacheproviders it is worth considering [https://github.com/orbitjs/orbit.js](Orbit.js) before implementing.

## Features
* Models
* Associations
* Validation
* Caching
* Extendable
* Awesome

# Roadmap
* ~~Build and environment~~
* Scaffolding
* Basic model (models with properties and methods)
	* create model definition (register new model, get registered model)
	* create model with properties
		* create and get properties
	* create model with methods
	* associations (serialization and deserialization handler factory)
* Injector (basic dependancy injection in place in core)
* Adapters and drivers
	* Standard adapter and memory driver
	* HTTP driver for RESTful resources.
* Validation of properties
	* handle registration of validations
	* handle validation
* Angular adapter to use it in the context of an angular application
* Fluent API wrapper
* Demo application using the ORM


### Installation
This library is not in a working state just yet, but send your pull-request and see it happen sooner than later.

# Install trough NPM
```bash
npm install symbiosis.js --save
```

# Install trough bower
```bash
bower install symbiosis.js --save
```

```bash
# Clone this repo (or your fork).
git clone https://github.com/kennethlynne/symbiosis.js.git

# Install all the the dev dependencies, such as Karma, Gulp, etc.
npm install

# If you wanna use "karma" or "gulp" commands, install also:
npm install -g karma-cli
npm install -g gulp
 ```
### Development and building
The project should make use of traceur to make use of ES6 modules, classes and generators.

### Running the [tests](./test/unit)
This will start Karma and Chrome (with `--harmony` enabled). Karma will watch the source code and run the tests anytime you save a change.

```bash
karma start
```

### Transpiling ES6
All the source code is written in the upcoming version of JavaScript - ES6. In order to use it in the current browsers you need to transpile the code into ES5 using [Traceur](https://github.com/google/traceur-compiler).


```bash
# Transpile ES6 into ./dist/*
gulp build

# Watch all the sources and transpile on any change
gulp watch
```

# Contributors
* Kenneth Lynne (Maintainer) - [https://github.com/kennethlynne](https://github.com/kennethlynne)
* Poojan Shrestha - [https://github.com/poojan](https://github.com/poojan)
* Alexander Beletsky - [https://github.com/alexanderbeletsky](https://github.com/alexanderbeletsky)

Usage example:
=====
# The bare minimum:
```javascript


var Person = Symbiosis.Model.define('User', {
		fields: {
			//Id will by convention become the models primary key
			id: 'String',
			firstname: 'String',
			surname: 'String',
			age: 'Number',
			createdDate: {
				type: 'Date',
				persistable: false //will not be included when model is serialized
			},
			friends: {
				hasMany: 'User'
			}
		},
		//Model will use its default http adapter, configuring it to interface with some
		//restfull API endpoint
		adapter: {
			configuration: {
				baseUrl: 'http://example.com/api/users'
			}
		}
	});

var person = Person.create({
	firstname: 'Kenneth',
	surname: 'Lynne',
	age: 25,
	friends: [
		'5',
		'8',
		'10'
	]
});

//person.firstname: Kenneth
//person.friends[0] is whatever PersonModel.getById('5') returns (a person instance)

person.save(); //will do a post to the back-end, 
//and whatever the back-end returns (a person with and id and createdDate etc) will set this instances 
//fields to the updatet values.
//save() returns a promise, but we do not need it in this example.
```

# Advanced example:
```javascript

ORM.Configuration.setDefaultDriver('http');
Symbiosis.Configuration.setDefaultAdapter('CRUD');
Symbiosis.Configuration.setDefaultCacheProvider('localStorage');

var Person = Symbiosis.Model.define('Person', {
	fields: {
		//Behind the scenes these fields are mapped into property instances (read more further down)
		name: {
			type: 'String'
		},
		//Shorthand for type specification
		surname: 'String',
		age: 'Number',
		friends: {
			hasMany: 'Person',
			lazyload: true, //Load association by manually populating fields e.g. model.populate('friends', 'books');
			eagerload: true //Load on initialization
		}
	},
	//Instance methods
	//Default methods: save, remove, set, sync, serialize...
	//Sync will load the latest data from the resource and if there is a conflict it will run a provided
	//conflict handler.
	//Then it will save all dirty properties and omit non-dirty ones using the provided adapter
	methods: {
		resetPassword: function (model, adapter)
		{
			return adapter.resetPassword(model);
		}
	},
	computedValues: {
		//Computed values are updated on every digest (person.digest())
		//By default the property $validation will be populated with the results from the different validators
		fullName: function(model) {
			return model.name + ' ' + model.surname;
		}
		validation: function (model) {
			return model.validate();
		}
	},
	adapter: 'CRUD',
	driver: 'http',
	cacheProvider: 'Memory',
	validation: {
		//Overrides default property validators
		name: Symbiosis.Validation.get('String', {
				required: true,
				minLength: 10,
				maxLenght: 20
			})
	},
	serializationHandlers: {
		//Only properties with a serialization handler will be included in the serialized data
		//Overrides default handlers
		name: function(value) {
			return value.toLowercase();
		},
		//Collection serialization
		friends: function(value) {
			return value.map(function(person){
			 	return person.$getUniqueIdentifier(); //Maps all users into an array of ids
			})
		}
	},
	deserializationHandlers: {
		//If model is instantiated with data, these handlers handles hydrating the fields
		name: function (value) {
			return String(value);
		},
		//Create a factory that can do this mapping, and handle lazyloading and eager loading gracefully
		friends: function(value) {
			return value.map(function(personId){
				return Symbiosis.Models.get('Person').get(personId);
			});
		}
	},
	hooks: {
		//Array of functions run on every call to model.digest().
		//by default the models validators and other stuff is put here
		//onDigest: function() {},
		onInitializing: function (model) {
			model.__isReady = false;
		
			//Example of how to bind up the digest of angular to kick of the models digest cycle
			var unbinder = $rootScope.$watch(function() {
				model.digest();
			}, angular.noop);
		
			return unbinder; //Should return a function that unbinds and unregisters all eventlisteners
		},
		onInitialized: function (model) {
			model.__isReady = true;
		}
		//afterLoad : (no parameters) Right after loading and preparing an instance to be used;
		//afterAutoFetch : (no parameters) Right after auto-fetching associations (if any), it will trigger regardless of having associations or not;
		//beforeSave : (no parameters) Right before trying to save;
		//afterSave : (bool success) Right after saving;
		//beforeCreate : (no parameters) Right before trying to save a new instance (prior to beforeSave);
		//afterCreate : (bool success) Right after saving a new instance;
		//beforeRemove : (no parameters) Right before trying to remove an instance;
		//afterRemove : (bool success) Right after removing an instance;
		//beforeValidation : (no parameters) Before all validations and prior to beforeCreate and beforeSave
	}

	destroy: function (deregister) {
		//Calls the function that was returned from onInitialize
		deregister();
	},
	
	//Static methods available on the model
	//Default methods are create, remove, get, findOrCreate, where
	//The Symbiosis will keep track of models based on ID, and should return the exact
	//same instance of a model on subsequest gets.
	//var a = Person.get(5);
	//var b = Person.get(5);
	//expect(a === b);
	//a.firstname = 'Coolio';
	//expect(b.firstname).toBe('Coolio');
	staticMethods: {
		customStaticMethod: function (adapter) {
			var Person = this;
			return function (parameters, done) {
				adapter.get(parameters)
					.then(function(response) {
						var person = new Person(response);
						done(null, person);
					});
			}
		}
	},
	toObject: function() {
		return person this.$.serialize(); //Runs all serializationHandlers
	},
	//Set default value for empty fields
	defaults: {
		name: '',
		age: 5
	}
});
```

Building and testing
====================
```
npm install -g gulp
npm install
gulp build
gulp test
```
========

The MIT License (MIT)

Copyright (c) 2014 Kenneth Lynne and contributors

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

[![Analytics](https://ga-beacon.appspot.com/UA-46835353-1/symbiosis.js/README)](https://github.com/igrigorik/ga-beacon)
