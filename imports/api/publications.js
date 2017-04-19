import { Sessions } from './sessions/sessions';
import { GPSData } from './gps/gps';
import { Users } from './users/users';

/*
Master Session Publication

This will publish the list of all sessions. Upon adding a new session, create another publication that will run the
sessionSub function every time a user subscribes.
 */
Meteor.publish('SessionsList', sessionListSub);


function sessionListSub() {
  let self = this;

  let subHandle = Sessions.find({}).observeChanges({

    added: function (id, fields) {
      self.added("Sessions", id, fields);

      Meteor.publish(fields.title, function() {
          return sessionSub(fields.title);
      });
    },
    changed: function(id, fields) {
      self.changed("Sessions", id, fields);
    },
    removed: function (id) {
      self.removed("Sessions", id);
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

    return GPSData.find({sessionID: sessionID});

}

Meteor.publish('Users', function() {
  return Users.find({});
});
