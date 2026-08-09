import { ScrollReveal } from '@/components/ScrollReveal';

interface SectionHeadingProps {
  index: string;
  title: string;
  note?: string;
  className?: string;
}

export function SectionHeading({ index, title, note, className = '' }: SectionHeadingProps) {
  return (
    <ScrollReveal className={`mb-12 sm:mb-16 ${className}`}>
      <div className="flex items-center gap-3 sm:gap-4">
        <span className="label-mono text-accent">{index}</span>
        <span className="h-px flex-1 bg-border" aria-hidden="true" />
        {note && <span className="label-mono text-muted-foreground text-right">{note}</span>}
      </div>
      <h2 className="mt-5 text-3xl sm:text-4xl font-semibold tracking-tight text-foreground">
        {title}
      </h2>
    </ScrollReveal>
  );
}
