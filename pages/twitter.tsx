import Head from "next/head";
import Layout from "../src/Layout";
import { ReactElement } from "react";
import { Tweetv2TimelineResult } from "twitter-api-v2";
import Tweet from '../src/tweet'

export interface Tweet {
  id: string
  text: string
  verified: boolean | null
  authorName: string | null
  authorHandle: string | null
  likeCount: number | null
  retweetCount: number | null
  replyCount: number | null
  date?: string
}

interface Props {
  tweets: Tweet[];
}

export default function TwitterPage({ tweets }: Props): ReactElement {
  return (
    <Layout>
      <Head>
        <title key="title">Twitter</title>
        <meta name="description" content="Thibautsabot Twitter Dashboard" />
      </Head>
      {tweets.map((tweet) => <Tweet key={tweet.id} {...tweet} />)}
    </Layout>
  );
}

export async function getServerSideProps(): Promise<{props: { tweets: Tweet[]}}> {
  const tweets: Tweetv2TimelineResult = await (
    await fetch(
      "https://api.twitter.com/2/users/239830132/tweets?max_results=8&tweet.fields=public_metrics,referenced_tweets,created_at,entities&expansions=entities.mentions.username&user.fields=created_at,verified,profile_image_url,description",
      {
        headers: {
          Authorization: `Bearer ${process.env.TWITTER_API_KEY}`,
        },
      }
    )
  ).json();
      console.log(tweets)
  const formattedTweets = tweets.data.map((tweet) => {
    const author = tweets.includes?.users?.find(
      (user) => user.id === tweet.author_id
    );

    return {
      id: tweet.id,
      text: tweet.text,
      verified: author?.verified ?? null,
      authorName: author?.name ?? null,
      authorHandle: author?.username ?? null,
      likeCount: tweet.public_metrics?.like_count ?? 0,
      retweetCount: tweet.public_metrics?.retweet_count ?? 0,
      replyCount: tweet.public_metrics?.reply_count ?? 0,
      date: tweet.created_at ?? '',
    };
  });

  return {
    props: {
      tweets: formattedTweets,
    },
  };
}
