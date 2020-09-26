import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CancelIcon from '@material-ui/icons/Cancel';
import Button from "@material-ui/core/Button";

export default function Modal(props) {
  const { open, handleClose, title, message, status } = props;

  const StatusIcons = (props) => {   
    if (props.status === 'success')
    {
      return(
        <CheckCircleIcon
              style={{ color: "green", fontSize: "40px"}}
            />
      )
    } else {
      return(
        <CancelIcon  style={{ color: "red", fontSize: "40px"}} />
      )
    }
    
  }
  return (
    <div>
      <Dialog
        onClose={handleClose}
        aria-labelledby="simple-dialog-title"
        open={open}
        maxWidth="lg"
        style={{ textAlign: "center" }}
      >
        <DialogContent dividers>
          <div style={{ width: "250px" }}>
            <StatusIcons status={status} />
            <h1>{title}</h1>
            <p style={{ color: 'gray', fontWeight: '300' }}>
              {message.split('\\n').map((item, key) => {
                  return <span key={key}>{item}<br/></span>
              })}
            </p>
          </div>
        </DialogContent>

        <DialogActions >
          <Button color="secondary" onClick={handleClose} style={{ marginLeft: 'auto', marginRight: 'auto' }}>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
