import Ember from 'ember';

const {$, computed} = Ember;

export default Ember.Component.extend({
    elementId: 'app',
    classNameBindings: ['showNotifications:pushed'],

    showNotifications: false,

    didInsertElement(){
    	$('body').removeClass('au-loading');
    	$('.loading-quote').remove();
    }
});
