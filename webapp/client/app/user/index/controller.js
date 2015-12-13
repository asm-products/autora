import Ember from 'ember';

const {inject, computed} = Ember;

export default Ember.Controller.extend({

	imageService: inject.service('image'),
	coverPhoto: computed('model.cover', function () {
        return this.get('imageService').generatePath(this.get('model.cover'),'cover',1024,this.get('model.imageHost')) || '/images/cover.png';
    })
});
