import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Formik } from 'formik';
import { Octicons, Ionicons } from '@expo/vector-icons';
import { View, Text, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';

const Colors = {
  primary: "#ffffff",
  tertiary: "#1F2937",
  darkLight: "#9CA3AF",
  brand: "#6D28D9",
  green: "#10B981",
  red: "#EF4444",
  black: "#000000",
  brown: "#b33c00",
  purple: "#9900cc",
  yellow: "#ffff1a"
};
const { primary, tertiary, darkLight, brand, green, red, purple, yellow, brown } = Colors;

const StatusBarHeight = Constants.statusBarHeight;

const StyledContainer = styled.View`
  flex: 1;
  padding-top: ${StatusBarHeight}px;
  background-color: ${primary};
`;
const InnerContainer = styled.View`
  flex: 1;
  width: 100%;
  align-items: center;
  padding: 20px;
`;
const PageTitle = styled.Text`
  font-size: 30px;
  text-align: center;
  font-weight: bold;
  color: ${"#000000"};
  padding: 10px;
`;
const SubTitle = styled.Text`
  font-size: 14px;
  margin-bottom: 40px;
  letter-spacing: 1px;
  font-weight: bold;
  color: ${"#000000"};
`;
const StyledFormAreas = styled.View`
  width: 100%;
`;
const StyledTextInput = styled.TextInput`
  background-color: ${primary};
  padding: 15px;
  padding-left: 55px;
  border-radius: 5px;
  font-size: 15px;
  height: 45px;
  margin-vertical:  3px;
  margin-bottom: 10px;
  color: ${tertiary}; 
  border: 1px solid ${green};
`;
const StyledInputLabel = styled.Text`
  color: ${"#000000"};
  font-size: 13px;
  text-align: left;
`;
const LeftIcon = styled.View`
  left: 10px;
  top: 30px;
  position: absolute;
  z-index: 1;
`;
const RightIcon = styled.TouchableOpacity`
  right: 10px;
  top: 30px;
  position: absolute;
  z-index: 1;
`;
const StyledButton = styled.TouchableOpacity`
  padding: 15px;
  background-color: ${green};
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  margin-vertical: 5px;
  height: 60px;
`;
const ButtonText = styled.Text`
  color: ${primary};
  font-size: 20px;
`;
const MsgBox = styled.Text`
  text-align: center;
  font-size: 13px;
  color: ${red};
`;
const Line = styled.View`
  height: 1px;
  width: 100%;
  background-color: ${darkLight};
  margin-vertical: 10px;
`;
const ExtraView = styled.View`
  justify-content: center;
  flex-direction: row;
  align-items: center;
  padding: 10px;
`;
const ExtraText = styled.Text`
  color: ${"#000000"};
  font-size: 15px;
`;
const TextLink = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
`;
const TextLinkContent = styled.Text`
  color: ${brand};
  font-size: 15px;
`;

const Login = () => {
  const [hidePassword, setHidePassword] = useState(true);
  const navigation = useNavigation();

  return (
    <StyledContainer>
      <StatusBar style="light" />
      <InnerContainer>
        <PageTitle>CityRide</PageTitle>
        <SubTitle>Login to your account</SubTitle>
        <Formik
          initialValues={{ email: '', password: '' }}
          onSubmit={(values) => {
            console.log(values);
          }}
        >
          {({ handleChange, handleBlur, handleSubmit, values }) => (
            <StyledFormAreas>
              <MyTextInput
                label="Phone Number"
                icon={<Octicons name="device-mobile" size={20} color={"#000000"} />}
                placeholder="9366064257"
                placeholderTextColor={darkLight}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                keyboardType="email-address"
              />
              <MyTextInput
                label="Password"
                icon={<Octicons name="lock" size={20} color={"#000000"} />}
                placeholder="* * * * * * *"
                placeholderTextColor={darkLight}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
                secureTextEntry={hidePassword}
                isPassword={true}
                hidePassword={hidePassword}
                setHidePassword={setHidePassword}
              />
              <MsgBox>...</MsgBox>
              <StyledButton onPress={handleSubmit}>
                <ButtonText>Login</ButtonText>
              </StyledButton>
              <Line />
              <ExtraView>
                <ExtraText>Don't have an account already? </ExtraText>
                <TextLink onPress={() => navigation.navigate('Signup')}>
                  <Text>
                    <TextLinkContent>Signup</TextLinkContent>
                  </Text>
                </TextLink>
              </ExtraView>
            </StyledFormAreas>
          )}
        </Formik>
      </InnerContainer>
    </StyledContainer>
  );
};

const MyTextInput = ({ label, icon, isPassword, hidePassword, setHidePassword, ...props }) => {
  return (
    <View>
      <LeftIcon>
        {icon}
      </LeftIcon>
      <StyledInputLabel>{label}</StyledInputLabel>
      <StyledTextInput {...props} secureTextEntry={isPassword ? hidePassword : false} />
      {isPassword && (
        <RightIcon onPress={() => setHidePassword(!hidePassword)}>
          <Ionicons
            name={hidePassword ? 'eye-off-outline' : 'eye-outline'}
            size={20}
            color={darkLight}
          />
        </RightIcon>
      )}
    </View>
  );
};

export default Login;
