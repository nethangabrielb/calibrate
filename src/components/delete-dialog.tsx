import { deleteApplication } from "@/actions/application";
import { useQueryClient } from "@tanstack/react-query";
import { Trash } from "lucide-react";
import { toast } from "sonner";

import { useActionState, useEffect } from "react";

import { useRouter } from "next/navigation";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { FormState } from "@/schemas/application";

export function DeleteDialog({
  applicationId,
}: Readonly<{ applicationId: number }>) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const [state, action, pending] = useActionState<FormState, FormData>(
    deleteApplication.bind(null, applicationId),
    undefined,
  );

  console.log(state);

  useEffect(() => {
    if (state?.success) {
      toast.success(state?.message ?? "Application deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["applications"] });
      router.push("/job-applications");
    }
  }, [state]);

  return (
    <AlertDialog>
      <AlertDialogTrigger
        className="flex items-center gap-2 py-1.5 cursor-pointer transition-all text-destructive p-2 text-sm rounded-md hover:bg-destructive/10 mt-1 w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <Trash className="h-4 w-4 shrink-0 text-destructive" />
        <span className="leading-none select-none text-destructive">
          Delete
        </span>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the job
            application and remove all associated data.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={(e) => e.stopPropagation()}>
            Cancel
          </AlertDialogCancel>
          <form action={action}>
            <AlertDialogAction
              className="bg-destructive! text-card-foreground hover:bg-red-600! cursor-pointer"
              type="submit"
              disabled={pending}
              onClick={(e) => e.stopPropagation()}
            >
              {pending ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </form>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
