# miniresto
Automatic Mongoose Model Loader

<b>Full CRUD compatible version is on the way...</b>
----

    
    

miniresto automates the loading of all Mongoose models & presents them if the exist in DB.
It is designed to return DB collections by passing URL params "Model name" & "ID" .


<pre>
Inspired by Thomas Frank's NodeJS API "Mongresto"
</pre>
NPM Module - https://www.npmjs.com/package/mongresto

----

<b>Why use Miniresto?</b>
   - ¬ Automatic loading of mongoose models
   - ¬ Makes Boilerplating Easy with Existing DB's
   - ¬ Designed to setup Front-N-Backend fast & easy
   - ¬ Save,Get,Insert or Delete DB Documents "without" Querys
   - ¬ Spend time on other colmplex tasks  



<b>Full CRUD compatible version is on the way...</b><br>
CRUD API Example
```javascript
mr.findById(id) // GET
mr.update(id)   // PUT
mr.save(id)     // POST
mr.delete(id)   // DELETE
```



How To
---
- Require 'miniresto.js' in app.js
```javascript
var mr = require('./miniresto');
```
- Create a sub-folder called 'models' & save 'loader.js' inside.
- Save all mongoose models in 'models folder' and Export them like this:


Export Mongoose Models
---
```javascript
var mongoose = require('mongoose')
var userSchema = new mongoose.Schema({
    name : {type: String, required: true}
});
exports.User = mongoose.model('User', userSchema);

```

miniresto Usage

```javascript

mr.find() 	  // Get collection
mr.findById()     // Find by ID
mr.findByIndex()  // Find by index value
mr.findSelected() // Get specific result length
mr.showInfo()     // Show Info about the Model & matching DB content
```

----
