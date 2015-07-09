import Ember from 'ember';

export default Ember.Controller.extend({
	newProject: {},
	
	actions: {
			createProject: function(){
				
				var newProjectRecord = this.store.createRecord('project', this.get('newProject'));
				this.transitionToRoute('project.list');
			}
		}
});
