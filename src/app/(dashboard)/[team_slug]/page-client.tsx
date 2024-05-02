"use client";
import { HashIcon, LockIcon } from "lucide-react";
import { useContext } from "react";

import { H3 } from "@/components/atom/typography";
import TeamPermissionView from "@/components/molecule/team-permisson-view";
import EmptyWorkspaceView from "@/components/team/workspace/empty-workspace-view";
import { WorkspaceSettingsDropDown } from "@/components/team/workspace/workspace-settings-dropdown";
import { Button } from "@/components/ui/button";
import { ListView } from "@/components/ui/listview";
import { useCreateWorkspaceModal } from "@/components/ui/models/create-workspace-modal";
import { ToolTipWrapper } from "@/components/ui/tooltip";
import useTeam from "@/lib/swr/use-team";
import { Workspace } from "@/lib/types/types";
import Link from "next/link";
import { useParams } from "next/navigation";
import TeamPageLoading from "./loading";
import { TeamContext } from "./providers";

export default function TeamsPageClient() {
  const { loading, team } = useTeam();
  const { team_slug } = useParams() as {
    team_slug?: string;
  };
  const { workspacesData } = useContext(TeamContext);

  const { setShowModal, DeleteAccountModal } = useCreateWorkspaceModal();
  if (loading) {
    return <TeamPageLoading />;
  }

  return (
    <div className="">
      <DeleteAccountModal />
      <div className="flex h-36 items-center border-b border-border bg-background">
        <div className="mx-auto w-full max-w-screen-xl px-2.5">
          <div className="flex items-center justify-between">
            <h1 className="prose-2xl">My Workspaces</h1>
            <TeamPermissionView permission="CREATE_WORKSPACE">
              <Button
                size={"sm"}
                onClick={() => {
                  setShowModal(true);
                }}
              >
                Create Workspace
              </Button>
            </TeamPermissionView>
          </div>
        </div>
      </div>
      <ListView
        items={workspacesData?.workspaces}
        loading={workspacesData.loading}
        className="mx-auto grid max-w-screen-xl grid-cols-1 gap-5 px-2.5 py-10 sm:grid-cols-2 lg:grid-cols-3 lg:px-20"
        renderItem={(item: Workspace, index: number) => (
          <Link
            key={index}
            href={`${team_slug}/${item.meta.slug}`}
            className=" flex h-32 w-full cursor-pointer place-content-between items-start rounded border border-border bg-card p-4 hover:text-accent-foreground  hover:shadow"
          >
            <div className="flex items-start gap-2">
              {/* <Logo className="mt-1 h-7 min-h-6 w-6 min-w-6" /> */}

              {item?.visibility === "private" ? (
                <ToolTipWrapper content={<p>Private workspace</p>}>
                  <LockIcon
                    size={22}
                    className="mt-1 min-w-6 text-muted-foreground"
                  />
                </ToolTipWrapper>
              ) : (
                <ToolTipWrapper content={<p>Public workspace</p>}>
                  <HashIcon
                    size={22}
                    className=" mt-1 min-w-6 text-muted-foreground"
                  />
                </ToolTipWrapper>
              )}

              <div className="flex flex-col">
                <H3>{item.name}</H3>

                {item?.description && (
                  <p className=" text-sm text-muted-foreground">
                    {item.description}
                  </p>
                )}
              </div>
            </div>

            <span className="flex items-center ">
              <WorkspaceSettingsDropDown
                team_slug={team_slug}
                workspace_slug={item.meta.slug}
                className="translate-x-2"
              />
            </span>
          </Link>
        )}
        noItemsElement={<EmptyWorkspaceView />}
        placeholder={<WorkspacePlaceholder />}
      />
    </div>
  );
}

export function WorkspacePlaceholder() {
  return (
    <div className="mx-auto grid max-w-screen-xl grid-cols-1 gap-5 px-2.5 py-10 sm:grid-cols-2 lg:grid-cols-3 lg:px-20">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div
          key={i}
          className="flex h-[146px] w-full cursor-pointer flex-col place-content-between items-start rounded border border-border bg-card p-6   hover:text-accent-foreground hover:shadow"
        >
          <div className="flex w-full items-center gap-2">
            <div className="h-14 w-14 min-w-[56px] rounded-full bg-secondary "></div>
            <div className="flex w-full flex-col gap-1">
              <div className="h-6 w-4/12 rounded bg-secondary"></div>
              <div className="h-3 w-6/12 rounded bg-secondary"></div>
            </div>
          </div>
          <div className="ml-[56px] h-6 w-9/12 rounded bg-secondary"></div>
        </div>
      ))}
    </div>
  );
}
