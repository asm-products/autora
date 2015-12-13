import Ember from 'ember';
import Firebase from 'firebase';

const {computed, inject} = Ember;

export default Ember.Controller.extend({

	didTransition: false,
	initialLoadHappened: false,
	lockAlert: {},

	entriesSorting: ['initialAmountOfLikes:desc'],
	sortedEntries: computed.sort('pile.competingEntries', 'entriesSorting'),
	canPostEntry: computed.lt('entriesFromUser.length', 10), //there's less then 10 entries from user
	isNotCreator: computed.not('isCreatorOfProject'),
	displayLockedPileNotification: computed.and('model.locked','session.isAuthenticated','isNotCreator'),
	isProjectClosed: computed.not('model.project.open'),
	displayClosedProjectNotification: computed.and('isProjectClosed'),
	
	project: inject.controller('project.index'),

	pile: computed('model', function(){
		return this.get('model');
	}),

	gridClass: computed('pile.project.inputType', function(){
		var inputType = this.get('pile.project.inputType');
		var gridClass = "";

		switch(inputType){
			case 'word' : gridClass = "col-sm-6 col-md-4 col-lg-3"; break;
			case 'line' : gridClass = "col-sm-6 col-md-6 col-lg-4"; break;
			case 'sentence' : gridClass = "col-sm-6 col-md-6 col-lg-4"; break;
			case 'paragraph' : gridClass = "col-lg-6"; break;
		}

		return gridClass;
	}),


	entriesFromUser: computed('model.competingEntries.@each','model.competingEntries.isFulfilled','session.user.id', function(){
		
		if(this.get('session.user.id') && this.get('model.competingEntries.isFulfilled')){
			return this.get('model.competingEntries').filter(entry => {
				var isAuthor = entry.get('user.id') === this.get('session.user.id');
				return isAuthor;
			});
		} else {
			return 0;
		}
	}),

	isCreatorOfProject: computed('model.project','session.user.id', function(){
		// OR IS ADMIN!
		return this.get('model.project.user.id') === this.get('session.user.id') || this.get('session.user.admin');
	}),


	actions: {
		pickEntry(){
			var project = this.get('project.model'),
				pile = this.get('pile');

			var competingEntries = this.get('model.competingEntries');
			var sortedEntriesByLikes = competingEntries.sortBy('amountOfLikes');
			// this.get('model.competingEntries').forEach(function(entry){
			// 	console.log(entry.get('amountOfLikes'));
			// });

			var mostLikedEntry = sortedEntriesByLikes.get('lastObject');
			var secondMostLikedEntry = sortedEntriesByLikes.objectAt(competingEntries.get('length') - 2);

			//if secondMostLikedEntry is undefined, there is only one entry so locking pile should be allowed
			if(typeof secondMostLikedEntry === 'undefined' || (mostLikedEntry.get('likes.length') !== secondMostLikedEntry.get('likes.length'))){

				mostLikedEntry.set('project', project).save().then(() => {
					pile.set('locked', true).save().then(() => {
						var pile = {
							project: project,
							createdAt: Firebase.ServerValue.TIMESTAMP,
							updatedAt: Firebase.ServerValue.TIMESTAMP
						};

						this.store.createRecord('pile', pile).save().then(pile => {
							project.save().then(() => {
								this.set('model', pile);
								this.set('lockAlert', {});
							});
						});
					});
				});
			} else {
				this.set('lockAlert.message', 'Can\'t pick an entry at the moment as there\'s multiple entries with the same amount of likes!');
				this.set('lockAlert.type', 'danger');
			}	
		},

		likeEntry(newLikeData, entry){

			newLikeData.createdAt = Firebase.ServerValue.TIMESTAMP;
			newLikeData.updatedAt = Firebase.ServerValue.TIMESTAMP;
			newLikeData.pile = this.get('pile');

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

		unlikeEntry(unlikeData, entry){
			unlikeData.destroyRecord().then(function(){
				entry.save();
			}); //Todo: manage response
			//save()
		},

		checkEntries(){
			this.get('model');
		},

		refreshPile(){
			this.send('refreshModel');
		},

		redirectToParent(){
			this.transitionToRoute('project.index');
		}
	}
});
