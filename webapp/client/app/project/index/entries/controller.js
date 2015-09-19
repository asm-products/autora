import Ember from 'ember';
import Firebase from 'firebase';

export default Ember.Controller.extend({

	pile: Ember.computed('model', function(){
		return this.get('model');
	}),

	// newPile: Ember.computed('model', function(){
	// 	return {
	// 		pile: this.get('model')
	// 	};
	// }),

	// entriesSorting: ['amountOfLikes:desc'],
	entriesSorting: ['initialAmountOfLikes:desc'],
	sortedEntries: Ember.computed.sort('pile.competingEntries', 'entriesSorting'),
	lockAlert: {},
	// sortedEntries: Ember.computed('pile.competingEntries', function(){
	// 	return this.get('pile.competingEntries').sortBy('amountOfLikes');
	// }),

	project: Ember.inject.controller('project.index'),

	entriesFromUser: Ember.computed('model.competingEntries.@each','model.competingEntries.isFulfilled','session.user.id', function(){
		var self = this;
		var userId = this.get('session.user.id');
		console.log(this.get('model.competingEntries'));
		if(this.get('session.user.id') && this.get('model.competingEntries.isFulfilled')){
			return this.get('model.competingEntries').filter(function(entry){
				var isAuthor = entry.get('user.id') === self.get('session.user.id');
				console.log(entry.get('isLoading'));
				console.log(entry);
				console.log(isAuthor);
				console.log(entry.get('user.id'));
				console.log(userId);
				console.log(self);
				return isAuthor;
			});
		} else {
			return 0;
		}
		// return this.get('model.competingEntries').filterBy('user', this.get('session.user.id'));
	}),

	canPostEntry: Ember.computed.lt('entriesFromUser.length', 10),

	isCreatorOfProject: Ember.computed('model.project','session.user.id', function(){
		return this.get('model.project.user.id') === this.get('session.user.id');
	}),

	actions: {
		pickEntry: function(){
			var project = this.get('project.model'),
				pile = this.get('pile'),
				_this = this;

			var competingEntries = this.get('model.competingEntries');
			var sortedEntriesByLikes = competingEntries.sortBy('amountOfLikes');
			// this.get('model.competingEntries').forEach(function(entry){
			// 	console.log(entry.get('amountOfLikes'));
			// });

			var mostLikedEntry = sortedEntriesByLikes.get('lastObject');
			var secondMostLikedEntry = sortedEntriesByLikes.objectAt(competingEntries.get('length') - 2);

			if(mostLikedEntry.get('likes.length') !== secondMostLikedEntry.get('likes.length')){

				mostLikedEntry.set('project', project).save().then(function () {
					pile.set('locked', true).save().then(function () {
						var pile = {
							project: project,
							createdAt: Firebase.ServerValue.TIMESTAMP,
							updatedAt: Firebase.ServerValue.TIMESTAMP
						};

						_this.store.createRecord('pile', pile).save().then(function (pile) {
							project.save().then(function () {
								_this.set('model', pile);
								_this.set('lockAlert', {});
							});
						});
					});
				});
			} else {
				this.set('lockAlert.message', 'Can\'t pick an entry at the moment as there\'s multiple entries with the same amount of likes!');
				this.set('lockAlert.type', 'danger');
			}	
		},

		likeEntry: function(newLikeData, entry){

			newLikeData.createdAt = Firebase.ServerValue.TIMESTAMP;
			newLikeData.updatedAt = Firebase.ServerValue.TIMESTAMP;
			newLikeData.pile = this.get('pile');
			// newLikeData.id = "testId";

			if(this.get('session.isAuthenticated')){
				var newLike = this.store.createRecord('like', newLikeData);
				newLike.save().then(function(){
					entry.save().then(function(){},function(){
						entry.rollbackAttributes();
					});
				}, function(){
					newLike.rollbackAttributes();
				});
			} else {
				this.transitionToRoute('user.login');
			}

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
