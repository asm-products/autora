import Ember from 'ember';

// Detailed view for entry
// Meta information about entry
// Delete, edit actions

export default Ember.Route.extend({
	
	model(params){
		return this.store.find('entry', params.entry_id);
	}
});
