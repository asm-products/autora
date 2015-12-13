// app/initializers/custom-session.js
import Ember from 'ember';
import Session from 'simple-auth/session';

const {computed, isEmpty} = Ember;

export default Session.extend({

  user: computed('secure.user.uid', function(){
    var uid = this.get('secure.auth.uid');
    if (!isEmpty(uid)) {
      return this.container.lookup('store:main').find('user', uid);
    }
  })
});
