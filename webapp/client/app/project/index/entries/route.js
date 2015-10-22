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
	},
	actions : {
		refreshModel(){
			this.refresh();
		},
		didTransition(){
			console.log('didTransition?');
			// this.controller.notifyPropertyChange('initialLoadHappened');
			// this.controller.notifyPropertyChange('didTransition');
			// this.controller.set('didTransition', false);
			// this.controller.set('didTransition', true);
			// this.controller.set('initialLoadHappened', undefined);
			// this.controller.notifyPropertyChange('initialLoadHappened');
			console.log(this.routeName);
			var self = this;
			Ember.run.schedule('afterRender', function(){
				setTimeout(function(){
					console.log('didTransition afterRender');
					self.controller.set('initialLoadHappened', true);
					
				},1500);
			});
		},
		willTransition(transition){
			if(transition.targetName !== 'project.index.entries.new-entry' && transition.targetName !== 'project.index.entries.index'){
				this.controller.set('initialLoadHappened', false);
				console.log('transitioning out');
				console.log(transition.targetName);
			}
		}
	}
	// actions: {
	// 	didTransition(){
	// 		this.controller.get('model.competingEntries').forEach(function(entry){
	// 			entry.rollbackAttributes();
	// 		});
	// 	}
	// }
});
