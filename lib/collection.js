var Schemas = {};
Collections = {};


Schemas.Posts = new SimpleSchema({
    title: {
        type: String
    },
    setUpComplete: {
      type: Boolean
    }
});

Schemas.Application = new SimpleSchema({
    name: {
        type: String
    }
});

Collections.Posts = new Mongo.Collection('posts');
Collections.Posts.attachSchema(Schemas.Posts);
Collections.Applications = new Mongo.Collection('applications');
Collections.Applications.attachSchema(Schemas.Application);
