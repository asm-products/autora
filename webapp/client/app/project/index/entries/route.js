import Ember from 'ember';

export default Ember.Route.extend({
	model: function(){
		//Query language: https://www.firebase.com/docs/web/libraries/ember/api.html
		var projectId = this.modelFor('project.index').get('id');
		console.log(projectId);
		var model = this.store.find('pile', {orderBy:'project', startAt: projectId, endAt: projectId});
		return model;
	},

	afterModel: function(model){

		//load entries here?
		var pileId = model.get('firstObject.id');
		if(pileId !== ""){
			this.store.find('entry', {orderBy: 'pile', startAt: pileId, endAt: pileId});
			this.store.find('like', {orderBy: 'pile', startAt: pileId, endAt: pileId});

		}
	}
});
