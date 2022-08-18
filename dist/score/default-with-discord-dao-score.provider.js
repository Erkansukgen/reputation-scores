"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultWithDiscordDaoScoreProvider = void 0;
const interfaces_1 = require("./interfaces");
class DefaultWithDiscordDaoScoreProvider extends interfaces_1.BaseProvider {
  getForumScore(stat) {
    return (
      Math.round(
        stat.proposalsInitiated * 10 +
          stat.proposalsDiscussed * 2 +
          stat.forumPostCount +
          stat.forumTopicCount * 3 +
          stat.forumLikesReceived * 0.5 +
          stat.forumPostsReadCount * 0.1
      ) || 0
    );
  }
  getKarmaScore(stat, median) {
    return (
      Math.round(
        stat.forumActivityScore +
          (stat.offChainVotesPct || 0) * 3 +
          (stat.onChainVotesPct || 0) * 5 +
          (stat.discordMessagesCount || 0) * 0.01
      ) || 0
    );
  }
  getKarmaScoreProps() {
    return ["forumActivityScore", "offChainVotesPct", "onChainVotesPct"];
  }
}
exports.DefaultWithDiscordDaoScoreProvider = DefaultWithDiscordDaoScoreProvider;
