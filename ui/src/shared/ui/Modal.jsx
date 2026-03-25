import { useEffect } from 'react';

const Modal = ({ open, title, children, onClose, footer }) => {
  useEffect(() => {
    if (!open) {
      return undefined;
    }

    const onEsc = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', onEsc);
    return () => document.removeEventListener('keydown', onEsc);
  }, [open, onClose]);

  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-md rounded-card bg-white p-5 shadow-2xl">
        <div className="mb-4 flex items-start justify-between">
          <h3 className="font-display text-xl font-semibold text-venture-ink">{title}</h3>
          <button type="button" onClick={onClose} className="text-zinc-400 hover:text-zinc-600">
            x
          </button>
        </div>
        <div>{children}</div>
        {footer ? <div className="mt-5 flex justify-end gap-3">{footer}</div> : null}
      </div>
    </div>
  );
};

export default Modal;
