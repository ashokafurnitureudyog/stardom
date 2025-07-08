"use client";

import { Component, ErrorInfo, ReactNode } from "react";

/**
 * Props for the ErrorBoundary component
 */
interface ErrorBoundaryProps {
  /** Content to render when no error occurs */
  children: ReactNode;
  /** Component to render when an error is caught */
  fallback: ReactNode;
}

/**
 * State for the ErrorBoundary component
 */
interface ErrorBoundaryState {
  /** Whether an error has been caught */
  hasError: boolean;
  /** The error that was caught, if any */
  error?: Error;
}

/**
 * Error Boundary component to catch JavaScript errors in child components
 *
 * Prevents the entire app from crashing when a component fails,
 * displaying a fallback UI instead.
 */
export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  /**
   * Update state when an error occurs
   */
  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  /**
   * Log error information when a component error is caught
   */
  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Log the error to an error reporting service
    console.error("Error caught by ErrorBoundary:", error);
    console.error("Component stack:", errorInfo.componentStack);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      // Render fallback UI
      return this.props.fallback;
    }

    // When no error occurs, render children normally
    return this.props.children;
  }
}
