import Ember from 'ember';
// import LoginControllerMixin from 'simple-auth/mixins/login-controller-mixin';

const {inject} = Ember;

export default Ember.Controller.extend({

	email: '',
	password: '',
    alert: '',
    isLoading: false,

    session: inject.service('session'),


	actions: {
        login() {
            // var self = this;
            this.set('isLoading', true);
            this.get('session').authenticate('authenticator:firebase', {
                'email': this.get('email'),
                'password': this.get('password')
            }).then(() => {
                // this.get('session').set('email', this.get('email'));
                this.transitionToRoute('home');
            }, error => {
                var alert = {};
                alert.type = 'danger';
                switch (error.code) {
                  case 'INVALID_EMAIL':
                    alert.message = 'The specified user account email is invalid.';
                    break;
                  case 'INVALID_PASSWORD':
                    alert.message = 'The specified user account password is incorrect.';
                    break;
                  case 'INVALID_USER':
                    alert.message = 'The specified user account does not exist.';
                    break;
                  default:
                    alert.message = 'Error logging user in: ' + error;
                }
                this.set('alert', alert);
                this.set('isLoading', false);
                });
            
        },
        logout() {
            this.get('session').invalidate().then(function() {
                this.transitionToRoute('user.login');
            }.bind(this));
        },

        transitionBack(){
            window.history.back();
        }
    }
});
