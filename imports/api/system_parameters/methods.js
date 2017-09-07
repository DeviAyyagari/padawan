// Methods related to System Parameters

import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { User } from '../users/users.js';
import { SystemParameters } from './system_parameters.js';

Meteor.methods({
    'sysparameter.insert'(parameterkey, parametervalue) {
        if(!Roles.userIsInRole(Meteor.userId(), ['admin'], Roles.GLOBAL_GROUP)) {
            throw new Meteor.Error(403, "You are not authorized");
        }
        let newSysParameter = new SystemParameters({ ParameterKey:parameterkey, ParameterValue:parametervalue, CreatedBy:Meteor.userId() });
        console.log(newSysParameter);
        newSysParameter.validate({
            cast: true
        });

        return newSysParameter.save();
    },
  'sysparameter.delete'(sysParamId) {
        if(!Roles.userIsInRole(Meteor.userId(), ['admin'], Roles.GLOBAL_GROUP)) {
            throw new Meteor.Error(403, "You are not authorized");
        }
        let me = User.findOne({_id:Meteor.userId()});
        let sysParam = SystemParameters.findOne({_id:sysParamId});
        sysParam.remove();
    },
  'sysparameter.editValue'(sysParamId, value) {
        if(!Roles.userIsInRole(Meteor.userId(), ['admin'], Roles.GLOBAL_GROUP)) {
            throw new Meteor.Error(403, "You are not authorized");
        }
        let me = User.findOne({_id:Meteor.userId()});
        let sysParam = SystemParameters.findOne({_id:sysParamId});
        sysParam.ParameterValue = value;
        sysParam.save();
    },
});
