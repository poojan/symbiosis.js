# Properties
A model consists of one or more properties. A property handles the serialization and validation of a field.

```javascript
Symbiosis.Property.define('String', function () {
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
				return validator.isValid(value);
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
Symbiosis.Property.define('Collection', function () {
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