import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

// Import needed templates
import '../../ui/layouts/body/body.js';
import '../../ui/pages/home/home.js';
import '../../ui/pages/add_questions/add_questions.js';
import '../../ui/pages/admin_teams/admin_teams.js';
import '../../ui/pages/add_sysparameters/add_sysparameters.js';
import '../../ui/pages/not-found/not-found.js';
import '../../ui/layouts/login/login.js';

// Set up all routes in the app
FlowRouter.route('/', {
    triggersEnter: [AccountsTemplates.ensureSignedIn],
    name: 'App.home',
    action() {
      BlazeLayout.render('App_body', { main: 'App_home' });
    },
});
FlowRouter.route('/signin', {
    name: 'signin',
    action() {
        BlazeLayout.render('Auth_page', { });
    }
});
FlowRouter.route('/addQuestions/:category', {
    triggersEnter: [AccountsTemplates.ensureSignedIn],
    name: 'addQuestions',
    action(params, queryParams) {
        BlazeLayout.render('App_body', { main: 'add_questions' });
    }
});
FlowRouter.route('/adminTeams', {
    triggersEnter: [AccountsTemplates.ensureSignedIn],
    name: 'adminTeams',
    action(params, queryParams) {
        BlazeLayout.render('App_body', { main: 'admin_teams' });
    }
});
FlowRouter.route('/addSysParameters', {
    triggersEnter: [AccountsTemplates.ensureSignedIn],
    name: 'addSysParameters',
    action(params, queryParams) {
        BlazeLayout.render('App_body', { main: 'add_sysparameters' });
    }
});
FlowRouter.notFound = {
    action() {
        BlazeLayout.render('App_body', { main: 'App_notFound' });
    },
};
