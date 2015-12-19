import Ember from 'ember';

const {$, computed, inject} = Ember;

export default Ember.Component.extend({
    elementId: 'app',
    classNameBindings: ['showNotifications:pushed'],

    notificationBox: null,
    showNotifications: computed.alias('notificationBox.showNotifications'),
    // application: inject.controller('application'),

    didInsertElement(){
    	// console.log(this.get('childViews'));
    	this.set('notificationBox', this.get('childViews')[0]);
    	$('body').removeClass('au-loading');
    	$('.loading-quote').remove();
    }
});
