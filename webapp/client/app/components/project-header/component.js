import Ember from 'ember';

export default Ember.Component.extend({

	imageService: Ember.inject.service('image'),

	backgroundImageStyle: Ember.computed('image', function(){

		return `background-image: url('${this.get('imageService').generatePath(this.get('image'),'project',400,this.get('imageHost'))}')`;
	}),
	actions: {
		toggleCreateProjectModal: function(){
			this.get('projectController').send('toggleCreateProjectModal');
		}
	}
});
