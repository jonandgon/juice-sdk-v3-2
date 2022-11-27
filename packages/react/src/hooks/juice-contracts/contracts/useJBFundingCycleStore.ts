/**
 * THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
 */
import { useContext } from 'react';
import { getJBFundingCycleStore } from 'juice-sdk-v3/src';

import { JuiceContext } from '../../../contexts/JuiceContext';

export function useJBFundingCycleStore() {
  const { provider, networkName } = useContext(JuiceContext);
  if (!provider) return;

  return getJBFundingCycleStore(provider, { network: networkName ?? 'mainnet' });
}
