# Adapter
An adapter handles all interaction with a driver. It is an abstraction from the actual communication with a resource. It also handles caching.

```javascript
//Adapters are supposed to handle all interaction with a driver and the cache provider
Symbiosis.Adapter.define('http', function() {
	return {
		configuration: {
			url: 'users'
		},
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