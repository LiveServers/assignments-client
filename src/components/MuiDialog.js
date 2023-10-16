import React from "react";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Grid, TextField, Typography } from "@mui/material";

const MuiDialog = ({open, handleClose, body,title,leftBtnTitle, rightBtnTitle,handleNext, input, number, setNumber}) => {
  const [inputError, setInputError] = React.useState(false);

  const handleChange = (e) => {
    setNumber(e.target.value);
  }
    return (
        <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {
              input ? (
                <>
                  <Grid container direction="row" alignItems="center" justifyContent="center" wrap="nowrap">
                    <Typography variant="body1">254</Typography>
                    <TextField sx={{"& input":{color: "#000"},"& p":{color: "red"}}} onChange={handleChange} placeholder="710828919" name="number" type="text" helperText={inputError && "Please enter a valid number"} value={number} />
                  </Grid>
                </>
              ):(
                <>
                  {body}
                </>
              )
            }
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>{leftBtnTitle}</Button>
          <Button onClick={handleNext} autoFocus>
            {rightBtnTitle}
          </Button>
        </DialogActions>
      </Dialog>
    )
}

export default MuiDialog;