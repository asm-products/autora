import Ember from 'ember';

export default Ember.Route.extend({
	
	beforeModel() {
		this.get('session').invalidate();
	
	}
});
