"use client";
import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { TeamMember } from "@/types/ComponentTypes";
import { EditTeamMembersDialog } from "./EditTeamMembersDialog";
import { ChevronRight, PenSquare, Users } from "lucide-react";

interface TeamMembersCardProps {
  teamMembers: TeamMember[];
  onRefresh: () => Promise<void>;
}

export const TeamMembersCard = ({
  teamMembers,
  onRefresh,
}: TeamMembersCardProps) => {
  const [detailsDialog, setDetailsDialog] = useState<{
    open: boolean;
    memberId?: number;
  }>({
    open: false,
  });

  return (
    <div className="relative group h-full">
      <Card className="bg-black/40 border-[#3C3120] h-full group-hover:border-[#A28B55] transition-colors duration-300">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-xl font-semibold text-[#A28B55] flex items-center gap-2">
            <Users className="w-5 h-5" /> Team Members
          </CardTitle>

          {/* Only show edit button in top right if there are team members */}
          {teamMembers && teamMembers.length > 0 && (
            <EditTeamMembersDialog
              initialData={teamMembers}
              onSuccess={onRefresh}
            />
          )}
        </CardHeader>

        <CardContent className="pt-4">
          {teamMembers && teamMembers.length > 0 ? (
            <div className="flex flex-col gap-3 max-h-[350px] overflow-y-auto pr-2">
              {teamMembers.map((member, index) => (
                <Dialog
                  key={index}
                  open={detailsDialog.open && detailsDialog.memberId === index}
                  onOpenChange={(open) =>
                    setDetailsDialog({
                      open,
                      memberId: open ? index : undefined,
                    })
                  }
                >
                  <DialogTrigger asChild>
                    <div className="group/member cursor-pointer bg-black/50 border border-[#3C3120] rounded-md p-3 hover:border-[#A28B55] hover:bg-black/80 transition-all duration-200">
                      <div className="flex gap-3 items-start">
                        <div className="relative w-14 h-14 rounded-full overflow-hidden flex-shrink-0 border border-[#3C3120]">
                          <img
                            src={
                              member.image ||
                              `https://avatar.iran.liara.run/public/${(member.name.length % 100) + 1}`
                            }
                            alt={member.name}
                            className="object-cover w-full h-full"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.onerror = null;
                              target.src = `https://avatar.iran.liara.run/public/${(member.name.length % 100) + 1}`;
                            }}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h4 className="text-base font-medium text-white truncate">
                              {member.name}
                            </h4>
                            <ChevronRight className="h-4 w-4 text-[#A28B55] opacity-0 group-hover/member:opacity-100 transition-opacity duration-200" />
                          </div>
                          <p className="text-[#A28B55] text-sm truncate">
                            {member.role}
                          </p>
                          <p className="text-neutral-400 text-xs line-clamp-1 mt-1">
                            {member.bio}
                          </p>
                        </div>
                      </div>
                    </div>
                  </DialogTrigger>

                  <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto p-6 bg-[#171410] border-[#352b1c]">
                    <div className="flex flex-col items-center text-center mb-6 pt-3">
                      <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-[#A28B55] mb-4">
                        <img
                          src={
                            member.image ||
                            `https://avatar.iran.liara.run/public/${(member.name.length % 100) + 1}`
                          }
                          alt={member.name}
                          className="object-cover w-full h-full"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.onerror = null;
                            target.src = `https://avatar.iran.liara.run/public/${(member.name.length % 100) + 1}`;
                          }}
                        />
                      </div>
                      <h2 className="text-xl font-semibold text-white">
                        {member.name}
                      </h2>
                      <p className="text-[#A28B55] mt-1">{member.role}</p>
                    </div>

                    <Separator className="bg-[#3C3120] my-4" />

                    <div>
                      <h3 className="text-[#A28B55] text-sm font-medium uppercase mb-2">
                        Bio
                      </h3>
                      <p className="text-neutral-300 whitespace-pre-line">
                        {member.bio}
                      </p>
                    </div>

                    {/* Edit button at bottom of dialog */}
                    <div className="mt-6 flex justify-center">
                      <EditTeamMembersDialog
                        initialData={teamMembers}
                        onSuccess={onRefresh}
                      />
                    </div>
                  </DialogContent>
                </Dialog>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-[240px] relative">
              <Users className="h-16 w-16 text-[#A28B55]/30 mb-4" />
              <p className="text-neutral-500 mb-5 text-center">
                No team members added yet
              </p>

              <EditTeamMembersDialog
                initialData={[]}
                onSuccess={onRefresh}
                triggerClass="bg-[#3C3120]/60 text-[#A28B55] hover:bg-[#3C3120] border-[#A28B55]/30 hover:border-[#A28B55] flex items-center gap-2"
                triggerContent={
                  <>
                    <PenSquare size={16} /> Add Team Members
                  </>
                }
              />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
