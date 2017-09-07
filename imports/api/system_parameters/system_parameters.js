import { Class } from 'meteor/jagi:astronomy';
import { check } from 'meteor/check';
import { Mongo } from 'meteor/mongo';


const SystemParameters = Class.create({
    name: "SystemParameters",
    collection: new Mongo.Collection('system_parameters'),
    fields: {
        ParameterKey: {
            type: String,
            default: ""
        },
        ParameterValue: {
            type: String,
            default: ""
        },
        CreatedBy: {
            type: String,
            default: function() { return Meteor.userId(); }
        }
    }
});


export { SystemParameters };
