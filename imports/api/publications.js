import { Sessions } from './sessions/sessions';
import { GPSData } from './gps/gps';

function sessionSub(sessionID) {

    return GPSData.find({session: sessionID});

}

Meteor.publish('SessionsList', function() {
  var self = this;

  var subHandle = Sessions.find({}).observeChanges({

    added: function (id, fields) {
      self.added("sessions", id, fields);

      Meteor.publish(fields.title, sessionSub)
    },
    changed: function(id, fields) {
      self.changed("sessions", id, fields);
    },
    removed: function (id) {
      self.removed("sessions", id);
    }

  });

  self.ready();

  self.onStop(function () {
    subHandle.stop();
  });

});