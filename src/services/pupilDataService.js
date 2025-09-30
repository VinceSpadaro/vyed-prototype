// Mock API service for pupil data
import { faker } from '@faker-js/faker';

// Generate random UPN (Unique Pupil Number)
// Using fictional LA code 100 to ensure no real UPNs are generated
// Real LA codes start from 201 (English), 660 (Welsh), or special codes
const generateUPN = () => {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const letter = letters[Math.floor(Math.random() * letters.length)];
  const laCode = '100'; // Fictional LA code - not used by any real authority
  const uniqueId = Math.floor(Math.random() * 900000000) + 100000000; // 9-digit number
  return letter + laCode + uniqueId.toString();
};

// Generate random attendance data
const generateAttendanceData = () => {
  // Generate attendance percentage between 70% and 100%
  const attendancePercentage = (Math.random() * 30 + 70).toFixed(1);
  
  // Calculate absence percentage
  const absencePercentage = (100 - attendancePercentage).toFixed(1);
  
  // Split absence into authorized and unauthorized
  const authorizedPercentage = (Math.random() * absencePercentage * 0.7).toFixed(1);
  const unauthorizedPercentage = (absencePercentage - authorizedPercentage).toFixed(1);
  
  // Generate random session data
  const fullDaysMissed = Math.floor(Math.random() * 30);
  const possibleSessions = Math.floor(Math.random() * 100) + 150;
  const missedSessions = Math.floor(Math.random() * 50);
  
  return {
    attendancePercentage: attendancePercentage + '%',
    absencePercentage: absencePercentage + '%',
    authorizedPercentage: authorizedPercentage + '%',
    unauthorizedPercentage: unauthorizedPercentage + '%',
    fullDaysMissed,
    possibleSessions,
    missedSessions
  };
};

// Generate a list of 200 random pupils
export const generatePupilData = (count = 200) => {
  const pupils = [];
  
  for (let i = 0; i < count; i++) {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const attendanceData = generateAttendanceData();
    
    pupils.push({
      id: i + 1,
      name: `${lastName}, ${firstName}`,
      upn: generateUPN(),
      attendance: attendanceData.attendancePercentage,
      absence: attendanceData.absencePercentage,
      authorized: attendanceData.authorizedPercentage,
      unauthorized: attendanceData.unauthorizedPercentage,
      fullDaysMissed: attendanceData.fullDaysMissed,
      possibleSessions: attendanceData.possibleSessions,
      missedSessions: attendanceData.missedSessions
    });
  }
  
  // Sort by last name
  return pupils.sort((a, b) => a.name.localeCompare(b.name));
};

// Function to get all pupil data
export const getAllPupils = () => {
  return generatePupilData();
};

// Function to get a single pupil by ID
export const getPupilById = (id) => {
  const pupils = generatePupilData();
  return pupils.find(pupil => pupil.id === parseInt(id));
};

// Function to get filtered pupils
export const getFilteredPupils = (filters) => {
  let pupils = generatePupilData();
  
  // Apply filters if provided
  if (filters) {
    if (filters.name) {
      pupils = pupils.filter(pupil => 
        pupil.name.toLowerCase().includes(filters.name.toLowerCase())
      );
    }
    
    if (filters.attendanceBelow) {
      pupils = pupils.filter(pupil => 
        parseFloat(pupil.attendance) < parseFloat(filters.attendanceBelow)
      );
    }
    
    if (filters.attendanceAbove) {
      pupils = pupils.filter(pupil => 
        parseFloat(pupil.attendance) > parseFloat(filters.attendanceAbove)
      );
    }
  }
  
  return pupils;
};
