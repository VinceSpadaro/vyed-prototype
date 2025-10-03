import React, { useState } from 'react';
import styled from 'styled-components';

const GateContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  font-family: Arial, sans-serif;
`;

const GateCard = styled.div`
  background: white;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  max-width: 400px;
  width: 90%;
`;

const Title = styled.h1`
  margin: 0 0 10px 0;
  color: #333;
  font-size: 28px;
  text-align: center;
`;

const Subtitle = styled.p`
  margin: 0 0 30px 0;
  color: #666;
  font-size: 14px;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  color: #333;
  font-size: 14px;
  font-weight: 600;
`;

const Input = styled.input`
  padding: 12px 16px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 0.3s;

  &:focus {
    outline: none;
    border-color: #667eea;
  }

  &.error {
    border-color: #e74c3c;
  }
`;

const ErrorMessage = styled.p`
  color: #e74c3c;
  font-size: 14px;
  margin: 0;
  text-align: center;
`;

const Button = styled.button`
  padding: 14px 24px;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: #5568d3;
  }

  &:active {
    transform: scale(0.98);
  }
`;

const InfoText = styled.p`
  margin: 20px 0 0 0;
  padding-top: 20px;
  border-top: 1px solid #e0e0e0;
  color: #999;
  font-size: 12px;
  text-align: center;
`;

const PasswordGate = ({ onAuthenticated }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (password === 'attendance') {
      // Store authentication in sessionStorage
      sessionStorage.setItem('vyed_authenticated', 'true');
      onAuthenticated();
    } else {
      setError('Incorrect password. Please try again.');
      setPassword('');
    }
  };

  return (
    <GateContainer>
      <GateCard>
        <Title>VYED Prototype</Title>
        <Subtitle>School Attendance Dashboard</Subtitle>
        
        <Form onSubmit={handleSubmit}>
          <InputGroup>
            <Label htmlFor="password">Enter Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError('');
              }}
              className={error ? 'error' : ''}
              placeholder="Enter password to continue"
              autoFocus
            />
          </InputGroup>
          
          {error && <ErrorMessage>{error}</ErrorMessage>}
          
          <Button type="submit">Access Prototype</Button>
        </Form>
        
        <InfoText>
          This is a password-protected prototype for usability testing purposes.
        </InfoText>
      </GateCard>
    </GateContainer>
  );
};

export default PasswordGate;
