import Ember from 'ember';

export default Ember.Route.extend({
	model: function(params){
		return this.store.find('project',params.project_id);
	},

	afterModel: function(){
		// there seems to be a bug in EmberFire, relationship does not seem to be forming properly with hasMany.
		// this is a temporary hack to get it work
		// var userId = model.get('user.id'); // user.id is fetchable, yet user.email is not

		// // this.store.find('user', userId).then(function(user){
		// // 	model.set('user', user);
		// // });
		// console.log(userId);
		// console.log(model.get('user.email'));

	}
});
