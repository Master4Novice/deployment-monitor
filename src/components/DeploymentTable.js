// src/components/DeploymentTable.js
import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Select, MenuItem, Button, TextField, Box } from '@mui/material';

const DeploymentTable = ({ deploymentData, onStatusUpdate }) => {
  const [tableData, setTableData] = useState(deploymentData);
  const [personUpdating, setPersonUpdating] = useState('');

  const handleStatusChange = (e, index) => {
    const updatedStatus = e.target.value;
    const updatedData = tableData.map((item, idx) =>
      idx === index ? { ...item, status: updatedStatus, workedBy: personUpdating, updatedDateTime: new Date().toLocaleString() } : item
    );
    setTableData(updatedData);
  };

  const handlePersonChange = (e) => {
    setPersonUpdating(e.target.value);
  };

  const handleSave = () => {
    onStatusUpdate(tableData);
  };

  return (
    <Paper>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Repository Name</TableCell>
              <TableCell>Ticket</TableCell>
              <TableCell>Release Branch</TableCell>
              <TableCell>Sequence</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Worked By</TableCell>
              <TableCell>Updated Date Time</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.repository}</TableCell>
                <TableCell>{row.tickets}</TableCell>
                <TableCell>{row.releaseBranch}</TableCell>
                <TableCell>{row.sequence}</TableCell>
                <TableCell>
                  <Select
                    value={row.status}
                    onChange={(e) => handleStatusChange(e, index)}
                    disabled={index > 0 && tableData[index - 1].status !== 'Deployed'} // Ensure sequence order
                  >
                    <MenuItem value="Pending">Pending</MenuItem>
                    <MenuItem value="In Progress">In Progress</MenuItem>
                    <MenuItem value="Deployed">Deployed</MenuItem>
                  </Select>
                </TableCell>
                <TableCell>{row.workedBy}</TableCell>
                <TableCell>{row.updatedDateTime}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box p={2}>
        <TextField
          label="Person Updating Status"
          value={personUpdating}
          onChange={handlePersonChange}
          fullWidth
          required
        />
        <Box mt={2}>
          <Button variant="contained" color="primary" onClick={handleSave}>
            Save Updates
          </Button>
        </Box>
     </Box>
     </Paper>
  );
}

export default DeploymentTable;