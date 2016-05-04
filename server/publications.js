Meteor.publish('posts', function () {
    return Collections.Posts.find({});
})

Meteor.publish('application', function () {
    return Collections.Applications.find({});
})

Meteor.publish('users', function () {
    return Meteor.users.find({});
})
