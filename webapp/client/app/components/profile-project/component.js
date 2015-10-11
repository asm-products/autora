import Ember from 'ember';

export default Ember.Component.extend({
	imageService: Ember.inject.service('image'),
	imageUrl: Ember.computed('model.image', function(){
    	return this.get('imageService').generatePath(this.get('model.image'),'project',400,this.get('model.imageHost'));
    })
});
