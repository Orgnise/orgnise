import useSWR, { KeyedMutator } from "swr";

import { useParams, useRouter } from "next/navigation";
import { fetcher } from "../fetcher";
import { Team } from "../types/types";
import { displayToast } from "./use-collections";
interface ITeam {
  error: any;
  loading: boolean;
  teams: Team[];
  mutate: KeyedMutator<any>;
  exceedingFreeTeam: boolean;
  freeTeams?: Team[];
  createTeamAsync: (team: Team) => Promise<void>;
  // deleteTeamAsync: (teamSlug: string) => Promise<void>;
  // updateTeamAsync: (team: Team, teamSlug: string) => Promise<void>;
}
export default function useTeams(): ITeam {
  const param = useParams() as {
    team_slug?: string;
    workspace_slug?: string;
    item_slug?: string;
    collection_slug?: string;
  };
  const router = useRouter();
  const {
    data: data,
    error,
    mutate,
  } = useSWR<any>(`/api/teams`, fetcher, {
    dedupingInterval: 120000,
  });

  // Create collection
  async function createTeamAsync(team: Team) {
    try {
      const response = await fetcher("/api/teams", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ team: team }),
      });
      const list = data.teams.concat(response.team);
      mutate({ teams: list }, { revalidate: false, optimisticData: list });
      router.push(`/${response.team.meta.slug}/settings`);
      displayToast({
        title: "Team created",
        description: "Team has been created",
      });
      router.push(`./${response.team.meta.slug}`);
    } catch (error: any) {
      console.error("error", error);
      displayToast({
        title: error.error ?? "Error",
        description: error?.message ?? "Failed to create team",
        variant: "error",
      });
      throw error;
    }
  }

  // Delete collection
  async function deleteTeamAsync(teamSlug: string) {
    const activeTeamSlug = param?.team_slug;
    // const workspaceSlug = param?.workspace_slug;
    // const activeCollectionSlug = param?.collection_slug;
    try {
      fetcher(`/api/teams/${teamSlug}`, {
        method: "DELETE",
      }).then((res) => {
        displayToast({
          title: "Team deleted",
          description: "Team has been deleted successfully",
        });
        console.log("Team deleted", { activeTeamSlug, teamSlug });
        const list = data.teams?.filter((c: any) => c.meta?.slug !== teamSlug);
        if (activeTeamSlug === teamSlug) {
          router.replace("/");
          console.log("Closing the team page");
        }

        mutate({ teams: list }, { revalidate: false, optimisticData: list });
      });
    } catch (error: any) {
      console.error("error", error);
      displayToast({
        title: "Error",
        description: error?.message ?? "Failed to delete team",
        variant: "error",
      });
      throw error;
    }
  }

  // Update collection name
  async function updateTeamAsync(team: Team, teamSlug: string) {
    // const teamSlug = team?.meta?.slug;
    try {
      const response = await fetcher(`/api/teams/${teamSlug}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ team: team }),
      });
      const list = data.teams.map((c: any) => {
        if (c.meta.slug === teamSlug) {
          return response.team;
        }
        return c;
      });
      // Change the url if the collection slug has changed
      if (teamSlug != response.team.meta.slug) {
        router.replace(`/${response.team.meta.slug}/settings`);
      }
      mutate({ teams: list }, { revalidate: false, optimisticData: list });
    } catch (error: any) {
      console.error("error", error);
      displayToast({
        title: "Error",
        description: error?.message ?? "Failed to update team",
        variant: "error",
      });
      throw error;
    }
  }

  const teams = data?.teams?.map((team: Team) => ({
    ...team,
    isOwner: team.role === "owner",
  }));

  const freeTeams = teams?.filter(
    (team: any) => (team.plan === "free" || !team.plan) && team.isOwner,
  );


  return {
    teams: data?.teams ?? [],
    error,
    mutate,
    exceedingFreeTeam: freeTeams?.length >= 2 ? true : false,
    freeTeams,
    loading: !data?.teams && !error ? true : false,
    createTeamAsync,

    // deleteTeamAsync,
    // updateTeamAsync,
  };
}
