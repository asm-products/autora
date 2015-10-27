import Ember from 'ember';

export default Ember.Component.extend({

	//classNameBindings: ['animate:animate'],

	// isLoaded: Ember.computed.not('model.isLoading'),
	ordered: false,
	// pickAction: 'pickEntry',
	likeAction: 'likeEntry',
	unlikeAction: 'unlikeEntry',
	dropdownClass: Ember.computed('model.id', function(){
		return `toggleEntryDropdown${this.get('model.id')}`;
	}),

	didAnimate: false,
	shouldAnimate: Ember.computed('didAnimate','initialLoadHappened', function(){
		return !this.get('didAnimate') && this.get('initialLoadHappened');
	}),
	loadingObserver: Ember.observer('model.isLoaded', function(){
		var self = this;
		setTimeout(function(){
			self.set('didAnimate', true);
		}, 1500);
	}),

	isEditing: false,

	isLikedByUser: Ember.computed('model.likes.@each','session.user','model.likes.isFulfilled', function(){
		
		if(this.get('model.likes.isFulfilled')){
			var currentUserId = this.get('session.user.id');
			var likedBy = this.get('model.likedBy').mapBy('id');
			return likedBy.contains(currentUserId);
		} else {
			return false;
		}
	}),
	isAuthor: Ember.computed('model.user','session.user',function(){
		return this.get('model.user.id') === this.get('session.user.id');
	}),
	hasNoLikes: Ember.computed.equal('model.likes.length',0),
	isPileUnlocked: Ember.computed.equal('model.pile.locked', false),
	isEditable: Ember.computed.and('isAuthor','hasNoLikes','isPileUnlocked'), 
	endsWithLineBreak: Ember.computed('model.content', function(){
		var content = this.get('model.content');
		if(content){
			return content.substr(content.length - 1,1).match(/\n/);
		}
	}),

	likesAreLoaded: function(){
		if(this.get('model.likes.isFulfilled') && !this.get('model.isLoading') && !this.get('ordered')){
			var self = this;
			Ember.run.scheduleOnce('afterRender',function(){
				self.set('ordered', true);
				self.set('model.initialAmountOfLikes', JSON.parse(JSON.stringify(self.get('model.amountOfLikes'))));	
			});
		}
	}.observes('model.likes.isFulfilled', 'model.isLoading'),

	actions: {

		// pick: function(){

		// 	this.sendAction('pickAction', this.get('model'));

		// },

		toggleLike: function(){

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
				this.get('model').destroyRecord();
			}	
		}
	}
});
