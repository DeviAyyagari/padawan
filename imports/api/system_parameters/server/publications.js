// All type-reading-related publications

import { Meteor } from 'meteor/meteor';
import { SystemParameters } from '/imports/api/system_parameters/system_parameters.js';


Meteor.publish('systemParameters', function () {
    return SystemParameters.find();
});
