
import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import LoanSlider from "./LoanSlider";
import LoanResultsCard from "./LoanResultsCard";
import { useToast } from "@/components/ui/use-toast";

const LoanCalculator = () => {
  // State variables for loan calculation
  const [loanAmount, setLoanAmount] = useState<number>(200000);
  const [interestRate, setInterestRate] = useState<number>(5);
  const [loanTerm, setLoanTerm] = useState<number>(30);
  
  // State variables for calculation results
  const [monthlyPayment, setMonthlyPayment] = useState<number>(0);
  const [totalPayment, setTotalPayment] = useState<number>(0);
  const [totalInterest, setTotalInterest] = useState<number>(0);
  
  const { toast } = useToast();

  // Formatters for the slider inputs
  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatPercentage = (value: number): string => {
    return value.toFixed(2) + "%";
  };

  const formatYears = (value: number): string => {
    return value.toString() + (value === 1 ? " year" : " years");
  };

  // Parsers for the slider inputs
  const parseCurrency = (value: string): number => {
    return parseFloat(value.replace(/[$,]/g, ""));
  };

  const parsePercentage = (value: string): number => {
    return parseFloat(value.replace("%", ""));
  };

  const parseYears = (value: string): number => {
    return parseInt(value.replace(/\D/g, ""));
  };

  // Calculate loan payments
  useEffect(() => {
    if (loanAmount <= 0 || interestRate <= 0 || loanTerm <= 0) {
      return;
    }

    try {
      // Convert annual interest rate to monthly rate
      const monthlyRate = interestRate / 100 / 12;
      
      // Convert years to months
      const numberOfPayments = loanTerm * 12;
      
      // Calculate monthly payment using the loan formula
      // M = P[r(1+r)^n]/[(1+r)^n-1]
      const monthlyPaymentValue =
        (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
        (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
      
      // Calculate total payment over the loan term
      const totalPaymentValue = monthlyPaymentValue * numberOfPayments;
      
      // Calculate total interest
      const totalInterestValue = totalPaymentValue - loanAmount;
      
      setMonthlyPayment(monthlyPaymentValue);
      setTotalPayment(totalPaymentValue);
      setTotalInterest(totalInterestValue);
    } catch (error) {
      toast({
        title: "Calculation Error",
        description: "There was an error calculating your loan payments.",
        variant: "destructive"
      });
      console.error("Calculation error:", error);
    }
  }, [loanAmount, interestRate, loanTerm, toast]);

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <Card className="border-muted shadow-md">
        <CardContent className="pt-6">
          <div className="space-y-6">
            <LoanSlider
              value={loanAmount}
              setValue={setLoanAmount}
              min={1000}
              max={1000000}
              step={1000}
              formatValue={formatCurrency}
              parseValue={parseCurrency}
              label="Loan Amount"
              unit="$"
            />
            
            <LoanSlider
              value={interestRate}
              setValue={setInterestRate}
              min={0.1}
              max={20}
              step={0.1}
              formatValue={formatPercentage}
              parseValue={parsePercentage}
              label="Interest Rate"
              unit="%"
            />
            
            <LoanSlider
              value={loanTerm}
              setValue={setLoanTerm}
              min={1}
              max={40}
              step={1}
              formatValue={formatYears}
              parseValue={parseYears}
              label="Loan Term"
              unit=""
            />
          </div>
        </CardContent>
      </Card>
      
      <LoanResultsCard
        monthlyPayment={monthlyPayment}
        totalPayment={totalPayment}
        totalInterest={totalInterest}
        principal={loanAmount}
        loanTerm={loanTerm}
      />
    </div>
  );
};

export default LoanCalculator;
