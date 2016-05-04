Meteor.startup(function() {

  // check if there is a application created already

  if(Collections.Applications.find({}).fetch().length < 1) {
    // create new Applications
    console.log('creating new application..');

    var application = {
      name: 'New Application',
      setUpComplete: false
    }
    Collections.Applications.insert(application, function(err) {
      if(err) {
        console.log('error creating application');
      }
      else{
        console.log('successfully created application');
      }
    });

  }
})
