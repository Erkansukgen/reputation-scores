import { DefaultDaoScoreProvider } from "./default-dao-score.provider";
import { DelegateStat } from "./interfaces";
export declare class GitcoinDaoPercentileScoreProvider extends DefaultDaoScoreProvider {
    getKarmaScore(stat: Partial<DelegateStat>): number;
    getForumScore(stat: Partial<DelegateStat>): number;
}
