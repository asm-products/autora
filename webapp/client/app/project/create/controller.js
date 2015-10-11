import Ember from 'ember';
import Firebase from 'firebase';
import config from 'client/config/environment';

export default Ember.Controller.extend({
	project: Ember.inject.controller('project'),

	create: Ember.computed.alias('project.create'),


	newProjectDefaults: {
			languageForm: 'prose',
			inputType: 'word',
			inputLength: 1,
			name: '',
			description: ''
		},

	tags: [],

	showErrors: false,
	isLoading: false,
	languageForms: [{id: 'prose', text: 'Prose'},{id: 'poetry', text: 'Poetry'}],

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

	max: Ember.computed('newProject.inputType', function(){
		var inputType = this.get('newProject.inputType');

		var max;

		switch(inputType){
			case 'word' : max = 10; break;
			case 'line' : max = 4; break;
			case 'sentence' : max = 4; break;
			case 'paragraph' : max = 2; break;
		}

		return max;
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

	newProject: function() {

		//ugly hack to avoid set() changing the Defaults object
		//Solution? maybe createRecord() right away after visiting this and use Defaults on the model object instead
		return JSON.parse(JSON.stringify(this.get('newProjectDefaults')));
	}.property(),

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

		//reset the input length if necessary

		if(this.get('newProject.inputLength') > this.get('max')) {
			this.set('newProject.inputLength', 1);
		}
	}),

	actions: {

			createProject: function(){
			this.set('newProject.createdAt', Firebase.ServerValue.TIMESTAMP);
			this.set('newProject.updatedAt', Firebase.ServerValue.TIMESTAMP);

			this.set('newProject.image', this.get('fileName'));
			this.set('newProject.imageHost', config.s3Url);

			this.set('showErrors', true);
			if(this.get('isReadyToSend')){

				//start showing spinner
				this.set('isLoading', true);

				var self = this;
				// this.set('newProject.tags', null);
				this.set('newProject.user', this.get('session.user')); //set current session as user
				var newProjectRecord = this.store.createRecord('project', this.get('newProject'));
				var tags = this.get('tags');
				var tagRecords = [];
				var tagRecord = null;
				var tagRequests = [];

				tags.forEach(function(tagName){
					//SAVE TAGS
					tagRequests.push(self.store.find('tag', {orderBy: 'name', startAt: tagName, endAt:tagName})
					.then(function(foundTags){
						console.log('tagRecords:');
						console.log(foundTags);
						if(foundTags.get('length') === 0) {
							//there is no tag with this name, lets create one
							var newTag = {
								name: tagName,
							};
							tagRecord = self.store.createRecord('tag', newTag);
							tagRequests.push(tagRecord.save());
						} else {
						tagRecord = foundTags.get('firstObject');
						}
						tagRecords.pushObject(tagRecord);
					}));
				});

				Ember.RSVP.allSettled(tagRequests).then(function(){
					newProjectRecord.set('tags', tagRecords);
					//SAVE PROJECT
					newProjectRecord.save()
					.then(function(projectRecord){
						console.log('first saving fine');
						self.toggleProperty('create');
						self.set('newProject', '');
						console.log(self.get('newProjectDefaults'));
						self.set('newProject', JSON.parse(JSON.stringify(self.get('newProjectDefaults'))));
						self.set('tags', []);

						var lastRequests = [];
						//SAVE USER - relationship save
						lastRequests.push(self.get('session.user.content').save()); // check for errors and delete the project if needed
						projectRecord.get('tags').forEach(function(tag){
							lastRequests.push(tag.save());
						}); // check for errors and delete the project if needed
						Ember.RSVP.allSettled(lastRequests).then(function(){
							//ALL DONE - everything is set up, redirect...
							var pile = {
								project: projectRecord,
								createdAt: Firebase.ServerValue.TIMESTAMP,
								updatedAt: Firebase.ServerValue.TIMESTAMP
							};

							console.log(pile);

							self.store.createRecord('pile', pile).save().then(function () {
								console.log('pile created');
								projectRecord.save().then(function(){
									
									self.set('isLoading', false);
									self.transitionToRoute('project.index.entries', projectRecord.get('id'));
								});
							});
						});

					},function(error){
						console.log(error);
						self.set('serverAlert.message', error);
						self.set('isLoading', false);
					});
				});
			}
		},

		toggleCreateProjectModal: function(){
			this.set('showErrors', false);
			this.set('filePreviewUrl', null);
			this.set('showFilePicker', null);

			this.toggleProperty('create');
			// return true;
		},

		showFilePicker: function () {
			this.set('showFilePicker', true);
		},

		hideFilePicker: function () {
			this.set('showFilePicker', false);
		},

		projectPhotoUploadDone: function (fileName) {
			//console.log(file);
			this.set('fileName',fileName);

			/*
			Ember.$.post('/s3/upload', file).done(function () {
			}.bind(this));
			*/
		}
	}
});
