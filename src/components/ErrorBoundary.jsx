import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    // eslint-disable-next-line no-console
    console.error('Bard Santner error boundary:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[70vh] flex items-center justify-center px-6 bg-navy-950 text-white">
          <div className="text-center max-w-md">
            <p className="label-xs text-orange-500">RED FLAG</p>
            <h1 className="mt-4 font-display text-5xl sm:text-6xl uppercase">
              The Page Has Stalled.
            </h1>
            <p className="mt-4 text-steel-300 text-sm">
              Something broke mid-swing. Refresh to try again — or WhatsApp us
              and we'll sort it.
            </p>
            <div className="mt-8 flex items-center justify-center gap-3">
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-3 bg-orange-500 text-white text-xs tracking-[0.2em] uppercase font-bold hover:bg-orange-400 transition"
              >
                Refresh
              </button>
              <a
                href="/"
                className="px-6 py-3 border border-white text-white text-xs tracking-[0.2em] uppercase font-bold hover:bg-white hover:text-navy-900 transition"
              >
                Home
              </a>
            </div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
