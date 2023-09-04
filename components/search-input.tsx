"use client"

import { ChangeEvent, ChangeEventHandler, useEffect, useState } from "react"
import { Search } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"

import { Input } from "@/components/ui/input"
import { useDebounce } from "@/hooks/use-debounce"
import queryString from "query-string"

export const SearchInput = () => {
    const router = useRouter()
    const searchParams = useSearchParams()

    const categoryId = searchParams.get("categoryId")
    const name = searchParams.get("name")

    const [value, setValue] = useState(name || "")

    // 500 = 500ms (0.5 seconds)
    const debounceValue = useDebounce<string>(value, 500)

    const onChange: ChangeEventHandler<HTMLInputElement> = e => {
        setValue(e.target.value)
    }

    useEffect(() => {
        const query = {
            name: debounceValue,
            categoryId,
        }

        const url = queryString.stringifyUrl({
            url: window.location.href,
            query
        }, { skipEmptyString: true, skipNull: true })

        router.push(url)
    }, [debounceValue, router, categoryId])

    return (
        <div className="relative">
            <Search className="absolute h-4 w-4 top-3 left-4 text-muted-foreground" />
            <Input 
                onChange={onChange}
                value={value}
                placeholder="Search..."
                className="pl-12 bg-primary/10"
            />
        </div>
    )
}