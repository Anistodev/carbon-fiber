import { cva, type VariantProps } from "cva";
import { ComponentProps } from "solid-js";

const styles = cva({
  base: "transition-colors",
  variants: {
    variant: {
      primary: "bg-primary text-text hover:bg-primary/90",

      secondary: "bg-white text-background hover:bg-white/90"
    },
    size: {
      md: "px-4 py-2",
      sm: "px-3 py-1"
    },
    disabled: {
      true: "opacity-50 cursor-not-allowed"
    }
  },
  defaultVariants: {
    variant: "primary",
    size: "md",
    disabled: false
  }
})

const Button = (
  props: VariantProps<typeof styles> & ComponentProps<"button">
) => {
  return <button {...props} class={styles({ variant: props.variant, size: props.size, disabled: props.disabled }) + " " + props.class} />;
}

export default Button;