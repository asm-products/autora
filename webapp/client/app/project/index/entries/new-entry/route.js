import Ember from 'ember';
import AuthOnly from 'client/mixins/auth-only';


export default Ember.Route.extend(AuthOnly,{

	/*
>>>>>>> d289f353283118d374d932a1a3cdbd50af6b32a4
	model: function(){
		//currently returns latest pile globally, should return last pile from a particular project
		var model = this.modelFor('project.index.entries');

		return model;
		// return this.modelFor('project.index.entries');
	},
	*/

	afterModel: function(model){
		if(model.get('length') === 0){
			this.transitionTo('project.index.entries');
		}
	}
});
