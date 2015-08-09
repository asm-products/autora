import Ember from 'ember';
import Firebase from 'firebase';

export default Ember.Controller.extend({
	create: false,
	queryParams: ['create'],

	newProjectDefaults: {
			languageForm: 'prose',
			inputType: 'word',
			inputLength: 1,
			tags: [],
			name: '',
			description: ''
		},

	showErrors: false,
	isLoading: false,

	serverAlert: {},

	descriptionAlert: Ember.computed('newProject.description','showErrors',function(){
		if(this.get('showErrors')){
			var description = this.get('newProject.description');
			var descriptionAlert = {};

			if(description.length === 0){
				descriptionAlert.message = 'Description can\'t be empty!';
				descriptionAlert.type = 'danger';
			}

			return descriptionAlert;
		}
	}),
	projectNameAlert: Ember.computed('newProject.name','showErrors', function(){
		if(this.get('showErrors')){
			var name = this.get('newProject.name');
			var projectNameAlert = {};

			if(name.length === 0){
				projectNameAlert.message = 'Project name can\'t be empty!';
				projectNameAlert.type = 'danger';
			} else if(!(/^[\w\-\s]+$/i.test(name))){
				projectNameAlert.message = 'Please use alphanumeric characters only!';
				projectNameAlert.type = 'danger';
			}

			return projectNameAlert;
		}
	}),


	isReadyToSend: Ember.computed('projectNameAlert.type','descriptionAlert.type',function() {
		return (
			this.get('projectNameAlert.type') !== 'danger' &&
			this.get('descriptionAlert.type') !== 'danger'
		);
	}),

	newProject: function(){
		//ugly hack to avoid set() changing the Defaults object
		//Solution? maybe createRecord() right away after visiting this and use Defaults on the model object instead
		return JSON.parse(JSON.stringify(this.get('newProjectDefaults')));
	}.property(),


	languageForms: [{id: 'prose', text: 'Prose'},{id: 'poetry', text: 'Poetry'}],

	inputTypes: Ember.computed('newProject.languageForm', function(){

		var languageForm = this.get('newProject.languageForm');
		var isPoetry = languageForm === 'poetry';

		if(isPoetry) {
			return [{id: 'word', text: 'Words'},{id: 'line', text: 'Lines'}];
		} else {
			return [{id: 'word', text: 'Words'},{id: 'sentence', text: 'Sentences'},{id: 'paragraph', text: 'Paragraphs'}];
		}
	}),

	inputObserver: Ember.observer('newProject.inputType', 'newProject.languageForm', function(){

		var languageForm = this.get('newProject.languageForm');
		var inputType = this.get('newProject.inputType');
		var isPoetry = languageForm === 'poetry';

		if (isPoetry && (inputType === 'sentence' || inputType === 'paragraph')) {
			this.set('newProject.inputType', 'word');
		}

		if (!isPoetry && (inputType === 'line')) {
			this.set('newProject.inputType', 'word');
		}
	}),
	// inputTypes: [{id: 'word', text: 'Words'},{id: 'sentence', text: 'Sentences'},{id: 'paragraph', text: 'Paragraphs'}],

	actions: {
			createProject: function(){
				this.set('newProject.createdAt', Firebase.ServerValue.TIMESTAMP);
				this.set('newProject.updatedAt', Firebase.ServerValue.TIMESTAMP);

				this.set('showErrors', true);
				if(this.get('isReadyToSend')){

					this.set('isLoading', true);

					this.set('newProject.user', this.get('session.user')); //set current session as user
					var newProjectRecord = this.store.createRecord('project', this.get('newProject'));
					var self = this;

					newProjectRecord.save()
					.then(function(){
						self.toggleProperty('create');
						self.set('newProject', '');
						console.log(self.get('newProjectDefaults'));
						self.set('newProject', JSON.parse(JSON.stringify(self.get('newProjectDefaults'))));

						console.log(self.get('session.user'));

						self.get('session.user.content').save().then(function(){
							self.transitionToRoute('project.index', newProjectRecord);
							self.set('isLoading', false);
							
						}); // check for errors and delete the project if needed
					},function(error){
						console.log(error);
						self.set('serverAlert.message', error);
						self.set('isLoading', false);
					});

				}

			},

			toggleCreateProjectModal: function(){
				this.set('showErrors', false);
				this.toggleProperty('create');
			}
	}
});
