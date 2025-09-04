import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const TableContainer = styled.div`
  width: 100%;
  overflow-x: auto;
  margin: 20px 0;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
  font-size: 16px;
`;

const TableHeader = styled.thead`
  background-color: ${props => props.headerBackground || '#f3f2f1'};
`;

const TableHeaderCell = styled.th`
  padding: 12px 16px;
  text-align: left;
  font-weight: 600;
  border-bottom: 2px solid #b1b4b6;
  color: ${props => props.headerTextColor || '#0b0c0c'};
  white-space: nowrap;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: ${props => props.stripedColor || '#fafafa'};
  }
  
  &:hover {
    background-color: ${props => props.hoverColor || '#f0f0f0'};
  }
`;

const TableCell = styled.td`
  padding: 12px 16px;
  border-bottom: 1px solid #b1b4b6;
  vertical-align: top;
`;

/**
 * DataTable - A reusable component for displaying tabular data
 * 
 * @param {Object} props - Component props
 * @param {Array} props.columns - Array of column definitions with 'header' and 'accessor' properties
 * @param {Array} props.data - Array of data objects to display in the table
 * @param {string} props.headerBackground - Background color for the table header
 * @param {string} props.headerTextColor - Text color for the header cells
 * @param {string} props.stripedColor - Background color for even rows when striped
 * @param {string} props.hoverColor - Background color when hovering over rows
 * @param {boolean} props.isStriped - Whether to apply striped styling to rows
 * @param {boolean} props.isHoverable - Whether to apply hover effect to rows
 * @returns {React.Component} - DataTable component
 */
const DataTable = ({ 
  columns, 
  data, 
  headerBackground,
  headerTextColor,
  stripedColor,
  hoverColor,
  isStriped = true,
  isHoverable = true
}) => {
  return (
    <TableContainer>
      <StyledTable>
        <TableHeader headerBackground={headerBackground}>
          <tr>
            {columns.map((column, index) => (
              <TableHeaderCell 
                key={index} 
                headerTextColor={headerTextColor}
              >
                {column.header}
              </TableHeaderCell>
            ))}
          </tr>
        </TableHeader>
        <tbody>
          {data.map((row, rowIndex) => (
            <TableRow 
              key={rowIndex}
              stripedColor={isStriped ? stripedColor : undefined}
              hoverColor={isHoverable ? hoverColor : undefined}
            >
              {columns.map((column, colIndex) => (
                <TableCell key={colIndex}>
                  {row[column.accessor]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </tbody>
      </StyledTable>
    </TableContainer>
  );
};

DataTable.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      header: PropTypes.string.isRequired,
      accessor: PropTypes.string.isRequired
    })
  ).isRequired,
  data: PropTypes.array.isRequired,
  headerBackground: PropTypes.string,
  headerTextColor: PropTypes.string,
  stripedColor: PropTypes.string,
  hoverColor: PropTypes.string,
  isStriped: PropTypes.bool,
  isHoverable: PropTypes.bool
};

export default DataTable;
