import { PartyType } from '../entities/contract-party.entity';

export interface IContractPartyEntity {
  contractId: string;
  companyId: string;
  partyType: PartyType;
  signatoryFirstName: string;
  signatoryLastName: string;
  signatoryTitle: string;
  signedAt: Date;
}

// IGetUserResponse for interface
// GetUserResponseDto IGetUserResponseDto for Dto
