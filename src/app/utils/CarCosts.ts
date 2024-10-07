export interface Cost {
    item: string;
    cost: number | null; // Costs can be null now
}

export interface CarData {
    price: number;
    discount: number;
    downPaymentPercentage: number;
    loanInterestRate: number;
    loanTermYears: number;
    monthlyCosts?: (Cost | null)[]; // Array of costs or null values
    yearlyCosts?: (Cost | null)[];
    additionalCost?: (Cost | null)[];
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

    // Add monthly costs (handling null or undefined values)
    if (carData.monthlyCosts) {
        for (const cost of carData.monthlyCosts) {
            if (cost && cost.cost !== null) {
                totalMonthlyCost += cost.cost; // Use 0 if the value is null
            }
        }
    }

    let totalYearlyCost = validMonthlyInstallment * 12;

    // Add yearly costs (handling null or undefined values)
    if (carData.yearlyCosts) {
        for (const cost of carData.yearlyCosts) {
            if (cost && cost.cost !== null) {
                totalYearlyCost += cost.cost; // Use 0 if the value is null
            }
        }
    }

    const totalSumYearsCost = validMonthlyInstallment * carData.loanTermYears * 12;

    // Handle additional costs if needed (you can uncomment and adapt the logic based on how you want it calculated)
    // if (carData.additionalCost) {
    //     for (const cost of carData.additionalCost) {
    //         if (cost && cost.cost !== null) {
    //             totalSumYearsCost += cost.cost;
    //         }
    //     }
    // }

    return {
        loanAmount: isNaN(loanAmount) ? 0 : loanAmount,
        monthlyInstallment: validMonthlyInstallment.toFixed(2),
        totalMonthlyCost: isNaN(totalMonthlyCost) ? '0.00' : totalMonthlyCost.toFixed(2),
        totalYearlyCost: isNaN(totalYearlyCost) ? '0.00' : totalYearlyCost.toFixed(2),
        totalAllYearsCost: isNaN(totalSumYearsCost) ? '0.00' : totalSumYearsCost.toFixed(2),
    };
}
