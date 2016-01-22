var Schemas = {};
Collections = {};


Schemas.Posts = new SimpleSchema({
    title: {
        type: String
    }
});

Collections.Posts = new Mongo.Collection('posts');
Collections.Posts.attachSchema(Schemas.Posts);