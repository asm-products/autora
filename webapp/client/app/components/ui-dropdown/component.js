import Ember from 'ember';

export default Ember.Component.extend({
	classNames: ['inline-block','dropdown-container'],
    didInsertElement(){
    	var self = this;
    	Ember.$(document).click(function(){
            // console.log(self);
            if(self.isVisible){
    		  self.set('showDropdown', false);
            }
    	});
    	Ember.$('.' + this.get('selectorClass')).click(function(e){
    		self.toggleProperty('showDropdown');
    		e.stopPropagation();
    	});
    },
    actions: {

    }
});
