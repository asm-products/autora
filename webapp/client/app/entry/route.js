import Ember from 'ember';

// Detailed view for entry
// Meta information about entry
// Delete, edit actions

export default Ember.Route.extend({
	model: function(params){
		return params.entry_id;
	}
});
