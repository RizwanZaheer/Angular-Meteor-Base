_.each(Meteor.settings.private.services, function(s) {
    
    ServiceConfiguration.configurations.remove({
        service: s.service
    });
    ServiceConfiguration.configurations.insert(s);
    
});