'use client';

import { useState, useEffect } from 'react';
import { Form, Row, Col, Card, Select } from 'antd';
import CarInformation from './CarInformation';
import CostList from './CostList';
import SummaryCalculation from './SummaryCalculation';
import {
  calculateCarCosts,
  CarCostSummary,
  CarData,
  Cost,
} from '../utils/CarCosts';
import React from 'react';
import { GithubOutlined } from '@ant-design/icons';
import { languageData } from '../utils/LanguageUtils';

const { Option } = Select;

const CarCostsPage = () => {
  const [form] = Form.useForm();
  const [language, setLanguage] = useState<'en' | 'th'>('en'); // Set default language

  const [price, setPrice] = useState<number>(0);
  const [discount, setDiscount] = useState<number>(0);
  const [downPaymentPercentage, setDownPaymentPercentage] = useState<number>(0);
  const [loanInterestRate, setLoanInterestRate] = useState<number>(0);
  const [loanTermYears, setLoanTermYears] = useState<number>(0);
  const [monthlyCosts, setMonthlyCosts] = useState<Cost[]>([]);
  const [yearlyCosts, setYearlyCosts] = useState<Cost[]>([]);
  const [additionalCost, setAdditionalCost] = useState<Cost[]>([]);

  const [carCosts, setCarCosts] = useState<CarCostSummary | null>(null);

  useEffect(() => {
    const carInfomation: CarData = {
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
      // additionalCost: additionalCost != null ? additionalCost.filter(
      //   (cost) =>
      //     cost &&
      //     typeof cost.cost === 'number' &&
      //     cost.item !== ' ' &&
      //     cost.item != null
      // ),
    };

    const updatedCarCosts = calculateCarCosts(carInfomation);
    setCarCosts(updatedCarCosts);
  }, [
    price,
    discount,
    downPaymentPercentage,
    loanInterestRate,
    loanTermYears,
    monthlyCosts,
    yearlyCosts,
    additionalCost,
  ]);

  return (
    <div className="container mx-auto p-6">
      {/* Language Switcher */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '16px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <a
            href="https://github.com/sSlotty"
            target="_blank"
            rel="noopener noreferrer"
            style={{ marginRight: 10, color: 'inherit' }}
          >
            <GithubOutlined style={{ fontSize: '24px' }} />
          </a>
          <h1
            className="text-xl font-bold"
            style={{ margin: 0 }}
          >{`Develope by Thanathip.Dev`}</h1>
        </div>

        <Select
          defaultValue={language}
          onChange={(value) => setLanguage(value)}
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
                {/* <CostList
                  title={languageData[language].additionalCosts}
                  titleDescription={
                    languageData[language].additionalCostsInfoTitle
                  }
                  description={languageData[language].additionalCostsDesc}
                  language={language}
                  costs={additionalCost}
                  setCosts={setAdditionalCost}
                  name="additionalCost"
                /> */}
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
