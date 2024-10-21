export interface LanguageData {
    costTitle: string;
    monthlyCosts: string;
    monthlyCostsInfoTitle: string;
    monthlyCostDesc: string;
    yearlyCosts: string;
    yearlyCostsInfoTitle: string;
    yearlyCostsDesc: string;
    additionalCosts: string;
    additionalCostsInfoTitle: string;
    additionalCostsDesc: string;
    missingItem: string;
    missingCost: string;
    carInformation: string;
    price: string;
    discount: string;
    downPaymentPercentage: string;
    loanInterestRate: string;
    loanTerm: string;
    insurance: string;
    fuelCost: string;
    maintenance: string;
    registration: string;
    loanCalculation: string;
    downAmount:string,
    loanAmount: string;
    monthlyInstallment: string;
    totalMonthlyCost: string;
    totalYearlyCost: string;
    summary: string
}

export interface Language {
    en: LanguageData;
    th: LanguageData;
}

export const languageData: Language = {
    en: {
        //cost information
        costTitle: 'Cost',
        monthlyCosts: 'Monthly Costs',
        monthlyCostsInfoTitle: 'Monthly Costs Information',
        monthlyCostDesc: 'This section contains all recurring monthly expenses.',
        yearlyCosts: 'Yearly Costs',
        yearlyCostsInfoTitle: 'Yearly Costs Information',
        yearlyCostsDesc: 'This section contains all recurring yearly expenses.',
        additionalCosts: 'Additional Costs',
        additionalCostsInfoTitle: 'Additional Costs Information',
        additionalCostsDesc: 'This section contains other additional costs.',
        missingItem: 'Missing Item',
        missingCost: 'Missing Cost',
        //Input Car Information
        carInformation: 'Car Information',
        price: 'Price (THB)',
        discount: 'Discount (THB)',
        downPaymentPercentage: 'Down Payment Percentage (%)',
        loanInterestRate: 'Loan Interest Rate (%)',
        loanTerm: 'Loan Term (Years)',
        // Additional Fields
        insurance: 'Insurance',
        fuelCost: 'Fuel Cost',
        maintenance: 'Maintenance',
        registration: 'Registration Fees',
        // Loan Calculation Fields
        loanCalculation: 'Loan Calculation',
        downAmount:'Down Amount',
        loanAmount: 'Loan Amount',
        monthlyInstallment: 'Monthly Installment',
        totalMonthlyCost: 'Total Monthly Cost',
        totalYearlyCost: 'Total Yearly Cost',
        summary: 'Summary'
    },
    th: {
        //cost information
        costTitle: 'ค่าใช้จ่าย',
        monthlyCosts: 'ค่าใช้จ่ายรายเดือน',
        monthlyCostsInfoTitle: 'ข้อมูลค่าใช้จ่ายรายเดือน',
        monthlyCostDesc: 'ส่วนนี้ประกอบด้วยค่าใช้จ่ายรายเดือนทั้งหมด',
        yearlyCosts: 'ค่าใช้จ่ายรายปี',
        yearlyCostsInfoTitle: 'ข้อมูลค่าใช้จ่ายรายปี',
        yearlyCostsDesc: 'ส่วนนี้ประกอบด้วยค่าใช้จ่ายรายปีทั้งหมด',
        additionalCosts: 'ค่าใช้จ่ายเพิ่มเติม',
        additionalCostsInfoTitle: 'ข้อมูลค่าใช้จ่ายเพิ่มเติม',
        additionalCostsDesc: 'ส่วนนี้ประกอบด้วยค่าใช้จ่ายเพิ่มเติมอื่น ๆ',
        missingItem: 'กรุณากรอก รายการ',
        missingCost: 'กรุณากรอก ค่าใช้จ่าย',
        //Input Car Information
        carInformation: 'ข้อมูลรถยนต์',
        price: 'ราคา (บาท)',
        discount: 'ส่วนลด (บาท)',
        downPaymentPercentage: 'เปอร์เซ็นต์เงินดาวน์ (%)',
        loanInterestRate: 'อัตราดอกเบี้ยเงินกู้ (%)',
        loanTerm: 'ระยะเวลากู้ (ปี)',
        // Additional Fields
        insurance: 'ประกันภัย',
        fuelCost: 'ค่าน้ำมัน',
        maintenance: 'ค่าบำรุงรักษา',
        registration: 'ค่าจดทะเบียน',
        // Loan Calculation Fields
        loanCalculation: 'การคำนวณเงินกู้',
        downAmount:'จำนวนเงินดาวน์',
        loanAmount: 'จำนวนเงินกู้',
        monthlyInstallment: 'งวดรายเดือน',
        totalMonthlyCost: 'ค่าใช้จ่ายรายเดือนรวม',
        totalYearlyCost: 'ค่าใช้จ่ายรายปีรวม',
        summary: 'สรุปผล'
    },
};