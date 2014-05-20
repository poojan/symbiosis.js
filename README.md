Codename: yet another orm :)
======

An framework agnostic and easily extendible object relational mapping framework for the client-side.
It handles validation, association (one-to-many, many-to-many) and more.

Unit-tests run in karma.
Build done with gulp.

Preliminary readme(!) to give an overall impression of how the API will look in the future.

Usage example:
=====
The bare minimum:
```javascript


var PersonModel = ORM.Model.Define('User', {
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

var person = PersonModel.create({
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
//person.friends[0] is whatever PersonModel.getById('5') returns, namely a instantiated person

person.save(); //will do a post to the back-end, 
//and whatever the back-end returns (a person with and id and createdDate etc) will set this instances 
//fields to the updatet values.
//save() returns a promise, but we do not need it in this example.
```

Advanced example:
```javascript

ORM.Configuration.setDefaultDriver('http');
ORM.Configuration.setDefaultAdapter('http');
ORM.Configuration.setDefaultCacheProvider('localStorage');

var Person = ORM.Define('Person', {
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
			lazyload: true, //Load association by manually populating fields e.g. model.$.hydrate('friends', 'books');
			eagerload: true //Load on initialization
		}
	},
	//Instance methods
	//Default methods: save, remove, set, sync, ...
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
	},
	adapter: {
		configuration: {
			url: 'users'
		},
		get: function(model, configuration, cacheProvider, driver, done) { 
		/*. Check if model exists in cache first, if so, return cached person
		..*/
		},
		find: function(model, configuration, cacheProvider, driver, done) { /*...*/ },
		save: function(model, configuration, cacheProvider, driver, done) {
			driver[model.id?'post':'put'](configuration.url, model.toJSON())
				.then(function(person){
					cacheProvider.update(model, person);
					done(null, person); //ORM will map the response to an instance of the model.
				});
		},
		remove: function (model, configuration, cacheProvider, driver, done) {
	
		},
		resetPassword: function(model, configuration, cacheProvider, driver, done)
		{
		},
		customMethod: function(model, configuration, cacheProvider, driver, done) {
		}
	},
	driver: {
		get: function() {
		
		}
	},
	cacheProvider: {
		//Basic CRUD methods, default cacheProvider stores data in memory
	},
	validation: {
		//Overrides default property validators
		name: ORM.Validation('String', {
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
				return ORM.Models.get('Person').get(personId);
			});
		}
	},
	onInitializing: function (model) {
		model.$.isReady = false;
	
		var unbinder = $rootScope.$watch(function() {
			model.$.digest();
		}, angular.noop);
	
		return unbinder; //Should return a function that unbinds and unregisters all eventlisteners
	},
	destroy: function (deregister) {
		//Calls the function that was returned from onInitialize
		deregister();
	},
	beforeSave: function () {
	
	},
	afterSave: function () {
	
	},
	beforeRemove: function () {
	
	},
	onInitialized: function (model) {
		model.$.isReady = true;
	},
	onDigest: [
		'validator': function (model) {
			model.$$setValidationErrors(model.validate());
		}
		//Array of functions run on every call to model.digest().
		//by default the models validators and other stuff is put here
	],
	//Static methods available on the model
	//Default methods are create, remove, get, findOrCreate, where
	//The ORM will keep track of models based on ID, and should return the exact
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

```javascript
//Instance methods
var person = Person.create({ /*..optional data..*/ });
person.$.save();
person.$.remove();
person.$.getUniqueIdentifier(); //Returns models primary keys value or something that when calling Person.get(ID) will return the exact same instance
person.$.fullName; //Using ES5 getter to return a computed value
person.$.validate(); //Returns an array of all fields, their isValid, and an optional message
person.$.$raw; //The raw backing models for the model

//person.$.validation.fields['age']:
//{
//	errors: ['Field is required']
//}

person.$.digest() //Triggers all digest listeners

//Model methods
Person.create();
Person.get(ID);
Person.find({name: 'Something'});
Person.find(/*...*/).populate('friends', 'projects'); //Returns a person with its associated friends and projects populated
```

# Model
A model handles all domain logic for a entity and talks to an adapter to let it do the heavy lifting.

## Properties
A model consists of one or many properties. A property handles the mapping / hydration of a field.
```javascript
ORM.Property.Define('String', function () {
	return {
		//function is called with the fields value and the configuration
		//and should return whatever should be the serialized value, 
		//OR void/undefined if it should be omitted on serialization
		serializationHandler: function (value, configuration) {
			//Should return the value that should be passed on
			//when serialized before sending data of to a resource
			if(configuration.persistable === false) return;
			return String(value || '');
		},
		conflictHandler: function (localValue, resourceValue, model, resource) {
			//This method is called on model.sync() whenever there is a conflict
			//between a resource and local values
			//Should return the merged value
			//The default handler returns the resourceValue
			//Can for example do a time comparison for a last write wins.
			return resourceValue;
		},
		deserializationHandler: function (value, configuration) {
			//return the value that should be a valid instance of the field, 
			//for example a instanciated user if it is an association, 
			//or a text parsed into a number if it is a number field.
			return String(value || '');
		},
		validationHandler: function (value, validators) {
			//return true or false depending on that all the validators for this field says the field is valid
			return _.every(validators, function(validator) {
				return validator.validate(value);
			});
		},
		defaultValue: function() {
			//Should return the default value that a new instance of this field will be populated with
			return '';
		}
	}
});
```

## Associations
An association between the different models is handled by special "collection" properties. This property simply does the mapping of an id to a model and back.
```javascript
ORM.Property.Define('Collection', function () {
	return {
		//function is called with the fields value and the configuration
		//and should return whatever should be the serialized value, 
		//OR void/undefined if it should be omitted on serialization
		serializationHandler: function (value, configuration) {
			//Should return the value that should be passed on
			//when serialized before sending data of to a resource
			//TODO: Return either an id or an array of ids based on if the attribute is asMany or hasOne 
		},
		conflictHandler: function (localValue, resourceValue, model, resource) {
			//This method is called on model.sync() whenever there is a conflict
			//between a resource and local values
			//Should return the merged value
			//The default handler returns the resourceValue
			//Can for example do a time comparison for a last write wins.
			return resourceValue;
		},
		deserializationHandler: function (value, configuration) {
			//return the value that should be a valid instance of the field, 
			//for example a instanciated user if it is an association, 
			//or a text parsed into a number if it is a number field.
			return String(value.id);
		},
		validationHandler: function (value, model, validators) {
			//return true or false depending on that all the validators for this field says the field is valid
			//TODO: Validate required?
			//TODO: Ask the model instance itself to validate its properties recursiely.
			//TODO: Avoid infinite recursion
		},
		defaultValue: function() {
			//Should return the default value that a new instance of this field will be populated with
			return '';
		}
	}
});
```

## Validation
```javascript
var validator = ORM.Validation('String', {
	required: true,
	minLength: 4,
	maxLenght: 20
});

validator.isValid(1) //returns false
validator.validate('')//returns {isValid: false, errors: ['Field is required', 'Must have lenght greater than or equal to 4']}
validator.validate('abcd')// returns {isValid: true}
```

# Adapter
An adapter handles all interaction with a driver. It is an abstraction from the actual communication with a resource. It also handles caching.

```javascript
//Adapters are suppoased to handle all interaction with a driver and cache
ORM.Adapter.Define('http', function() {
	return {
		get: function(queryParameters, configuration, cacheProvider, driver, done) { 
		//TODO: Check if model exists in cache first, if so, return cached person
		//TODO: If queryParameters is an object we should build a query string based on query parameters
			var id = queryParameters;
			driver.get(id, configuration.url)
				.then(function(person){
					done(null, person); //ORM will map the response to an instance of the model.
				})
				.catch(function(err){
					done(err);
				});
		},
		save: function(model, configuration, cacheProvider, driver, done) {
		//TODO: Do a patch request with only values that have changed since last sync()
			driver[model.id?'post':'put'](configuration.url, model.toJSON())
				.then(function(person){
					cacheProvider.update(model, person);
					done(null, person); //ORM will map the response to an instance of the model.
				});
		},
		remove: function (model, configuration, cacheProvider, driver, done) {
			driver.remove(configuration.url, )
				.then(function(person){
					cacheProvider.update(model, person);
					done(null, person); //ORM will map the response to an instance of the model.
				});
		}
	}
});
```
## CacheProvider
A cache provider handles cache.

```javascript
//Cache providers has the responsibility for caching and maintaining serialized data
ORM.CacheProvider.Define('memory', function () {
	return {
		configuration:
		{
			maxAge: 900000, // Items added to this cache expire after 15 minutes.
		}
		create: function(configuration, key, data) {
			//...
		},
		read: function(configuration, key) {
			//...
		}, 
		update: function(configuration, key, data) {
			//...
		}, 
		delete: function(configuration, key) {
			//...
		},
		flush: function(configuration) {
			//This method will be called every now and then 
			//and is responsible for removing outdated data from cache
		}
	}
});

ORM.CacheProvider.Define('localStorage', function () {
	return //same interface as for memory
});
```
# Driver
A driver handles all interaction with a resource (local storage, REST API etc.)
It must adhere to this interface(!) to make adapters driver agnostic.
Methods:
TODO: Implement a clear and concise description of each and every method
Inspiration: https://github.com/dresende/node-orm2/blob/master/lib/Drivers/DML/mongodb.js

* insert
* find
* sync
* drop
* update
* remove
* clear
* count
* ping
* on
* connect
* close
* hasMany (?)
* hasOne (?)


```javascript
//Drivers handle all interaction with a resource (HTTP, WebSQL, localStorage etc.
//Drivers are injected into an adapter
ORM.Driver.Define('http', function() {
	//TODO
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

Copyright (c) 2014 Kenneth Lynne

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
