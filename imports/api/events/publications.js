import { Meteor } from 'meteor/meteor';
import { Events } from './collection.js';

Meteor.publish('events.all', function () {
  return Events.find({}, { sort: { date: 1 } });
});