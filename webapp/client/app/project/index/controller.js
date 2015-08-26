import Ember from 'ember';
import Firebase from 'firebase';

export default Ember.Controller.extend({
	project: Ember.inject.controller('project'),

	newPile: Ember.computed('model', function(){
		return {
			project: this.get('model')
		};
	}),

	newEntry: Ember.inject.controller('project.index.entries.newEntry'),

	actions: {
		createPile: function(){
			this.set('newPile.createdAt', Firebase.ServerValue.TIMESTAMP);
			this.set('newPile.updatedAt', Firebase.ServerValue.TIMESTAMP);

			var project = this.get('model');
			var self = this;
			console.log(this.get('newPile'));
			this.store.createRecord('pile', this.get('newPile')).save().then(function(){
				project.save().then(function(){
					self.transitionToRoute('project.index.entries');
				});
			});
		}
	}
});
