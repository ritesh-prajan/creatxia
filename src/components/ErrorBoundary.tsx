import React, { ErrorInfo, ReactNode } from 'react';
import { AlertTriangle } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallbackTitle?: string;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends React.Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error caught in ErrorBoundary:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.hash = '#home';
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="p-8 my-6 bg-rose-50/50 border border-rose-100 rounded-3xl text-center max-w-xl mx-auto space-y-4 font-sans text-neutral-dark animate-fadeIn">
          <div className="bg-rose-100/60 p-3 rounded-full w-12 h-12 flex items-center justify-center mx-auto text-rose-600">
            <AlertTriangle className="h-6 w-6" />
          </div>
          <div className="space-y-2">
            <h3 className="font-serif text-lg font-bold text-brand-plum">
              {this.props.fallbackTitle || 'Something went wrong inside this view'}
            </h3>
            <p className="text-xs text-neutral-mid leading-relaxed max-w-sm mx-auto">
              A temporary issue occurred while rendering this interface. Our system logged this issue.
            </p>
            {this.state.error && (
              <pre className="text-[10px] bg-white border border-rose-100 p-2.5 rounded-lg text-left overflow-auto max-h-24 text-rose-700 font-mono">
                {this.state.error.message}
              </pre>
            )}
          </div>
          <div>
            <button
              onClick={this.handleReset}
              className="text-xs font-bold text-white bg-brand-rose hover:bg-brand-rose/90 px-5 py-2.5 rounded-full transition-all active:scale-95 cursor-pointer shadow-xs"
            >
              Reset Page View
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
