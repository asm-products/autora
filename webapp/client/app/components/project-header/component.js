import Ember from 'ember';

const {inject, computed} = Ember;

export default Ember.Component.extend({

	imageService: inject.service('image'),
	

	backgroundImageStyle: computed('image', function(){

		return `background-image: url('${this.get('imageService').generatePath(this.get('image'),'project',400,this.get('imageHost'))}')`;
	}),
	actions: {
		toggleCreateProjectModal: function(){
			this.get('projectController').send('toggleCreateProjectModal');
		}
	}
});
