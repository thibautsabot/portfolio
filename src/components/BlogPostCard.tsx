import Image from "next/image";
import Link from "next/link";
import { ReactElement } from "react";
import styled from "styled-components";

const BlogPosts = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  margin: 40px 0;
`;

const Card = styled.div`
  width: 280px;
  height: 350px;
  background: rgba(255, 255, 255, 0.05);
  margin: 0 20px 20px 20px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.5);
  border-radius: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  backdrop-filter: blur(10px);
  cursor: pointer;
`;

const BlogTitle = styled.p`
  margin-top: 20px;
  padding: 0 30px;
`;

const CardContent = styled.div`
  text-align: center;
  transition: transform 0.3s;

  &:hover {
    transform: scale(1.05);
  }
`;

export default function BlogPostsCard(): ReactElement {
  return (
    <BlogPosts>
      <Card>
        <Link href="/" passHref>
          <a>
            <CardContent>
              <Image
                src="/next_logo.png"
                alt="Next.js logo"
                width={150}
                height={160}
              />
              <BlogTitle>
                Built my website without compromise using to Next.js
              </BlogTitle>
            </CardContent>
          </a>
        </Link>
      </Card>
      <Card>
        <Link
          href="/blog/How%20we%20are%20improving%20our%20Web%20performance"
          passHref
        >
          <a>
            <CardContent>
              <Image
                src="/rocket.png"
                alt="rocket logo"
                width={150}
                height={160}
              />
              <BlogTitle>
                How we are improving our Web performance at Leboncoin
              </BlogTitle>
            </CardContent>
          </a>
        </Link>
      </Card>
      <Card>
        <Link
          href="/blog/How%20we%20migrated%20our%20legacy%20frontend%20to%20NextJS"
          passHref
        >
          <a>
            <CardContent>
              <Image
                src="/legacy_react.png"
                alt="vintage react logo"
                width={150}
                height={160}
              />
              <BlogTitle>
                How we migrated our legacy frontend to NextJS
              </BlogTitle>
            </CardContent>
          </a>
        </Link>
      </Card>
    </BlogPosts>
  );
}
