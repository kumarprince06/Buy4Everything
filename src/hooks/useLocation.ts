import { useState } from 'react';

const DEFAULT_LOCATION = '124B, 34 Street, Kol-54...';

export const useLocation = () => {
  const [currentLocation, setCurrentLocation] = useState<string>(DEFAULT_LOCATION);
  const [locationModalVisible, setLocationModalVisible] = useState(false);

  const openLocationModal = () => setLocationModalVisible(true);
  const closeLocationModal = () => setLocationModalVisible(false);
  const updateLocation = (location: string) => {
    setCurrentLocation(location);
    closeLocationModal();
  };

  return {
    currentLocation,
    locationModalVisible,
    openLocationModal,
    closeLocationModal,
    updateLocation,
  };
};
