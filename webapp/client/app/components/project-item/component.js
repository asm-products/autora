import Ember from 'ember';

export default Ember.Component.extend({
    classNames: ['project-item'],
    isClosed: Ember.computed.not('model.open'),
    classNameBindings: ['isClosed:closed'],
    imageUrl: Ember.computed('model.image', function(){
    	return this.get('model.imageHost') + 'project/.w400.' + this.get('model.image');
    })
});
