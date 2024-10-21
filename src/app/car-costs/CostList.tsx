import Button from 'antd/lib/button';
import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
import InputNumber from 'antd/lib/input-number';
import Space from 'antd/lib/space';
import Popover from 'antd/lib/popover';
import {
  PlusOutlined,
  MinusCircleOutlined,
  InfoCircleOutlined,
} from '@ant-design/icons';
import { languageData } from '../utils/LanguageUtils';

interface CostListProps {
  title: string;
  titleDescription: string;
  description: string;
  name: string;
  language: 'en' | 'th';
}

const CostList: React.FC<CostListProps> = ({
  title,
  titleDescription,
  description,
  name,
  language,
}) => {
  return (
    <>
      <div className="koho-font">
        {title}
        <Popover content={description} title={titleDescription}>
          <InfoCircleOutlined
            style={{
              fontSize: '16px',
              marginLeft: '8px',
              cursor: 'pointer',
            }}
          />
        </Popover>
      </div>
      <Form.List name={name}>
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <Space
                key={key}
                style={{ display: 'flex', marginBottom: 8, width: '100%' }}
                align="baseline"
              >
                <Form.Item
                  className="koho-font"
                  {...restField}
                  name={[name, 'item']}
                  rules={[
                    {
                      required: true,
                      message: languageData[language].missingItem,
                    },
                  ]}
                  style={{ flex: 1 }} // 50% width
                >
                  <Input placeholder="Item" className="koho-font" />
                </Form.Item>

                <Form.Item
                  className="koho-font"
                  {...restField}
                  name={[name, 'cost']}
                  initialValue={0}
                  rules={[
                    {
                      required: true,
                      message: languageData[language].missingCost,
                    },
                  ]}
                  style={{ flex: 1 }} // 50% width
                >
                  <InputNumber
                    className="koho-font"
                    placeholder="Cost"
                    min={0}
                    inputMode="decimal" // Ensure the decimal keypad shows on mobile
                    style={{ width: '100%' }} // Ensure full width inside flex
                  />
                </Form.Item>

                <MinusCircleOutlined onClick={() => remove(name)} />
              </Space>
            ))}

            <Form.Item className="koho-font">
              <Button
                type="dashed"
                className="koho-font"
                onClick={() => add()}
                block
                icon={<PlusOutlined />}
              >
                {title}
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
    </>
  );
};

export default CostList;
