import { Loader2Icon } from "lucide-react";

interface Props {
  title: string;
  description: string;
}

export const LoadingState = ({ title, description }: Props) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center p-4">
      <Loader2Icon className="h-12 w-12 animate-spin text-sidebar-accent" />
      <div className="mt-4">
        <h6 className="text-lg font-medium">{title}</h6>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
    </div>
  );
};
