import { Card, Col, Row } from 'antd';
import { languageData } from '../utils/LanguageUtils';
import { CarCostSummary } from '../utils/CarCosts';
import { useMemo } from 'react';
import React from 'react';

interface SummaryCalculationProps {
  carCosts: CarCostSummary | null;
  language: 'en' | 'th';
}

const SummaryCalculation: React.FC<SummaryCalculationProps> = ({
  carCosts,
  language,
}) => {
  const summaryContent = useMemo(
    () => (
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={24} md={24}>
          <div
            className="backdrop-blur-xl backdrop-brightness-125 rounded-2xl p-5 text-gray-800 shadow-xl border"
            style={{
              background:
                'linear-gradient(90deg, rgba(238,174,202,0.3) 0%, rgba(148,155,233,0.3) 100%)',
              height: '130px',
            }}
          >
            <div className="flex justify-between">
              <strong>{languageData[language].loanAmount}:</strong>
              <span>{carCosts?.loanAmount.toLocaleString()} THB</span>
            </div>
            <div className="flex justify-between">
              <strong>{languageData[language].monthlyInstallment}:</strong>
              <span>
                {parseFloat(
                  carCosts?.monthlyInstallment ?? '0'
                ).toLocaleString()}{' '}
                THB
              </span>
            </div>
            <div className="flex justify-between">
              <strong>{languageData[language].totalMonthlyCost}:</strong>
              <span>
                {parseFloat(carCosts?.totalMonthlyCost ?? '0').toLocaleString()}{' '}
                THB
              </span>
            </div>
            <div className="flex justify-between">
              <strong>{languageData[language].totalYearlyCost}:</strong>
              <span>
                {parseFloat(carCosts?.totalYearlyCost ?? '0').toLocaleString()}{' '}
                THB
              </span>
            </div>
          </div>
        </Col>
      </Row>
    ),
    [carCosts, language]
  );

  return carCosts ? (
    <Card
      title={languageData[language].summary}
      bordered={false}
      className="mt-6"
    >
      {summaryContent}
    </Card>
  ) : null;
};

export default React.memo(SummaryCalculation);
