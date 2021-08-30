import Link from "next/link";
import Image from "next/image";
import fork from "../assets/fork.png";
import unlock from "../assets/unlock.png";
import star from "../assets/star.png";
import branch from "../assets/branch.png";
import release from "../assets/release.png";
import styles from "./activity.module.css";

function ForkItem({ event }) {
  return (
    <Link href={event.payload.forkee.html_url}>
      <a className={styles.itemLink}>
        <Image width={24} height={24} alt="fork" src={fork} />
        <p className={styles.itemText}>
          New fork of <code>{event.repo.name}</code> -
          &quot;{event.payload.forkee.description}&quot;
        </p>
      </a>
    </Link>
  );
}

function PublicItem({ event }) {
  return (
    <Link passHref href={"https://github.com/" + event.repo.name}>
      <a className={styles.itemLink}>
        <Image width={24} height={24} alt="unlock" src={unlock} />
        <p className={styles.itemText}>
          <code>{event.repo.name}</code> was just made public!
        </p>
      </a>
    </Link>
  );
}

function WatchItem({ event }) {
  return (
    <Link passHref href={"https://github.com/" + event.repo.name}>
      <a className={styles.itemLink}>
        <Image width={24} height={24} alt="star" src={star} />
        <p className={styles.itemText}>
          {" "}
          <code>{event.repo.name}</code> is a new starred repository!
        </p>
      </a>
    </Link>
  );
}

function CreateItem({ event }) {
  if (event.payload.ref_type === "branch") {
    // if (event.payload.ref.indexOf("cms/blog") !== -1) return null;

    return (
      <Link
        passHref
        href={`https://github.com/${event.repo.name}/tree/${event.payload.ref}`}
      >
        <a className={styles.itemLink}>
          <Image width={24} height={24} alt="branch" src={branch} />
          <p className={styles.itemText}>
            The <code>{event.payload.ref}</code> branch was created on{" "}
            <code>{event.repo.name}</code>.
          </p>
        </a>
      </Link>
    );
  } else {
    return null;
  }
}

function ReleaseItem({ event }) {
  return (
    <Link passHref href={event.payload.release.html_url}>
      <a className={styles.itemLink}>
        <Image width={24} height={24} alt="release" src={release} />
        <p className={styles.itemText}>
          New release <code>{event.payload.release.body}</code> on{" "}
          <code>{event.repo.name}</code>!
        </p>
      </a>
    </Link>
  );
}

export { ForkItem, ReleaseItem, CreateItem, WatchItem, PublicItem };
