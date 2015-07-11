import Ember from 'ember';

export default Ember.Controller.extend({

	pile: Ember.computed('model', function(){
		return this.get('model.firstObject');
	}),

	newPile: Ember.computed('model', function(){
		return {
			pile: this.get('model')
		}

	}),

	actions: {

		createPile: function(){
			this.store.createRecord('pile', this.get('newPile')).save();
		}
	}
});
