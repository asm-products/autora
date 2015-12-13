import Ember from 'ember';

const {inject, computed} = Ember;

export default Ember.Component.extend({

	imageService: inject.service('image'),
	
	imageUrl: computed('model.image', function(){
    	return this.get('imageService').generatePath(this.get('model.image'),'project',400,this.get('model.imageHost'));
    })
});
