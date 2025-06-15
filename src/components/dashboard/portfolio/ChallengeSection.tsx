"use client";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface ChallengeSectionProps {
  challenge: string;
  setChallenge: (value: string) => void;
  solution: string;
  setSolution: (value: string) => void;
  impact: string;
  setImpact: (value: string) => void;
}

export const ChallengeSection = ({
  challenge,
  setChallenge,
  solution,
  setSolution,
  impact,
  setImpact,
}: ChallengeSectionProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-[#A28B55]">Project Details</h3>

      <div>
        <Label htmlFor="challenge" className="text-neutral-400">
          Challenge
        </Label>
        <Textarea
          id="challenge"
          value={challenge}
          onChange={(e) => setChallenge(e.target.value)}
          placeholder="Describe the specific challenges faced (space constraints, timeline, budget, etc."
          className="resize-none min-h-[80px] bg-neutral-950/70 border-[#352b1c] text-neutral-200 focus-visible:ring-[#A28B55]/20 focus-visible:border-[#A28B55]"
        />
      </div>

      <div>
        <Label htmlFor="solution" className="text-neutral-400">
          Solution
        </Label>
        <Textarea
          id="solution"
          value={solution}
          onChange={(e) => setSolution(e.target.value)}
          placeholder="How did you address the challenges?"
          className="resize-none min-h-[80px] bg-neutral-950/70 border-[#352b1c] text-neutral-200 focus-visible:ring-[#A28B55]/20 focus-visible:border-[#A28B55]"
        />
      </div>

      <div>
        <Label htmlFor="impact" className="text-neutral-400">
          Impact
        </Label>
        <Textarea
          id="impact"
          value={impact}
          onChange={(e) => setImpact(e.target.value)}
          placeholder="Describe measurable outcomes (e.g., 30% more efficient space usage, increased foot traffic)?"
          className="resize-none min-h-[80px] bg-neutral-950/70 border-[#352b1c] text-neutral-200 focus-visible:ring-[#A28B55]/20 focus-visible:border-[#A28B55]"
        />
      </div>
    </div>
  );
};
