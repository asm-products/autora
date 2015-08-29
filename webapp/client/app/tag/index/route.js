import Ember from 'ember';

export default Ember.Route.extend({
	model(params){
		var query = {orderBy: 'name', startAt: params.tag_name, endAt: params.tag_name};
		console.log(query);
		return this.store.query('tag', query).then(function(model){
			return model.get('firstObject');
		});
	},
	// afterModel(model){
	// 	// console.log(model);
	// 	// model = model.get('firstObject');
	// }
});
