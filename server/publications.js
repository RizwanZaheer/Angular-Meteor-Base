Meteor.publish('posts', function () {
    return Collections.Posts.find({});
})