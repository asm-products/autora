import Ember from 'ember';
import Firebase from 'firebase';

export default Ember.Controller.extend({
	newEntry: Ember.computed('model', function(){
		return {
			pile: this.get('model').get('firstObject'),
			// project: this.get('model').get('firstObject').get('project'), //DEV MODE
			user: this.get('session.user'),
			content: ''
		};
	}),

	actions: {
		createEntry: function() {
			this.set('newEntry.createdAt', Firebase.ServerValue.TIMESTAMP);
			this.set('newEntry.updatedAt', Firebase.ServerValue.TIMESTAMP);
			this.store.createRecord('entry', this.get('newEntry')).save();
			this.transitionToRoute('project.index.entries');
		},

		transitionBack: function(){
            window.history.back();
		}
	}

});
