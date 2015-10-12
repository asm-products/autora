import Ember from 'ember';

export default Ember.Component.extend({
    classNames: ['user-photo'],
    imageService: Ember.inject.service('image'),
    imageUrl: Ember.computed('user.photo', function(){
    	return this.get('imageService').generatePath(this.get('user.photo'),'user',400);
    })
});
