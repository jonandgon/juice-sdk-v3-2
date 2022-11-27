import { useContext, useEffect } from 'react';
import {
  FundingCycleData,
  FundingCycleMetadata,
} from '../../../types/fundingCycle';
import { ContractReadHookResponse, ProjectId } from '../../../types';
import { JuiceContext } from '../../../contexts/JuiceContext';
import { useContractReadState } from '../../../hooks/state/useContractReadState';
import { useJBController } from '../contracts/useJBController';

type DataType = {
  fundingCycleData: FundingCycleData;
  fundingCycleMetadata: FundingCycleMetadata;
};

export default function useProjectQueuedFundingCycle({
  projectId,
}: {
  projectId: ProjectId;
}): ContractReadHookResponse<DataType> {
  const { provider } = useContext(JuiceContext);
  const {
    loading,
    data,
    error,
    actions: { setLoading, setData, setError },
  } = useContractReadState<DataType>();

  const contract = useJBController();

  useEffect(() => {
    if (!contract) return;

    setLoading(true);

    contract
      .queuedFundingCycleOf(projectId)
      .then(data => {
        setLoading(false);
        setData({
          fundingCycleData: data?.[0],
          fundingCycleMetadata: {...data?.[1], allowChangeToken:false},
        });
      })
      .catch(e => {
        setError(e);
      });
  }, [projectId, setLoading, setData, setError, provider]);

  return { loading, data, error };
}
