import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

type OfferProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => Promise<void>;
};

export const OfferTariff = ({ isOpen, onClose, onSubmit }: OfferProps) => {
  return (
    <Dialog open={isOpen} onClose={onClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
      <DialogTitle id="alert-dialog-title">Ошибка :(</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">Для продолжения необходимо повысить тариф.</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Закрыть</Button>
        <Button
          onClick={() => {
            onSubmit();
            onClose();
          }}
          autoFocus
        >
          Повысить
        </Button>
      </DialogActions>
    </Dialog>
  );
};
