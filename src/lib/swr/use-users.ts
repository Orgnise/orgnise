import { useParams } from "next/navigation";
import useSWR from "swr";
import { fetcher } from "../fetcher";

export default function useUsers() {
  const { team_slug } = useParams() as {
    team_slug: string;
  };

  const { data: res, error } = useSWR<any>(
    team_slug && `/api/teams/${team_slug}/users`,
    fetcher,
  );

  return {
    users: res?.users ?? [],
    loading: !error && !res?.users,
    error,
  };
}
