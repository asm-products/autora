import Ember from 'ember';

export default Ember.Controller.extend({
	imageService: Ember.inject.service('image'),
	coverPhoto: Ember.computed('model.cover', function () {
		console.log(this.get('model.cover'),this.get('model.imageHost'));
        return this.get('imageService').generatePath(this.get('model.cover'),'cover',1024,this.get('model.imageHost')) || '/images/cover.png';
    })
});
