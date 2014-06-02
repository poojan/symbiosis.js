//TODO: Pass ModelFactory dependancies (property, adapter, validation..)
//TODO: Maybe factory should be a function that can be automatically dependancy injected?

# Model
A model handles all domain logic for a entity and talks to an adapter to let it do the heavy lifting.

## Defining a model
```javascript
var PersonModel = Symbiosis.Model.define('User', {
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
```
## Getting a models constructor
```javascript
var Person = Symbiosis.Model.get('Person');
```

```javascript
//Instance methods
var person = Person.create({ /*..optional data..*/ }); //returns a newed up instance

//Default methods:
person.remove(); //remove model (talk to the adapter) and also remove it from the context of the ORM
person.set({name:'Kenneth', age: 25}); //update this instance with new data
person.getUniqueIdentifier(); //Returns models primary keys value or something that when calling Person.get(ID) will return the exact same instance
person.validate(); //returns an array of all fields, their isValid, and an optional message
person.serialize(); //returns a serialized model (using the serialization handlers)

//to keep track of different changes across the application you can use the edit API
//since we always share the same instance across the whole application, and don't always want changes to be two-way binded,
//and that we for example want to support using a realtime back-end like firebase
var edit = person.createEdit(); //returns a edit object with the same data as the person, and a commit method
edit.name; //returns Kenneth
edit.name = 'Batman';
edit.commit(); //returns a promise. updates the persons fields with the data from the edit
//if conflicts with the model arises, use the properties conflictHandlers to solve it.
//If the conflict is not resolved automatically a rejection will be thrown,
//and it is up to the developer to handle the rejection and return the new value.
person.save(); //will check the models changed fields and eventually do an update trough an adapter

//Custom methods
person.resetPassword();

person.fullName; //A computed value (check advanced user example)
person.validation.fields['age'] //A computed value over validations state
//{
//	errors: ['Field is required']
//}

person.digest() //Triggers all digest listeners (computed values etc.)

//Static methods
Person.create();
Person.get(ID);
Person.find({name: 'Something'}); //Returns promise that eventually should resolve into a person with proxies to the persons friends and projects (or the populated data if it already is fetched somewhere else in the application
Person.find(/*...*/).populate('friends', 'projects'); //Returns promise that eventually resolves into a person with its associated friends and projects populated
```