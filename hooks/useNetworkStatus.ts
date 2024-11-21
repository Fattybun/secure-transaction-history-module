import { useState } from "react";
import * as Network from "expo-network";

export const useNetworkStatus = () => {
  const [isConnected, setIsConnected] = useState(false);

  const checkNetworkConnection = async () => {
    try {
      const networkState = await Network.getNetworkStateAsync();
      const isWifiOrCellular =
        networkState.type === Network.NetworkStateType.WIFI ||
        networkState.type === Network.NetworkStateType.CELLULAR;

      setIsConnected(isWifiOrCellular);

      if (!isWifiOrCellular) {
        throw new Error("No network connection available");
      }

      return isWifiOrCellular;
    } catch (error) {
      setIsConnected(false);
      throw error;
    }
  };

  return { isConnected, checkNetworkConnection };
};
