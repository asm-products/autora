import Ember from 'ember';

export default Ember.Component.extend({
	classNames: ['inline-block'],
    didInsertElement(){
    	var self = this;
    	Ember.$(document).click(function(){
    		self.set('showDropdown', false);
    	});
    	Ember.$('.' + this.get('selectorClass')).click(function(e){
    		self.toggleProperty('showDropdown');
    		e.stopPropagation();
    	});
    },
    actions: {

    }
});
