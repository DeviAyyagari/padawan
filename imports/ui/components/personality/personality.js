import { Question } from '/imports/api/questions/questions.js';
import { User, Profile, UserType, MyersBriggs, Answer } from '/imports/api/users/users.js';
import { TypeReading } from '/imports/api/type_readings/type_readings.js';
import { Meteor } from 'meteor/meteor';
import { SystemParameters } from '/imports/api/system_parameters/system_parameters.js';
import './personality.html';

Template.personality.onCreated(function () {
    this.autorun( () => { console.log("autorunning...");
        this.subscription = this.subscribe('userData', Meteor.userId(), {
            onStop: function () {
                console.log("Subscription stopped! ", arguments, this);
            }, onReady: function () {
                console.log("Subscription ready! ", arguments, this);
            }
        });
        console.log(this.subscription);
        this.subscription2 = this.subscribe('typereadings.myReadings', Meteor.userId(), {
            onStop: function () {
                console.log("Readings subscription stopped! ", arguments, this);
            }, onReady: function () {
                console.log("Readings subscription ready! ", arguments, this);
            }
        });
        console.log(this.subscription2);
        this.subscription3 = this.subscribe('systemParameters', {
          onStop: function () {
            console.log("systemParameters Subscription stopped! ", arguments, this);
          }, onReady: function () {
            console.log("systemParameters Subscription ready! ", arguments, this);
          }
        });
        console.log(this.subscription3);
    });
});

Template.personality.helpers({
    readings() {
        return TypeReading.find({});
    },
    user() {
        return User.findOne({_id:Meteor.userId()});
    },
    opacityByCategory(category, userObj) {
        //console.log(category, userObj); //return;
        var value = userObj.MyProfile.UserType.Personality[userObj.MyProfile.UserType.Personality.getIdentifierById(category)];
        //console.log(value);
        return (Math.abs(value.Value) * 2) / 100;
    },
    letterByCategory(category, userObj) {
        //console.log(category, userObj); //return;
        var identifier = userObj.MyProfile.UserType.Personality.getIdentifierById(category);
        var value = userObj.MyProfile.UserType.Personality[identifier].Value;
        var questionCount = userObj.MyProfile.UserType.Personality[identifier].QuestionCount;
        var min_question_count_by_category = parseInt(SystemParameters.findOne({ParameterKey:"min_question_count_by_category"}).ParameterValue);
        console.log(category, value, identifier, questionCount, min_question_count_by_category);
        return (value === 0 || questionCount < min_question_count_by_category ? "?" : (value < 0 ? identifier.slice(0,1) : identifier.slice(1,2)));
    }
});

Template.personality.events({
    'click div.personality-display'(event, instance) {
        console.log('click div.personality-display =>', event, instance);
        $('#personality-readings').modal('show');
        //$('.Selected-Category').html(newCat);
    }
});

Template.singleReading.helpers({
    getHSize(reading) {
        console.log(reading);
        if(!reading.Header) { return ""; }
        if(reading.Range.Delta >= 50) { return "<h1>"+reading.Header+"</h1>"; }
        if(reading.Range.Delta >= 40) { return "<h2>"+reading.Header+"</h2>"; }
        if(reading.Range.Delta >= 30) { return "<h3>"+reading.Header+"</h3>"; }
        if(reading.Range.Delta >= 20) { return "<h4>"+reading.Header+"</h4>"; }
        if(reading.Range.Delta >= 10) { return "<h5>"+reading.Header+"</h5>"; }
        return "<h6>"+reading.Header+"</h6>";
    }
});
