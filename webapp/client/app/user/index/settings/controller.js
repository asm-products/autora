import Ember from 'ember';
import config from '../../../config/environment';
import Firebase from 'firebase';

export default Ember.Controller.extend({
	oldPassword: '',
	newPassword: '',
	changePasswordAlert: {},
	changePasswordLoading: false,

	newEmail: '',
	passwordForEmail: '',
	changeEmailAlert: {},
	changeEmailLoading: false,

	actions: {
		userPhotoUploadDone(file){
			this.set('session.user.photo', file);
			this.get('session.user.content').save();
		},
		coverPhotoUploadDone(file){
			this.set('session.user.cover', file);
			this.get('session.user.content').save();
		},
		changePassword(){
				var self = this;
				self.set('changePasswordLoading', true);
				var ref = new Firebase(config.firebase);
				ref.changePassword({
					email: this.get('session.user.email'),
					oldPassword: this.get('oldPassword'),
					newPassword: this.get('newPassword'),
				}, function(error){
					self.setProperties({changePasswordLoading: false, oldPassword: '', newPassword: ''});
					if (error) {
					    switch (error.code) {
					      case "INVALID_PASSWORD":
					       		self.set('changePasswordAlert.message','The specified user account password is incorrect.');
					       		self.set('changePasswordAlert.type','danger');
					        break;
					      case "INVALID_USER":
						        self.set('changePasswordAlert.message','The specified user account does not exist.');
						       	self.set('changePasswordAlert.type','danger');
					        break;
					      default:
					        	self.set('changePasswordAlert.message','Error changing password:', error);
						       	self.set('changePasswordAlert.type','danger');

					    }
					  } else {
					    self.set('changePasswordAlert.message','User password changed successfully!');
						self.set('changePasswordAlert.type','success');

					  }
				});
		},
		changeEmail(){
			var self = this;
			self.set('changeEmailLoading', true);
			var ref = new Firebase(config.firebase);
			var newEmail = this.get('newEmail');
			ref.changeEmail({
			  oldEmail: this.get('session.user.email'),
			  newEmail: newEmail,
			  password: this.get('passwordForEmail'),
			}, function(error) {
			  self.setProperties({changeEmailLoading: false, passwordForEmail: '', newEmail: ''});
			  if (error) {
			    switch (error.code) {
			      case "INVALID_PASSWORD":
			        self.set('changeEmailAlert.message', 'The specified user account password is incorrect.');
			        self.set('changeEmailAlert.type', 'danger');
			        break;
			      case "INVALID_USER":
			        self.set('changeEmailAlert.message', 'The specified user account does not exist.');
			        self.set('changeEmailAlert.type', 'danger');

			        break;
			      default:
			        self.set('changeEmailAlert.message', 'Error changing email:', error);
			        self.set('changeEmailAlert.type', 'danger');

			    }
			  } else {
			  	var currentUser = self.get('session.user');
			  	currentUser.set('email', newEmail);
			  	self.set('changeEmailLoading', true);
			  	currentUser.get('content').save().then(function(){
			  		self.set('changeEmailLoading',false);
				    self.set('changeEmailAlert.message', 'User email changed successfully!');
				    self.set('changeEmailAlert.type', 'success');
			  	}, function(error){
			  		self.set('changeEmailLoading',false);
				    self.set('changeEmailAlert.message', 'There has been trouble saving the new email address. Please contact us! Error: '+error);
				    self.set('changeEmailAlert.type', 'danger');
			  	});

			  }
			});
		}
	}
});
