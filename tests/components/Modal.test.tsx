import { render, screen, fireEvent } from '@testing-library/react';
import Modal from '@/components/modal/modal';

describe('Modal Component', () => {
  it('does not render when isOpen is false', () => {
    render(
      <Modal isOpen={false} onClose={jest.fn()}>
        <p>Modal Content</p>
      </Modal>
    );
    expect(screen.queryByText('Modal Content')).not.toBeInTheDocument();
  });

  it('renders children when isOpen is true', () => {
    render(
      <Modal isOpen={true} onClose={jest.fn()}>
        <p>Modal Content</p>
      </Modal>
    );
    expect(screen.getByText('Modal Content')).toBeInTheDocument();
  });

  it('calls onClose when overlay is clicked', () => {
    const handleClose = jest.fn();
    render(
      <Modal isOpen={true} onClose={handleClose}>
        <p>Modal Content</p>
      </Modal>
    );
    fireEvent.click(screen.getByRole('dialog'));
    expect(handleClose).toHaveBeenCalled();
  });

  it('does not close when modal content is clicked', () => {
    const handleClose = jest.fn();
    render(
      <Modal isOpen={true} onClose={handleClose}>
        <div data-testid="modal-inner">Inside</div>
      </Modal>
    );

    fireEvent.click(screen.getByTestId('modal-inner'));
    expect(handleClose).not.toHaveBeenCalled();
  });

  it('calls onClose when close button is clicked', () => {
    const handleClose = jest.fn();
    render(
      <Modal isOpen={true} onClose={handleClose}>
        <p>Close me</p>
      </Modal>
    );
    fireEvent.click(screen.getByText('×'));
    expect(handleClose).toHaveBeenCalled();
  });
});
