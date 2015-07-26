import Ember from 'ember';

export default Ember.Controller.extend({
	newEntry: Ember.computed('model', function(){
		return {
			pile: this.get('model').get('firstObject'),
			// project: this.get('model').get('firstObject').get('project'), //DEV MODE
			author: this.get('session.user'),
			content: ''
		}
	}),

	actions: {
		createEntry: function() {
			console.log(this.get('newEntry'));
			console.log(this.get('model').get('firstObject'));
			this.store.createRecord('entry', this.get('newEntry'));
			this.transitionToRoute('project.index.entries');
		},

		transitionBack: function(){
            window.history.back();
		}
	}

});
