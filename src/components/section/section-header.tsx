interface SectionHeaderProps {
  title: string;
  subtitle?: string;
}

export function SectionHeader({ title, subtitle }: SectionHeaderProps) {
  return (
    <div className='mb-4 sm:mb-6'>
      <div>
        <h2 className='text-xl sm:text-2xl md:text-3xl font-bold text-foreground'>
          {title}
        </h2>
        {subtitle && (
          <p className='text-sm text-muted-foreground mt-1'>{subtitle}</p>
        )}
      </div>
    </div>
  );
}
