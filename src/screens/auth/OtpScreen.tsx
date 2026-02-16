import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  StatusBar,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { PrimaryButton } from '../../components/common/PrimaryButton';
import { OtpInput } from '../../components/common/OtpInput';
import { Theme } from '../../theme';
import { Routes } from '../../navigation/routes';
import { Images } from '../../assets/images';
import { Icons } from '../../assets/icons';
import { scale, moderateScale } from '../../utils/scale';

const { width, height } = Dimensions.get('window');
const RESEND_COUNTDOWN_SECONDS = 90;

export const OtpScreen = () => {
  const [otpValue, setOtpValue] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [resendSeconds, setResendSeconds] = useState(RESEND_COUNTDOWN_SECONDS);
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { phoneNumber } = route.params || { phoneNumber: '9856321475' };

  useEffect(() => {
    if (resendSeconds <= 0) return;
    const t = setInterval(() => setResendSeconds((s) => s - 1), 1000);
    return () => clearInterval(t);
  }, [resendSeconds]);

  const handleOtpComplete = (otp: string) => {
    setOtpValue(otp);
  };

  const handleVerify = () => {
    if (otpValue.length === 6) {
      setIsVerifying(true);
      setTimeout(() => {
        setIsVerifying(false);
        navigation.navigate(Routes.MAIN_TABS);
      }, 1000);
    }
  };

  const handleResend = () => {
    if (resendSeconds > 0) return;
    setResendSeconds(RESEND_COUNTDOWN_SECONDS);
    console.log('Resending OTP...');
  };

  const formatTimer = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${String(m).padStart(2, '0')}.${String(s).padStart(2, '0')}`;
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Theme.colors.primary} />
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        {/* Vector + Group image: single wrap, doesn't affect layout (same as Login) */}
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

        <View style={styles.content}>
          {/* Header: green bar, white back + title (matches Figma) */}
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.backButton}
              hitSlop={{ top: 12, bottom: 12, left: 20, right: 20 }}
            >
              <Image source={Icons.arrowBack} style={styles.backArrowText} resizeMode="contain" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Verify Number</Text>
          </View>

          <Text style={styles.title}>Enter Verification Code</Text>
          <Text style={styles.subtitle}>Enter your OTP code below</Text>

        <OtpInput
          length={6}
          onComplete={handleOtpComplete}
          onVerify={handleVerify}
          variant="green"
        />

        <PrimaryButton
          title="Verify & Continue"
          onPress={handleVerify}
          variant="secondary"
          style={styles.verifyButton}
          textStyle={styles.verifyButtonText}
          disabled={otpValue.length !== 6 || isVerifying}
          loading={isVerifying}
        />

        <TouchableOpacity
          style={styles.resendContainer}
          onPress={handleResend}
          activeOpacity={0.7}
          disabled={resendSeconds > 0}
        >
          <Text style={styles.resendText}>
            Didn't receive OTP? <Text style={styles.resendLink}>Resend</Text>
          </Text>
        </TouchableOpacity>

        <View style={styles.timerRow}>
          <Image source={Icons.time} style={styles.timeImage} resizeMode="contain" />
          <Text style={styles.timerText}>{formatTimer(resendSeconds)}</Text>
        </View>
      </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.primary,
  },
  safeArea: {
    flex: 1,
  },
  vectorAndGroupWrap: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 0,
  },
  vectorContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -75,
    marginBottom: 80,
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
  content: {
    flex: 1,
    paddingHorizontal: scale(25),
    paddingTop: scale(16),
    zIndex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: scale(80),
  },
  backButton: {
    paddingLeft: 0,
    paddingVertical: scale(4),
    paddingRight: scale(8),
    marginRight: scale(4),
  },
  backArrowText: {
    width: scale(24),
    height: scale(24),
    tintColor: Theme.colors.white,
  },
  headerTitle: {
    fontSize: moderateScale(18),
    fontWeight: '600',
    color: Theme.colors.white,
  },
  title: {
    ...Theme.typography.h1,
    color: Theme.colors.white,
    fontSize: moderateScale(22),
    fontWeight: '700',
    marginBottom: scale(20),
  },
  subtitle: {
    ...Theme.typography.bodyMedium,
    color: Theme.colors.white,
    fontSize: moderateScale(14),
    opacity: 0.9,
    marginBottom: scale(80),
  },
  verifyButton: {
    height: scale(56),
    borderRadius: scale(12),
    marginTop: scale(24),
    marginBottom: scale(16),
  },
  verifyButtonText: {
    color: Theme.colors.black,
    fontWeight: '700',
    fontSize: moderateScale(16),
  },
  resendContainer: {
    alignItems: 'center',
    marginBottom: scale(60),
  },
  resendText: {
    ...Theme.typography.bodyMedium,
    color: Theme.colors.white,
    fontSize: moderateScale(14),
  },
  resendLink: {
    color: Theme.colors.secondary,
    fontWeight: '600',
    textDecorationLine: 'none',
  },
  timerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: scale(6),
  },
  timerText: {
    color: Theme.colors.white,
    fontSize: moderateScale(14),
    fontWeight: '500',
  },
  timeImage: {
    width: scale(18),
    height: scale(18),
    tintColor: Theme.colors.white,
  },
});
