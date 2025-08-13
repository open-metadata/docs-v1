import React from 'react';

interface StepsContainerProps {
  children: React.ReactNode;
}

interface StepProps {
  children: React.ReactNode;
  srNumber: number;
}

interface StepDescriptionProps {
  children: React.ReactNode;
  title: string;
}

interface StepVisualInfoProps {
  children: React.ReactNode;
}

export const StepsContainer: React.FC<StepsContainerProps> = ({ children }) => {
  return <div className="steps-container">{children}</div>;
};

export const Step: React.FC<StepProps> = ({ children, srNumber }) => {
  return (
    <div className="step" data-step={srNumber}>
      <div className="step__number">{srNumber}</div>
      <div className="step__content">{children}</div>
    </div>
  );
};

export const StepDescription: React.FC<StepDescriptionProps> = ({ children, title }) => {
  return (
    <div className="step__description">
      <h3>{title}</h3>
      <div>{children}</div>
    </div>
  );
};

export const StepVisualInfo: React.FC<StepVisualInfoProps> = ({ children }) => {
  return <div className="step__visual">{children}</div>;
};