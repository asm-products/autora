import Ember from 'ember';

export default Ember.Component.extend({
    entryContent: Ember.computed('model.content', function() {
        return new Ember.Handlebars.SafeString(this.get('model.content').replace(/\n/g, '<br>'));
    })
});
