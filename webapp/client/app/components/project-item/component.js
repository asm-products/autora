import Ember from 'ember';

export default Ember.Component.extend({

    classNames: ['project-item'],
    isClosed: Ember.computed.not('model.open'),
    classNameBindings: ['isClosed:closed'],
    imageService: Ember.inject.service('image'),
    
    imageUrl: Ember.computed('model.image', function(){
    	return this.get('imageService').generatePath(this.get('model.image'),'project',400,this.get('model.imageHost'));
    })
});
