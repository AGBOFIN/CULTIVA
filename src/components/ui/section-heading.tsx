import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: string;
  align?: "center" | "left";
  dark?: boolean;
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  dark = false,
  className,
}: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={cn(
        "mb-12 sm:mb-16",
        align === "center" ? "text-center mx-auto max-w-3xl" : "text-left max-w-2xl",
        className
      )}
    >
      {eyebrow && (
        <span
          className={cn(
            "inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase mb-5",
            dark
              ? "bg-white/10 text-cultiva-yellow backdrop-blur"
              : "bg-cultiva-green/10 text-cultiva-green"
          )}
        >
          {eyebrow}
        </span>
      )}
      <h2
        className={cn(
          "font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold tracking-tight leading-tight",
          dark ? "text-white" : "text-gray-900"
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "mt-4 text-base sm:text-lg leading-relaxed",
            dark ? "text-white/70" : "text-gray-600"
          )}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
