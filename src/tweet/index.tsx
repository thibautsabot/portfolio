import {
  AnimatedTwitterIcon,
  Footer,
  Handle,
  Header,
  Intent,
  Intents,
  Name,
  NamesContainer,
  ProfilePicture,
  Text,
  TweetContainer,
  TwitterIcon,
  TwitterIconContainer,
} from "./Style";
import { ReactElement, useContext } from "react";

import Image from "next/image";
import Like from "./assets/like.svg";
import Reply from "./assets/reply.svg";
import Retweet from "./assets/retweet.svg";
import { ThemeContext } from "styled-components";
import { Tweet as TweetType } from "../../pages/twitter";
import Verified from "./assets/verified.svg";
import twitter from "./assets/twitter.png";
import twitterAnimated from "./assets/twitterAnimated.gif";

function formatDate(date: string): string {
  return new Intl.DateTimeFormat("en-US", {
    minute: "numeric",
    hour: "numeric",
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

export default function Tweet({
  id,
  text,
  verified,
  authorName,
  authorHandle,
  likeCount,
  retweetCount,
  replyCount,
  date,
  profilePictureUrl,
  authorDesc,
}: TweetType): ReactElement {
  const themeContext = useContext(ThemeContext);

  return (
    <TweetContainer>
      <Header href={`https://twitter.com/${authorHandle}`} title={authorDesc}>
        <ProfilePicture
          alt={`${authorName}'s avatar`}
          src={profilePictureUrl}
        />
        <NamesContainer>
          <Name>
            {authorName}&nbsp;
            {verified && (
              <Verified fill={themeContext.subColor} width={20} height={20} />
            )}
          </Name>
          <Handle>@{authorHandle}</Handle>
        </NamesContainer>
      </Header>
      <TwitterIconContainer
          href={`https://twitter.com/${authorHandle}/status/${id}`}
        >
          <TwitterIcon>
            <Image
              src={twitter}
              alt="see on twitter"
              width={40}
              height={40}
              layout="fixed"
            />
          </TwitterIcon>
          <AnimatedTwitterIcon>
            <Image
              title="See it on twitter !"
              src={twitterAnimated}
              alt="see on twitter"
              width={40}
              height={40}
              layout="fixed"
            />
          </AnimatedTwitterIcon>
        </TwitterIconContainer>
      <Text>{text}</Text>
      {date && <Footer>{formatDate(date)}</Footer>}
      <Intents>
        <Intent
          hoverColor="#1D9BF0"
          href={`https://twitter.com/intent/tweet?in_reply_to=${id}`}
        >
          <Reply
            fill={themeContext.subColor}
            alt="reply intent"
            width={24}
            height={24}
          />
          &nbsp;{replyCount}
        </Intent>
        <Intent
          hoverColor="#00BA7C"
          href={`https://twitter.com/intent/retweet?tweet_id=${id}`}
        >
          <Retweet
            fill={themeContext.subColor}
            alt="retweet intent"
            width={24}
            height={24}
          />
          &nbsp;{retweetCount}
        </Intent>
        <Intent
          hoverColor="#F91880"
          href={`https://twitter.com/intent/like?tweet_id=${id}`}
        >
          <Like
            fill={themeContext.subColor}
            alt="like intent"
            width={24}
            height={24}
          />
          &nbsp;{likeCount}
        </Intent>
      </Intents>
    </TweetContainer>
  );
}
