# Validation
```
Symbiosis.Validation.define('String', function () {
//TODO
});

var validator = Symbiosis.Validation.get('String', {
	required: true,
	minLength: 4,
	maxLenght: 20
});

validator.isValid(1); //returns false
validator.validate('');//returns error array
//Example:
// err[0].property = "name" , err[0].value = "" , err[0].msg = "Name is required"
// err[1].property = "age"  , err[1].value = 15 , err[1].msg = "Number is out of range (1-100)"
validator.validate('abcd');// returns '[]'
```