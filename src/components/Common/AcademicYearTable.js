import React from 'react';
import styled from 'styled-components';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';

const TableContainer = styled.div`
  margin-top: 20px;
  margin-bottom: 30px;
  overflow-x: auto;
  flex: 1; /* Take all available space */
  display: flex;
  flex-direction: column;
  overflow-y: auto;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
  flex: 1;
`;

const TableHead = styled.thead`
  border-bottom: 2px solid #b1b4b6;
`;

const TableHeader = styled.th`
  text-align: left;
  padding: 10px;
  font-weight: bold;
  color: #0b0c0c;
`;

const TableBody = styled.tbody``;

const TermRow = styled.tr`
  background-color: #f8f8f8;
  font-weight: bold;
`;

const DataRow = styled.tr`
  &:nth-child(even) {
    background-color: #f3f2f1;
  }
  border-bottom: 1px solid #e5e5e5;
`;

const TableCell = styled.td`
  padding: 10px;
  color: #0b0c0c;
  border-bottom: 1px solid #b1b4b6;
`;

const TrendCell = styled.td`
  color: ${props => props.trend === 'up' ? '#00703c' : props.trend === 'down' ? '#d4351c' : '#0b0c0c'};
  text-align: left;
  padding: 10px;
  border-bottom: 1px solid #b1b4b6;
`;

/**
 * A reusable component for displaying academic year comparison data
 * @param {Object} props
 * @param {Array} props.terms - Array of term data objects
 * @param {Array} props.columns - Array of column configuration objects
 */
const AcademicYearTable = ({ terms, columns }) => {
  const renderTrend = (trend) => {
    if (trend === 'up') {
      return <FaArrowUp />;
    } else if (trend === 'down') {
      return <FaArrowDown />;
    }
    return '-';
  };

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <tr>
            {columns.map((column, index) => (
              <TableHeader key={index}>{column.header}</TableHeader>
            ))}
          </tr>
        </TableHead>
        <TableBody>
          {terms.map((term, termIndex) => (
            <React.Fragment key={termIndex}>
              <TermRow>
                <TableCell colSpan={columns.length}>{term.name}</TableCell>
              </TermRow>
              
              {term.rows.map((row, rowIndex) => (
                <DataRow key={`${termIndex}-${rowIndex}`}>
                  {columns.map((column, colIndex) => (
                    <TableCell key={`${termIndex}-${rowIndex}-${colIndex}`}>
                      {row[column.key]}
                    </TableCell>
                  ))}
                </DataRow>
              ))}
              
              {term.trends && (
                <tr>
                  <TableCell>Trend</TableCell>
                  {columns.slice(1).map((column, colIndex) => (
                    <TrendCell 
                      key={`${termIndex}-trend-${colIndex}`} 
                      trend={term.trends[column.key]}
                    >
                      {renderTrend(term.trends[column.key])}
                    </TrendCell>
                  ))}
                </tr>
              )}
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AcademicYearTable;
