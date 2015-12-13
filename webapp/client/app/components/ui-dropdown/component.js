import Ember from 'ember';

const {$} = Ember;

export default Ember.Component.extend({

	classNames: ['inline-block','dropdown-container'],
    didInsertElement(){
    	var self = this;
        
    	Ember.$(document).click(function(){
            if(self.isVisible){
    		  self.set('showDropdown', false);
            }
    	});

    	$('.' + this.get('selectorClass')).click(function(e){
    		self.toggleProperty('showDropdown');
    		e.stopPropagation();
    	});
    },
    actions: {

    }
});
