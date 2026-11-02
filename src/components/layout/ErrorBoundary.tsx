import { Component, type ErrorInfo, type ReactNode } from "react";
import { ServerError } from "../../pages/ServerError";

type Props = { children: ReactNode };
type State = { hasError: boolean };

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error(error, info);
  }

  reset = () => {
    this.setState({ hasError: false });
  };

  render() {
    if (this.state.hasError) {
      return <ServerError onRetry={this.reset} />;
    }
    return this.props.children;
  }
}
