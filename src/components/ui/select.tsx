"use client"

import {
	Content,
	Icon,
	Item,
	ItemIndicator,
	ItemText,
	Label,
	Portal,
	type SelectProps as Props,
	Root,
	Separator,
	Trigger,
	Value,
	Viewport
} from "@radix-ui/react-select"
import { forwardRef } from "react"
import { LuCheck, LuChevronDown } from "react-icons/lu"
import { twMerge } from "tailwind-merge"

export { Group as SelectGroup } from "@radix-ui/react-select"

export interface SelectProps extends Props {
	contentProps?: React.ComponentPropsWithoutRef<typeof Content>
	triggerProps?: { placeholder?: string } & React.ComponentPropsWithoutRef<typeof Trigger>
}

export const Select = ({ children, contentProps, triggerProps, ...props }: SelectProps) => (
	<Root {...props}>
		<Trigger
			{...triggerProps}
			className={twMerge(
				"flex h-10 w-full items-center justify-between gap-2 rounded-md border-0 bg-transparent !py-1.5 px-3 text-sm !outline-none ring-1 !ring-inset ring-primary-300 transition-all duration-300 ease-in-out focus-within:ring-2 focus-within:ring-primary-500 focus:ring-2 focus:ring-primary-500 active:ring-2 active:ring-primary-500",
				// placehoolder styles
				"[&>span]:flex-1 [&>span]:text-left",
				!props?.value && "[&>span]:text-gray-400",
				// Icon Styles
				"[&>svg]:text-base [&>svg]:text-primary-400 [&>svg]:transition-[color] [&>svg]:duration-300 [&>svg]:data-[state=open]:text-primary-600",
				!!props?.value && "[&>svg]:!text-primary-600",
				triggerProps?.className
			)}>
			{triggerProps?.children}
			<Value placeholder={triggerProps?.placeholder || "Select an Item"} />
			<Icon asChild>
				<LuChevronDown className='h-4 w-4' />
			</Icon>
		</Trigger>

		<Portal>
			<Content
				{...contentProps}
				className={twMerge(
					"relative z-50 min-w-[var(--radix-select-trigger-width)] overflow-hidden rounded-md border border-slate-200 bg-white text-slate-950 shadow-md data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-50",
					"duration-500 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
					contentProps?.position === "popper" &&
						"data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
					contentProps?.className
				)}
				position={contentProps?.position || "popper"}
				side={contentProps?.side || "bottom"}>
				<Viewport
					className={twMerge(
						"p-1",
						contentProps?.position === "popper" && "h-[var(--radix-select-trigger-height)] w-full"
					)}>
					{children}
				</Viewport>
			</Content>
		</Portal>
	</Root>
)

export const SelectLabel = forwardRef<React.ElementRef<typeof Label>, React.ComponentPropsWithoutRef<typeof Label>>(
	({ className, ...props }, ref) => (
		<Label className={twMerge("py-1.5 pl-8 pr-2 text-sm font-semibold", className)} ref={ref} {...props} />
	)
)

export const SelectItem = forwardRef<React.ElementRef<typeof Item>, React.ComponentPropsWithoutRef<typeof Item>>(
	({ children, className, ...props }, ref) => (
		<Item
			className={twMerge(
				"relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-slate-100 focus:text-slate-900 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 dark:focus:bg-slate-800 dark:focus:text-slate-50",
				className
			)}
			ref={ref}
			{...props}>
			<span className='absolute left-2 flex h-3.5 w-3.5 items-center justify-center'>
				<ItemIndicator>
					<LuCheck className='h-4 w-4' />
				</ItemIndicator>
			</span>

			<ItemText>{children}</ItemText>
		</Item>
	)
)

export const SelectSeparator = forwardRef<
	React.ElementRef<typeof Separator>,
	React.ComponentPropsWithoutRef<typeof Separator>
>(({ className, ...props }, ref) => (
	<Separator className={twMerge("-mx-1 my-1 h-px bg-slate-100 dark:bg-slate-800", className)} ref={ref} {...props} />
))

SelectLabel.displayName = Label.displayName
SelectItem.displayName = Item.displayName
SelectSeparator.displayName = Separator.displayName
