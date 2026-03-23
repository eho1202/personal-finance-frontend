"use client"

import React, { useState } from 'react'
import { Input } from '../ui/input';
import { fmt } from '@/lib/utils';
import { Button } from '../ui/button';
import { Calendar } from '../ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { cn } from '@/lib/utils';

const EditCell = ({ value, onSave, type = "text", align = "right" }:
    {
        value: string | number,
        onSave: (v: string | number) => void;
        type?: "text" | "number" | "date";
        align?: "left" | "right";
    }
) => {
    const [editing, setEditing] = useState(false);
    const [draft, setDraft] = useState(String(value));

    const commit = () => {
        setEditing(false);
        onSave(type === "number" ? parseFloat(draft) || 0 : draft);
    }

    if (type === "date") {
        const dateValue = value ? (() => {
            const [year, month, day] = String(value).split("-").map(Number)
            return new Date(year, month - 1, day)
        })() : undefined;
        return (
            <Popover open={editing} onOpenChange={setEditing}>
                <PopoverTrigger asChild>
                    <Button
                        variant="ghost"
                        size="sm"
                        title="Click to edit"
                        className={cn(
                            "w-full font-normal h-auto py-0.5 px-1 cursor-text",
                            align === "right" ? "justify-end" : "justify-start"
                        )}
                    >
                        {value ? String(value) : "-"}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                    <Calendar
                        mode="single"
                        selected={dateValue}
                        defaultMonth={dateValue}
                        captionLayout="label"
                        onSelect={(d) => {
                            if (d) {
                                onSave(d.toISOString().split("T")[0])
                            }
                            setEditing(false)
                        }}
                    />
                </PopoverContent>
            </Popover>
        )
    }

    if (editing) {
        return (
            <Input
                autoFocus
                type={type === "number" ? "number" : type}
                value={draft}
                step={0.01}
                onChange={e => setDraft(e.target.value)}
                onBlur={commit}
                onKeyDown={e => {
                    if (e.key === "Enter") commit();
                    if (e.key === "Escape") setEditing(false);
                }}
                className={cn(
                    'h-auto w-0 min-w-full px-1 py-0.5 border-none',
                    align === "right" ? "text-right" : "text-left"
                )}
            />
        )
    }

    return (
        <Button
            variant="ghost"
            size="sm"
            onClick={() => { setDraft(String(value)); setEditing(true); }}
            title="Click to edit"
            className={cn(
                "w-full cursor-text font-normal h-auto py-0.5 px-1",
                align === "right" ? "justify-end" : "justify-start"
            )}
        >
            {type === "number" ? fmt(Number(value)) : String(value) || "-"}
        </Button>
    )
}

export default EditCell