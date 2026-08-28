export type ContractStage =
  | 'BID'
  | 'AWARD'
  | 'MOBILIZATION'
  | 'EXECUTION'
  | 'COMPLETION'
  | 'COMMISSIONING'
  | 'CLOSED';

export type ContractSummary = {
  id: string;
  reference: string;
  title: string;
  stage: ContractStage;
  status: 'ACTIVE' | 'ON_HOLD' | 'BLOCKED' | 'COMPLETED' | 'CANCELLED';
};