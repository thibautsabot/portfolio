import { Tweet as TweetType } from "../../pages/twitter";
import styled from "styled-components";
import { ReactElement } from "react";

export default function Tweet({
  text,
  verified,
  authorName,
  authorHandle,
  likeCount,
  retweetCount,
  replyCount,
  date,
}: TweetType): ReactElement {
  console.log("text : ", text);
  console.log("verified : ", verified);
  console.log("authorName : ", authorName);
  console.log("authorHandle : ", authorHandle);
  console.log("likeCount : ", likeCount);
  console.log("retweetCount : ", retweetCount);
  console.log("replyCount : ", replyCount);
  console.log("date : ", date);
  console.log('----------------------')
  return <div>{text}</div>;
}
