import Ember from 'ember';
import Firebase from 'firebase';

export default Ember.Controller.extend({
	projectIndexEntriesController: Ember.inject.controller('project/index/entries'),
	showAlerts: false,
	hasErrors: false,

	pile: Ember.computed.alias('projectIndexEntriesController.model'),

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

	maxlength: Ember.computed('pile.project.inputType','pile.project.inputLength', function(){
		var inputType = this.get('pile.project.inputType');
		var inputLength = this.get('pile.project.inputLength');

		var baseLength = 0;

		switch(inputType){
			case 'word' : baseLength = 30; break;
			case 'line' : baseLength = 200; break;
			case 'sentence' : baseLength = 200; break;
			case 'paragraph' : baseLength = 600; break;
		}

		return parseInt(baseLength * inputLength);
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
