import ModalDialog from 'ember-modal-dialog/components/modal-dialog';

export default ModalDialog.extend({
  containerClassNames: "modal-prototype",
  hasOverlay: true,
  
  targetAttachment: 'none',
  translucentOverlay: true,
  close: 'toggleCreateProjectModal'
});
