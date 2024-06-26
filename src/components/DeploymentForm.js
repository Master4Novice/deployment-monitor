// src/components/DeploymentForm.js
import React, { useState } from 'react';
import { TextField, Button, Grid, Paper, Box, IconButton, Typography } from '@mui/material';
import { Add, Delete } from '@mui/icons-material';

const DeploymentForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    releaseVersion: '',
    releaseDate: '',
    releaseSupportPersons: [''],
    repositories: [{ name: '', branch: '', sequence: 1 }],
    deployedBy: '',
    tickets: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handlePersonChange = (index, value) => {
    const newPersons = [...formData.releaseSupportPersons];
    newPersons[index] = value;
    setFormData({
      ...formData,
      releaseSupportPersons: newPersons
    });
  };

  const handleRepoChange = (index, field, value) => {
    const newRepositories = [...formData.repositories];
    newRepositories[index] = { ...newRepositories[index], [field]: value };
    setFormData({
      ...formData,
      repositories: newRepositories
    });
  };

  const addPerson = () => {
    setFormData({
      ...formData,
      releaseSupportPersons: [...formData.releaseSupportPersons, '']
    });
  };

  const removePerson = (index) => {
    const newPersons = formData.releaseSupportPersons.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      releaseSupportPersons: newPersons
    });
  };

  const addRepository = () => {
    setFormData({
      ...formData,
      repositories: [...formData.repositories, { name: '', branch: '', sequence: formData.repositories.length + 1 }]
    });
  };

  const removeRepository = (index) => {
    const newRepositories = formData.repositories.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      repositories: newRepositories.map((repo, idx) => ({ ...repo, sequence: idx + 1 }))
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = formData.repositories.map((repo) => ({
      ...formData,
      repository: repo.name,
      releaseBranch: repo.branch,
      sequence: repo.sequence,
      status: 'Pending',
      workedBy: '',
      updatedDateTime: new Date().toLocaleString(),
    }));
    onSubmit(data.sort((a, b) => a.sequence - b.sequence)); // Sort by sequence
  };

  return (
    <Paper sx={{ padding: 3 }}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Release Version"
              name="releaseVersion"
              value={formData.releaseVersion}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Release Date"
              name="releaseDate"
              type="date"
              value={formData.releaseDate}
              onChange={handleChange}
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">Release Support Persons</Typography>
            {formData.releaseSupportPersons.map((person, index) => (
              <Box key={index} display="flex" alignItems="center" mb={2}>
                <TextField
                  label={`Person ${index + 1}`}
                  value={person}
                  onChange={(e) => handlePersonChange(index, e.target.value)}
                  fullWidth
                  required
                />
                <IconButton onClick={() => removePerson(index)}>
                  <Delete />
                </IconButton>
              </Box>
            ))}
            <Button variant="contained" onClick={addPerson} startIcon={<Add />}>
              Add Person
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">Repositories</Typography>
            {formData.repositories.map((repo, index) => (
              <Box key={index} display="flex" alignItems="center" mb={2}>
                <TextField
                  label={`Repository ${index + 1}`}
                  value={repo.name}
                  onChange={(e) => handleRepoChange(index, 'name', e.target.value)}
                  fullWidth
                  required
                />
                <TextField
                  label="Branch"
                  value={repo.branch}
                  onChange={(e) => handleRepoChange(index, 'branch', e.target.value)}
                  fullWidth
                  required
                />
                <TextField
                  label="Sequence"
                  type="number"
                  value={repo.sequence}
                  onChange={(e) => handleRepoChange(index, 'sequence', e.target.value)}
                  fullWidth
                  required
                />
                <IconButton onClick={() => removeRepository(index)}>
                  <Delete />
                </IconButton>
              </Box>
            ))}
            <Button variant="contained" onClick={addRepository} startIcon={<Add />}>
              Add Repository
            </Button>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Person Deploying"
              name="deployedBy"
              value={formData.deployedBy}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Tickets"
              name="tickets"
              value={formData.tickets}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Box mt={2}>
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Submit
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default DeploymentForm;