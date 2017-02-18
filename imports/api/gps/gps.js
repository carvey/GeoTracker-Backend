import { Mongo } from 'meteor/mongo';

/*
Fields:
- id
- sessionID
- long
- lat
- altitude
- bearing
- speed
- time
 */
export const GPSData = new Mongo.Collection("GPSData");
