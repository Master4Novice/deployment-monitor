import React, { useState } from 'react';
import { Container, Typography, Box } from '@mui/material';
import DeploymentForm from './components/DeploymentForm';
import DeploymentTable from './components/DeploymentTable';

function App() {
  const [deploymentData, setDeploymentData] = useState([]);
  const [isLocked, setIsLocked] = useState(false);

  const handleFormSubmit = (data) => {
    setDeploymentData(data);
    setIsLocked(true);
  };

  const handleStatusUpdate = (updatedData) => {
    setDeploymentData(updatedData);
  };

  return (
    <Container>
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Deployment Support
        </Typography>
        {!isLocked && <DeploymentForm onSubmit={handleFormSubmit} />}
        {isLocked && (
          <DeploymentTable 
            deploymentData={deploymentData} 
            onStatusUpdate={handleStatusUpdate} 
          />
        )}
      </Box>
    </Container>
  );
}

export default App;
