export interface Cost {
    item: string;
    cost: number;
}

export interface CarData {
    price: number;
    discount: number;
    downPaymentPercentage: number;
    loanInterestRate: number;
    loanTermYears: number;
    monthlyCosts: Cost[]
    yearlyCosts: Cost[]
    additionalCost: Cost[]
}

// Define the return type
export interface CarCostSummary {
    loanAmount: number;
    monthlyInstallment: string;
    totalMonthlyCost: string;
    totalYearlyCost: string;
    totalAllYearsCost: string;
}

export function calculateCarCosts(carData: CarData): CarCostSummary {
    // Calculate loan amount and interest
    const loanAmount = carData.price * ((100 - carData.downPaymentPercentage) / 100);
    const totalInterest = loanAmount * (carData.loanInterestRate / 100) * carData.loanTermYears;
    const totalAmount = loanAmount + totalInterest;
    const monthlyInstallment = totalAmount / (carData.loanTermYears * 12);

    const validMonthlyInstallment = isNaN(monthlyInstallment) ? 0 : monthlyInstallment;

    let totalMonthlyCost = validMonthlyInstallment;

    for (const cost of carData.monthlyCosts) {
        totalMonthlyCost += cost.cost ?? 0; // Use 0 if the value is undefined
    }

    let totalYearlyCost = validMonthlyInstallment * 12;

    for (const cost of carData.yearlyCosts) {
        totalYearlyCost += cost.cost ?? 0; // Use 0 if the value is undefined
    }

    let totalSumYearsCost = validMonthlyInstallment * carData.loanTermYears * 12;

    // for (const cost of carData.additionalCost) {
    //     total7YearsCost += cost.cost; // No need to use ?? because cost is required here
    // }

    return {
        loanAmount: isNaN(loanAmount) ? 0 : loanAmount,
        monthlyInstallment: validMonthlyInstallment.toFixed(2),
        totalMonthlyCost: isNaN(totalMonthlyCost) ? '0.00' : totalMonthlyCost.toFixed(2),
        totalYearlyCost: isNaN(totalYearlyCost) ? '0.00' : totalYearlyCost.toFixed(2),
        totalAllYearsCost: isNaN(totalSumYearsCost) ? '0.00' : totalSumYearsCost.toFixed(2),
    };
}

