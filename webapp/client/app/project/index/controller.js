import Ember from 'ember';

export default Ember.Controller.extend({
	project: Ember.inject.controller('project'),

	newPile: Ember.computed('model', function(){
		return {
			project: this.get('model')
		}
	}),

	actions: {
		createPile: function(){
			this.store.createRecord('pile', this.get('newPile')).save();
		}
	}	
});
