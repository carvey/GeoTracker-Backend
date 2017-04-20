import { Mongo } from 'meteor/mongo';

/*
Fields:
- id
- title
- active
 */
export const Sessions = new Mongo.Collection("Sessions");