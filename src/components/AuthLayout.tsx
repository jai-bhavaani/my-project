import React from 'react';
import './AuthLayout.css';

interface AuthLayoutProps {
  visualColumn: React.ReactNode;
  formColumn: React.ReactNode;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ visualColumn, formColumn }) => {
  return (
    <div className="auth-layout">
      <div className="auth-layout__visual">
        {visualColumn}
      </div>
      <div className="auth-layout__form">
        {formColumn}
      </div>
    </div>
  );
};
