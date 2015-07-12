import Ember from 'ember';

export default Ember.Controller.extend({
	newProject: {
		languageForm: 'prose',
		inputType: 'sentence',
		inputLength: 1
	},
	languageForms: [{id: 'prose', text: 'Prose'},{id: 'poetry', text: 'Poetry'}],
	inputTypes: [{id: 'word', text: 'Words'},{id: 'sentence', text: 'Sentences'},{id: 'paragraph', text: 'Paragraphs'}],
	
	actions: {
			createProject: function(){				
				var newProjectRecord = this.store.createRecord('project', this.get('newProject'));
				this.transitionToRoute('project.list');
			},

			transitionBack: function(){
				this.transitionToRoute('project.list');
			}
		}
});
