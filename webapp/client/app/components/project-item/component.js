import Ember from 'ember';

export default Ember.Component.extend({
    classNames: ['project-item'],
    isClosed: Ember.computed.not('model.open'),
    classNameBindings: ['isClosed:closed']
});
