
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { format, subDays, startOfMonth } from 'date-fns';

export type DateRange = {
  from: Date;
  to: Date;
};

type DateRangePickerProps = {
  onDateRangeChange: (range: DateRange) => void;
};

export default function DateRangePicker({ onDateRangeChange }: DateRangePickerProps) {
  const [dateRange, setDateRange] = useState<DateRange>({
    from: subDays(new Date(), 7),
    to: new Date()
  });
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  // Initialize with "Last 7 days" as default
  useEffect(() => {
    onDateRangeChange(dateRange);
  }, []);

  // Handler for preset range selections
  const handlePresetSelection = (preset: 'week' | 'month' | 'custom') => {
    let newRange: DateRange;
    
    if (preset === 'week') {
      newRange = {
        from: subDays(new Date(), 7),
        to: new Date()
      };
      setDateRange(newRange);
      onDateRangeChange(newRange);
      setIsCalendarOpen(false);
    } else if (preset === 'month') {
      newRange = {
        from: startOfMonth(new Date()),
        to: new Date()
      };
      setDateRange(newRange);
      onDateRangeChange(newRange);
      setIsCalendarOpen(false);
    } else {
      // For custom, just open the date picker
      setIsCalendarOpen(true);
    }
  };

  // Handler for custom date selection
  const handleDateSelect = (range: any) => {
    if (!range.from || !range.to) return;
    setDateRange(range);
    onDateRangeChange(range);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-2 items-center mb-6">
      <span className="text-sm font-medium">Date Range:</span>
      <div className="flex space-x-2">
        <Button 
          size="sm" 
          variant={dateRange.from && dateRange.to && 
            format(dateRange.from, 'yyyy-MM-dd') === format(subDays(new Date(), 7), 'yyyy-MM-dd') ? 
            "default" : "outline"}
          onClick={() => handlePresetSelection('week')}
        >
          Last 7 days
        </Button>
        <Button 
          size="sm" 
          variant={dateRange.from && format(dateRange.from, 'yyyy-MM-dd') === format(startOfMonth(new Date()), 'yyyy-MM-dd') ? 
            "default" : "outline"}
          onClick={() => handlePresetSelection('month')}
        >
          Last month
        </Button>
        <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
          <PopoverTrigger asChild>
            <Button
              id="date"
              variant="outline"
              size="sm"
              className="justify-start text-left font-normal"
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {dateRange.from ? (
                dateRange.to ? (
                  <>
                    {format(dateRange.from, "MMM dd, yyyy")} - {format(dateRange.to, "MMM dd, yyyy")}
                  </>
                ) : (
                  format(dateRange.from, "MMM dd, yyyy")
                )
              ) : (
                <span>Custom range</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={dateRange.from}
              selected={dateRange}
              onSelect={handleDateSelect}
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
