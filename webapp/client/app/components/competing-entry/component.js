import Ember from 'ember';

export default Ember.Component.extend({

	isLikedByUser: Ember.computed('model.likes.@each','session.user','model.likes.isFulfilled', function(){
		
		if(this.get('model.likes.isFulfilled')){
			var currentUserId = this.get('session.user.id');
			var likedBy = this.get('model.likedBy').mapBy('id');
			return likedBy.contains(currentUserId);
		} else {
			return false;
		}
	}),

	// isLoaded: Ember.computed.not('model.isLoading'),

	ordered: false,
	likesAreLoaded: function(){
		if(this.get('model.likes.isFulfilled') && !this.get('model.isLoading') && !this.get('ordered')){
			var self = this;
			Ember.run.scheduleOnce('afterRender',function(){
				self.set('ordered', true);
				self.set('model.initialAmountOfLikes', JSON.parse(JSON.stringify(self.get('model.amountOfLikes'))));	
			});
		}
	}.observes('model.likes.isFulfilled', 'model.isLoading'),

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
