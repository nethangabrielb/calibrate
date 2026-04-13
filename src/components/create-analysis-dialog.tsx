import { FormState, UseFormRegister } from "react-hook-form";

import { TextField } from "@/components/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field } from "@/components/ui/field";

export function CreateAnalysisDialog({
  register,
  errors,
  handleSubmit,
}: Readonly<{
  register: UseFormRegister<{ resume: string }>;
  errors: FormState<{ resume: string }>["errors"];
  handleSubmit: React.SubmitEventHandler<HTMLFormElement>;
}>) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="mt-5 w-fit cursor-pointer">Run AI Analysis</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <DialogHeader>
            <DialogTitle>Run AI Analysis</DialogTitle>
            <DialogDescription>
              Enter your resume to get personalized insights and recommendations
              on how to improve your job application.
            </DialogDescription>
          </DialogHeader>
          <Field>
            <TextField
              label="Resume"
              type="textarea"
              placeholder="Enter your resume here"
              {...register("resume")}
              error={errors.resume?.message}
            />
          </Field>
          <DialogFooter className="pt-0">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
