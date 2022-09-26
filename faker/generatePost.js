module.exports = function(){
    const faker = require("faker");
    const _ = require("lodash");
    return {
        blogPosts: _.times(20, function(n){
            return{
                title: faker.lorem.sentence(3),
                post_content: faker.lorem.sentence(),
                user_id: Math.floor(Math.random() * 9) +1,
                created_at: faker.date.recent()
            }
        })
    }
}
//to execute run the following command while in the faker directory
//json-server -p 3001 generatePost.js