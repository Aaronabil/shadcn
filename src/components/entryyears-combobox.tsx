"use client"

import * as React from "react"
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

import { supabase } from "@/lib/supabase"

export function EntryYearsCombobox({ onValueChange }: { onValueChange: (value: number) => void }) {
    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState<number | null>(null)
    const [years, setYears] = React.useState<
        { id: number; tahun: number }[]
    >([])

    // fetch data dari Supabase
    React.useEffect(() => {
        const fetchPrograms = async () => {
            const { data, error } = await supabase
                .from("angkatan")
                .select("id, tahun")

            if (error) {
                console.error("Error fetching angkatan:", error)
            } else {
                setYears(data || [])
            }
        }

        fetchPrograms()
    }, [])

    return (
        <>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="w-[290px] justify-between"
                    >
                        {value
                            ? years.find((p) => p.id === value)?.tahun
                            : "Select entry year..."}
                        <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[295px] p-0">
                    <Command>
                        <CommandInput placeholder="Search entry years..." />
                        <CommandList>
                            <CommandEmpty>No entry years found.</CommandEmpty>
                            <CommandGroup>
                                {years.map((year) => (
                                    <CommandItem
                                        key={year.id}
                                        value={String(year.tahun)}
                                        onSelect={() => {
                                            setValue(year.id)
                                            onValueChange(year.tahun)
                                            setOpen(false)
                                        }}
                                    >
                                        <CheckIcon
                                            className={cn(
                                                "mr-2 h-4 w-4",
                                                value === year.id ? "opacity-100" : "opacity-0"
                                            )}
                                        />
                                        {year.tahun}
                                    </CommandItem>
                                ))}

                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
        </>

    )
}
