import Ember from 'ember';

const {computed, observer} = Ember;

export default Ember.Component.extend({

	likeAction: 'likeEntry',
	unlikeAction: 'unlikeEntry',

	isEditing: false,
	ordered: false,
	didAnimate: false,

	hasNoLikes: computed.equal('model.likes.length',0),
	isPileUnlocked: computed.equal('model.pile.locked', false),
	isEditable: computed.and('isAuthor','hasNoLikes','isPileUnlocked'), 

	dropdownClass: computed('model.id', function(){
		return `toggleEntryDropdown${this.get('model.id')}`;
	}),

	shouldAnimate: computed('didAnimate','initialLoadHappened', function(){
		return !this.get('didAnimate') && this.get('initialLoadHappened');
	}),

	isAuthor: computed('model.user','session.user',function(){
		return this.get('model.user.id') === this.get('session.user.id');
	}),

	isLikedByUser: computed('model.likes.[]','session.user','model.likes.isFulfilled', function(){
		
		if(this.get('model.likes.isFulfilled')){
			var currentUserId = this.get('session.user.id');
			var likedBy = this.get('model.likedBy').mapBy('id');
			return likedBy.contains(currentUserId);
		} else {
			return false;
		}
	}),
	
	endsWithLineBreak: computed('model.content', function(){
		var content = this.get('model.content');
		if(content){
			return content.substr(content.length - 1,1).match(/\n/);
		}
	}),

	loadingObserver: observer('model.isLoaded', function(){
		var self = this;
		setTimeout(function(){
			self.set('didAnimate', true);
		}, 1500);
	}),

	likesAreLoaded: observer('model.likes.isFulfilled', 'model.isLoading', function(){
		if(this.get('model.likes.isFulfilled') && !this.get('model.isLoading') && !this.get('ordered')){
			var self = this;
			Ember.run.scheduleOnce('afterRender',function(){
				self.set('ordered', true);
				self.set('model.initialAmountOfLikes', JSON.parse(JSON.stringify(self.get('model.amountOfLikes'))));	
			});
		}
	}),

	actions: {


		toggleLike(){

			if(!this.get('isLikedByUser')){
				var model = this.get('model');
				var newLikeData = {
					user: this.get('session.user'),
					entry: model
				};
				this.sendAction('likeAction', newLikeData, model);

			} else {

				//Unlike
				//Get the like we want to remove
				var unlikeData = this.get('model.likes').findBy('user.id', this.get('session.user.id'));
				this.sendAction('unlikeAction', unlikeData, this.get('model'));

			}
		},

		toggleEditing(){
			this.toggleProperty('isEditing');
		},

		cancelEditing(){
			this.get('model').rollbackAttributes();
			this.set('isEditing', false);
		},

		updateEntry(){
			var self = this;
			this.get('model').save().then(function(){
				self.set('isEditing', false);
			});
		},

		deleteEntry(){
			if(confirm("Really destroy?")){

				//there's probably no need to save pile afterwards
				var model = this.get('model');
				this.get('session').deleteSubscriptionForModel('entry',model,this.store);
				model.destroyRecord();
			}	
		}
	}
});
