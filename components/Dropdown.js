"use-client";
import React from 'react';

const Dropdown = ({ subjects, onSelectSubject }) => {
  return (
    <select onChange={(e) => onSelectSubject(e.target.value)}>
      <option value="">Select a Subject</option>
      {subjects.map((subject) => (
        <option key={subject} value={subject}>
          {subject}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;
