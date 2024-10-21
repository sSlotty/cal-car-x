export interface Cost {
    item: string;
    cost: number | null;
}

export interface CarData {
    price: number;
    discount: number;
    downPaymentPercentage: number;
    loanInterestRate: number;
    loanTermYears: number;
    monthlyCosts?: (Cost | null)[];
    yearlyCosts?: (Cost | null)[];
    additionalCost?: (Cost | null)[];
}

export interface CostSummary {
    downAmount: number;
    loanAmount: number;
    monthlyInstallment: string;
    totalMonthlyCost: string;
    totalYearlyCost: string;
    totalAdditionalCost: string;
}

interface ExpensesInput {
    monthlyCosts?: (Cost | null)[];
    yearlyCosts?: (Cost | null)[];
    additionalCosts?: (Cost | null)[];
}

export function calculateCarCosts(carData: CarData): CostSummary {
    // Calculate down amount (percentage of price) and subtract discount
    const downAmount = (carData.price * (carData.downPaymentPercentage / 100)) - carData.discount;

    // Calculate loan amount (remaining amount after down payment)
    const loanAmount = carData.price - downAmount;

    // Calculate total interest and monthly installment
    const totalInterest = loanAmount * (carData.loanInterestRate / 100) * carData.loanTermYears;
    const totalLoanAmount = loanAmount + totalInterest;
    const monthlyInstallment = totalLoanAmount / (carData.loanTermYears * 12);

    // Calculate expenses for monthly, yearly, and additional costs
    const { totalMonthlyCost, totalYearlyCost, totalAdditionalCost } = calculateExpenses({
        monthlyCosts: carData.monthlyCosts,
        yearlyCosts: carData.yearlyCosts,
        additionalCosts: carData.additionalCost,
    });

    // Total monthly cost (installment + monthly costs)
    const totalMonthlyCostSum = monthlyInstallment + totalMonthlyCost;

    // Total yearly cost (monthly * 12 + yearly costs)
    const totalYearlyCostSum = (monthlyInstallment * 12) + totalYearlyCost + (totalMonthlyCost * 12);

    // Total cost over all the years (monthly * loan years + additional costs)
    const totalAllYearsCost = (monthlyInstallment * carData.loanTermYears * 12) + totalAdditionalCost;

    return {
        downAmount: Math.max(downAmount, 0),
        loanAmount: Math.max(loanAmount, 0),
        monthlyInstallment: monthlyInstallment.toFixed(2),
        totalMonthlyCost: totalMonthlyCostSum.toFixed(2),
        totalYearlyCost: totalYearlyCostSum.toFixed(2),
        totalAdditionalCost: totalAllYearsCost.toFixed(2),
    };
}

function calculateExpenses(expensesInput: ExpensesInput) {
    const totalMonthlyCost = calculateCostSum(expensesInput.monthlyCosts);
    const totalYearlyCost = calculateCostSum(expensesInput.yearlyCosts);
    const totalAdditionalCost = calculateCostSum(expensesInput.additionalCosts);

    return {
        totalMonthlyCost,
        totalYearlyCost,
        totalAdditionalCost,
    };
}

function calculateCostSum(costs?: (Cost | null)[]): number {
    return costs?.reduce((acc, currentItem) => acc + (currentItem?.cost ?? 0), 0) || 0;
}
