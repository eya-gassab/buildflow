import { Loader2, Check } from "lucide-react";
import type { SaveStatus } from "../types";

function SaveIndicator({ status }: { status: SaveStatus }) {
  if (status === "idle") return null;

  return (
    <span className="flex items-center gap-1.5 text-xs text-gray-400">
      {status === "saving" ? (
        <>
          <Loader2 size={12} className="animate-spin" />
          Saving...
        </>
      ) : (
        <>
          <Check size={12} className="text-green-500" />
          Saved
        </>
      )}
    </span>
  );
}

export default SaveIndicator;