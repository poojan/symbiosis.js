# CacheProvider
A cache provider handles cache.

```javascript
//Cache providers has the responsibility for caching and maintaining serialized data
Symbiosis.CacheProvider.define('memory', function () {
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

Symbiosis.CacheProvider.define('localStorage', function () {
	return //same interface as for memory
});
```