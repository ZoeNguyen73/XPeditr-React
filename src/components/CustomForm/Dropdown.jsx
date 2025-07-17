import { useEffect, useState } from "react";

import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from "@headlessui/react";
import { LuChevronDown, LuCheck } from "react-icons/lu";

import { useThemeContext } from "../../context/ThemeProvider";

import { cn } from "../../utils/ClassName";

const Dropdown = ({ 
  containerStyles,
  name, 
  value, 
  onChange, 
  options, 
  disabled = false,
  required = false,
  readOnly = false,
  error,
  helperText, 
}) => {

  const index = Math.max(options.findIndex(option => option.value === value), 0);
  const { theme } = useThemeContext();

  const tickColor = theme === "dark" ? "white" : "black";

  return (
    <div className={cn(containerStyles, "mx-auto")}>
      <Listbox value={value} onChange={(val) => onChange({ target: { name, value: val }})}>
        <ListboxButton
          className={cn(
            "relative block w-full rounded-lg dark:bg-white/5 bg-gray/20 py-2 pr-15 pl-3 text-left text-lg text-text",
            "focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-white/25"
          )}
        >
          {options[index].label}
          <LuChevronDown 
            className="group pointer-events-none absolute top-2 right-2 w-[20px] h-[20px]"
          />
        </ListboxButton>
        <ListboxOptions 
          anchor="bottom"
          transition
          className={cn(
            'w-(--button-width) rounded-xl border dark:border-neutral-800 dark:bg-neutral-800 bg-neutral-300 border-gray p-1 [--anchor-gap:--spacing(1)] focus:outline-none',
            'transition duration-100 ease-in data-leave:data-closed:opacity-0'
          )}
        >
          {options.map(({value, label}) => (
            <ListboxOption
              name={name}
              key={value}
              value={value}
              className="group flex cursor-default gap-2 rounded-lg px-3 py-1.5 select-none data-focus:bg-gray/25"
            >
              <LuCheck className="invisible group-data-selected:visible" color={tickColor}/>
              <p className="text-lg text-text">{label}</p>
            </ListboxOption>
          ))}
        </ListboxOptions>
      </Listbox>
      <div className="flex justify-between mt-1">
        {helperText && !error && (
          <p className="text-xs font-italic font-sans text-gray">{helperText}</p>
        )}

        {error && <p className="text-xs font-sans font-italic text-red">{error}</p>}

      </div>
    </div>
  )
};

export default Dropdown;