import Ember from 'ember';
import AuthOnly from 'client/mixins/auth-only';


export default Ember.Route.extend(AuthOnly,{

	afterModel(model){
		if(model.get('length') === 0){
			this.transitionTo('project.index.entries');
		}
	}
});
