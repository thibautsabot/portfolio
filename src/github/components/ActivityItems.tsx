import Image from "next/image";
import Link from "next/link";
import MarqueeDescription from "../../components/MarqueeDescription";
import branch from "../assets/github/branch.png";
import fork from "../assets/github/fork.png";
import release from "../assets/github/release.png";
import star from "../assets/github/star.png";
import styled from "styled-components";
import unlock from "../assets/github/unlock.png";
import { ReactElement } from 'react'

const ItemLink = styled.a`
  display: flex;
  align-items: center;
`

// TODO: Try to find up-to-date GitHub types instead of `any` and / or handle potential errors.

function ForkItem({ event }: { event: any }): ReactElement {
  return (
    <Link passHref href={event.payload.forkee.html_url}>
      <ItemLink>
        <Image layout="fixed" width={24} height={24} alt="fork" src={fork} />
        <MarqueeDescription>
          New fork of&nbsp;<code>{event.repo.name}</code>&nbsp;- &quot;
          {event.payload.forkee.description}&quot;
        </MarqueeDescription>
      </ItemLink>
    </Link>
  );
}

function PublicItem({ event }: { event: any }): ReactElement {
  return (
    <Link passHref href={"https://github.com/" + event.repo.name}>
      <ItemLink>
        <Image layout="fixed" width={24} height={24} alt="unlock" src={unlock} />
        <MarqueeDescription>
          <code>{event.repo.name}</code>&nbsp;was just made public!
        </MarqueeDescription>
      </ItemLink>
    </Link>
  );
}

function WatchItem({ event }: { event: any }): ReactElement {
  return (
    <Link passHref href={"https://github.com/" + event.repo.name}>
      <ItemLink>
        <Image layout="fixed" width={24} height={24} alt="star" src={star} />
        <MarqueeDescription>
          <code>{event.repo.name}</code>&nbsp;is a new starred repository!
        </MarqueeDescription>
      </ItemLink>
    </Link>
  );
}

function CreateItem({ event }: { event: any }): ReactElement | null {
  if (event.payload.ref_type === "branch") {
    // if (event.payload.ref.indexOf("cms/blog") !== -1) return null;

    return (
      <Link
        passHref
        href={`https://github.com/${event.repo.name}/tree/${event.payload.ref}`}
      >
        <ItemLink>
          <Image layout="fixed"  width={24} height={24} alt="branch" src={branch} />
          <MarqueeDescription>
            The&nbsp;<code>{event.payload.ref}</code>&nbsp;branch was created on{" "}
            <code>{event.repo.name}</code>.
          </MarqueeDescription>
        </ItemLink>
      </Link>
    );
  } else {
    return null;
  }
}

function ReleaseItem({ event }: { event: any }): ReactElement {
  return (
    <Link passHref href={event.payload.release.html_url}>
      <ItemLink>
        <Image layout="fixed" width={24} height={24} alt="release" src={release} />
        <MarqueeDescription>
          New release  <code>{event.payload.release.body}</code> on{" "}
          <code>{event.repo.name}</code>!
        </MarqueeDescription>
      </ItemLink>
    </Link>
  );
}

export { ForkItem, ReleaseItem, CreateItem, WatchItem, PublicItem };
