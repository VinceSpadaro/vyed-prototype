import React from 'react';
import styled from 'styled-components';
import PageLayout from '../Dashboard/PageLayout';

// Page layout is handled by PageLayout component

const FeedbackContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;

const FeedbackCard = styled.div`
  width: 100%;
  max-width: 800px;
  background-color: #e5f5f5;
  border-radius: 5px;
  overflow: hidden;
`;

const CardHeader = styled.div`
  background-color: #1d8a8a;
  padding: 40px;
  position: relative;
`;

const CardTitle = styled.h2`
  color: white;
  font-size: 24px;
  margin-bottom: 20px;
  max-width: 600px;
`;

const DateText = styled.p`
  color: white;
  font-size: 16px;
  margin-top: 40px;
`;

const CardContent = styled.div`
  padding: 40px;
`;

const CardText = styled.p`
  color: #0b5e5e;
  font-size: 16px;
  margin-bottom: 20px;
`;

const CardFooter = styled.div`
  background-color: white;
  padding: 20px;
  display: flex;
  justify-content: flex-end;
`;

const StartButton = styled.button`
  background-color: #0b7373;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 12px 20px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  
  &:hover {
    background-color: #095e5e;
  }
`;

const OptionsIcon = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  color: white;
  font-size: 24px;
  cursor: pointer;
`;

const FooterNote = styled.div`
  font-size: 12px;
  color: #666;
  margin-top: 20px;
  max-width: 800px;
  width: 100%;
`;

const FooterLink = styled.a`
  color: #1d70b8;
  text-decoration: underline;
`;

const FeedbackPage = () => {
  // Get current date in the format "2 Sept 2025"
  const currentDate = new Date();
  const options = { day: 'numeric', month: 'short', year: 'numeric' };
  const formattedDate = currentDate.toLocaleDateString('en-GB', options);
  
  const feedbackContent = (
    <FeedbackContainer>
      <FeedbackCard>
        <CardHeader>
          <OptionsIcon>...</OptionsIcon>
          <CardTitle>Give feedback about Monitor your school attendance</CardTitle>
          <DateText>{formattedDate}</DateText>
        </CardHeader>
        
        <CardContent>
          <CardText>
            This form is to give feedback only. Do not use this form to report a problem, or if you need a response.
          </CardText>
        </CardContent>
        
        <CardFooter>
          <StartButton>Start now</StartButton>
        </CardFooter>
      </FeedbackCard>
      
      <FooterNote>
        This content is created by the owner of the form. The data you submit will be sent to the form owner. Microsoft is not responsible for the privacy or security practices of its customers, including those of this form owner. Never give out your password.
        <FooterLink href="#"> Report abuse</FooterLink>
      </FooterNote>
    </FeedbackContainer>
  );

  const supportContent = (
    <p>
      If you need help with anything, you can <a href="/submit-enquiry">submit an enquiry</a>.
    </p>
  );

  return (
    <PageLayout
      title="View school attendance data"
      showUpdates={true}
      supportSection={supportContent}
    >
      {feedbackContent}
    </PageLayout>
  );
};

export default FeedbackPage;
