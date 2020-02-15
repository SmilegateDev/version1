const redis = require('redis');
var client = redis.createClient(58868, process.env.REDIS_ADDRESS);


// get value with key
client.get("missingkey", function(err, response) {
    console.log(response);
});


//set cache with adding time option
client.set("good", "good", 'EX', 60 * 60 * 20,  function(err, response) {
    console.log(response);
});


client.get("good", function(err, response) {
    console.log(response);
});

//delete cache
client.del('good', function(err, response) {
    if (response == 1) {
       console.log("Deleted Successfully!")
    } else{
     console.log("Cannot delete")
    }
 })


client.get("good", function(err, response) {
    // reply is null when the key is missing
    console.log(response);
});

module.exports = client;