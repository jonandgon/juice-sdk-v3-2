/**
 * THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
 */
import { useContext } from 'react';
import { getJBProjects } from '../../../../../core/src';

import { JuiceContext } from '../../../contexts/JuiceContext';

export function useJBProjects() {
  const { provider, networkName } = useContext(JuiceContext);
  if (!provider) return;

  return getJBProjects(provider, { network: networkName ?? 'mainnet' });
}
