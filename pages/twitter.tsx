import { Tweetv2TimelineResult, UserV2 } from "twitter-api-v2";

import Head from "next/head";
import { ReactElement } from "react";
import Tweet from "../src/tweet";

export interface Tweet {
  id: string;
  text: string;
  verified: boolean | null;
  authorName: string | null;
  authorHandle: string | null;
  likeCount: number | null;
  retweetCount: number | null;
  replyCount: number | null;
  date?: string;
  profilePictureUrl: string;
  authorDesc: string
}

interface Props {
  tweets: Tweet[];
}

export default function TwitterPage({ tweets }: Props): ReactElement {
  return (
    <>
      <Head>
        <title key="title">Twitter</title>
        <meta name="description" content="Thibautsabot Twitter Dashboard" />
      </Head>
      {tweets.map((tweet) => (
        <Tweet key={tweet.id} {...tweet} />
      ))}
    </>
  );
}

export async function getServerSideProps(): Promise<{
  props: { tweets: Tweet[] };
}> {
  const tweets: Tweetv2TimelineResult = await (
    await fetch(
      "https://api.twitter.com/2/users/239830132/tweets?max_results=8&tweet.fields=public_metrics,referenced_tweets,created_at,entities&expansions=entities.mentions.username,referenced_tweets.id&user.fields=created_at,verified,profile_image_url,description",
      {
        headers: {
          Authorization: `Bearer ${process.env.TWITTER_API_KEY}`,
        },
      }
    )
  ).json();

  const formattedTweets = tweets.data.map((tweet) => {
    const me = {
      id: "239830132",
      name: "Thibaut Sabot",
      username: "thibautsabot",
      verified: false,
      description: 'Frontend Tech Lead @leboncoin',
      profile_image_url:
        "https://pbs.twimg.com/profile_images/578218524000149504/mMYvAxUY_normal.jpeg",
    };

    const author: UserV2 =
      tweets.includes?.users?.find(
        (user) =>
          tweet.entities?.mentions?.[0].start === 3 &&
          // @ts-ignore `id` exists but is not in the TS definition for some reason
          user.id === tweet.entities?.mentions?.[0].id
      ) || me;

    const fullInfos =
      tweets.includes?.tweets?.find(
        (extendedTweet) =>
          tweet.referenced_tweets?.[0].type === "retweeted" &&
          extendedTweet.id === tweet?.referenced_tweets?.[0]?.id
      ) || tweet;

    return {
      id: tweet.id,
      text: fullInfos.text,
      verified: author?.verified ?? null,
      authorName: author?.name ?? null,
      authorHandle: author?.username ?? null,
      likeCount: fullInfos.public_metrics?.like_count ?? 0,
      retweetCount: fullInfos.public_metrics?.retweet_count ?? 0,
      replyCount: fullInfos.public_metrics?.reply_count ?? 0,
      date: tweet.created_at ?? "",
      profilePictureUrl: author?.profile_image_url ?? "",
      authorDesc: author?.description ?? ''
    };
  });

  return {
    props: {
      tweets: formattedTweets,
    },
  };
}
