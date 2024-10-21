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
    downAmount: number | string;
    loanAmount: number | string;
    monthlyInstallment: number | string;
    totalMonthlyCost: number | string;
    totalYearlyCost: number | string;
    totalAdditionalCost: number | string;
}

interface ExpensesInput {
    monthlyCosts?: (Cost | null)[];
    yearlyCosts?: (Cost | null)[];
    additionalCosts?: (Cost | null)[];
}

export function calculateCarCosts(carData: CarData): CostSummary {
    // Safely handle input values without defaulting to 0
    const price = carData.price || 0;
    const discount = carData.discount || 0;
    const downPaymentPercentage = carData.downPaymentPercentage || 0;
    const loanInterestRate = carData.loanInterestRate || 0;
    const loanTermYears = carData.loanTermYears || 0;

    // Calculate down amount (percentage of price)
    const downAmount = price * (downPaymentPercentage / 100) - discount;
    const loanAmount = price - downAmount

    const totalInterest = loanTermYears > 0 ? loanAmount * (loanInterestRate / 100) * loanTermYears : 0;
    const totalLoanAmount = loanAmount + totalInterest;
    const monthlyInstallment = loanTermYears > 0 ? totalLoanAmount / (loanTermYears * 12) : 0;

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

    // Total cost over all the years (monthly * loan years * 12 + additional costs)
    const totalAllYearsCost = (monthlyInstallment * loanTermYears * 12) + totalAdditionalCost;

    return {
        downAmount: isNaN(downAmount) || downAmount === Infinity ? 0 : downAmount,
        loanAmount: isNaN(loanAmount) || loanAmount === Infinity ? 0 : loanAmount,
        monthlyInstallment: isNaN(monthlyInstallment) || monthlyInstallment === Infinity ? 0 : monthlyInstallment,
        totalMonthlyCost: isNaN(totalMonthlyCostSum) || totalMonthlyCostSum === Infinity ? 0 : totalMonthlyCostSum,
        totalYearlyCost: isNaN(totalYearlyCostSum) || totalYearlyCostSum === Infinity ? 0 : totalYearlyCostSum,
        totalAdditionalCost: isNaN(totalAllYearsCost) || totalAllYearsCost === Infinity ? 0 : totalAllYearsCost,
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
