import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Container = styled.div`
  font-family: Arial, sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 80vh;
`;

const Title = styled.h1`
  font-size: 36px;
  margin-bottom: 40px;
  text-align: center;
`;

const Card = styled(Link)`
  background-color: #f8f8f8;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 30px;
  margin-bottom: 20px;
  width: 100%;
  max-width: 500px;
  text-decoration: none;
  color: inherit;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: #e8e8e8;
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  }
`;

const CardTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 10px;
  color: #1d70b8;
  text-align: center;
`;

const CardDescription = styled.p`
  font-size: 16px;
  text-align: center;
  margin-bottom: 0;
`;

const IndexPage = () => {
  return (
    <Container>
      <Title>View your education data (VYED)</Title>
      <Card to="/insights">
        <CardTitle>View school attendance data</CardTitle>
        <CardDescription>
          View attendance data and insights for your school, pupil groups and individual
        </CardDescription>
      </Card>
      <Card to="/reports">
        <CardTitle>Your attendance summary reports</CardTitle>
        <CardDescription>
          Download a Word document report of your school's attendance. New reports are added termly and half-termly.
        </CardDescription>
      </Card>
      <Card to="/compare">
        <CardTitle>Compare your attendance</CardTitle>
        <CardDescription>
          Use this tool to compare your attendance with other schools (mainstream primary and secondary schools only)
        </CardDescription>
      </Card>
    </Container>
  );
};

export default IndexPage;
