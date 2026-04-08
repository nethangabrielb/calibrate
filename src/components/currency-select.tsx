import cc from "currency-codes";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function CurrencySelect({
  defaultCurrency,
}: Readonly<{
  defaultCurrency?: string;
}>) {
  return (
    <Select name="salaryCurrency" required defaultValue={defaultCurrency}>
      <SelectTrigger className="w-fit h-full! m-0 rounded-r-none">
        <SelectValue placeholder="Select a currency" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {cc.codes().map((code) => (
            <SelectItem key={code} value={code}>
              {code}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
