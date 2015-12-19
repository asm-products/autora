import Ember from 'ember';
import Firebase from 'firebase';

const {inject, computed} = Ember;

export default Ember.Controller.extend({
	showOptions: false,
	optionsLoading: false,
	isEditing: false,

	project: inject.controller('project'),
	session: inject.service('session'),


	newEntry: inject.controller('project.index.entries.newEntry'),
	isEditable: computed.equal('model.piles.firstObject.competingEntries.length', 0),
	 //untested
	newPile: computed('model', function(){
		return {
			project: this.get('model')
		};
	}),

	inlineMode: computed('model.inputType', function(){
		var inputType = this.get('model.inputType');
		return inputType === 'word' || inputType === 'sentence'; 
	}),

	isCreator: computed('session.user.id','model.user.id', function(){
		return this.get('session.user.id') === this.get('model.user.id');
	}),

	maxEntryLength: computed('model.inputType','model.inputLength', function(){
		console.log('project.index.maxeEntryLength');
		var inputType = this.get('model.inputType');
		var inputLength = this.get('model.inputLength');

		var baseLength = 0;

		switch(inputType){
			case 'word' : baseLength = 30; break;
			case 'line' : baseLength = 200; break;
			case 'sentence' : baseLength = 200; break;
			case 'paragraph' : baseLength = 600; break;
		}

		return parseInt(baseLength * inputLength);
	}),

	actions: {
		
		createPile(){
			var project = this.get('model');
			this.store.createRecord('pile', this.get('newPile')).save().then(() => {
				project.save().then(function(){
					this.transitionToRoute('project.index.entries');
				});
			});
		},
		toggleOptions(){
			this.toggleProperty('showOptions');
		},
		toggleOpenClose(){

			var model = this.get('model');
			this.set('optionsLoading', true);
			model.toggleProperty('open');

			model.save().then(() => {
				this.set('optionsLoading', false);
				this.set('showOptions', false);
				if(this.get('model.open')){
					this.transitionToRoute('project.index.entries');
				} else {
					this.transitionToRoute('project.index');
				}
			});
		},
		toggleEdit(){
			this.toggleProperty('isEditing');
			this.set('showOptions', false);
		},
		cancelEditing(){
			this.get('model').rollbackAttributes();
			this.set('isEditing', false);
		},
		updateProject(){
			this.get('model').save().then(() => {
				this.set('isEditing', false);
			});
		},
		deleteProject(){
			this.get('model').destroyRecord().then(() => {
				this.transitionToRoute('project.contribute');
			});
		}
	}
});
