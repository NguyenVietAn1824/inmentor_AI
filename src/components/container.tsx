import { cn } from "../lib/utils";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export const Container = ({ children, className }: ContainerProps) => {
  return (
    <div
      className={cn("flex container mx-auto w-full", className)}
    >
      {children}
    </div>
  );
};
