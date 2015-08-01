import Ember from 'ember';
import Firebase from 'firebase';

export default Ember.Controller.extend({

	pile: Ember.computed('model', function(){
		return this.get('model.firstObject');
	}),

	newPile: Ember.computed('model', function(){
		return {
			pile: this.get('model')
		}
	}),

	project: Ember.inject.controller('project.index'),

	actions: {
		createPile: function() {
			this.set('newPile.createdAt', Firebase.ServerValue.TIMESTAMP);
			this.set('newPile.updatedAt', Firebase.ServerValue.TIMESTAMP);
			this.store.createRecord('pile', this.get('newPile')).save();
		},

		pickEntry: function(entry){
			var project = this.get('project.model');
			console.log(entry);
			entry.set('project', project);
			//ToDO: close Pile
		}
	}
});
