import { Form, InputNumber, Card } from 'antd';
import { languageData } from '../utils/LanguageUtils';

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
  return (
    <Card
      title={languageData[language].carInformation}
      bordered={false}
      className="mb-4"
    >
      <Form.Item label={languageData[language].price} name="price">
        <InputNumber
          value={price}
          onChange={(value) => setPrice(value !== null ? value : 0)}
          formatter={(value) =>
            `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
          }
          className="w-full"
        />
      </Form.Item>

      <Form.Item label={languageData[language].discount} name="discount">
        <InputNumber
          value={discount}
          onChange={(value) => setDiscount(value !== null ? value : 0)}
          formatter={(value) =>
            `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
          }
          className="w-full"
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
          onChange={(value) => setLoanInterestRate(value !== null ? value : 0)}
          formatter={(value) => `${value}%`}
          parser={(value) => parseFloat(value?.replace('%', '') || '0')}
          className="w-full"
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
          onChange={(value) => setLoanInterestRate(value !== null ? value : 0)}
          formatter={(value) => `${value}%`}
          parser={(value) => parseFloat(value?.replace('%', '') || '0')}
          className="w-full"
        />
      </Form.Item>

      <Form.Item label={languageData[language].loanTerm} name="loanTermYears">
        <InputNumber
          value={loanTermYears}
          min={0}
          max={7}
          onChange={(value) => setLoanTermYears(value !== null ? value : 0)}
          className="w-full"
        />
      </Form.Item>
    </Card>
  );
};

export default CarInformation;
