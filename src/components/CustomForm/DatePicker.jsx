import { useEffect, useId, useRef, useState } from "react";
import { format, isValid, parse } from "date-fns";
import { DayPicker, getDefaultClassNames } from "react-day-picker";
import { LuCircleX } from "react-icons/lu";

import { cn } from "../../utils/ClassName";

const DatePicker = ({
  containerStyles,
  value,
  name,
  onChange,
  helperText="",
  asSingle=true,
  useRange=false,
  placeholder="Pick a date",
  showShortcuts=true,
  disabled=false,
  required=false,
  minDate,
  popOverDirection="down",
  error,
}) => {
  const defaultClassNames = getDefaultClassNames();
  const dialogRef = useRef(null);
  const dialogId = useId();
  const headerId = useId();

  let dialogStyles = { position: "absolute", left: "0" };

  if (popOverDirection === "down") {
    dialogStyles.top = "2.3rem";
  } else {
    dialogStyles.bottom = "2.3rem";
  }

  // Hold the month in state to control the calendar when the input changes
  const [month, setMonth] = useState(new Date());

  // Hold the selected date in state
  const [selectedDate, setSelectedDate] = useState(undefined);

  // Hold the dialog visibility in state
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Function to toggle the dialog visibility
  const toggleDialog = () => setIsDialogOpen(!isDialogOpen);

  const [validationError, setValidationError] = useState("");

  // Hook to handle the body scroll behavior and focus trapping
  useEffect(() => {
    const handleBodyScroll = (isOpen) => {
      document.body.style.overflow = isOpen ? "hidden" : "";
    };

    const handleClickOutside = (e) => {
      if (dialogRef.current && !dialogRef.current.contains(e.target)) {
        setIsDialogOpen(false);
      }
    };

    if (!dialogRef.current) return;

    if (isDialogOpen) {
      handleBodyScroll(true);
      dialogRef.current?.show();
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      handleBodyScroll(false);
      dialogRef.current.close();
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      handleBodyScroll(false);
      document.removeEventListener("mousedown", handleClickOutside);
    };

  }, [isDialogOpen]);

  const shortcuts = [
    { label: "Today", value: new Date() },
    { label: "Tomorrow", value: new Date().setDate(new Date().getDate() + 1) },
    { label: "1 Week from now", value: new Date().setDate(new Date().getDate() + 7) },
    { label: "Next month", value: new Date(new Date().getFullYear(), new Date().getMonth() + 1) },
  ];

  const handleDayPickerSelect = (date) => {
    setValidationError("");
    if (!date) {
      onChange({ target: { name, value: ""}})
      setSelectedDate(undefined);
    } else {
      setSelectedDate(date);
      onChange({ target: { name, value: format(date, "dd-MMM-yyyy")}})
    }
    dialogRef.current?.close();
  };

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    onChange({ target: { name, value: newValue } }); // send raw input to parent

    const parsedDate = parse(e.target.value, "dd-MMM-yyyy", new Date());

    if (isValid(parsedDate)) {
      const parsedMinDate = minDate.setDate(minDate.getDate() - 1);
      if (parsedDate < parsedMinDate) {
        setValidationError(`Please input a date after ${format(parsedMinDate, "dd-MMM-yyyy")}`);
        setSelectedDate(undefined);
      } else {
        setValidationError("");
        setSelectedDate(parsedDate);
        setMonth(parsedDate);
      }
    } else {
      setValidationError("Please input a valid date");
      setSelectedDate(undefined);
    }
  };

  return (
    <div className={containerStyles}>
      <div className="flex flex-row items-center gap-5">
        <div className={cn("relative font-sans text-lg border-2 rounded-xl border-gray/50 p-2 w-full 2xl:w-3/7 flex")}>
          <input
            id="date-input"
            name={name}
            type="text"
            value={value}
            placeholder={placeholder ? placeholder : "dd-mmm-yyyy"}
            onChange={handleInputChange}
            className="flex-1 min-w-[110px]"
          />{" "}
          <div
            className="cursor-pointer text-lg p-0.5 hover:bg-amber-400/20 dark:hover:bg-amber-100/10 rounded"
            onClick={() => handleDayPickerSelect(null)}
          >
            ❌
          </div>
          <div
            className="cursor-pointer text-lg p-0.5 hover:bg-amber-400/20 dark:hover:bg-amber-100/10 rounded"
            onClick={toggleDialog}
            aria-controls="dialog"
            aria-haspopup="dialog"
            aria-expanded={isDialogOpen}
            aria-label="Open calendar to choose booking date"
          >
            📆
          </div>
          
          <dialog
            role="dialog"
            ref={dialogRef}
            id={dialogId}
            aria-modal
            aria-labelledby={headerId}
            className="absolute left-0 mt-2 rounded-xl border-2 border-black/30 shadow-xl z-50 overflow-hidden"
            style={dialogStyles}
            onClose={() => setIsDialogOpen(false)}
          >
            <DayPicker
              classNames={{
                today: `text-orange font-bold`, // Add a border to today's date
                selected: `bg-orange dark:bg-bg-orange rounded-full text-white font-bold`, // Highlight the selected day
                root: `${defaultClassNames.root} shadow-lg p-3`,
                button_next: "hover:bg-amber-400/20 dark:hover:bg-amber-100/10 p-1 rounded cursor-pointer ",
                button_previous: "hover:bg-amber-400/20 dark:hover:bg-amber-100/10 p-1 rounded cursor-pointer",
                chevron: "fill-amber-500 inline-block",
                caption_label: `text-base`,
                years_dropdown: `${defaultClassNames.years_dropdown} bg-background text-sm text-text`,
                months_dropdown: `${defaultClassNames.months_dropdown} bg-background text-sm text-text`,
              }}
              className="bg-background text-text"
              animate 
              captionLayout="dropdown"
              navLayout="after" 
              numberOfMonths={1} 
              required={required} 
              showOutsideDays
              disabled={{ before: minDate }} 
              startMonth={minDate}
              endMonth={new Date(2060,11)}
              weekStartsOn={1}
              month={month}
              onMonthChange={setMonth}
              autoFocus
              mode="single"
              selected={selectedDate}
              onSelect={handleDayPickerSelect}
            />
          </dialog>
        </div>

        <div className="hidden 2xl:flex flex-1 flex-row gap-3">
          {showShortcuts && shortcuts.length > 0 && 
            shortcuts.map(shortcut => (
              <div key={shortcut.label} onClick={() => handleDayPickerSelect(shortcut.value)}>
                <p className="text-base text-blue cursor-pointer hover:underline hover:font-medium">{shortcut.label}</p>
              </div>
            ))
          }
        </div>
      </div>
      
      <div className="flex justify-between mt-1">
        {helperText && !error && (
          <p className="text-xs font-italic font-sans text-gray">{helperText}</p>
        )}

        {error && <p className="text-xs font-sans font-italic text-red">{error}</p>}

        {validationError && <p className="text-xs font-sans font-italic text-red">{validationError}</p>}

      </div>
      <div className="2xl:hidden w-full flex flex-row gap-3">
          {showShortcuts && shortcuts.length > 0 && 
            shortcuts.map(shortcut => (
              <div key={shortcut.label} onClick={() => handleDayPickerSelect(shortcut.value)}>
                <p className="text-base text-blue cursor-pointer hover:underline hover:font-medium">{shortcut.label}</p>
              </div>
            ))
          }
        </div>
    </div>
    
  )
};

export default DatePicker