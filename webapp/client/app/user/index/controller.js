import Ember from 'ember';

export default Ember.Controller.extend({
	imageService: Ember.inject.service('image'),
	coverPhoto: Ember.computed('model.cover', function () {
        return this.get('imageService').generateImagePath(this.get('model.image'),'cover',1024,this.get('model.imageHost')) || 'https://pbs.twimg.com/profile_banners/2870366753/1422565411/1500x500';
    })
});
