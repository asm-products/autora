import Ember from 'ember';


export default Ember.Controller.extend({

	create: false,
	queryParams: ['create'],
	
	actions: {
		
		toggleCreateProjectModal(){

			this.set('showErrors', false);
			this.toggleProperty('create');
		}
	}
});
