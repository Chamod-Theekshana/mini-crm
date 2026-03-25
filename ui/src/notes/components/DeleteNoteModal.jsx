import Button from '../../shared/ui/Button';
import Modal from '../../shared/ui/Modal';

const DeleteNoteModal = ({ open, note, onCancel, onConfirm, isLoading }) => {
  return (
    <Modal
      open={open}
      title="Delete note"
      onClose={onCancel}
      footer={[
        <Button key="cancel" variant="outline" onClick={onCancel}>
          Cancel
        </Button>,
        <Button key="delete" variant="danger" isLoading={isLoading} onClick={onConfirm}>
          Delete
        </Button>
      ]}
    >
      <p className="text-sm text-zinc-600">
        Are you sure you want to delete <span className="font-semibold text-zinc-900">{note?.title || 'this note'}</span>? This action cannot be undone.
      </p>
    </Modal>
  );
};

export default DeleteNoteModal;
