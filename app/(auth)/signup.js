import React, { useState } from 'react';
import { View, Button } from 'react-native';
import StepOne from '../../components/signupSteps/step1';
import StepTwo from '../../components/signupSteps/step2';
import StepThree from '../../components/signupSteps/step3';
import StepFour from '../../components/signupSteps/step4';
import { useNavigation } from '@react-navigation/native';

const SignupPage = () => {
  const navigation = useNavigation();
  // console.log('Navigation object:', navigation);
  const [currentStep, setCurrentStep] = useState(1);
  const [name, setName] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [gender, setGender] = useState('');
  const [city, setCity] = useState('');
  const [street, setStreet] = useState('');
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
    console.log('Navigating to signin page...');
    navigation.navigate('(auth)/signin');
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <StepOne name={name} onChangeName={setName} isStepComplete={!!name} onNext={handleNextStep} />;
      case 2:
        return <StepTwo verificationCode={verificationCode} onChangeVerificationCode={setVerificationCode} onNext={handleNextStep} onPrevious={handlePreviousStep} isStepComplete={verificationCode.length === 4} />;
      case 3:
        return <StepThree password={password} onChangePassword={setPassword} confirmPassword={confirmPassword} onChangeConfirmPassword={setConfirmPassword} onNext={handleNextStep} onPrevious={handlePreviousStep} onRegister={handleRegister} isStepComplete={password.length > 0 && password === confirmPassword} />;
      case 4:
        return <StepFour 
          profileImage={profileImage} 
          onChangeProfileImage={setProfileImage} 
          gender={gender} 
          onChangeGender={setGender} 
          city={city} 
          onChangeCity={setCity} 
          street={street} 
          onChangeStreet={setStreet} 
          email={email} 
          onChangeEmail={setEmail} 
          onPrevious={handlePreviousStep}
          onRegister={handleContinue} 
          isStepComplete={gender && city && street && email && profileImage}
        />;
      default:
        return null;
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', padding: 20 }}>
      {renderStep()}
      {/* {currentStep > 1 && (
        <Button title="Previous" onPress={handlePreviousStep} />
      )} */}
      {/* {currentStep === 4 && (
        <Button title="Continue" onPress={handleContinue} />
      )} */}
    </View>
  );
};

export default SignupPage;

