import React, { useState } from 'react';
import BuildProfile from './BuildProfile';
import InterestsSelection from './InterestsSelection';
import SpecialInitiatives from './SpecialInitiatives';
import NewsletterSubscription from './NewsletterSubscription';

const SignupFlow = ({ onSignupFlowComplete }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [signupData, setSignupData] = useState({
    profile: {},
    interests: {},
    initiatives: {},
    newsletter: {}
  });

  const totalSteps = 4;

  const handleProfileContinue = (profileData) => {
    setSignupData(prev => ({
      ...prev,
      profile: profileData
    }));
    setCurrentStep(2);
  };

  const handleInterestsContinue = (interestsData) => {
    setSignupData(prev => ({
      ...prev,
      interests: interestsData
    }));
    setCurrentStep(3);
  };

  const handleInitiativesContinue = (initiativesData) => {
    setSignupData(prev => ({
      ...prev,
      initiatives: initiativesData
    }));
    setCurrentStep(4);
  };

  const handleNewsletterFinish = (newsletterData) => {
    const finalSignupData = {
      ...signupData,
      newsletter: newsletterData
    };
    
    setSignupData(finalSignupData);
    
    // Complete signup process
    console.log('Signup flow completed with data:', finalSignupData);
    
    // navigating to main
    if (onSignupFlowComplete) {
      onSignupFlowComplete(finalSignupData);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <BuildProfile
            onContinue={handleProfileContinue}
            currentStep={currentStep}
            totalSteps={totalSteps}
          />
        );
      case 2:
        return (
          <InterestsSelection
            onContinue={handleInterestsContinue}
            onBack={handleBack}
            currentStep={currentStep}
            totalSteps={totalSteps}
          />
        );
      case 3:
        return (
          <SpecialInitiatives
            onContinue={handleInitiativesContinue}
            onBack={handleBack}
            currentStep={currentStep}
            totalSteps={totalSteps}
          />
        );
      case 4:
        return (
          <NewsletterSubscription
            onFinish={handleNewsletterFinish}
            onBack={handleBack}
            currentStep={currentStep}
            totalSteps={totalSteps}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div>
      {renderCurrentStep()}
    </div>
  );
};

export default SignupFlow;