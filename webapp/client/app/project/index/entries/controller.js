import Ember from 'ember';
import Firebase from 'firebase';

export default Ember.Controller.extend({

	pile: Ember.computed('model', function(){
		return this.get('model.firstObject');
	}),

	// newPile: Ember.computed('model', function(){
	// 	return {
	// 		pile: this.get('model')
	// 	};
	// }),

	// entriesSorting: ['amountOfLikes:desc'],
	entriesSorting: ['initialAmountOfLikes:desc'],
	sortedEntries: Ember.computed.sort('pile.competingEntries', 'entriesSorting'),
	// sortedEntries: Ember.computed('pile.competingEntries', function(){
	// 	return this.get('pile.competingEntries').sortBy('amountOfLikes');
	// }),

	project: Ember.inject.controller('project.index'),

	actions: {
		createPile: function() {
			//Unused code. This is handled at Project.index controller
			this.set('newPile.createdAt', Firebase.ServerValue.TIMESTAMP);
			this.set('newPile.updatedAt', Firebase.ServerValue.TIMESTAMP);
			this.store.createRecord('pile', this.get('newPile')).save();
		},

		pickEntry: function(entry){
			var project = this.get('project.model');
			entry.set('project', project).save(); //added save to test security rules
			//ToDO: close Pile
		},

		likeEntry: function(newLikeData, entry){

			newLikeData.createdAt = Firebase.ServerValue.TIMESTAMP;
			newLikeData.updatedAt = Firebase.ServerValue.TIMESTAMP;
			newLikeData.pile = this.get('pile');

			this.store.createRecord('like', newLikeData).save().then(function(){
				entry.save();
			}); //Todo: manage response
			// var likes = entry.get('likes');
			// likes.addObject(newLike);
			// entry.save();
			 //entry needs to be saved instrad of like because of Embedded relationship

			//save()
		},

		unlikeEntry: function(unlikeData, entry){
			unlikeData.destroyRecord().then(function(){
				entry.save();
			}); //Todo: manage response
			//save()
		},

		checkEntries: function(){
			this.get('model');
		}
	}
});