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
  isSubmitting,
  buttonText,
  isOpen,
  setIsOpen,
}: Readonly<{
  register: UseFormRegister<{ resume: string }>;
  errors: FormState<{ resume: string }>["errors"];
  handleSubmit: React.SubmitEventHandler<HTMLFormElement>;
  isSubmitting: boolean;
  buttonText?: string;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}>) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="w-fit cursor-pointer">
          {buttonText || "Run AI Analysis"}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm max-h-[85vh] overflow-y-auto">
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
              // Scaffold: wire a saved resume value here later if you persist one.
              {...register("resume")}
              error={errors.resume?.message}
              className="field-sizing-fixed min-h-40 max-h-[45vh] resize-y overflow-y-auto"
            />
          </Field>
          <DialogFooter className="pt-0">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>

            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Analyzing..." : "Analyze"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
