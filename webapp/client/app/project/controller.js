import Ember from 'ember';


export default Ember.Controller.extend({

	create: false,
	queryParams: ['create'],
	
	// inputTypes: [{id: 'word', text: 'Words'},{id: 'sentence', text: 'Sentences'},{id: 'paragraph', text: 'Paragraphs'}],

	actions: {
		toggleCreateProjectModal(){
			this.toggleProperty('create');
		}
	}
});
