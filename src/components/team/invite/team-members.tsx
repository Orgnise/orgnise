import { IconMenu } from "@/components/atom/icon-menu";
import ThreeDots from "@/components/icons/three-dots";
import { Avatar } from "@/components/ui/avatar";
import { ListView } from "@/components/ui/listview";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { TeamRole } from "@/lib/constants/team-role";
import useTeam from "@/lib/swr/use-team";
import useUsers from "@/lib/swr/use-users";
import { cn } from "@/lib/utils";
import { TeamMemberSchema } from "@/lib/zod/schemas";
import { UserMinus } from "lucide-react";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { z } from "zod";
import EditRoleModal from "./edit-role-modal";
import RemoveTeamMemberModal from "./remove-member-model";

export default function TeamMembers() {
  const { error, loading, users } = useUsers();
  const { activeTeam } = useTeam();

  return (
    <div className="grid divide-y divide-border">
      <ListView
        items={Array.isArray(users) ? users : []}
        loading={loading}
        renderItem={(user: z.infer<typeof TeamMemberSchema>) => (
          <UserCard
            key={user.email}
            user={user}
            isOwner={activeTeam?.role === "owner"}
          />
        )}
        noItemsElement={
          <div className="flex flex-col items-center justify-center py-10">
            <p className="text-sm text-muted-foreground">
              No teammates have been added yet.
            </p>
          </div>
        }
        placeholder={Array.from({ length: 5 }).map((_, i) => (
          <UserPlaceholder key={i} />
        ))}
      />
    </div>
  );
}

const UserCard = ({
  user,
  isOwner,
}: {
  user: z.infer<typeof TeamMemberSchema>;
  isOwner: boolean;
}) => {
  const [openPopover, setOpenPopover] = useState(false);

  const { name, email, role: currentRole } = user;

  const [role, setRole] = useState<TeamRole>(currentRole);

  const { data: session } = useSession();
  const [showRemoveTeammateModal, setShowRemoveTeammateModal] = useState(false);
  const [showEditRoleModal, setShowEditRoleModal] = useState(false);

  const self = session?.user?.email === email;

  return (
    <>
      <EditRoleModal
        showEditRoleModal={showEditRoleModal}
        setShowEditRoleModal={setShowEditRoleModal}
        user={user}
        role={role}
      />
      <div
        key={email}
        className="flex items-center justify-between space-x-3 px-4 py-3 sm:pl-8"
      >
        <div className="flex items-start space-x-3">
          <div className="flex items-center space-x-3">
            <Avatar user={user} />
            <div className="flex flex-col">
              <h3 className="text-sm font-medium">{name || email}</h3>
              <p className="text-xs text-muted-foreground">{email}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-row items-center gap-2">
          <div className="flex items-center space-x-3">
            {self || !isOwner ? (
              <p className="text-xs capitalize text-muted-foreground">{role}</p>
            ) : (
              <select
                className={cn(
                  "rounded-md border border-border p-1 text-xs text-muted-foreground outline-none",
                  {
                    "cursor-not-allowed bg-muted": !isOwner,
                  },
                )}
                value={role}
                disabled={!isOwner}
                onChange={(e) => {
                  setRole(e.target.value as "owner" | "member");
                  setOpenPopover(false);
                  setShowEditRoleModal(true);
                }}
              >
                <option value="moderator">Moderator</option>
                <option value="member">Member</option>
                <option value="guest">Guest</option>
              </select>
            )}
          </div>
          {isOwner && !self ? (
            <Popover open={openPopover} onOpenChange={setOpenPopover}>
              <PopoverTrigger>
                <ThreeDots className="text-secondary-foreground/70" />
              </PopoverTrigger>
              <PopoverContent className="mt-1 w-52 rounded border border-border bg-background p-2 shadow">
                <button
                  onClick={() => {
                    setOpenPopover(false);
                    setShowRemoveTeammateModal(true);
                  }}
                  className="w-full rounded-md p-2 text-left text-sm font-medium text-red-600 transition-all duration-75 hover:bg-red-600 hover:text-white"
                >
                  <IconMenu
                    text={
                      session?.user?.email === email
                        ? "Leave team"
                        : "Remove teammate"
                    }
                    icon={<UserMinus className="h-4 w-4" />}
                  />
                </button>
              </PopoverContent>
            </Popover>
          ) : (
            <ThreeDots className="text-transparent" />
          )}
        </div>
      </div>
      <RemoveTeamMemberModal
        showRemoveTeammateModal={showRemoveTeammateModal}
        setShowRemoveTeammateModal={setShowRemoveTeammateModal}
        user={user}
        invite={false}
      />
    </>
  );
};

export const UserPlaceholder = () => (
  <div className="flex items-center justify-between space-x-3 px-4 py-3 sm:px-8">
    <div className="flex items-center space-x-3">
      <div className="h-10 w-10 animate-pulse rounded-full bg-gray-200" />
      <div className="flex flex-col">
        <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />
        <div className="mt-1 h-3 w-32 animate-pulse rounded bg-gray-200" />
      </div>
    </div>
    <div className="h-3 w-24 animate-pulse rounded bg-gray-200" />
  </div>
);
