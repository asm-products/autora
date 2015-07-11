import Ember from 'ember';
// import LoginControllerMixin from 'simple-auth/mixins/login-controller-mixin';

export default Ember.Controller.extend({

	email: '',
	password: '',
    alert: '',

	actions: {
        login: function() {
            // var self = this;
            this.get('session').authenticate('authenticator:firebase', {
                'email': this.get('email'),
                'password': this.get('password')
            }).then(function() {
                this.transitionToRoute('user.welcome');
            }.bind(this), function(error){
                var alertMessage = error;
                 switch (error.code) {
                    case "INVALID_EMAIL":
                        alertMessage = "Invalid email address!";
                        break;
                    case "INVALID_PASSWORD":
                        alertMessage = "Either the password or email address is not correct.";
                        break;
                    case "INVALID_USER":
                        alertMessage = "Either the password or email address is not correct.";
                        break;
                }
                this.set('alert', alertMessage);
            }.bind(this));
            
        },
        logout: function() {
            this.get('session').invalidate().then(function() {
                this.transitionToRoute('user.login');
            }.bind(this));
        }
    }
});
