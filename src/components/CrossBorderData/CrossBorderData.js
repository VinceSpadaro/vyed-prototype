import React from 'react';
import styled from 'styled-components';
import { faker } from '@faker-js/faker';
import DataTable from '../Common/DataTable';

const Container = styled.div`
  padding: 40px 20px;
  max-width: 100%;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 36px;
  margin-bottom: 20px;
  font-weight: bold;
`;

const Description = styled.p`
  margin-bottom: 30px;
  font-size: 16px;
  line-height: 1.5;
`;

const TableWrapper = styled.div`
  max-height: 700px;
  overflow-y: auto;
  overflow-x: auto;
  border: 1px solid #b1b4b6;
`;

const LatestSession = styled.div`
  font-size: 14px;
  color: #505a5f;
  margin-top: 20px;
  font-weight: bold;
`;

// Generate dummy data for 100 pupils
const generateCrossBorderData = () => {
  faker.seed(999); // Set seed for consistent data
  const data = [];
  
  const senTypes = ['Not recorded', 'SEMH', 'NSA', 'ASD', 'MLD', 'PNI', 'SPDL', 'SLCN', 'PD', 'HI', 'OTH'];
  const yearGroups = ['(13)', '7', '8', '9', '10', '11', '12', '13'];
  const phases = ['Primary', 'Secondary'];
  const yesNoOptions = ['Yes', 'No'];
  const yesNoUnknownOptions = ['Yes', 'No', 'Unknown'];
  
  const schoolNames = [
    'Oakwood Primary School',
    'Riverside Academy',
    'St. Mary\'s Catholic School',
    'Greenfield High School',
    'Brookside Community School',
    'Hillside Secondary School',
    'Meadowbrook Primary',
    'Westfield Academy',
    'Parkside School',
    'Thornhill Academy'
  ];
  
  const localAuthorities = [
    { name: 'Haringey', ukprn: faker.string.numeric(8) },
    { name: 'Hertfordshire', ukprn: faker.string.numeric(8) },
    { name: 'Barnet', ukprn: faker.string.numeric(8) },
    { name: 'Waltham Forest', ukprn: faker.string.numeric(8) },
    { name: 'Essex', ukprn: faker.string.numeric(8) },
    { name: 'Hackney', ukprn: faker.string.numeric(8) },
    { name: 'Redbridge', ukprn: faker.string.numeric(8) },
    { name: 'Tower Hamlets', ukprn: faker.string.numeric(8) },
    { name: 'Merton', ukprn: faker.string.numeric(8) },
    { name: 'Bromley', ukprn: faker.string.numeric(8) },
    { name: 'Newham', ukprn: faker.string.numeric(8) },
    { name: 'Islington', ukprn: faker.string.numeric(8) }
  ];
  
  for (let i = 0; i < 100; i++) {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const dob = faker.date.between({ from: '2005-01-01', to: '2015-12-31' });
    const admissionDate = faker.date.between({ from: '2020-09-01', to: '2025-09-01' });
    const hasLeftSchool = faker.helpers.arrayElement([true, false, false, false, false]); // 20% chance
    const leavingDate = hasLeftSchool ? faker.date.between({ from: admissionDate, to: '2025-11-26' }) : null;
    
    const schoolLA = faker.helpers.arrayElement(localAuthorities);
    const schoolName = faker.helpers.arrayElement(schoolNames);
    const phase = faker.helpers.arrayElement(phases);
    const yearGroup = faker.helpers.arrayElement(yearGroups);
    
    const possibleSessions = faker.number.int({ min: 300, max: 380 });
    const absentSessions = faker.number.int({ min: 10, max: 80 });
    const presentSessions = possibleSessions - absentSessions;
    const approvedEducationalActivity = faker.number.int({ min: 0, max: 10 });
    const authorisedAbsent = faker.number.int({ min: 5, max: absentSessions - 5 });
    const unauthorisedAbsent = absentSessions - authorisedAbsent;
    const fullDaysMissed = Math.floor(absentSessions / 2);
    
    data.push({
      academic_term: '2024/2025',
      upn: faker.string.alphanumeric({ length: 13, casing: 'upper' }),
      dob: dob.toLocaleDateString('en-GB'),
      sex: faker.helpers.arrayElement(['Male', 'Female']),
      ethnicity: faker.helpers.arrayElement([
        'White British', 'Asian Indian', 'Asian Pakistani', 'Black African', 
        'Black Caribbean', 'Chinese', 'Mixed White and Asian', 'White other'
      ]),
      english_additional_language: faker.helpers.arrayElement(yesNoOptions),
      compulsory_school_age: faker.helpers.arrayElement(yesNoOptions),
      sen_support: faker.helpers.arrayElement(yesNoUnknownOptions),
      free_school_meals: faker.helpers.arrayElement(yesNoUnknownOptions),
      education_health_care_plan: faker.helpers.arrayElement(yesNoUnknownOptions),
      primary_sen_type: faker.helpers.arrayElement(senTypes),
      secondary_sen_type: faker.helpers.arrayElement(senTypes),
      looked_after_child: faker.helpers.arrayElement(yesNoUnknownOptions),
      previously_looked_after_child: faker.helpers.arrayElement(yesNoUnknownOptions),
      child_in_need: faker.helpers.arrayElement(yesNoUnknownOptions),
      child_protection_plan: faker.helpers.arrayElement(yesNoUnknownOptions),
      persistently_absent: faker.helpers.arrayElement(yesNoOptions),
      severely_absent: faker.helpers.arrayElement(yesNoOptions),
      unique_reference_number: faker.string.numeric(6),
      year_group: yearGroup,
      school_local_authority_ukprn: schoolLA.ukprn,
      school_local_authority_name: schoolLA.name,
      home_local_authority_ukprn: '10034567',
      home_local_authority_name: 'Enfield',
      learning_provider_ukprn: faker.string.numeric(8),
      school_name: schoolName,
      phase: phase,
      pupil_surname: lastName,
      pupil_forename: firstName,
      admission_date: admissionDate.toLocaleDateString('en-GB'),
      leaving_date: leavingDate ? leavingDate.toLocaleDateString('en-GB') : '',
      full_days_missed: fullDaysMissed,
      possible_sessions: possibleSessions,
      absent_sessions: absentSessions,
      present_sessions: presentSessions,
      approved_educational_activity_sessions: approvedEducationalActivity,
      authorised_absent_sessions: authorisedAbsent,
      unauthorised_absent_sessions: unauthorisedAbsent
    });
  }
  
  return data;
};

const CrossBorderData = () => {
  const crossBorderData = generateCrossBorderData();
  
  // Column definitions
  const columns = [
    { header: 'Academic term', accessor: 'academic_term' },
    { header: 'UPN', accessor: 'upn' },
    { header: 'DOB', accessor: 'dob' },
    { header: 'Sex', accessor: 'sex' },
    { header: 'Ethnicity', accessor: 'ethnicity' },
    { header: 'English additional language', accessor: 'english_additional_language' },
    { header: 'Compulsory school age', accessor: 'compulsory_school_age' },
    { header: 'SEN support', accessor: 'sen_support' },
    { header: 'Free school meals', accessor: 'free_school_meals' },
    { header: 'Education health care plan', accessor: 'education_health_care_plan' },
    { header: 'Primary SEN type', accessor: 'primary_sen_type' },
    { header: 'Secondary SEN type', accessor: 'secondary_sen_type' },
    { header: 'Looked after child', accessor: 'looked_after_child' },
    { header: 'Previously looked after child', accessor: 'previously_looked_after_child' },
    { header: 'Child in need', accessor: 'child_in_need' },
    { header: 'Child protection plan', accessor: 'child_protection_plan' },
    { header: 'Persistently absent', accessor: 'persistently_absent' },
    { header: 'Severely absent', accessor: 'severely_absent' },
    { header: 'Unique reference number', accessor: 'unique_reference_number' },
    { header: 'Year group', accessor: 'year_group' },
    { header: 'School local authority UKPRN', accessor: 'school_local_authority_ukprn' },
    { header: 'School local authority name', accessor: 'school_local_authority_name' },
    { header: 'Home local authority UKPRN', accessor: 'home_local_authority_ukprn' },
    { header: 'Home local authority name', accessor: 'home_local_authority_name' },
    { header: 'Learning provider UKPRN', accessor: 'learning_provider_ukprn' },
    { header: 'School name', accessor: 'school_name' },
    { header: 'Phase', accessor: 'phase' },
    { header: 'Pupil surname', accessor: 'pupil_surname' },
    { header: 'Pupil forename', accessor: 'pupil_forename' },
    { header: 'Admission date', accessor: 'admission_date' },
    { header: 'Leaving date', accessor: 'leaving_date' },
    { header: 'Full days missed', accessor: 'full_days_missed' },
    { header: 'Possible sessions', accessor: 'possible_sessions' },
    { header: 'Absent sessions', accessor: 'absent_sessions' },
    { header: 'Present sessions', accessor: 'present_sessions' },
    { header: 'Approved educational activity sessions', accessor: 'approved_educational_activity_sessions' },
    { header: 'Authorised absent sessions', accessor: 'authorised_absent_sessions' },
    { header: 'Unauthorised absent sessions', accessor: 'unauthorised_absent_sessions' }
  ];
  
  return (
    <Container>
      <Title></Title>
      <Description>
        
      </Description>
      
      <TableWrapper>
        <DataTable 
          columns={columns} 
          data={crossBorderData} 
        />
      </TableWrapper>
      
      <LatestSession>
        Latest session available<br />
        21/11/2025
      </LatestSession>
    </Container>
  );
};

export default CrossBorderData;
