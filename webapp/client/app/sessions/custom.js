// app/initializers/custom-session.js
import Ember from 'ember';
import Session from 'simple-auth/session';

export default Session.extend({
  user: function() {
    var uid = this.get('secure.auth.uid');
    console.log('uid:');
    console.log(uid);
    if (!Ember.isEmpty(uid)) {
      return this.container.lookup('store:main').find('user', uid);
    }
  }.property('secure.user.uid')
});
