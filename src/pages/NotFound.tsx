import errors from "../data/errors.json";
import { ErrorScreen } from "../components/ui/ErrorScreen";

export function NotFound() {
  return <ErrorScreen copy={errors.notFound} />;
}
