import Ember from 'ember';

export default Ember.Route.extend({
	model: function(){
		return this.modelFor('project.index').get('piles').then(function (piles) {
			piles = piles.filter(function (pile) {
				return pile.get('locked') === false;
			});

			return piles.get('firstObject');
		});
	}
});
