import Ember from 'ember';

export default Ember.Controller.extend({
	newEntry: Ember.computed('model', function(){
		return {
			pile: this.get('model').get('firstObject'),
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
	}

});
