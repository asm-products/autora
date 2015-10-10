import Ember from 'ember';

export default Ember.Component.extend({
	imageUrl: Ember.computed('model.image', function(){
    	return this.get('model.imageHost') + 'project/.400w.' + this.get('model.image');
    })
});
