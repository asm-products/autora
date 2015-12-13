import Ember from 'ember';

const {inject, computed} = Ember;

export default Ember.Controller.extend({
	project: inject.controller('project'),
	isInProjectRoute: computed('currentRouteName', function(){
		return this.get('currentRouteName').substring(0, 7) === 'project';
	}), 

	actions: {
		toggleCreate(){
			this.toggleProperty('project.create');
		}
	}
});
