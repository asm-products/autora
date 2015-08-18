import Ember from 'ember';

export default Ember.View.extend({
    elementId: 'app',
    didInsertElement(){
    	$('body').removeClass('au-loading');
    }
});
