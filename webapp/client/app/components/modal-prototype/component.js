import ModalDialog from 'ember-modal-dialog/components/modal-dialog';

export default ModalDialog.extend({
  containerClassNames: "modal-prototype",
  hasOverlay: true,
  // renderInPlace: true,
  alignment: 'none',
  attachement: 'none',
  targetAttachement: 'none',
  translucentOverlay: true,
  close: 'toggleCreateProjectModal'
});
