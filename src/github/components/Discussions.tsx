import { DiscussionCommentEdge } from "@octokit/graphql-schema";
import Image from "next/image";
import Link from "next/link";
import MarqueeDescription from "../../components/MarqueeDescription";
import styled from "styled-components";
import upvote from "../assets/upvote.png";

interface Props {
  discussions: DiscussionCommentEdge[];
}

const DiscussionsContainer = styled.div`
  width: 480px;
  box-shadow: 8px 8px 5px #f4a1f9;
  border-radius: 5px;
  margin: 25px;
  height: 100%;
`;

const Title = styled.h1`
  font-weight: bold;
  display: block;
  font-size: 12px;
  font-family: monospace;
  margin: 0;
  text-align: center;
  padding: 5px;
  background-color: #dedede;
  margin: 0 auto;
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
`;

const Content = styled.div`
  background-color: #151515;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
`;

const ContentContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

const Upvotes = styled.p`
  position: absolute;
  bottom: -10px;
  left: 15px;
  border-radius: 50px;
  width: 15px;
  height: 15px;
  font-size: 10px;
  display: flex;
  justify-content: center;
  background-color: #45d25a;
`;

export default function Discussions({ discussions }: Props) {
  return (
    <DiscussionsContainer>
      <Title>Discussions</Title>
      <Content>
        {discussions.map(({ node }) => (
          <ContentContainer key={node.id}>
            <Image src={upvote} width={30} height={30} alt="upvotes" />
            <Upvotes>{node.upvoteCount}</Upvotes>
            <Link href={node.url}>
              <a>
                <MarqueeDescription containerWidth={430}>
                  [{node.discussion.repository.name}] - {node.bodyText}
                </MarqueeDescription>
              </a>
            </Link>
          </ContentContainer>
        ))}
      </Content>
    </DiscussionsContainer>
  );
}
