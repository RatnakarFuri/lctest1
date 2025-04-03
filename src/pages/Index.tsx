
import LoanCalculator from "../components/LoanCalculator";
import { Calculator } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-apple-gray">
      {/* Apple-style navigation bar */}
      <nav className="bg-[rgba(245,245,247,0.8)] backdrop-blur-md border-b border-gray-200/30 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <Calculator className="w-5 h-5 text-apple-text" strokeWidth={1.5} />
              <span className="ml-2 text-sm font-medium text-apple-text">Loan Calculator</span>
            </div>
          </div>
        </div>
      </nav>

      <div className="container max-w-5xl py-12 px-4 md:px-8 mx-auto">
        <header className="mb-16 text-center">
          <h1 className="text-5xl font-semibold text-apple-text mb-5 tracking-tight">
            Loan Calculator
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Calculate your monthly payments, total interest, and more with our simple tool.
          </p>
        </header>
        
        <main>
          <LoanCalculator />
        </main>
        
        <footer className="mt-24 pt-8 border-t border-gray-200/50 text-sm text-center text-muted-foreground">
          <p>© {new Date().getFullYear()} Apple-style Loan Calculator. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
