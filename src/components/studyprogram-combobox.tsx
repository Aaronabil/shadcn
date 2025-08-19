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

export function StudyProgramCombobox({ onValueChange }: { onValueChange: (value: string) => void }) {
    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState<number | null>(null)
    const [programs, setPrograms] = React.useState<
        { id: number; nama_prodi: string }[]
    >([])

    // fetch data dari Supabase
    React.useEffect(() => {
        const fetchPrograms = async () => {
            const { data, error } = await supabase
                .from("program_studi")
                .select("id, nama_prodi")

            if (error) {
                console.error("Error fetching program_studi:", error)
            } else {
                setPrograms(data || [])
            }
        }

        fetchPrograms()
    }, [])

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[290px] justify-between"
                >
                    {value
                        ? programs.find((p) => p.id === value)?.nama_prodi
                        : "Select study program..."}
                    <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[295px] p-0">
                <Command>
                    <CommandInput placeholder="Search study program..." />
                    <CommandList>
                        <CommandEmpty>No study program found.</CommandEmpty>
                        <CommandGroup>
                            {programs.map((program) => (
                                <CommandItem
                                    key={program.id}
                                    value={program.nama_prodi}
                                    onSelect={() => {
                                        setValue(program.id)
                                        onValueChange(program.nama_prodi)
                                        setOpen(false)
                                    }}
                                >
                                    <CheckIcon
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            value === program.id ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                    {program.nama_prodi}
                                </CommandItem>
                            ))}

                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
