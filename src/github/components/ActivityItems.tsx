import Link from "next/link";

function ForkItem({ event }) {
  return (
    <Link passHref href={event.payload.forkee.html_url}>
      <p>
        New fork of &quot;{event.repo.name}&quot; -{" "}
        {event.payload.forkee.description}
      </p>
    </Link>
  );
}

function PublicItem({ event }) {
  return (
    <Link passHref href={"https://github.com/" + event.repo.name}>
      <p>&quot;{event.repo.name}&quot; was just made public !</p>
    </Link>
  );
}

function WatchItem({ event }) {
  return (
    <Link passHref href={"https://github.com/" + event.repo.name}>
      <p>I starred the &quot;{event.repo.name}&quot; repository.</p>
    </Link>
  );
}

function CreateItem({ event }) {
  if (event.payload.ref_type === "branch") {
    if (event.payload.ref.indexOf("cms/blog") !== -1) return null;

    return (
      <Link
        passHref
        href={`https://github.com/${event.repo.name}/tree/${event.payload.ref}`}
      >
        <p>
          The &quot;{event.payload.ref}&quot; branch was created on &quot;
          {event.repo.name}&quot;.
        </p>
      </Link>
    );
  } else {
    return null;
  }
}

function ReleaseItem({ event }) {
  return (
    <Link passHref href={event.payload.release.html_url}>
      <p>
        New release &quot;{event.payload.release.body}&quot; on &quot;
        {event.repo.name}&quot; !
      </p>
    </Link>
  );
}

export { ForkItem, ReleaseItem, CreateItem, WatchItem, PublicItem };
