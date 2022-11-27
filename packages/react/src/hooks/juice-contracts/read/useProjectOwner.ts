import { ContractReadHookResponse, ProjectId } from '../../../types';
import { useContractRead } from '../../useContractRead';
import { JBProjects } from '../../../../../core/src';
import { useJBProjects } from '../contracts/useJBProjects';

type DataType = string;

export default function useProjectOwner({
  projectId,
}: {
  projectId: ProjectId;
}): ContractReadHookResponse<DataType> {
  const contract = useJBProjects();
  if (!contract) return { data: undefined, loading: false, error: undefined };

  return useContractRead<JBProjects, DataType>({
    contract,
    functionName: 'ownerOf',
    args: [projectId],
  });
}
