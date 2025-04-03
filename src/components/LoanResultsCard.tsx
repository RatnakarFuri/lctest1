
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface LoanResultsCardProps {
  monthlyPayment: number;
  totalPayment: number;
  totalInterest: number;
  principal: number;
  loanTerm: number;
}

const LoanResultsCard = ({
  monthlyPayment,
  totalPayment,
  totalInterest,
  principal,
  loanTerm,
}: LoanResultsCardProps) => {
  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 2,
    }).format(value);

  // Calculate the interest percentage of the total payment
  const interestPercentage = (totalInterest / totalPayment) * 100;
  const principalPercentage = 100 - interestPercentage;

  return (
    <Card className="border-loan-accent/30 shadow-md">
      <CardHeader className="bg-loan-light pb-2">
        <CardTitle className="text-loan-dark text-lg">Loan Summary</CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-5">
          <div className="text-center">
            <p className="text-muted-foreground text-sm mb-1">Monthly Payment</p>
            <p className="text-3xl font-semibold text-loan-primary">
              {formatCurrency(monthlyPayment)}
            </p>
          </div>

          <Separator />

          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <p className="text-muted-foreground text-xs mb-1">Loan Amount</p>
              <p className="font-medium">{formatCurrency(principal)}</p>
            </div>
            <div>
              <p className="text-muted-foreground text-xs mb-1">Loan Term</p>
              <p className="font-medium">{loanTerm} years</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <p className="text-muted-foreground text-xs mb-1">Total Payment</p>
              <p className="font-medium">{formatCurrency(totalPayment)}</p>
            </div>
            <div>
              <p className="text-muted-foreground text-xs mb-1">Total Interest</p>
              <p className="font-medium">{formatCurrency(totalInterest)}</p>
            </div>
          </div>

          {/* Payment breakdown chart */}
          <div className="pt-2">
            <p className="text-xs text-muted-foreground mb-2">Payment Breakdown</p>
            <div className="w-full h-4 rounded-full bg-gray-100 overflow-hidden">
              <div
                className="h-full bg-loan-primary"
                style={{
                  width: `${principalPercentage}%`,
                  float: "left",
                }}
              />
              <div
                className="h-full bg-loan-secondary"
                style={{ width: `${interestPercentage}%` }}
              />
            </div>
            <div className="flex justify-between mt-1 text-xs">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-loan-primary rounded-full mr-1"></div>
                <span>Principal ({Math.round(principalPercentage)}%)</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-loan-secondary rounded-full mr-1"></div>
                <span>Interest ({Math.round(interestPercentage)}%)</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LoanResultsCard;
