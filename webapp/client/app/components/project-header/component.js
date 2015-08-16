import Ember from 'ember';

export default Ember.Component.extend({
	actions: {
		toggleCreateProjectModal: function(){
			this.get('projectController').send('toggleCreateProjectModal');
		}
	}
});
