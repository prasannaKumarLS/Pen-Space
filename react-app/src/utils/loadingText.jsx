import { LoaderCircle } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex">
      <LoaderCircle className="animate-spin h-5 w-5 mr-2 text-gray-600" />
      <span>Please wait...</span>
    </div>
  );
}
