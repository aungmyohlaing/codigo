import React from "react";
import { Grid, Container, Typography } from "@material-ui/core";

export default function Checkout() {
  return (
    <React.Fragment>
      <Container maxWidth="md">
        <Grid item xs={12}>
          <Typography component="h2" variant="h6" color="primary" gutterBottom>
           Check Out
          </Typography>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Payment Method</TableCell>
                <TableCell>Payment Discount</TableCell>
                <TableCell>Expiry Date</TableCell>
                <TableCell align="right">Amount</TableCell>
                <TableCell align="right">Quantity</TableCell>               
              </TableRow>
            </TableHead>
            <TableBody></TableBody>
          </Table>
        </Grid>
      </Container>
    </React.Fragment>
  );
}
