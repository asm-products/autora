import Ember from 'ember';
import Firebase from 'firebase';

export default Ember.Controller.extend({
	projectIndexEntriesController: Ember.inject.controller('project.index.entries'),
	projectIndexController: Ember.inject.controller('project.index'),
	showAlerts: false,
	hasErrors: false,

	pile: Ember.computed.alias('projectIndexEntriesController.model'),
	maxlength: Ember.computed.alias('projectIndexController.maxEntryLength'),

	newEntry: Ember.computed('pile', function(){
		return {
			pile: this.get('pile'),
			// project: this.get('model').get('firstObject').get('project'), //DEV MODE
			user: this.get('session.user'),
			content: ''
		};
	}),


	isEmpty: Ember.computed.empty('newEntry.content'),
	alert: Ember.computed('isEmpty', function(){
		if(this.get('isEmpty')){
			return {
				type: 'danger',
				message: 'The entry content can\'t be empty'
			};
		}
	}),


	resetForm: function () {
		this.set('newEntry.content', '');
		this.set('hasErrors', false);
		this.set('showAlerts', false);
	},

	actions: {
		createEntry: function() {
			this.set('newEntry.createdAt', Firebase.ServerValue.TIMESTAMP);
			this.set('newEntry.updatedAt', Firebase.ServerValue.TIMESTAMP);
			this.set('showAlerts', true);

			if(!this.get('isEmpty')){
				var pile = this.get('pile');
				var newEntry = this.store.createRecord('entry', this.get('newEntry'));
				newEntry.save().then(function(){
					pile.save().then(function () {
						this.resetForm();
					}.bind(this));
				}.bind(this), function(error){
					console.log(error);
					newEntry.rollback();
				});
				this.transitionToRoute('project.index.entries');
			}
		},

		transitionBack: function(){
            window.history.back();
		}
	}

});
