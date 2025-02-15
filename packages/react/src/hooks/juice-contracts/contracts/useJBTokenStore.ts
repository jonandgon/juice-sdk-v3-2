/**
 * THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
 */
import { useContext } from 'react';
import { getJBTokenStore } from '../../../../../core/src';

import { JuiceContext } from '../../../contexts/JuiceContext';

export function useJBTokenStore() {
  const { provider, networkName } = useContext(JuiceContext);
  if (!provider) return;

  return getJBTokenStore(provider, { network: networkName ?? 'mainnet' });
}
