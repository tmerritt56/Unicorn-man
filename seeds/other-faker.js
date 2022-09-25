// import { faker } from '@faker-js/faker';
const { faker } = require('@faker-js/faker');
//import fs from 'fs'
const fs = require('fs');

const sequelize = require('../config/connection');
const { User, Post, Comment } = require('../models');

function generateUsers() {

    let users = []

    for (let id=1; id <= 10; id++) {

        let username = faker.name.lastName();
        let email = faker.internet.email();
        let created_at = faker.date.recent();

        users.push({
            'id': id,
            'username': username,
            'email': email,
            'created_at': created_at
        });
    }
    return {'data': users}

}
function generateComments() {

    let comments = []

    for (let id=1; id <= 10; id++) {

        let comment_content = faker.lorem.paragraph();
        let user_id = 2;
        let post_id = 1;
        let created_at = faker.date.recent();
        

        comments.push({
            'id': id,
            'comment_content': comment_content,
            'user_id': user_id,
            'post_id': post_id,
            'created_at': created_at
        });
    }
    return {'data': comments}

}
function generatePosts() {

    let posts = []

    for (let id=1; id <= 10; id++) {

        let title = faker.name.lastName();
        let post_content = faker.lorem.paragraph();
        let user_id = 1;
        let created_at = faker.date.recent();

        posts.push({
            'id': id,
            'title': title,
            'post_content': post_content,
            'user_id': user_id,
            'created_at': created_at
        });
    }
    return {'data': posts}

}



let dataUser = generateUsers();
let dataPost = generatePosts();
let dataComment = generateComments();

// fs.writeFileSync('data.json', JSON.stringify(dataUser, dataPost, dataComment, null, '\t'));

