
"use client";

import * as React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Button } from "./button";
import { Calendar as CalendarIcon } from "lucide-react";
import { add, format } from "date-fns";

interface DobPickerProps {
  value: Date | undefined;
  onChange: (date: Date | undefined) => void;
}

const CURRENT_YEAR = new Date().getFullYear();
const MIN_AGE = 18;
const MAX_AGE = 70;
const START_YEAR = CURRENT_YEAR - MAX_AGE;
const END_YEAR = CURRENT_YEAR - MIN_AGE;

const years = Array.from(
  { length: END_YEAR - START_YEAR + 1 },
  (_, i) => END_YEAR - i
);
const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

export function DobPicker({ value, onChange }: DobPickerProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  const [selectedYear, setSelectedYear] = React.useState<number | undefined>(
    value?.getFullYear()
  );
  const [selectedMonth, setSelectedMonth] = React.useState<number | undefined>(
    value?.getMonth()
  );
  const [selectedDay, setSelectedDay] = React.useState<number | undefined>(
    value?.getDate()
  );

  const [tempDate, setTempDate] = React.useState<Date | undefined>(value);

  const daysInMonth = React.useMemo(() => {
    if (selectedYear === undefined || selectedMonth === undefined) return 31;
    return new Date(selectedYear, selectedMonth + 1, 0).getDate();
  }, [selectedYear, selectedMonth]);


  const handleDayClick = (day: number) => {
    setSelectedDay(day);
    if (selectedYear !== undefined && selectedMonth !== undefined) {
      const newDate = new Date(selectedYear, selectedMonth, day);
      setTempDate(newDate);
    }
  };

  const handleConfirm = () => {
    onChange(tempDate);
    setIsOpen(false);
  }

  const handleCancel = () => {
    // Reset state to the original value when opening
    setTempDate(value);
    setSelectedYear(value?.getFullYear());
    setSelectedMonth(value?.getMonth());
    setSelectedDay(value?.getDate());
    setIsOpen(false);
  }
  
  const dayGrid = React.useMemo(() => {
    if (selectedYear === undefined || selectedMonth === undefined) return [];
    const grid = [];
    const firstDayOfMonth = new Date(selectedYear, selectedMonth, 1).getDay();
    // Add empty cells for days before the 1st of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
        grid.push(<div key={`empty-${i}`} />);
    }
    for (let day = 1; day <= daysInMonth; day++) {
        grid.push(
            <Button
                key={day}
                type="button"
                variant={selectedDay === day ? "default" : "outline"}
                size="icon"
                onClick={() => handleDayClick(day)}
                className="h-8 w-8"
            >
                {day}
            </Button>
        );
    }
    return grid;
  }, [daysInMonth, selectedDay, selectedMonth, selectedYear]);

  const dayHeadings = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal",
            !value && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {value ? format(value, "dd / MM / yyyy") : <span>Select your Date of Birth</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-4" align="start">
          <p className="font-medium text-center mb-4">Select Date of Birth</p>
          <div className="flex space-x-2 mb-4">
            <Select onValueChange={(v) => setSelectedYear(parseInt(v))} value={selectedYear?.toString()}>
              <SelectTrigger><SelectValue placeholder="Year" /></SelectTrigger>
              <SelectContent>
                {years.map((year) => (
                  <SelectItem key={year} value={year.toString()}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select onValueChange={(v) => setSelectedMonth(parseInt(v))} value={selectedMonth?.toString()} disabled={selectedYear === undefined}>
              <SelectTrigger><SelectValue placeholder="Month" /></SelectTrigger>
              <SelectContent>
                {months.map((month, index) => (
                  <SelectItem key={month} value={index.toString()}>
                    {month}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

            {selectedYear !== undefined && selectedMonth !== undefined && (
                <div className="mb-4">
                     <div className="grid grid-cols-7 gap-2 text-center text-xs text-muted-foreground mb-2">
                        {dayHeadings.map(day => <div key={day}>{day}</div>)}
                    </div>
                    <div className="grid grid-cols-7 gap-2">
                        {dayGrid}
                    </div>
                </div>
            )}
            <div className="flex justify-end space-x-2">
                <Button variant="ghost" onClick={handleCancel}>Cancel</Button>
                <Button onClick={handleConfirm} disabled={!tempDate}>Confirm DOB</Button>
            </div>
      </PopoverContent>
    </Popover>
  );
}
