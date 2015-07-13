import Ember from 'ember';

// Could be used as homepage
// Features: list and filter projects

export default Ember.Route.extend({
	model: function(){
		return this.store.find('project');
	}
});
