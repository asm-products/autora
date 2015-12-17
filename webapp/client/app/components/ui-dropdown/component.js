import Ember from 'ember';

const {$, run} = Ember;

export default Ember.Component.extend({

	classNames: ['inline-block','dropdown-container'],

    dropdownToggled(){

    },

    didInsertElement(){
	   $(document).click(() => {
            if(this.get('showDropdown')){
    		  this.set('showDropdown', false);

              this.dropdownToggled();

            }
        });
    	$('.' + this.get('selectorClass')).click(e => {
            this.dropdownToggled();
            console.log('click');
            this.toggleProperty('showDropdown');
    		e.stopPropagation();
    	});
            
    },
    actions: {

    }
});
