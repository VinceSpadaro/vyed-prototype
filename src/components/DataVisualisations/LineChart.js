import React from 'react';
import styled from 'styled-components';

const ChartContainer = styled.div`
  position: relative;
  width: 100%;
  height: 400px;
  border: 1px solid #ccc;
  margin-bottom: 20px;
  overflow: hidden;
`;

const YAxisLabels = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px 0;
`;

const YAxisLabel = styled.div`
  font-size: 12px;
  color: #6f777b;
`;

const YAxisLine = styled.div`
  position: absolute;
  left: 30px;
  top: ${props => props.top}%;
  width: calc(100% - 30px);
  height: 1px;
  background-color: #e6e6e6;
`;

const ChartArea = styled.div`
  position: absolute;
  left: 30px;
  top: 0;
  width: calc(100% - 60px);
  height: 100%;
`;

const XAxisLabels = styled.div`
  position: absolute;
  bottom: -25px;
  left: 30px;
  width: calc(100% - 60px);
  display: flex;
  justify-content: space-between;
`;

const XAxisLabel = styled.div`
  font-size: 10px;
  color: #6f777b;
  transform: rotate(-45deg);
  transform-origin: top left;
  white-space: nowrap;
`;

const Legend = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 30px;
  margin-bottom: 20px;
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  margin-right: 20px;
  margin-bottom: 10px;
`;

const LegendColor = styled.div`
  width: 20px;
  height: 3px;
  background-color: ${props => props.color};
  margin-right: 8px;
`;

const LegendText = styled.div`
  font-size: 12px;
  color: #0b0c0c;
`;

const Line = styled.svg`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
`;

const Slider = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  width: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const SliderTrack = styled.div`
  height: 80%;
  width: 2px;
  background-color: #ccc;
  position: relative;
  margin: 30px 0;
`;

const SliderHandle = styled.div`
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background-color: white;
  border: 2px solid #1d70b8;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  cursor: pointer;
  
  &:first-child {
    top: 0;
  }
  
  &:last-child {
    bottom: 0;
  }
`;

const LineChart = ({ chartType = 'attendance' }) => {
  // Generate dates for x-axis (weeks)
  const generateDates = () => {
    const dates = [];
    const startDate = new Date(2022, 8, 5); // Sept 5, 2022
    
    for (let i = 0; i < 26; i++) {
      const date = new Date(startDate);
      date.setDate(date.getDate() + (i * 7));
      dates.push(date.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: '2-digit' }));
    }
    
    return dates;
  };
  
  const dates = generateDates();
  
  // We'll use the chartType prop to determine which data to show
  
  // Sample data for attendance percentages
  const attendanceOverallSchool = [95, 94, 93, 94, 95, 94, 93, 92, 93, 94, 93, 92, 91, 90, 91, 92, 93, 92, 91, 90, 91, 92, 93, 94, 93, 92];
  const attendanceSenSupport = [85, 84, 83, 82, 83, 84, 85, 84, 83, 82, 81, 80, 79, 78, 77, 76, 75, 74, 73, 72, 73, 74, 75, 76, 77, 78];
  const attendanceEhcpPupils = [75, 74, 73, 72, 71, 70, 69, 68, 67, 66, 65, 64, 63, 62, 61, 60, 59, 58, 57, 56, 55, 54, 53, 52, 51, 50];
  const attendanceFsmPupils = [90, 89, 88, 87, 86, 85, 84, 83, 82, 81, 80, 79, 78, 77, 76, 75, 74, 73, 72, 71, 70, 69, 68, 67, 66, 65];
  
  // Sample data for absence percentages
  const absenceOverallSchool = [5, 6, 7, 6, 5, 6, 7, 8, 7, 6, 7, 8, 9, 10, 9, 8, 7, 8, 9, 10, 9, 8, 7, 6, 7, 8];
  const absenceSenSupport = [15, 16, 17, 18, 17, 16, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 27, 26, 25, 24, 23, 22];
  const absenceEhcpPupils = [25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50];
  const absenceFsmPupils = [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35];
  
  // Sample data for unauthorised absence percentages
  const unauthorisedOverallSchool = [2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 4, 5, 4, 3, 2, 3, 4, 5, 4, 3, 2, 3, 2, 3];
  const unauthorisedSenSupport = [5, 6, 7, 8, 7, 6, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6];
  const unauthorisedEhcpPupils = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5];
  const unauthorisedFsmPupils = [4, 5, 6, 7, 8, 7, 6, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 14, 13, 12, 11, 10, 9, 8, 7];
  
  // Weekly chart data removed as it's only for Pupils/Data visualisations section
  
  // Determine which dataset to use based on the chartType prop
  let overallSchool, senSupport, ehcpPupils, fsmPupils, yAxisLabels, xLabels;
  
  if (chartType === 'absence') {
    overallSchool = absenceOverallSchool;
    senSupport = absenceSenSupport;
    ehcpPupils = absenceEhcpPupils;
    fsmPupils = absenceFsmPupils;
    yAxisLabels = ['30%', '20%', '10%', '0%'];
    xLabels = dates;
  } else if (chartType === 'unauthorised') {
    overallSchool = unauthorisedOverallSchool;
    senSupport = unauthorisedSenSupport;
    ehcpPupils = unauthorisedEhcpPupils;
    fsmPupils = unauthorisedFsmPupils;
    yAxisLabels = ['20%', '15%', '10%', '5%', '0%'];
    xLabels = dates;
  } else {
    // Default to attendance
    overallSchool = attendanceOverallSchool;
    senSupport = attendanceSenSupport;
    ehcpPupils = attendanceEhcpPupils;
    fsmPupils = attendanceFsmPupils;
    yAxisLabels = ['100%', '90%', '80%', '70%'];
    xLabels = dates;
  }
  
  // Generate SVG path for a line
  const generatePath = (data) => {
    const width = 100 / (data.length - 1);
    let path = `M 0 ${100 - data[0]}`;
    
    for (let i = 1; i < data.length; i++) {
      path += ` L ${i * width} ${100 - data[i]}`;
    }
    
    return path;
  };
  
  return (
    <div style={{ overflow: 'hidden' }}>
      <ChartContainer>
        <YAxisLabels>
          {yAxisLabels.map((label, index) => (
            <YAxisLabel key={index}>{label}</YAxisLabel>
          ))}
        </YAxisLabels>
        
        <YAxisLine top={0} />
        <YAxisLine top={10} />
        <YAxisLine top={20} />
        <YAxisLine top={30} />
        
        <ChartArea>
          <Line preserveAspectRatio="none" viewBox="0 0 100 100">
            <path 
              d={generatePath(overallSchool)} 
              stroke="#1d70b8" 
              strokeWidth="1.5" 
              fill="none" 
            />
            <path 
              d={generatePath(senSupport)} 
              stroke="#5694ca" 
              strokeWidth="1.5" 
              fill="none" 
              strokeDasharray="5,5" 
            />
            <path 
              d={generatePath(ehcpPupils)} 
              stroke="#000000" 
              strokeWidth="1.5" 
              fill="none" 
            />
            <path 
              d={generatePath(fsmPupils)} 
              stroke="#d4351c" 
              strokeWidth="1.5" 
              fill="none" 
              strokeDasharray="3,3" 
            />
            
            <g>
              {xLabels.map((label, i) => {
                // Show every 4th label to avoid crowding
                if (i % 4 === 0) {
                  const x = (i / (xLabels.length - 1)) * 100;
                  return (
                    <g key={`x-label-${i}`}>
                      <line
                        x1={`${x}%`}
                        y1="100%"
                        x2={`${x}%`}
                        y2="102%"
                        stroke="#000"
                        strokeWidth="0.5"
                      />
                      <text
                        x={`${x}%`}
                        y="108%"
                        textAnchor="middle"
                        fontSize="8"
                      >
                        {label}
                      </text>
                    </g>
                  );
                }
                return null;
              })}
            </g>
          </Line>
        </ChartArea>
        
        <Slider>
          <SliderTrack>
            <SliderHandle />
            <SliderHandle />
          </SliderTrack>
        </Slider>
        
        <XAxisLabels>
          {dates.map((date, index) => (
            index % 3 === 0 && <XAxisLabel key={index}>{date}</XAxisLabel>
          ))}
        </XAxisLabels>
      </ChartContainer>
      
      <Legend>
        <LegendItem>
          <LegendColor color="#1d70b8" />
          <LegendText>Overall school</LegendText>
        </LegendItem>
        <LegendItem>
          <LegendColor color="#5694ca" />
          <LegendText>SEN support pupils</LegendText>
        </LegendItem>
        <LegendItem>
          <LegendColor color="#000000" />
          <LegendText>EHCP pupils</LegendText>
        </LegendItem>
        <LegendItem>
          <LegendColor color="#d4351c" />
          <LegendText>FSM pupils</LegendText>
        </LegendItem>
      </Legend>
    </div>
  );
};

export default LineChart;
