import * as React from "react"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useController } from "react-hook-form"

interface SelectFromProps {
  control: any
}

export const SelectFrom = ({ control }: SelectFromProps) => {
  const { field } = useController({
    control,
    name: "from",
    rules: { required: "Select a currency from" },
  });

  return (
    <Select value={field.value} onValueChange={field.onChange}>
      <SelectTrigger className="w-full text-zinc-300 bg-zinc-800 border-none outline-none">
        <SelectValue placeholder="Select a Currency" />
      </SelectTrigger>
      <SelectContent className="text-zinc-300 bg-zinc-800 border-none focus:outline-none">
        <SelectGroup>
          <SelectLabel>Currencies</SelectLabel>
          <SelectItem value="USD">USD - US Dollar</SelectItem>
          <SelectItem value="EUR">EUR - Euro</SelectItem>
          <SelectItem value="JPY">JPY - Japanese Yen</SelectItem>
          <SelectItem value="BRL">BRL - Brazilian Real</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}