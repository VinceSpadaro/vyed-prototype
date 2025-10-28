import React from 'react';
import styled from 'styled-components';
import { FiCalendar } from 'react-icons/fi';
import Dropdown from '../Common/Dropdown';
import { media } from '../../styles/mediaQueries';

const SideNavContainer = styled.div`
  width: 220px;
  border-right: 1px solid #b1b4b6;
  padding: 20px 20px 20px 0;
  margin-right: 20px;
  
  ${media.medium`
    width: 100%;
  `}
`;


const DateRangeContainer = styled.div`
  margin-top: 20px;
`;

const DateLabel = styled.label`
  display: block;
  font-weight: 700;
  margin-bottom: 10px;
  color: #0b0c0c;
  font-size: 16px;
`;

const DateInputsRow = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
`;

const DateInputWrapper = styled.div`
  position: relative;
  flex: 1;
`;

const DateInput = styled.input`
  width: 100%;
  padding: 8px 35px 8px 8px;
  border: 2px solid #0b0c0c;
  font-size: 14px;
  
  &:focus {
    outline: 3px solid #ffdd00;
    outline-offset: 0;
  }
`;

const CalendarIcon = styled(FiCalendar)`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: #505a5f;
  pointer-events: none;
  font-size: 16px;
`;

const Slider = styled.div`
  margin-top: 20px;
  position: relative;
`;

const SliderTrack = styled.div`
  height: 4px;
  background-color:#fff;
  border-radius: 2px;
  position: relative;
`;

const SliderRange = styled.div`
  height: 4px;
  background-color: #a09c9cff;
  border-radius: 2px;
  position: absolute;
  left: ${props => props.left}%;
  right: ${props => props.right}%;
`;

const SliderThumb = styled.input`
  position: absolute;
  width: 100%;
  height: 4px;
  background: transparent;
  pointer-events: none;
  -webkit-appearance: none;
  
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: white;
    cursor: pointer;
    pointer-events: all;
    border: 2px solid #505a5f;
    box-shadow: 0 2px 4px rgba(0,0,0,0.2);
  }
  
  &::-moz-range-thumb {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: white;
    cursor: pointer;
    pointer-events: all;
    border: 2px solid #505a5f;
    box-shadow: 0 2px 4px rgba(0,0,0,0.2);
  }
`;

const CodesSideNav = ({ 
  selectedCode, 
  setSelectedCode,
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange
}) => {
  // Attendance code options
  const attendanceCodeOptions = [
    { value: 'all', label: 'Select all' },
    { value: '--', label: '- - All should attend / No mark recorded' },
    { value: '#', label: '# - Planned whole or partial school closure' },
    { value: '/', label: '/  - Present (AM)' },
    { value: '\\', label: '\\  - Present (PM)' },
    { value: 'B', label: 'B - Educated off site' },
    { value: 'C', label: 'C - Other authorised circumstances' },
    { value: 'C1', label: 'C1 - Absent with leave for the purpose of participating in a regulated performance' },
    { value: 'C2', label: 'C2 - Absent with leave, of compulsory school age and temporary reduced timetable does not require them to attend' },
    { value: 'D', label: 'D - Dual registration' },
    { value: 'E', label: 'E - Excluded' },
    { value: 'G', label: 'G - Unauthorised holiday' },
    { value: 'I', label: 'I - Illness Not Medical o' },
    { value: 'J1', label: 'J1 - Absent with leave for the purpose of attending an interview for employment or for admission to another educational institution' },
    { value: 'K', label: 'K - Attending a place, other than the school or another school at which they are a registered pupil, for educational provision arranged by LA' },
    { value: 'L', label: 'L - Late (before reg closed)' },
    { value: 'M', label: 'M - Medical / dental appointments' },
    { value: 'N', label: 'N - No reason yet provided for absence' },
    { value: 'O', label: 'O - Unauthorised absence' },
    { value: 'P', label: 'P - Approved sporting a' },
    { value: 'Q', label: 'Q - Unable to attend because of lack of access arrangements by LA to facilitate their attendance' },
    { value: 'R', label: 'R - Religious observance' },
    { value: 'S', label: 'S - Study leave' },
    { value: 'T', label: 'T - Traveller absence' },
    { value: 'U', label: 'U - Late (after registers closed)' },
    { value: 'V', label: 'V - Educational visit or trip' },
    { value: 'W', label: 'W - Approved education' },
    { value: 'X', label: 'X - Non-compulsory school age absence - not counted in possible attendances' },
    { value: 'Y1', label: 'Y1 - Unable to attend because school is not within walking distance of pupil\'s home and transport to and from school normally provided is not available' },
    { value: 'Y2', label: 'Y2 - Unable to attend due to widespread disruption to travel caused by a local, national, or international emergency' },
    { value: 'Y3', label: 'Y3 - Part of the school premises is unavoidably out of use and pupil cannot be accommodated in parts of the premises that remain in use' },
    { value: 'Y4', label: 'Y4 - Whole school closed when school was due to meet for a session, but session has been cancelled' },
    { value: 'Y7', label: 'Y7 - Unable to attend because of any other unavoidable cause' },
    { value: 'Z', label: 'Z - Pupil not on roll' }
  ];

  return (
    <SideNavContainer>
      <Dropdown
        label="Select Attendance Code"
        options={attendanceCodeOptions}
        value={selectedCode}
        onChange={setSelectedCode}
        showLabel={true}
        multiSelect={true}
      />
      
      <DateRangeContainer>
        <DateLabel>Attendance Date</DateLabel>
        <DateInputsRow>
          <DateInputWrapper>
            <DateInput
              type="text"
              value={startDate}
              onChange={(e) => onStartDateChange(e.target.value)}
              placeholder="DD/MM/YYYY"
            />
            <CalendarIcon />
          </DateInputWrapper>
          <DateInputWrapper>
            <DateInput
              type="text"
              value={endDate}
              onChange={(e) => onEndDateChange(e.target.value)}
              placeholder="DD/MM/YYYY"
            />
            <CalendarIcon />
          </DateInputWrapper>
        </DateInputsRow>
        
        <Slider>
          <SliderTrack>
            <SliderRange left={0} right={0} />
          </SliderTrack>
          <SliderThumb
            type="range"
            min="0"
            max="100"
            defaultValue="0"
          />
          <SliderThumb
            type="range"
            min="0"
            max="100"
            defaultValue="100"
          />
        </Slider>
      </DateRangeContainer>
    </SideNavContainer>
  );
};

export default CodesSideNav;
