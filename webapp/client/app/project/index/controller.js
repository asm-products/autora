import Ember from 'ember';

export default Ember.Controller.extend({
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
