import Ember from 'ember';

export default Ember.Component.extend({

	isLikedByUser: Ember.computed('model.likes.@each','session.user', function(){
		var likes = this.get('model.likes');
		var currentUserId = this.get('session.user.id');
		var likedBy = this.get('likedBy').mapBy('id');
		return likedBy.contains(currentUserId);
	}),

	likedBy: Ember.computed.mapBy('model.likes', 'user'), 
	likedByFix: Ember.computed.uniq('likedBy'),  //bugFix, might becuase EmberFire does not officialy support Ember 2.0

	amountOfLikes: Ember.computed('likedByFix', function(){
		return this.get('likedByFix.length');
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
				this.sendAction('unlikeAction', unlikeData);

			}
		}
	}
});
