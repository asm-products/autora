import DS from 'ember-data';

export default DS.Transform.extend({
    serialize(date) {
        return date;
    },

    deserialize(serialized) {
    return serialized;
  }
});
