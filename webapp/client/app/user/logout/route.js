import Ember from 'ember';

const {inject} = Ember;

export default Ember.Route.extend({

	session: inject.service('session'),

	
	beforeModel() {
		this.get('session').invalidate();
	
	}
});
