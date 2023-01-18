import {
  BaseProvider,
  DelegateStat,
  DelegateStatPeriod,
  GetDaoScore,
  ScoreBreakdownCalc,
  ScoreMultiplier,
} from "./interfaces";

export class IdleDaoScoreProvider extends BaseProvider implements GetDaoScore {
  weights: ScoreMultiplier;

  preload(daoName: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  getForumScore(stat: Partial<DelegateStat>): number {
    return (
      Math.round(
        (stat.proposalsInitiated || 0) * 10 +
          (stat.proposalsDiscussed || 0) * 2 +
          (stat.forumPostCount || 0) +
          (stat.forumTopicCount || 0) * 3 +
          (stat.forumLikesReceived || 0) * 0.5 +
          (stat.forumPostsReadCount || 0) * 0.1
      ) || 0
    );
  }

  getKarmaScore(stat: Partial<DelegateStat>, median: number): number {
    return (
      Math.round(
        stat.delegatedVotes * 0.1 +
          (stat.forumActivityScore || 0) +
          (stat.offChainVotesPct || 0) * 3 +
          (stat.onChainVotesPct || 0) * 5 +
          (stat.discordMessagesCount || 0) * 0.01
      ) || 0
    );
  }

  getKarmaScoreProps(): (keyof Partial<DelegateStat> | "median")[] {
    return [
      "delegatedVotes",
      "forumActivityScore",
      "offChainVotesPct",
      "onChainVotesPct",
      "discordMessagesCount",
    ];
  }

  getScoreBreakdownCalc(
    stat: Partial<DelegateStat>,
    period?: DelegateStatPeriod
  ): ScoreBreakdownCalc {
    throw new Error("Method not implemented.");
  }
}
