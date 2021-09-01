import { DiscussionCommentEdge } from "@octokit/graphql-schema";
import Link from "next/link";
import styles from "./discussions.module.css";
import MarqueeDescription from "../../components/MarqueeDescription";
import Image from "next/image";
import upvote from '../assets/upvote.png'

interface Props {
  discussions: DiscussionCommentEdge[];
}

export default function Discussions({ discussions }: Props) {

  return (
    <div className={styles.Discussions}>
      <h1 className={styles.title}>Discussions</h1>
      <div className={styles.content}>
        {discussions.map(({ node }) => (
          <div key={node.id} className={styles.container}>
            <Image src={upvote} width={30} height={30} alt="upvotes" />
            <p className={styles.upvote}>{node.upvoteCount}</p>
            <Link href={node.url}>
              <a className={styles.container}>
                <MarqueeDescription containerWidth={400}>
                  [{node.discussion.repository.name}] - {node.bodyText}
                </MarqueeDescription>
              </a>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
