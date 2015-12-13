import Ember from 'ember';

const {$} = Ember;

export default Ember.View.extend({
    elementId: 'app',
    didInsertElement(){
    	$('body').removeClass('au-loading');
    	$('.loading-quote').remove();
    }
});
