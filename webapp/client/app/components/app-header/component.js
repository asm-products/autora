import Ember from 'ember';
import InViewportMixin from 'ember-in-viewport';

export default Ember.Component.extend(InViewportMixin, {
    classNames: ['app-header'],
    tagName: 'header',
    showDropdown: false,
    action: 'toggleCreate',
    classNameBindings: ['viewportEntered:active:inactive'],

    didEnterViewport(){
        console.log('app header in viewport');
    },
    didExitViewport(){
        console.log('app header not in viewport');
    },
    didScroll(direction){
        console.log(direction);
    },

    viewportOptionsOverride: Ember.on('didInsertElement', function() {
        console.log('overriding viewport');
        Ember.setProperties(this, {
          viewportUseRAF: true,
          viewportSpy: true,
        });
      }),

    actions: {
    	// toggleDropdown(){
    	// 	console.log('clickity click?');
    	// 	this.toggleProperty('showDropdown');
    	// }

    	toggleCreate(){
    		this.sendAction();
    	}
    }
});
