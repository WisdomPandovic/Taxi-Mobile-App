import React, { useState } from 'react';
import { View } from 'react-native';
import StepOne from '../../components/signupSteps/step1';
import StepTwo from '../../components/signupSteps/step2';
import StepThree from '../../components/signupSteps/step3';
import StepFour from '../../components/signupSteps/step4';
import { useNavigation } from '@react-navigation/native';

const SignupPage = () => {
  const navigation = useNavigation();
  const [currentStep, setCurrentStep] = useState(1);
  const [username, setUsername] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [gender, setGender] = useState('');
  const [city, setCity] = useState('');
  const [street, setStreet] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleNextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const handlePreviousStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleRegister = () => {
    console.log('Registration Logic');
  };

  const handleContinue = () => {
    console.log('Navigating to signin page...');
    navigation.navigate('(auth)/signin');
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <StepOne
            email={email}
            onChangeEmail={setEmail}
            isStepComplete={!!email}
            onNext={handleNextStep}
          />
        );
      case 2:
        return (
          <StepTwo
            verificationCode={verificationCode}
            email={email}
            onChangeVerificationCode={setVerificationCode}
            onNext={handleNextStep}
            onPrevious={handlePreviousStep}
            isStepComplete={verificationCode.length === 4}
          />
        );
      case 3:
        return (
          <StepThree
            email={email}
            password={password}
            onChangePassword={setPassword}
            confirmPassword={confirmPassword}
            onChangeConfirmPassword={setConfirmPassword}
            onNext={handleNextStep}
            onPrevious={handlePreviousStep}
            onRegister={handleRegister}
            isStepComplete={password.length > 0 && password === confirmPassword}
          />
        );
      case 4:
        return (
          <StepFour
            email={email}
            password={password}
            profileImage={profileImage}
            onChangeProfileImage={setProfileImage}
            gender={gender}
            onChangeGender={setGender}
            city={city}
            onChangeCity={setCity}
            street={street}
            onChangeStreet={setStreet}
            phoneNumber={phoneNumber}
            onChangephoneNumber={setPhoneNumber}
            username={username}
            onChangeUsername={setUsername}
            onChangeEmail={setEmail}
            onPrevious={handlePreviousStep}
            onRegister={handleContinue}
            isStepComplete={gender && city && street && phoneNumber && profileImage && username}
          />
        );
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

export default SignupPage;
