import Ember from 'ember';

export default Ember.Component.extend({
	actions: {
		toggleCreateProjectModal: function(){
			console.log(this.get('projectController'));
			this.get('projectController').send('toggleCreateProjectModal');
		}
	}
});
