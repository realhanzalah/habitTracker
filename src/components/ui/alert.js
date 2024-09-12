import React from 'react';

export const Alert = ({ children, className }) => (
  <div className={`p-4 rounded-md ${className}`}>{children}</div>
);

export const AlertTitle = ({ children }) => (
  <h4 className="text-lg font-medium mb-2">{children}</h4>
);

export const AlertDescription = ({ children }) => (
  <p>{children}</p>
);