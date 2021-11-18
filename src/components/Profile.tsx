import Image from "next/image";
import { ReactElement } from 'react'
import styled from "styled-components";

const FaceImage = styled(Image)`
  border-radius: 100%;
`;

const AvatarImage = styled.div`
  position: absolute;
  bottom: 0px;
  right: 0px;
  border-radius: 100%;
`;

const PicturesContainer = styled.div`
  position: relative;
  width: fit-content;
  height: 200px;
  margin-right: 20px;
`;

const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;

  @media (min-width: 960px) {
    flex-direction: row;
  }
`;

const Description = styled.div`
  display: flex;
  flex-direction: column;
`;

export default function Profile(): ReactElement {
  return (
    <ProfileContainer>
      <PicturesContainer>
        <FaceImage
          priority
          src="/face.jpg"
          alt="My face: Short hair with a beard"
          layout="fixed"
          width={200}
          height={200}
        />
        <AvatarImage>
          <FaceImage
            src="/avatar.jpg"
            alt="My avatar: Ash from pokemon in 8 bits"
            layout="fixed"
            width={40}
            height={40}
          />
        </AvatarImage>
      </PicturesContainer>
      <Description>
        <h1>Thibaut Sabot</h1>
        <h2>
          Lead developper at <a href="https://leboncoin.fr/">leboncoin</a>
        </h2>
        <p>Buidling projects for 30M users with React & Next.js.</p>
        <p>
          Helping our 50 Web developpers develop the #1 french website for
          classified advertisements.
        </p>
      </Description>
    </ProfileContainer>
  );
}
