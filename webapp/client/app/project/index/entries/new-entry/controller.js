import Ember from 'ember';
import Firebase from 'firebase';

const {inject, computed, run, $} = Ember;

export default Ember.Controller.extend({

	showAlerts: false,
	hasErrors: false,

	projectIndexEntriesController: inject.controller('project.index.entries'),
	projectIndexController: inject.controller('project.index'),

	pile: computed.alias('projectIndexEntriesController.model'),
	maxlength: computed.alias('projectIndexController.maxEntryLength'),
	isEmpty: computed.empty('newEntry.content'),

	newEntry: computed('pile', function(){
		return {
			pile: this.get('pile'),
			// project: this.get('model').get('firstObject').get('project'), //DEV MODE
			user: this.get('session.user'),
			content: ''
		};
	}),



	alert: computed('isEmpty', function(){
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

	spacerHeight: computed(function(){
		//self setting computed property

		run.schedule('afterRender', () => {
			var offset = 50;
			var animationTime = 400; //ms
			setTimeout(() => {

				var addEntryModalHeight = $('.add-entry-modal').height() + offset;
				console.log(addEntryModalHeight);
				this.set('spacerHeight', addEntryModalHeight);
				
			}, animationTime);
		});
	}),

	actions: {
		createEntry() {
			
			this.set('showAlerts', true);

			if(!this.get('isEmpty')){
				var pile = this.get('pile');
				var newEntry = this.store.createRecord('entry', this.get('newEntry'));
				newEntry.save().then(function(){
					pile.save().then(function () {
						this.resetForm();
					}.bind(this));
				}.bind(this), function(error){
					newEntry.rollback();
				});
				this.transitionToRoute('project.index.entries');
			}
		},

		transitionBack(){
            window.history.back();
		}
	}

});
