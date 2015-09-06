import Ember from 'ember';

export default Ember.Route.extend({
	model: function(){
		var parentModel = this.modelFor('project.index');
		if(parentModel.get('open')){
			return parentModel.get('piles').reload().then(function (piles) {
				piles = piles.filter(function (pile) {
					return pile.get('locked') === false;
				});

				return piles.get('firstObject');
			});
		} else {
			this.transitionTo('project.index');
		}
	}
});
