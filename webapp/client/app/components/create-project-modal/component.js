import Ember from 'ember';
import ModalDialog from 'ember-modal-dialog/components/modal-dialog';

export default ModalDialog.extend({
  containerClassNames: "create-project-modal",
  hasOverlay: true,
  // renderInPlace: true,
  alignment: 'none',
  translucentOverlay: true,
  close: 'toggleCreateProjectModal',
});
