import { Sessions } from './sessions/sessions';
import { GPSData } from './gps/gps';

function sessionSub(sessionID) {

    return GPSData.find({session: sessionID});

}

Meteor.publish('SessionsList', function() {
  let self = this;

  let subHandle = Sessions.find({}).observeChanges({

    added: function (id, fields) {
      self.added("Sessions", id, fields);

      Meteor.publish(fields.title, sessionSub)
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

});