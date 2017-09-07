import { SystemParameters } from '/imports/api/system_parameters/system_parameters.js';
import { User } from '/imports/api/users/users.js';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Meteor } from 'meteor/meteor';
import './add_sysparameters.html';

Template.add_sysparameters.onCreated(function add_sysparametersOnCreated() {
  this.showModal = function(stuff) {
    let m = $('#tempModal');
    m.find('h4.modal-title').html(stuff.Title);
    m.find('div.modal-body').html(stuff.Body);
    m.find('div.modal-footer button.closebtn').html(stuff.CloseText);
    m.find('div.modal-footer button.savebtn').html(stuff.SaveText).click(stuff.SaveFunction);
    _.each(stuff.data, function (name, val) {
      m.data(name, val);
    });
    m.modal('show');
  };
  this.makeModalStuff = function(title, body, closeText, saveText, saveFunction, data) {
    return {
      Title: title,
      Body: body,
      CloseText: closeText,
      SaveText: saveText,
      SaveFunction: saveFunction,
      data: data
    };
  };
  this.autorun( () => {
    console.log("autorunning...");
    this.subscription = this.subscribe('systemParameters', {
      onStop: function () {
        console.log("Subscription stopped! ", arguments, this);
      }, onReady: function () {
        console.log("Subscription ready! ", arguments, this);
      }
    });
  });
});

Template.add_sysparameters.helpers({
    sysParameters() {
        return SystemParameters.find({});
    }
});

Template.add_sysparameters.events({
  'submit #newSysParameter'(event, instance) {
        event.preventDefault();
        console.log('submit #newSysParameter => ', event, instance);

        const target = event.target;
        const values = {
            'key':target.LeftText.value,
            'value':target.RightText.value
        };
        console.log(values);

        Meteor.call('sysparameter.insert', values.key, values.value, (error) => {
            if (error) {
                console.log("EEEEEERRRORRRRR: ", error);
            } else {
                target.LeftText.value = '';
                target.RightText.value = '';
            }
        });
    },
  'click span.delete'(event, instance) {
        event.preventDefault();
        console.log('click span.delete => ', event, instance);
        const target = event.target;
        let qid = $(target).data('pid');
        let vals = instance.makeModalStuff("Are you really sure?", "<h5>Do you really want to delete the System Parameter:</h5><table class='table table-bordered'><tr>"+$("#"+qid).html()+"</tr></table>", "No!", "I guess...", function (event) {
            $('#tempModal').modal('hide');
            $(this).off(event);
            Meteor.call('sysparameter.delete', qid, (error)=> {
                if(error) { console.log("Error on delete: ", error); }
                else {
                    console.log(qid+" should be deleted...");
                }
            });
        }, {qid:qid});
        instance.showModal(vals);
    },
  'click span.edit-sysparam-value'(event, instance) {
        event.preventDefault();
        console.log('click span.edit-sysparam-value => ', event, instance);
        const target = event.target;
        $(target).prop("disabled",false);
    },
  'change span.edit-sysparam-value'(event, instance) {
        event.preventDefault();
        console.log('click span.edit-sysparam-value => ', event, instance);
        const target = event.target;
        let pid = $(target).data('pid');
        Meteor.call('sysparameter.editValue', pid, $(target).val(), (error)=> {
                if(error) { console.log("Error on edit: ", error); }
                else {
                    console.log(pid+" should be edited...");
                }
            });
        $(target).prop("disabled",true);
    },
});
