import Ember from 'ember';

export default Ember.Component.extend({
	classNames: ['inline-block'],
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

    }
});
