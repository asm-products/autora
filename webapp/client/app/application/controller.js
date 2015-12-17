import Ember from 'ember';

const {inject, computed} = Ember;

export default Ember.Controller.extend({
	session: inject.service('session'),
	subscription: inject.service('subscription'),
	project: inject.controller('project'),
	isInProjectRoute: computed('currentRouteName', function(){
		console.log(this.get('subscription.store').peekAll('user'));
		return this.get('currentRouteName').substring(0, 7) === 'project';
	}), 

	actions: {
		toggleCreate(){
			this.toggleProperty('project.create');
		}
	}
});
