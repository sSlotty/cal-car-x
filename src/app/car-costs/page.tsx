'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { Form, Row, Col, Card, Select } from 'antd';
import dynamic from 'next/dynamic';
import { GithubOutlined } from '@ant-design/icons';
import {
  calculateCarCosts,
  CarCostSummary,
  CarData,
  Cost,
} from '../utils/CarCosts';
import { languageData } from '../utils/LanguageUtils';
import React from 'react';

// Dynamically import large components
const CarInformation = dynamic(() => import('./CarInformation'), {
  ssr: false,
});
const CostList = dynamic(() => import('./CostList'), { ssr: false });
const SummaryCalculation = dynamic(() => import('./SummaryCalculation'), {
  ssr: false,
});

const { Option } = Select;

// Initial language determination, checks if localStorage is available
const getInitialLanguage = (): 'en' | 'th' => {
  if (typeof window !== 'undefined') {
    const savedLanguage = localStorage.getItem('language');
    return savedLanguage === 'en' || savedLanguage === 'th'
      ? savedLanguage
      : 'en';
  }
  return 'en'; // Default to 'en' during SSR
};

const CarCostsPage = () => {
  const [form] = Form.useForm();

  const [price, setPrice] = useState<number>(0);
  const [discount, setDiscount] = useState<number>(0);
  const [downPaymentPercentage, setDownPaymentPercentage] = useState<number>(0);
  const [loanInterestRate, setLoanInterestRate] = useState<number>(0);
  const [loanTermYears, setLoanTermYears] = useState<number>(0);
  const [monthlyCosts, setMonthlyCosts] = useState<Cost[]>([]);
  const [yearlyCosts, setYearlyCosts] = useState<Cost[]>([]);
  const [additionalCost, setAdditionalCost] = useState<Cost[]>([]);

  const [carCosts, setCarCosts] = useState<CarCostSummary | null>(null);
  const [language, setLanguage] = useState<'en' | 'th'>(getInitialLanguage);

  // Memoize car data to avoid unnecessary recomputation
  const carInformation = useMemo<CarData>(
    () => ({
      price,
      discount,
      downPaymentPercentage,
      loanInterestRate,
      loanTermYears,
      monthlyCosts: monthlyCosts.filter(
        (cost) =>
          cost &&
          typeof cost.cost === 'number' &&
          cost.item !== ' ' &&
          cost.item != null
      ),
      yearlyCosts: yearlyCosts.filter(
        (cost) =>
          cost &&
          typeof cost.cost === 'number' &&
          cost.item !== ' ' &&
          cost.item != null
      ),
      additionalCost: additionalCost.filter(
        (cost) =>
          cost &&
          typeof cost.cost === 'number' &&
          cost.item !== ' ' &&
          cost.item != null
      ),
    }),
    [
      price,
      discount,
      downPaymentPercentage,
      loanInterestRate,
      loanTermYears,
      monthlyCosts,
      yearlyCosts,
      additionalCost,
    ]
  );

  // Update car costs only when the carInformation changes
  useEffect(() => {
    const updatedCarCosts = calculateCarCosts(carInformation);
    setCarCosts(updatedCarCosts);
  }, [carInformation]);

  // Handle language change and persist it in localStorage
  const handleLanguageChange = useCallback((value: 'en' | 'th') => {
    setLanguage(value);
    if (typeof window !== 'undefined') {
      localStorage.setItem('language', value);
    }
  }, []);

  return (
    <div className="container mx-auto p-6">
      {/* Language Switcher */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '16px',
          color: 'white',
        }}
      >
        <div className="developer-info">
          <a
            href="https://github.com/sSlotty"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GithubOutlined style={{ fontSize: '24px' }} />
          </a>
          <h1 className="text-xl font-bold">Developed by Thanathip.Dev</h1>
        </div>

        <Select
          value={language}
          onChange={handleLanguageChange}
          style={{ width: 'auto' }}
        >
          <Option value="en">🇺🇸 English</Option>
          <Option value="th">🇹🇭 ไทย</Option>
        </Select>
      </div>

      <Form
        form={form}
        layout="vertical"
        initialValues={{
          price,
          discount,
          downPaymentPercentage,
          loanInterestRate,
          loanTermYears,
          monthlyCosts,
          yearlyCosts,
          additionalCost,
        }}
        onValuesChange={(changedValues, allValues) => {
          setPrice(allValues.price);
          setDiscount(allValues.discount);
          setDownPaymentPercentage(allValues.downPaymentPercentage);
          setLoanInterestRate(allValues.loanInterestRate);
          setLoanTermYears(allValues.loanTermYears);
          setMonthlyCosts(allValues.monthlyCosts);
          setYearlyCosts(allValues.yearlyCosts);
          setAdditionalCost(allValues.additionalCost);
        }}
      >
        <Row gutter={16}>
          <Col xs={24} md={12}>
            <CarInformation
              price={price}
              discount={discount}
              downPaymentPercentage={downPaymentPercentage}
              loanInterestRate={loanInterestRate}
              loanTermYears={loanTermYears}
              setPrice={setPrice}
              setDiscount={setDiscount}
              setDownPaymentPercentage={setDownPaymentPercentage}
              setLoanInterestRate={setLoanInterestRate}
              setLoanTermYears={setLoanTermYears}
              language={language}
            />
          </Col>

          <Col xs={24} md={12}>
            <Card
              title={languageData[language].costTitle}
              bordered={false}
              className="mb-4"
            >
              <div style={{ maxHeight: '430px', overflowY: 'auto' }}>
                <CostList
                  title={languageData[language].monthlyCosts}
                  titleDescription={
                    languageData[language].monthlyCostsInfoTitle
                  }
                  description={languageData[language].monthlyCostDesc}
                  language={language}
                  name="monthlyCosts"
                />
                <CostList
                  title={languageData[language].yearlyCosts}
                  titleDescription={languageData[language].yearlyCostsInfoTitle}
                  description={languageData[language].yearlyCostsDesc}
                  language={language}
                  name="yearlyCosts"
                />
                <CostList
                  title={languageData[language].additionalCosts}
                  titleDescription={
                    languageData[language].additionalCostsInfoTitle
                  }
                  description={languageData[language].additionalCostsDesc}
                  language={language}
                  name="additionalCost"
                />
              </div>
            </Card>
          </Col>
        </Row>
      </Form>

      <SummaryCalculation carCosts={carCosts} language={language} />
    </div>
  );
};

export default React.memo(CarCostsPage);
