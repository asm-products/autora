import Ember from 'ember';

export default Ember.Component.extend({
    classNames: ['user-photo'],
    imageService: Ember.inject.service('image'),
    imageUrl: Ember.computed('model.image', function(){
    	return this.get('imageService').generateImagePath(this.get('model.image'),'user',400,this.get('model.imageHost'));
    })
});
