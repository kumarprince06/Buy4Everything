import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, StatusBar, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Theme } from '../../theme';
import { Routes } from '../../navigation/routes';
import { Images } from '../../assets/images';
import { Icons } from '../../assets/icons';
import { AppInput } from '../../components/common/AppInput';
import { AppLogo } from '../../components/common/AppLogo';
import { PrimaryButton } from '../../components/common/PrimaryButton';
import { scale, moderateScale } from '../../utils/scale';

const { width, height } = Dimensions.get('window');

export const LoginScreen = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigation = useNavigation<any>();

  const handleContinue = () => {
    if (phoneNumber.length < 10) return;
    setIsSubmitting(true);
    // Simulate network delay; replace with real API call
    setTimeout(() => {
      setIsSubmitting(false);
      navigation.navigate(Routes.OTP, { phoneNumber });
    }, 800);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Theme.colors.primary} />
      
      {/* Vector + Group image: single wrap, doesn't affect layout */}
      <View style={styles.vectorAndGroupWrap} pointerEvents="none">
        <View style={styles.vectorContainer}>
          <Image
            source={Images.backgroundVector}
            resizeMode="contain"
          />
        </View>
        <View style={styles.groupImageContainer}>
          <Image
            source={Images.group6809}
            style={styles.groupImage}
            resizeMode="contain"
          />
        </View>
      </View>

      <View style={styles.topSection}>
        <AppLogo style={styles.headerLogo}  separatorHeight={35} separatorWidth={2}/>

        <View style={styles.titlesContainer}>
          <Text style={styles.title}>Enter your mobile number</Text>
          <Text style={styles.subtitle}>
            We need to verify you. We will send you a one time verification code.
          </Text>
        </View>

        {/* Input + button (vector is in background layer above) */}
        <View style={styles.formArea}>
          <AppInput
            placeholder="0123456789"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            keyboardType="phone-pad"
            maxLength={10}
            containerStyle={styles.phoneInputContainer}
            innerContainerStyle={styles.phoneInputInner}
            inputStyle={styles.inputStyle}
            leftIcon={
              <View style={styles.leftIconContainer}>
                <Image source={Icons.phone} style={styles.iconImage} />
                <Text style={styles.countryCode}>+91</Text>
              </View>
            }
          />
          <PrimaryButton
            title="Continue"
            onPress={handleContinue}
            variant="secondary"
            style={styles.continueButton}
            textStyle={styles.continueButtonText}
            disabled={phoneNumber.length < 10}
            loading={isSubmitting}
          />
        </View>

        <View style={styles.socialSection}>
          <Text style={styles.socialText}>Or connect with social media</Text>
          <TouchableOpacity style={styles.googleButton} activeOpacity={0.8}>
            <Image
              source={Images.googleIcon}
              style={styles.googleIconCircle}
              resizeMode="cover"
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.primary,
  },
  vectorAndGroupWrap: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 0,
  },
  vectorContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: scale(-75),
    marginBottom: scale(80),
  },
  groupImageContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: width * 0.95,
    height: height * 0.22,
    maxHeight: scale(180),
    marginBottom: scale(320),
  },
  groupImage: {
    width: width,
    height: height * 0.22,
    maxHeight: scale(180),
  },
  formVectorOverlay: {
    position: 'absolute',
    top: height * 0.32,
    left: -width * 0.15,
    width: width * 1.3,
    height: scale(220),
  },
  topSection: {
    flex: 1,
    paddingHorizontal: scale(25),
    paddingTop: scale(60),
    zIndex: 1,
  },
  headerLogo: {
    marginBottom: scale(50),
  },
  titlesContainer: {
    marginBottom: scale(40),
    width: '85%',
  },
  title: {
    ...Theme.typography.h1,
    color: Theme.colors.white,
    fontSize: moderateScale(22),
    fontWeight: '700',
    marginBottom: scale(15),
  },
  subtitle: {
    ...Theme.typography.bodyLarge,
    color: Theme.colors.white,
    fontSize: moderateScale(14),
    opacity: 0.9,
    lineHeight: moderateScale(20),
  },
  formArea: {
    marginTop: scale(50),
    marginBottom: scale(8),
  },
  phoneInputContainer: {
    marginBottom: scale(20),
    backgroundColor: Theme.colors.white,
    borderRadius: scale(14),
    minHeight: scale(56),
    paddingVertical: 0,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  phoneInputInner: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    borderColor: 'transparent',
    height: scale(56),
    paddingHorizontal: scale(16),
  },
  inputStyle: {
    fontSize: moderateScale(18),
    fontWeight: '500',
    color: Theme.colors.text,
    paddingVertical: 0,
  },
  leftIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconImage: {
    width: scale(20),
    height: scale(20),
    tintColor: Theme.colors.textSecondary,
  },
  countryCode: {
    fontSize: moderateScale(17),
    color: Theme.colors.text,
    marginLeft: scale(8),
    marginRight: scale(4),
    fontWeight: '600',
  },
  continueButton: {
    backgroundColor: '#FFCC00',
    height: scale(60),
    borderRadius: scale(12),
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  continueButtonText: {
    fontSize: moderateScale(18),
    fontWeight: 'bold',
    color: Theme.colors.black,
  },
  socialSection: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    minHeight: scale(61),
    marginTop: scale(8),
  },
  socialText: {
    color: Theme.colors.white,
    fontSize: moderateScale(16),
    fontWeight: '500',
    marginBottom: scale(40),
  },
  googleButton: {
    width: scale(56),
    height: scale(56),
    backgroundColor: Theme.colors.white,
    borderRadius: scale(10),
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  googleIconCircle: {
    width: scale(25),
    height: scale(25),
    borderRadius: scale(10),
  },
});
