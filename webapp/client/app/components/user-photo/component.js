import Ember from 'ember';

export default Ember.Component.extend({
    classNames: ['user-photo'],
    imageService: Ember.inject.service('image'),
    placeholderUrl: 'http://app.autora.ink/images/profile.png',
    imageUrl: Ember.computed('user.photo', function(){
    	return this.get('imageService').generatePath(this.get('user.photo'),'user',400);
    }),
    isLoading: false,
    classNameBindings: ['isLoading'],
    didInsertElement(){
    	// var self = this;
    	// self.set('isLoading', true);
    	// var img = $(this.$().find('img')[0]);
    	// console.log(img);
    	// Ember.run.schedule('afterRender', function(){

	    // 	img.one('load', function(){
	    // 		console.log('is not loading anymore');
	    // 		self.set('isLoading', false);
	    // 	});
    		
    	// });
    }
});
