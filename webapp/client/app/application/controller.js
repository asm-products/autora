import Ember from 'ember';

export default Ember.Controller.extend({
	project: Ember.inject.controller('project'),
	isInProjectRoute: Ember.computed('currentRouteName', function(){
		return this.get('currentRouteName').substring(0, 7) === 'project';
	}), 

	actions: {
		toggleCreate(){
			console.log('toggleCreate in application controller');
			this.toggleProperty('project.create');
		}
	}
});
