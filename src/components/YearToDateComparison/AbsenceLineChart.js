import React from 'react';
import styled from 'styled-components';

const ChartContainer = styled.div`
  margin-top: 20px;
  width: 100%;
`;

const ChartTitle = styled.div`
  font-size: 14px;
  margin-bottom: 10px;
`;

const ChartWrapper = styled.div`
  position: relative;
  height: 300px;
  border: 1px solid #e5e5e5;
  padding: 10px;
`;

const YAxisLabels = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px 0;
`;

const YAxisLabel = styled.div`
  font-size: 12px;
  color: #505a5f;
`;

const XAxisLabels = styled.div`
  position: absolute;
  bottom: 0;
  left: 40px;
  right: 10px;
  display: flex;
  justify-content: space-between;
  padding-bottom: 20px;
`;

const XAxisLabel = styled.div`
  font-size: 12px;
  color: #505a5f;
  text-align: center;
`;

const ChartCanvas = styled.div`
  position: relative;
  height: 220px;
  margin-left: 40px;
  margin-top: 20px;
`;

const LineChart = styled.svg`
  width: 100%;
  height: 100%;
`;

const Line = styled.path`
  fill: none;
  stroke-width: 2;
  stroke-linejoin: round;
  stroke-linecap: round;
`;

const Legend = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
  gap: 20px;
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  font-size: 12px;
`;

const LegendColor = styled.div`
  width: 20px;
  height: 3px;
  margin-right: 5px;
  background-color: ${props => props.color};
`;

const TermLabels = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 5px;
  padding-left: 40px;
`;

const TermLabel = styled.div`
  font-size: 12px;
  color: #505a5f;
  text-align: center;
`;

const AbsenceLineChart = () => {
  // Mock data for the chart - absence data is inverse of attendance
  // Higher values mean higher absence rates
  const currentYearData = [8, 9, 7, 10, 8, 9, 11, 12, 10, 9, 8, 10, 11, 13, 14, 15, 16, 17, 18];
  const previousYearData = [10, 8, 7, 9, 10, 11, 9, 8, 7, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
  
  // Calculate SVG path for the lines
  const getPath = (data) => {
    const maxValue = 40; // Maximum absence percentage to show
    const minValue = 0;  // Minimum absence percentage
    const range = maxValue - minValue;
    
    const width = 100 / (data.length - 1);
    
    return data.map((value, index) => {
      const x = index * width;
      const y = 100 - ((value - minValue) / range * 100);
      return `${index === 0 ? 'M' : 'L'}${x},${y}`;
    }).join(' ');
  };
  
  const currentYearPath = getPath(currentYearData);
  const previousYearPath = getPath(previousYearData);
  
  return (
    <ChartContainer>
      <ChartTitle>
        Graph showing year-to-date and previous academic year absence for your school. Use the slider on the left to zoom in and out.
      </ChartTitle>
      
      <ChartWrapper>
        <YAxisLabels>
          <YAxisLabel>40%</YAxisLabel>
          <YAxisLabel>20%</YAxisLabel>
          <YAxisLabel>0%</YAxisLabel>
        </YAxisLabels>
        
        <ChartCanvas>
          <LineChart viewBox="0 0 100 100" preserveAspectRatio="none">
            <Line d={currentYearPath} stroke="#1d70b8" />
            <Line d={previousYearPath} stroke="#d53880" />
          </LineChart>
        </ChartCanvas>
        
        <XAxisLabels>
          {[6, 10, 15, 20, 25, 30, 35, 40, 45].map(week => (
            <XAxisLabel key={week}>{week}</XAxisLabel>
          ))}
        </XAxisLabels>
        
        <TermLabels>
          <TermLabel>Autumn</TermLabel>
          <TermLabel>Spring</TermLabel>
          <TermLabel>Summer</TermLabel>
        </TermLabels>
      </ChartWrapper>
      
      <Legend>
        <LegendItem>
          <LegendColor color="#1d70b8" />
          academic year 2023/2024
        </LegendItem>
        <LegendItem>
          <LegendColor color="#d53880" />
          2024/2025
        </LegendItem>
      </Legend>
    </ChartContainer>
  );
};

export default AbsenceLineChart;
