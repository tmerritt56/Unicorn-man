module.exports = function(){
    const faker = require("faker");
    const _ = require("lodash");
    return {
        blogPosts: _.times(5, function(n){
            return{
                id: n,
                username: faker.name.lastName(),
                email: faker.internet.email()
            }
        })
    }
}