import Ember from 'ember';

export default Ember.Component.extend({

    classNames: ['app-header'],
    tagName: 'header',
    showDropdown: false,
    action: 'toggleCreate',

    actions: {

    	toggleCreate(){
    		this.sendAction();
    	}
    }
});
