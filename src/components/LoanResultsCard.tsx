
import { Card, CardContent, CardHeader } from "@/components/ui/card";
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
    <Card className="border-0 rounded-2xl shadow-lg overflow-hidden bg-white">
      <CardHeader className="bg-apple-gray pb-2 px-6 pt-6">
        <h3 className="text-apple-text text-lg font-medium">Loan Summary</h3>
      </CardHeader>
      <CardContent className="pt-6 px-6">
        <div className="space-y-6">
          <div className="text-center">
            <p className="text-muted-foreground text-sm mb-1.5">Monthly Payment</p>
            <p className="text-3xl font-semibold text-apple-blue">
              {formatCurrency(monthlyPayment)}
            </p>
          </div>

          <Separator className="bg-gray-200/70" />

          <div className="grid grid-cols-2 gap-6 text-center">
            <div>
              <p className="text-muted-foreground text-xs mb-1.5">Loan Amount</p>
              <p className="font-medium text-apple-text">{formatCurrency(principal)}</p>
            </div>
            <div>
              <p className="text-muted-foreground text-xs mb-1.5">Loan Term</p>
              <p className="font-medium text-apple-text">{loanTerm} years</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 text-center">
            <div>
              <p className="text-muted-foreground text-xs mb-1.5">Total Payment</p>
              <p className="font-medium text-apple-text">{formatCurrency(totalPayment)}</p>
            </div>
            <div>
              <p className="text-muted-foreground text-xs mb-1.5">Total Interest</p>
              <p className="font-medium text-apple-text">{formatCurrency(totalInterest)}</p>
            </div>
          </div>

          {/* Payment breakdown chart */}
          <div className="pt-2">
            <p className="text-xs text-muted-foreground mb-3">Payment Breakdown</p>
            <div className="w-full h-4 rounded-full bg-gray-100 overflow-hidden">
              <div
                className="h-full bg-apple-blue"
                style={{
                  width: `${principalPercentage}%`,
                  float: "left",
                }}
              />
              <div
                className="h-full bg-apple-highlight"
                style={{ width: `${interestPercentage}%` }}
              />
            </div>
            <div className="flex justify-between mt-2.5 text-xs">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-apple-blue rounded-full mr-1.5"></div>
                <span className="text-apple-text">Principal ({Math.round(principalPercentage)}%)</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-apple-highlight rounded-full mr-1.5"></div>
                <span className="text-apple-text">Interest ({Math.round(interestPercentage)}%)</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LoanResultsCard;
