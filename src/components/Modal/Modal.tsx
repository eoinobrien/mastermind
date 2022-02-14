import classnames from 'classnames';
import { IconButton } from 'components/IconButton';
import { ReactNode, MouseEvent, useCallback, useEffect } from 'react';
import { BsX } from 'react-icons/bs';
import styles from './Modal.module.css';

interface ModalProps {
  header: string;
  children: ReactNode;
  onDismiss: () => void;
}

export const Modal = ({
  header,
  children,
  onDismiss,
}: ModalProps) => {
  var modalClasses = classnames(styles.modal, {
    [styles.show]: true,
  });

  const escFunction = useCallback((event) => {
    if (event.keyCode === 27) {
      onDismiss();
    }
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', escFunction);

    return () => {
      document.removeEventListener('keydown', escFunction);
    };
  }, [escFunction]);

  const onModalBackgroundClick = (e: MouseEvent<HTMLDivElement>): void => {
    e.preventDefault();
    e.stopPropagation();
    if (e.target === e.currentTarget) {
      onDismiss();
    }
  };

  const onCloseModalClick = (e: MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    e.stopPropagation();
    onDismiss();
  };

  return (
    <div className={modalClasses} onClick={onModalBackgroundClick}>
      <div className={styles.modalContent}>
        <div className={styles.header}>
          <h1>{header}</h1>
          <IconButton Icon={BsX} onClick={onCloseModalClick} />
        </div>
        {children}
      </div>
    </div>
  );
};
