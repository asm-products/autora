import Ember from 'ember';

const {inject} = Ember;

export default Ember.Component.extend({

    classNames: ['app-header'],
    tagName: 'header',
    showDropdown: false,
    action: 'toggleCreate',

	session: inject.service('session'),

    actions: {

    	toggleCreate(){
    		this.sendAction();
    	}
    }
});
