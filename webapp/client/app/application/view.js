import Ember from 'ember';

export default Ember.View.extend({
    elementId: 'app',
    didInsertElement(){
    	Ember.$('body').removeClass('au-loading');
    	Ember.$('.loading-quote').remove();
    }
});
