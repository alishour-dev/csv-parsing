import { cn } from "@/utils/cn"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { LuLoader2 } from "react-icons/lu"

const buttonVariants = cva(
	"relative inline-flex items-center overflow-hidden justify-center rounded-md text-sm font-medium ring-offset-white transition-all duration-300 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300",
	{
		defaultVariants: { size: "default", variant: "default" },
		variants: {
			size: {
				default: "h-10 px-4 py-2",
				icon: "h-10 w-10",
				lg: "h-11 rounded-md px-8",
				sm: "h-9 rounded-md px-3"
			},
			variant: {
				default: "!bg-primary-600 text-white hover:!bg-opacity-75 dark:bg-primary-50 dark:text-primary-900",
				destructive: "!bg-red-500 !text-slate-50 hover:!bg-opacity-75 dark:bg-red-900 dark:text-slate-50",
				ghost: "hover:bg-primary-100 hover:text-primary-900 dark:hover:bg-primary-800 dark:hover:text-primary-50",
				link: "text-primary-900 underline-offset-4 hover:underline dark:text-primary-50",
				outline:
					"border border-primary-500 bg-white text-primary-500 hover:bg-primary-50 hover:text-primary-800 hover:border-primary-800 dark:border-primary-800 dark:bg-primary-950 dark:hover:bg-primary-800 dark:hover:text-primary-50",
				secondary:
					"bg-primary-100 text-primary-900 hover:bg-primary-100/80 dark:bg-primary-800 dark:text-primary-50 dark:hover:bg-primary-800/80"
			}
		}
	}
)

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	asChild?: boolean
	loading?: boolean
}

export const Button = ({
	asChild = false,
	children,
	className,
	disabled,
	loading = false,
	size,
	variant,
	...props
}: ButtonProps) => {
	const Comp = asChild ? Slot : "button"

	return (
		<Comp {...props} className={cn(buttonVariants({ className, size, variant }))} disabled={disabled || loading}>
			{children}

			{loading && <LuLoader2 className='animate-spin' />}
		</Comp>
	)
}
