import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const STATUS = ["APPLIED", "INTERVIEWING", "OFFERED", "REJECTED"] as const;

export function StatusSelect({
  defaultStatus,
}: Readonly<{
  defaultStatus?: (typeof STATUS)[number];
}>) {
  return (
    <Select name="status" required defaultValue={defaultStatus}>
      <SelectTrigger className="w-fit h-full! m-0 h-10 rounded-lg bg-background/90 shadow-sm focus-visible:ring-2 focus-visible:ring-primary/40">
        <SelectValue placeholder="Update status" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {STATUS.map((status) => (
            <SelectItem key={status} value={status}>
              {status}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
