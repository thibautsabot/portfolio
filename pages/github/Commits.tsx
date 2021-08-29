import useSWR from "swr";
import { fetcher } from "./fetcher";
import { Endpoints } from '@octokit/types'
  
  type listUserReposResponse = Endpoints["GET /users/{username}/events"]["response"]['data'];

  export default function Commits() {
    const { data, error } = useSWR<listUserReposResponse>('users/thibautsabot/events', fetcher);
    console.log(data);

    if (error) return <p>An error has occurred.</p>
    if (!data) return <p>Loading...</p>

    return (
      <div>
        <h1>Commits</h1>
        {data.map((event) => (
          <p key={event.id}>{event.type}</p>
        ))}
      </div>
    );
  }