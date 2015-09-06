import Ember from 'ember';
import Firebase from 'firebase';

export default Ember.Controller.extend({
	project: Ember.inject.controller('project'),

	newPile: Ember.computed('model', function(){
		return {
			project: this.get('model')
		};
	}),

	newEntry: Ember.inject.controller('project.index.entries.newEntry'),

	showOptions: false,
	optionsLoading: false,
	// optionsLoadingClass: Ember.computed('optionsLoading', function(){
	// 	if(this.get('optionsLoading')){
	// 		return 'au-loading';
	// 	} else {
	// 		return '';
	// 	}
	// }),
	// isCreator: Ember.computed.equal('session.user.id', 'model.user.id'), // buggy?

	isCreator: Ember.computed('session.user.id','model.user.id', function(){
		return this.get('session.user.id') === this.get('model.user.id');
	}),

	actions: {
		createPile(){
			this.set('newPile.createdAt', Firebase.ServerValue.TIMESTAMP);
			this.set('newPile.updatedAt', Firebase.ServerValue.TIMESTAMP);

			var project = this.get('model');
			var self = this;
			console.log(this.get('newPile'));
			this.store.createRecord('pile', this.get('newPile')).save().then(function(){
				project.save().then(function(){
					self.transitionToRoute('project.index.entries');
				});
			});
		},
		toggleOptions(){
			this.toggleProperty('showOptions');
		},
		toggleOpenClose(){
			// this.set('model.open', false).save();
			var model = this.get('model');
			model.toggleProperty('open');
			this.set('optionsLoading', true);
			var self = this;
			model.save().then(function(){
				self.set('optionsLoading', false);
				self.set('showOptions', false);
				if(self.get('model.open')){
					self.transitionToRoute('project.index.entries');
				} else {
					self.transitionToRoute('project.index');
				}
			});
		}
	}
});
