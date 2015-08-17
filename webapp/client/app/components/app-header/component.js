import Ember from 'ember';

export default Ember.Component.extend({
    classNames: ['app-header'],
    tagName: 'header',
    showDropdown: false,

    didInsertElement(){
    	var self = this;
    	Ember.$(document).click(function(){
    		self.set('showDropdown', false);
    	});
    	Ember.$('.toggleDropdown').click(function(e){
    		console.log('click?');
    		self.toggleProperty('showDropdown');
    		e.stopPropagation();
    	});
    },

    actions: {
    	// toggleDropdown(){
    	// 	console.log('clickity click?');
    	// 	this.toggleProperty('showDropdown');
    	// }
    }
});
