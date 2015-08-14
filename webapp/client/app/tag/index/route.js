import Ember from 'ember';

export default Ember.Route.extend({
	model(params){
		return this.store.find('tag', {orderBy: 'name', startAt: params.tag_name, endAt: params.tag_name});
	}
});
