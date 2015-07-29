import Ember from 'ember';

export default Ember.Route.extend({
	model: function(){
		var model = this.modelFor('user.index');
		this.store.find('project', {user: model.get('id')}); // Because relationships don't seem to work :(
		console.log(model);
		console.log(model.get('projects'));

		return model;

	}
});
