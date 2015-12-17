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
            }).then(function(){
                // this.get('session').set('email', this.get('email'));
            }, function(){});
            
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
