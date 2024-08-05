import React, { useState } from 'react';
import { View, Button } from 'react-native';
import StepOne from '../../components/forgotPasswordComponent/step1';
import StepTwo from '../../components/forgotPasswordComponent/step2';
import StepThree from '../../components/forgotPasswordComponent/step3';
import { useNavigation } from '@react-navigation/native';

const ForgotPassword = () => {
  const navigation = useNavigation();
  // console.log('Navigation object:', navigation);
  const [currentStep, setCurrentStep] = useState(1);
  const [name, setName] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleNextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const handlePreviousStep = () => {
    setCurrentStep(currentStep - 1);
  };
  
  const handleRegister = () => {
    // Perform registration logic
    console.log('Registration Logic');
  };

  const handleContinue = () => {
    console.log('Navigating to account page...');
    // navigation.navigate('(tabs)/account'); 
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <StepOne  email={email}
        onChangeEmail={setEmail}
        isStepComplete={!!email}
        onNext={handleNextStep} />;
      case 2:
        return <StepTwo verificationCode={verificationCode} email={email} onChangeVerificationCode={setVerificationCode} onNext={handleNextStep} onPrevious={handlePreviousStep} isStepComplete={verificationCode.length === 4} />;
      case 3:
        return <StepThree email={email} password={password} onChangePassword={setPassword} confirmPassword={confirmPassword} onChangeConfirmPassword={setConfirmPassword} onSave={handleContinue} onPrevious={handlePreviousStep} onRegister={handleRegister} isStepComplete={password.length > 0 && password === confirmPassword} />;
      default:
        return null;
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', padding: 20 }}>
      {renderStep()}
    </View>
  );
};

export default ForgotPassword;

