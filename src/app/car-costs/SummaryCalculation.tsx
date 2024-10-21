import { Card, Col, Row } from 'antd';
import { languageData } from '../utils/LanguageUtils';
import { CostSummary } from '../utils/CarCosts';
import { useMemo } from 'react';
import React from 'react';

interface SummaryCalculationProps {
  carCosts: CostSummary | null;
  language: 'en' | 'th';
}

const SummaryCalculation: React.FC<SummaryCalculationProps> = ({
  carCosts,
  language,
}) => {
  // Helper function to render each cost row
  console.log(carCosts);
  const renderCostRow = (
    label: string,
    value: number | string,
    suffix: string = 'THB'
  ) => (
    <div className="flex justify-between mt-2">
      <strong>{label}:</strong>
      <span>
        {value} {suffix}
      </span>
    </div>
  );

  const summaryContent = useMemo(
    () => (
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={24} md={24}>
          {renderCostRow(
            languageData[language].downAmount,
            carCosts?.downAmount?.toLocaleString() ?? '0'
          )}
          {renderCostRow(
            languageData[language].loanAmount,
            carCosts?.loanAmount?.toLocaleString() ?? '0'
          )}
          {renderCostRow(
            languageData[language].monthlyInstallment,
            carCosts?.monthlyInstallment?.toLocaleString() ?? '0'
          )}
          {renderCostRow(
            languageData[language].totalMonthlyCost,
            carCosts?.totalMonthlyCost?.toLocaleString() ?? '0'
          )}
          {renderCostRow(
            languageData[language].totalYearlyCost,
            carCosts?.totalYearlyCost?.toLocaleString() ?? '0'
          )}
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
