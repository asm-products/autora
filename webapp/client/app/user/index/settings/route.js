// import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';
// the simple auth mixin does not work, so I created a simple one
import AuthOnly from 'client/mixins/auth-only';

import Ember from 'ember';

export default Ember.Route.extend(AuthOnly, {
	
});
