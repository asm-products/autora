import Ember from 'ember';

export default Ember.Route.extend({

	model(params){
		
		var query = {orderBy: 'name', startAt: params.tag_name, endAt: params.tag_name};
		return this.store.query('tag', query).then(function(model){
			return model.get('firstObject');
		});
	}
});
