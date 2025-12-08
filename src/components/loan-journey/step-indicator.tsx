interface StepIndicatorProps {
  current: number;
  total: number;
  titles: string[];
}

export function StepIndicator({ current, total, titles }: StepIndicatorProps) {
  return (
    <div>
      <div className="mb-2 text-center">
        <p className="text-sm font-medium text-primary">
          Step {current + 1} of {total}
        </p>
        <h2 className="text-2xl font-headline font-bold">{titles[current]}</h2>
      </div>
      <div className="flex items-center space-x-2">
        {Array.from({ length: total }).map((_, index) => (
          <div
            key={index}
            className={`h-2 flex-1 rounded-full ${
              index <= current ? 'bg-primary' : 'bg-secondary'
            } transition-colors duration-300`}
          />
        ))}
      </div>
    </div>
  );
}
