import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Theme } from '../../theme';
import { AppInput } from '../common/AppInput';
import { PrimaryButton } from '../common/PrimaryButton';
import { Icons } from '../../assets/icons';
import { Image } from 'react-native';

interface LocationSelectionModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: (location: string) => void;
}

export const LocationSelectionModal: React.FC<LocationSelectionModalProps> = ({
  visible,
  onClose,
  onConfirm,
}) => {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>Select Location</Text>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.closeText}>✕</Text>
            </TouchableOpacity>
          </View>

          <AppInput
            placeholder="Search for area, street name..."
            value=""
            onChangeText={() => {}}
            leftIcon={<Text>🔍</Text>}
          />

          <TouchableOpacity style={styles.currentLocationBtn}>
            <Image source={Icons.location} style={styles.locationIcon} />
            <Text style={styles.currentLocationText}>Use current location</Text>
          </TouchableOpacity>

          <Text style={styles.sectionTitle}>Saved Addresses</Text>
          <ScrollView style={styles.savedAddresses}>
            {['Home - 70 Washington Square South', 'Office - 231 Madison Ave'].map((addr, i) => (
                <TouchableOpacity key={i} style={styles.addressItem} onPress={() => onConfirm(addr)}>
                    <Text style={styles.addressName}>{addr}</Text>
                </TouchableOpacity>
            ))}
          </ScrollView>

          <PrimaryButton
            title="Confirm Location"
            onPress={() => onConfirm('Selected Location')}
            style={styles.confirmBtn}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: Theme.colors.overlayDark,
    justifyContent: 'flex-end',
  },
  container: {
    backgroundColor: Theme.colors.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: Theme.spacing.l,
    minHeight: 400,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Theme.spacing.l,
  },
  title: {
    ...Theme.typography.h2,
  },
  closeText: {
    fontSize: 24,
    color: Theme.colors.textSecondary,
  },
  currentLocationBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Theme.spacing.m,
    borderBottomWidth: 1,
    borderBottomColor: Theme.colors.border,
    marginBottom: Theme.spacing.m,
  },
  locationIcon: {
    width: 15,
    height: 15,
    marginRight: 8,
    tintColor: Theme.colors.primary,
  },
  currentLocationText: {
    ...Theme.typography.bodyMedium,
    color: Theme.colors.primary,
    fontWeight: '600',
  },
  sectionTitle: {
    ...Theme.typography.bodySmall,
    fontWeight: '700',
    color: Theme.colors.textSecondary,
    marginBottom: Theme.spacing.s,
  },
  savedAddresses: {
    maxHeight: 200,
  },
  addressItem: {
    paddingVertical: Theme.spacing.m,
    borderBottomWidth: 1,
    borderBottomColor: Theme.colors.border,
  },
  addressName: {
    ...Theme.typography.bodyMedium,
  },
  confirmBtn: {
    marginTop: Theme.spacing.l,
  },
});
