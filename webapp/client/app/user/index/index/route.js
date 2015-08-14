import Ember from 'ember';

export default Ember.Route.extend({
	model: function(){
		var model = this.modelFor('user.index');
		console.log(model);
		console.log(model.get('projects'));

		return model;
	},

	afterModel: function(){
		//Load users projects
		// var userId = model.get('id');
		// this.store.find('project', {orderBy:'user', startAt:userId, endAt:userId});
	}
});
