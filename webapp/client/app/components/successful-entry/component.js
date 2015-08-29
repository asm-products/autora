import Ember from 'ember';

export default Ember.Component.extend({
    entryContent: Ember.computed('model.content', function() {
        var entry = this.get('model.content') || '';
        return new Ember.Handlebars.SafeString(entry.replace(/\n/g, '<br>'));
    })
});
