import { AlertCircle } from "lucide-react";

interface Props {
  title: string;
  description: string;
}

export const ErrorState = ({ title, description }: Props) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center p-4">
      <AlertCircle className="h-12 w-12 animate-spin text-red-600" />
      <div className="mt-4">
        <h6 className="text-lg font-medium text-red-500">{title}</h6>
        <p className="text-sm text-gray-500 text-red-500">{description}</p>
      </div>
    </div>
  );
};
