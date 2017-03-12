import { Template } from 'meteor/templating';
import { Sessions } from '../imports/api/sessions/sessions';

import './main.html';

Template.sessionTable.onCreated(function onCreated() {
    Meteor.subscribe('SessionsList');
});

Template.sessionTable.helpers({
  sessions() {
    return Sessions.find();
  },
});
