import Ember from 'ember';

export default Ember.Route.extend({
	model: function(){
		//Query language: https://www.firebase.com/docs/web/libraries/ember/api.html
		return this.modelFor('project.index').get('piles').then(function (piles) {
			piles = piles.filter(function (pile) {
				return pile.get('locked') === false;
			});

			return piles.get('firstObject');
		});
	},

	afterModel: function (model) {
	}
});
