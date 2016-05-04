Meteor.startup(function() {
  var isNewApplication = false;
  isNewApplication = Meteor.users.find().count() === 0
  && Collections.Applications.find({}).fetch().length < 1;

  if(isNewApplication) {
    addDefaultAdminUser();
    createDefaultApplication();
  }

  function createDefaultApplication() {

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

  function addDefaultAdminUser () {
    console.log('Creating default admin user');
    var id= Accounts.createUser({
      username: 'admin',
      email: 'admin@test.com',
      password: 'welcome',
      profile: {
        first_name: 'Mustafa',
        last_name: 'Hossaini',
        company: 'My own company',
      }
    });

    Roles.addUsersToRoles(id, ['admin']);

  }
})
