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
Symbiosis.Driver.define('http', function() {
	//TODO
});
```