import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'motion/react';

// Word-by-word or character-by-character animated heading
export function AnimatedHeading({
  text,
  highlightWords = [],
  highlightClass = "health-gradient-text",
  className = "",
  as: Component = "h2",
  delay = 0,
}: {
  text: string;
  highlightWords?: string[];
  highlightClass?: string;
  className?: string;
  as?: any;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

  const words = text.split(" ");

  return (
    <Component ref={ref} className={`inline-block overflow-hidden ${className}`}>
      {words.map((word, i) => {
        const isHighlight = highlightWords.some(hw => 
          word.toLowerCase().replace(/[^a-z0-9]/gi, '') === hw.toLowerCase().replace(/[^a-z0-9]/gi, '')
        );

        return (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 35, rotateX: 25 }}
            animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
            transition={{
              duration: 0.55,
              delay: delay + i * 0.05,
              ease: [0.215, 0.61, 0.355, 1],
            }}
            className={`inline-block mr-[0.25em] ${isHighlight ? highlightClass : ""}`}
          >
            {word}
          </motion.span>
        );
      })}
    </Component>
  );
}

// Silky fade-and-slide up for paragraphs and descriptions
export function AnimatedParagraph({
  children,
  className = "",
  delay = 0.15,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <motion.p
      ref={ref}
      initial={{ opacity: 0, y: 22 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.p>
  );
}

// Glowing, bouncy animated pill badge
export function AnimatedBadge({
  children,
  className = "",
  icon: Icon,
}: {
  children: React.ReactNode;
  className?: string;
  icon?: any;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.88, y: -10 }}
      animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
      transition={{ duration: 0.45, ease: "easeOut" }}
      whileHover={{ scale: 1.05 }}
      className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-bold shadow-sm cursor-default ${className}`}
    >
      {Icon && (
        <motion.span
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        >
          <Icon className="w-4 h-4" />
        </motion.span>
      )}
      <span>{children}</span>
    </motion.div>
  );
}

// Number counter animation with smooth rolling count
export function AnimatedNumber({
  value,
  suffix = "",
  className = "",
}: {
  value: number | string;
  suffix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [displayValue, setDisplayValue] = useState<number | string>(
    typeof value === "number" ? 0 : value
  );

  useEffect(() => {
    if (!isInView || typeof value !== "number") return;

    let start = 0;
    const end = value;
    const duration = 1600; // ms
    const startTime = performance.now();

    const update = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutExpo
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const current = Math.floor(start + (end - start) * easeProgress);

      setDisplayValue(current);

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        setDisplayValue(end);
      }
    };

    requestAnimationFrame(update);
  }, [isInView, value]);

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.6 }}
      className={`tabular-nums ${className}`}
    >
      {displayValue}
      {suffix}
    </motion.span>
  );
}

// Fade reveal wrapper for cards and blocks
export function FadeInBlock({
  children,
  className = "",
  delay = 0,
  direction = "up",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

  const getOffset = () => {
    switch (direction) {
      case "up": return { y: 28, x: 0 };
      case "down": return { y: -28, x: 0 };
      case "left": return { x: 28, y: 0 };
      case "right": return { x: -28, y: 0 };
    }
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, ...getOffset() }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
