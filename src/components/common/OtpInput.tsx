import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Theme } from '../../theme';
import { scale, moderateScale } from '../../utils/scale';

interface OtpInputProps {
  length?: number;
  onComplete: (otp: string) => void;
  onVerify?: () => void;
  /** 'green' = Figma OTP screen: filled = light yellow, empty = white with dot */
  variant?: 'default' | 'green';
}

const OTP_YELLOW_FILLED = '#FFF4CC';
const OTP_BORDER_GREEN = 'rgba(255,255,255,0.4)';

export const OtpInput: React.FC<OtpInputProps> = ({
  length = 6,
  onComplete,
  onVerify,
  variant = 'default',
}) => {
  const [otp, setOtp] = useState<string[]>(Array(length).fill(''));
  const inputRefs = useRef<TextInput[]>([]);

  const handleChange = (text: string, index: number) => {
    if (text.length > 1) {
      text = text[text.length - 1];
    }
    if (text && !/^\d+$/.test(text)) {
      return;
    }

    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    const otpString = newOtp.join('');
    if (otpString.length === length) {
      onComplete(otpString);
    }
  };

  const handleKeyPress = (key: string, index: number) => {
    if (key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleFocus = (index: number) => {
    if (otp[index]) {
      inputRefs.current[index]?.setNativeProps({ text: '' });
    }
  };

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const isGreen = variant === 'green';

  return (
    <View style={styles.container}>
      <View style={[styles.otpContainer, isGreen && styles.otpContainerGreen]}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            ref={(ref) => {
              if (ref) inputRefs.current[index] = ref;
            }}
            style={[
              styles.otpBox,
              isGreen ? styles.otpBoxGreen : null,
              digit
                ? isGreen
                  ? styles.otpBoxGreenFilled
                  : styles.otpBoxFilled
                : isGreen
                  ? styles.otpBoxGreenEmpty
                  : null,
            ]}
            value={digit}
            placeholder={isGreen && !digit ? '•' : undefined}
            placeholderTextColor="rgba(0,0,0,0.25)"
            onChangeText={(text) => handleChange(text, index)}
            onKeyPress={({ nativeEvent }) => handleKeyPress(nativeEvent.key, index)}
            onFocus={() => handleFocus(index)}
            keyboardType="number-pad"
            maxLength={1}
            selectTextOnFocus
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Theme.spacing.xl,
  },
  otpContainerGreen: {
    marginBottom: 0,
  },
  otpBox: {
    width: scale(48),
    height: scale(56),
    borderRadius: scale(12),
    borderWidth: 1.5,
    borderColor: Theme.colors.border,
    backgroundColor: Theme.colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    fontSize: moderateScale(24),
    fontWeight: '600',
    color: Theme.colors.text,
  },
  otpBoxFilled: {
    borderColor: Theme.colors.primary,
    backgroundColor: Theme.colors.white,
  },
  otpBoxGreen: {
    borderColor: OTP_BORDER_GREEN,
    backgroundColor: Theme.colors.white,
  },
  otpBoxGreenEmpty: {
    backgroundColor: Theme.colors.white,
    borderColor: OTP_BORDER_GREEN,
  },
  otpBoxGreenFilled: {
    backgroundColor: OTP_YELLOW_FILLED,
    borderColor: OTP_YELLOW_FILLED,
    color: Theme.colors.black,
  },
});
