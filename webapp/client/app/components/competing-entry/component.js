import Ember from 'ember';

export default Ember.Component.extend({

	isLikedByUser: Ember.computed('model.likes.@each','session.user', function(){
		// var likes = this.get('model.likes');
		var currentUserId = this.get('session.user.id');
		var likedBy = this.get('model.likedBy').mapBy('id');
		return likedBy.contains(currentUserId);
	}),

	isLoaded: Ember.computed.not('model.isLoading'),
	ordered: false,

	likesAreLoaded: Ember.computed('model.likes.isFulfilled','model.isLoading', function(){
		if(this.get('model.likes.isFulfilled') && !this.get('model.isLoading') && !this.get('ordered')){
			var self = this;
			Ember.run.scheduleOnce('afterRender',function(){
				self.set('ordered', true);
				self.set('model.initialAmountOfLikes', JSON.parse(JSON.stringify(self.get('model.amountOfLikes'))));	
			});
		}
		return this.get('model.likes.isFulfilled');
	}),

	pickAction: 'pickEntry',
	likeAction: 'likeEntry',
	unlikeAction: 'unlikeEntry',

	actions: {

		pick: function(){

			this.sendAction('pickAction', this.get('model'));

		},

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
				console.log(unlikeData);
				this.sendAction('unlikeAction', unlikeData, this.get('model'));

			}
		}
	}
});
