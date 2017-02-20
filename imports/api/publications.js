import { Sessions } from './sessions/sessions';
import { GPSData } from './gps/gps';

/*
Master Session Publication

This will publish the list of all sessions. Upon adding a new session, create another publication that will run the
sessionSub function every time a user subscribes.
 */
Meteor.publish('SessionsList', sessionListSub);


function sessionListSub() {
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
}

/*
This function will run every time a session is subscribed to. Only manage data for a given session.
 */
function sessionSub(sessionID) {

    return GPSData.find({session: sessionID});

}