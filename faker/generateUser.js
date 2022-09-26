module.exports = function(){
    const faker = require("faker");
    const _ = require("lodash");
    return {
        blogPosts: _.times(11, function(n){
            return{
                id: n,
                username: faker.name.lastName(),
                email: faker.internet.email(),
                password: "password"
            }
        })
    }
}
//to execute run the following command while in the faker directory
//json-server -p 3001 generateUser.js