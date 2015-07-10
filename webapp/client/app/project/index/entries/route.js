import Ember from 'ember';

export default Ember.Route.extend({
	model: function(){
		//Query language: https://www.firebase.com/docs/web/libraries/ember/api.html
		var model = this.store.find('pile', {limitToLast: 1, orderBy: 'createdAt'});
		return model;
	}
});
