import Ember from 'ember';

export default Ember.Component.extend({
	backgroundImageStyle: Ember.computed('model.image', function(){
		return 'background-image: url("' + this.get('imageHost') + 'project/.w400.' + this.get('image') + '")';
	}),
	actions: {
		toggleCreateProjectModal: function(){
			this.get('projectController').send('toggleCreateProjectModal');
		}
	}
});
