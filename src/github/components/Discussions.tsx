import { BlockContainer, Content, Title } from './Container'

import { DiscussionCommentEdge } from "@octokit/graphql-schema";
import Image from "next/image";
import Link from "next/link";
import MarqueeDescription from "../../components/MarqueeDescription";
import { ReactElement } from 'react'
import styled from "styled-components";
import upvote from "../assets/upvote.png";

interface Props {
  discussions: DiscussionCommentEdge[];
}

const DiscussionsContainer = styled(BlockContainer)`
  box-shadow: 0px 2px 10px 4px #f4a1f9;

  @media (min-width: 960px) {
    width: 450px;
  }
`;

const ContentContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  width: 100%;
`;

const Upvotes = styled.p`
  position: absolute;
  bottom: -10px;
  left: -5px;
  border-radius: 50px;
  width: 15px;
  height: 15px;
  font-size: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #45d25a;
`;

const MarqueeContainer = styled.a`
  width: 95%;
`

export default function Discussions({ discussions }: Props): ReactElement {
  return (
    <DiscussionsContainer>
      <Title>Discussions</Title>
      <Content>
        {discussions?.map(({ node }) => (
          <ContentContainer key={node?.id}>
            <Image layout="fixed" src={upvote} width={18} height={30} alt="upvotes" />
            <Upvotes>{node?.upvoteCount}</Upvotes>
            <Link passHref href={node?.url}>
              <MarqueeContainer>
                <MarqueeDescription>
                  [{node?.discussion?.repository?.name}] - {node?.bodyText}
                </MarqueeDescription>
              </MarqueeContainer>
            </Link>
          </ContentContainer>
        ))}
      </Content>
    </DiscussionsContainer>
  );
}
