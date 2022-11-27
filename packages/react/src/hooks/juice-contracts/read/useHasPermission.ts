import { useContext, useEffect } from 'react';
import { ContractReadHookResponse, ProjectId } from '../../../types';
import useProjectOwner from './useProjectOwner';
import { JuiceContext } from '../../../contexts/JuiceContext';
import { useContractReadState } from '../../../hooks/state/useContractReadState';
import { useJBOperatorStore } from '../contracts/useJBOperatorStore';

export enum V2OperatorPermission {
  'RECONFIGURE' = 1,
  'REDEEM' = 2,
  'MIGRATE_CONTROLLER' = 3,
  'MIGRATE_TERMINAL' = 4,
  'PROCESS_FEES' = 5,
  'SET_METADATA' = 6,
  'ISSUE' = 7,
  'CHANGE_TOKEN' = 8,
  'MINT' = 9,
  'BURN' = 10,
  'CLAIM' = 11,
  'TRANSFER' = 12,
  'REQUIRE_CLAIM' = 13,
  'SET_CONTROLLER' = 14,
  'SET_TERMINALS' = 15,
  'SET_PRIMARY_TERMINAL' = 16,
  'USE_ALLOWANCE' = 17,
  'SET_SPLITS' = 18,
}

type DataType = boolean;

export default function useHasPermission({
  address,
  projectId,
  permission,
}: {
  address: string;
  projectId: ProjectId;
  permission: V2OperatorPermission | V2OperatorPermission[];
}): ContractReadHookResponse<DataType> {
  const { data: owner } = useProjectOwner({ projectId });

  const { provider } = useContext(JuiceContext);
  const {
    loading,
    data,
    error,
    actions: { setLoading, setData, setError },
  } = useContractReadState<DataType>();

  const contract = useJBOperatorStore();

  useEffect(() => {
    if (!contract) return;

    setLoading(true);

    if (owner === address) {
      setLoading(false);
      setData(true);
      return;
    }

    contract
      .hasPermissions(
        address,
        owner ?? '',
        projectId,
        Array.isArray(permission) ? permission : [permission],
      )
      .then(hasPermissions => {
        setLoading(false);
        setData(hasPermissions);
      })
      .catch(e => {
        setError(e);
      });
  }, [
    projectId,
    setLoading,
    setData,
    setError,
    provider,
    address,
    permission,
    owner,
  ]);

  return { loading, data, error };
}
