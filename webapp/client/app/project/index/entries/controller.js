import Ember from 'ember';

export default Ember.Controller.extend({

	pile: Ember.computed('model', function(){
		return this.get('model.firstObject');
	}),

	newPile: Ember.computed('model', function(){
		return {
			pile: this.get('model')
		}
	}),

	project: Ember.inject.controller('project.index'),

	actions: {

		createPile: function(){
			this.store.createRecord('pile', this.get('newPile')).save();
		},

		pickEntry: function(entry){
			var project = this.get('project.model');
			console.log(entry);
			entry.set('project', project);
			//ToDO: close Pile
		},

		likeEntry: function(newLikeData){
			this.store.createRecord('like', newLikeData);
			//save()
		},

		unlikeEntry: function(unlikeData){
			unlikeData.deleteRecord();
			//save()
		}
	}
});
