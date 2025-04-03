
import LoanCalculator from "../components/LoanCalculator";
import { Calculator } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-loan-light">
      <div className="container max-w-4xl py-8 px-4 md:px-8 mx-auto">
        <header className="mb-12 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Calculator className="w-8 h-8 text-loan-primary" strokeWidth={1.5} />
            <h1 className="text-3xl font-bold text-loan-dark">Loan Calculator</h1>
          </div>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Calculate your monthly payments, total interest, and more with our easy-to-use loan calculator.
          </p>
        </header>
        
        <main>
          <LoanCalculator />
        </main>
        
        <footer className="mt-16 pt-6 border-t border-muted text-sm text-center text-muted-foreground">
          <p>© {new Date().getFullYear()} Loan Calculator. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
