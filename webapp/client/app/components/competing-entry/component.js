import Ember from 'ember';

export default Ember.Component.extend({

	isLikedByUser: Ember.computed('model.likes.@each','session.user', function(){
		var likes = this.get('model.likes');
		var currentUserId = this.get('session.user.id');
		var likedBy = likes.mapBy('user.id');
		return likedBy.contains(currentUserId);
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

				var newLikeData = {
					user: this.get('session.user'),
					entry: this.get('model')
				};
				this.sendAction('likeAction', newLikeData);

			} else {

				//Unlike
				//Get the like we want to remove
				var unlikeData = this.get('model.likes').findBy('user.id', this.get('session.user.id'));
				console.log(unlikeData);
				this.sendAction('unlikeAction', unlikeData);

			}
		}
	}
});
