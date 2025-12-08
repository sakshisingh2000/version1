
"use client";

import * as React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Button } from "./button";

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
  const [selectedYear, setSelectedYear] = React.useState<number | undefined>(
    value?.getFullYear()
  );
  const [selectedMonth, setSelectedMonth] = React.useState<number | undefined>(
    value?.getMonth()
  );
  const [selectedDay, setSelectedDay] = React.useState<number | undefined>(
    value?.getDate()
  );

  const daysInMonth = React.useMemo(() => {
    if (selectedYear === undefined || selectedMonth === undefined) return 31;
    return new Date(selectedYear, selectedMonth + 1, 0).getDate();
  }, [selectedYear, selectedMonth]);

  const handleYearChange = (yearStr: string) => {
    const year = parseInt(yearStr, 10);
    setSelectedYear(year);
    // If day is invalid for new year/month, reset it
    const newDaysInMonth = new Date(year, (selectedMonth ?? 0) + 1, 0).getDate();
    const currentDay = selectedDay;
    if (currentDay && currentDay > newDaysInMonth) {
        setSelectedDay(undefined);
        updateDate(year, selectedMonth, undefined);
    } else {
        updateDate(year, selectedMonth, selectedDay);
    }
  };

  const handleMonthChange = (monthStr: string) => {
    const month = parseInt(monthStr, 10);
    setSelectedMonth(month);
    // If day is invalid for new month, reset it
    const newDaysInMonth = new Date(selectedYear ?? CURRENT_YEAR, month + 1, 0).getDate();
    const currentDay = selectedDay;
    if (currentDay && currentDay > newDaysInMonth) {
        setSelectedDay(undefined);
        updateDate(selectedYear, month, undefined);
    } else {
        updateDate(selectedYear, month, selectedDay);
    }
  };

  const handleDayChange = (day: number) => {
    setSelectedDay(day);
    updateDate(selectedYear, selectedMonth, day);
  };
  
  const updateDate = (year: number | undefined, month: number | undefined, day: number | undefined) => {
    if (year !== undefined && month !== undefined && day !== undefined) {
      const newDate = new Date(year, month, day);
      // Validate age constraints
      const age = CURRENT_YEAR - newDate.getFullYear();
      if (age >= MIN_AGE && age <= MAX_AGE) {
        onChange(newDate);
      } else {
        onChange(undefined); // Or handle error
      }
    } else {
      onChange(undefined);
    }
  };

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
                onClick={() => handleDayChange(day)}
                className="h-8 w-8"
            >
                {day}
            </Button>
        );
    }
    return grid;
  }, [daysInMonth, selectedDay, selectedMonth, selectedYear]);

  const dayHeadings = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  const formattedDate = React.useMemo(() => {
    if (selectedDay !== undefined && selectedMonth !== undefined && selectedYear !== undefined) {
      const day = selectedDay.toString().padStart(2, '0');
      const month = (selectedMonth + 1).toString().padStart(2, '0');
      return `${day}/${month}/${selectedYear}`;
    }
    return "Please select your date of birth";
  }, [selectedDay, selectedMonth, selectedYear]);


  return (
    <div className="space-y-4 rounded-md border p-4">
      <div className="text-center font-medium text-foreground h-6 flex items-center justify-center">
        {formattedDate}
      </div>
      <div className="flex space-x-2">
        <Select onValueChange={handleYearChange} value={selectedYear?.toString()}>
          <SelectTrigger><SelectValue placeholder="Year" /></SelectTrigger>
          <SelectContent>
            {years.map((year) => (
              <SelectItem key={year} value={year.toString()}>
                {year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select onValueChange={handleMonthChange} value={selectedMonth?.toString()} disabled={selectedYear === undefined}>
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
            <div>
                 <div className="grid grid-cols-7 gap-2 text-center text-xs text-muted-foreground mb-2">
                    {dayHeadings.map(day => <div key={day}>{day}</div>)}
                </div>
                <div className="grid grid-cols-7 gap-2">
                    {dayGrid}
                </div>
            </div>
        )}
    </div>
  );
}
