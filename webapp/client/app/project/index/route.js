import Ember from 'ember';

export default Ember.Route.extend({
	model: function(params){
		return this.store.getById('project',params.project_id);
	}
});
