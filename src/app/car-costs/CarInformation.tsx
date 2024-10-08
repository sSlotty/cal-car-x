import Form from 'antd/lib/form';
import InputNumber from 'antd/lib/input-number';
import Card from 'antd/lib/card';
import { languageData } from '../utils/LanguageUtils';
import { useCallback } from 'react';
import React from 'react';

interface CarInformationProps {
  price: number;
  discount: number;
  downPaymentPercentage: number;
  loanInterestRate: number;
  loanTermYears: number;
  language: 'en' | 'th';
  setPrice: (value: number) => void;
  setDiscount: (value: number) => void;
  setDownPaymentPercentage: (value: number) => void;
  setLoanInterestRate: (value: number) => void;
  setLoanTermYears: (value: number) => void;
}

const CarInformation: React.FC<CarInformationProps> = ({
  price,
  discount,
  downPaymentPercentage,
  loanInterestRate,
  loanTermYears,
  setPrice,
  setDiscount,
  setDownPaymentPercentage,
  setLoanInterestRate,
  setLoanTermYears,
  language,
}) => {
  const handlePriceChange = useCallback(
    (value: number | null) => setPrice(value ?? 0),
    [setPrice]
  );
  const handleDiscountChange = useCallback(
    (value: number | null) => setDiscount(value ?? 0),
    [setDiscount]
  );
  const handleDownPaymentChange = useCallback(
    (value: number | null) => setDownPaymentPercentage(value ?? 0),
    [setDownPaymentPercentage]
  );
  const handleInterestRateChange = useCallback(
    (value: number | null) => setLoanInterestRate(value ?? 0),
    [setLoanInterestRate]
  );
  const handleLoanTermChange = useCallback(
    (value: number | null) => setLoanTermYears(value ?? 0),
    [setLoanTermYears]
  );

  return (
    <Card
      title={languageData[language].carInformation}
      bordered={false}
      className="mb-4 koho-font"
    >
      <Form.Item label={languageData[language].price} name="price">
        <InputNumber
          value={price}
          onChange={handlePriceChange}
          formatter={(value) =>
            `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
          }
          className="w-full"
          inputMode="decimal" // Ensure the decimal keypad shows on mobile
        />
      </Form.Item>

      <Form.Item label={languageData[language].discount} name="discount">
        <InputNumber
          value={discount}
          onChange={handleDiscountChange}
          formatter={(value) =>
            `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
          }
          className="w-full"
          inputMode="decimal" // Ensure the decimal keypad shows on mobile
        />
      </Form.Item>

      <Form.Item
        label={languageData[language].downPaymentPercentage}
        name="downPaymentPercentage"
      >
        <InputNumber
          value={downPaymentPercentage}
          min={0}
          max={100}
          onChange={handleDownPaymentChange}
          formatter={(value) => `${value}%`}
          parser={(value) => parseFloat(value?.replace('%', '') || '0')}
          className="w-full"
          inputMode="numeric" // Ensure the numeric keypad shows on mobile
        />
      </Form.Item>

      <Form.Item
        label={languageData[language].loanInterestRate}
        name="loanInterestRate"
      >
        <InputNumber
          value={loanInterestRate}
          min={0}
          max={100}
          onChange={handleInterestRateChange}
          formatter={(value) => `${value}%`}
          parser={(value) => parseFloat(value?.replace('%', '') || '0')}
          className="w-full"
          inputMode="numeric" // Ensure the numeric keypad shows on mobile
        />
      </Form.Item>

      <Form.Item label={languageData[language].loanTerm} name="loanTermYears">
        <InputNumber
          value={loanTermYears}
          min={0}
          max={7}
          onChange={handleLoanTermChange}
          className="w-full"
          inputMode="numeric" // Ensure the numeric keypad shows on mobile
        />
      </Form.Item>
    </Card>
  );
};

export default React.memo(CarInformation);
