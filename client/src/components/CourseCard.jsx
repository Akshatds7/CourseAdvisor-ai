import React from 'react';

const CourseCard = ({ text, darkMode }) => {
  return (
    <div className={`alert ${darkMode ? 'alert-dark border-light' : 'alert-info'} shadow-sm`} style={{ whiteSpace: 'pre-wrap' }}>
      {text || 'No courses yet.'}
    </div>
  );
};

export default CourseCard;
