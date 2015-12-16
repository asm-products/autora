import Ember from 'ember';

const {$} = Ember;

export default Ember.Component.extend({
    elementId: 'app',
    didInsertElement(){
    	$('body').removeClass('au-loading');
    	$('.loading-quote').remove();
    }
});
