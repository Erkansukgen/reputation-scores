export interface DaoProviderDescriptor {
  cls: string;
  args: unknown[];
}

export enum DelegateStatPeriod {
  lifetime = "lifetime",
  "7d" = "7d",
  "30d" = "30d",
  "90d" = "90d",
  "180d" = "180d",
  "1y" = "1y",
}

export interface DelegateStat {
  id: number;
  delegateId: number;
  period: DelegateStatPeriod;
  daoName: string;
  karmaScore: number;
  karmaRank: number;
  forumActivityScore: number;
  forumLikesReceived: number;
  forumPostsReadCount: number;
  proposalsInitiated: number;
  proposalsDiscussed: number;
  forumTopicCount: number;
  forumPostCount: number;
  delegatedVotes: number;
  offChainVotesPct: number;
  onChainVotesPct: number;
  percentile: number;
  createdAt: Date;
  updatedAt: Date;
  discordMessagesCount: number;
  deworkPoints: number;
  discordMessagePercentile: number;
  proposalsInitiatedPercentile: number;
  proposalsDiscussedPercentile: number;
  forumPostCountPercentile: number;
  forumTopicCountPercentile: number;
  forumLikesReceivedPercentile: number;
  forumPostsReadCountPercentile: number;
}

export abstract class BaseProvider {
  private readonly args: unknown[];
  protected multipliers: ScoreMultiplier;

  constructor(...args: unknown[]) {
    this.args = args;
  }

  abstract preload(daoName: string): Promise<void>;

  toProviderDescriptor(): DaoProviderDescriptor {
    return {
      cls: this.constructor.name,
      args: this.args,
    };
  }
}

export interface GetDaoScore {
  getKarmaScore(stat: Partial<DelegateStat>, median: number): number;
  getForumScore(stat: Partial<DelegateStat>): number;
  getKarmaScoreProps(): (keyof Partial<DelegateStat> | "median")[];
}

export interface AdditionalScoreProvider {
  preload(): Promise<void>;
  isPublicAddressEligible(publicAddress: string): Promise<boolean>;
  getScore(publicAddress: string, stat: Partial<DelegateStat>): Promise<number>;
}

export interface MultiplierType {
  "7d": Record<string, number>;
  "180d": Record<string, number>;
  "90d": Record<string, number>;
  "30d": Record<string, number>;
  lifetime: Record<string, number>;
}
interface WorkstreamInvolvement {
  lead: number;
  contributor: number;
  none: number;
}
export interface ScoreMultiplier {
  score: MultiplierType;
  healthScore?: MultiplierType;
  forumScore?: MultiplierType;
  workstreamInvolvement?: WorkstreamInvolvement;
}
