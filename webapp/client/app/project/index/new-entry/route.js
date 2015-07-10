import Ember from 'ember';

export default Ember.Route.extend({
	model: function(){
		//currently returns latest pile globally, should return last pile from a particular project
		var model = this.store.find('pile', {limitToLast: 1, orderBy: 'createdAt'});

		return model;
		// return this.modelFor('project.index.entries');
	}
});
