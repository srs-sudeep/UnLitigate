import errors from "../data/errors.json";
import { ErrorScreen } from "../components/ui/ErrorScreen";

type ServerErrorProps = {
  onRetry?: () => void;
};

export function ServerError({ onRetry }: ServerErrorProps) {
  return <ErrorScreen copy={errors.serverError} onRetry={onRetry} />;
}
