import Ember from 'ember';

export default Ember.Controller.extend({
	project: Ember.inject.controller('project'),

	newPile: Ember.computed('model', function(){
		return {
			project: this.get('model')
		}
	}),

	newEntry: Ember.inject.controller('project.index.newEntry'),



	actions: {
		createPile: function(){
			this.store.createRecord('pile', this.get('newPile')).save();
		}
	}	
});
