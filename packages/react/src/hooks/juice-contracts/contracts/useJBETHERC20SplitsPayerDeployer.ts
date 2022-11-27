/**
 * THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
 */
import { useContext } from 'react';
import { getJBETHERC20SplitsPayerDeployer } from 'juice-sdk-v3/src';

import { JuiceContext } from '../../../contexts/JuiceContext';

export function useJBETHERC20SplitsPayerDeployer() {
  const { provider, networkName } = useContext(JuiceContext);
  if (!provider) return;

  return getJBETHERC20SplitsPayerDeployer(provider, { network: networkName ?? 'mainnet' });
}
