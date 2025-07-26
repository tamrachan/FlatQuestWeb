import React from 'react';
import '../css/ProgressBar.css'; // optional external styling

const ProgressBar = ({ progress, label = '', color = '#4caf50' }) => {
  return (
    <div className="progress-container">
      {label && <span className="progress-label">{label}</span>}
      <div className="progress-bar-background">
        <div
          className="progress-bar-fill"
          style={{ width: `${progress}%`, backgroundColor: color }}
        ></div>
      </div>
      <span className="progress-percentage">{progress}%</span>
    </div>
  );
};

export default ProgressBar;
