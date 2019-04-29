import React from 'react';
import { connect } from 'dva';
import { Form, Input, Button, Select, Divider,Transfer } from 'antd';
import router from 'umi/router';
import styles from './style.less';

const { Option } = Select;
const { TextArea } = Input;

const formItemLayout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 19,
  },
};

@connect(({ form, loading }) => ({
  submitting: loading.effects['form/submitStepForm'],
  data: form.step,
}))
@Form.create()


class Step2 extends React.PureComponent {
  state = {
    mockData: [],
    targetKeys: [],
  };

  componentDidMount() {
    this.getMock();
  }
  getMock = () => {
    const targetKeys = [];
    const mockData = [];
    const myName=['郑沦翔','罗晶晶'];
    for (let i = 0; i < myName.length; i++) {
      const data = {
        key: i.toString(),
        title: myName[i],
        description: `description of content${i + 1}`,
        chosen: false
      };
      if (data.chosen) {
        targetKeys.push(data.key);
      }
      mockData.push(data);
    }
    this.setState({ mockData, targetKeys });
  };
  filterOption = (inputValue, option) => option.description.indexOf(inputValue) > -1
  handleChange = (targetKeys) => {
    this.setState({ targetKeys });
  };
  onChange(value) {
    console.log(value);
  }


  render() {
    const { form, data, dispatch, submitting } = this.props;
    const { getFieldDecorator, validateFields } = form;
    const onPrev = () => {
      router.push('/flow/step-form/info');
    };
    const onNext = () => {
      router.push('/flow/step-form/result');
    };
    const onValidateForm = e => {
      e.preventDefault();
      validateFields((err, values) => {
        if (!err) {
          dispatch({
            type: 'form/submitStepForm',
            payload: {
              ...data,
              ...values,
            },
          });
        }
      });
    };

    return (
      <Form layout="horizontal" className={styles.stepForm} hideRequiredMark>
        <Form.Item {...formItemLayout} label="下一步">
          {getFieldDecorator('peopleOne', {
            initialValue: data.peopleOne,
            rules: [{ required: false, message: '请选择下一个流程负责人' }],
          })(
            <Select placeholder="请选择">
              <Option value="郑总">郑总</Option>
            </Select>
          )}
        </Form.Item>
        <Form.Item {...formItemLayout} label="条件筛选">
          {getFieldDecorator('factorOne', {
            initialValue: data.factorOne,
            rules: [{ required: false, message: '请选择筛选条件' }],
          })(
            <Select placeholder="请选择...">
              <Option value="郑总">所有</Option>
            </Select>
          )}
        </Form.Item>
        <Form.Item {...formItemLayout} label="自定义筛选">
          {getFieldDecorator('filterOne', {
            initialValue: data.filterOne,
            rules: [{ required: false, message: '请写出筛选条件' }],
          })(
            (<Input placeholder="请输入筛选条件" />)
          )}
        </Form.Item>
        <Form.Item {...formItemLayout} label="受理人">
          {getFieldDecorator('filterOne', {
            initialValue: data.filterOne,
            rules: [{ required: false, message: '请筛选受理人' }],
          })(
            (<Transfer
              dataSource={this.state.mockData}
              titles={['总审室','受理人']}
              filterOption={this.filterOption}
              targetKeys={this.state.targetKeys}
              onChange={this.handleChange}
              render={item => item.title}
            />)
          )}
        </Form.Item>

        <Divider style={{ margin: '24px 0' }} />
        <Form.Item {...formItemLayout} label="办理提示">
          {getFieldDecorator('informText', {
            initialValue: data.informText,
            rules: [{ required: false, message: '请输入办理提示' }],
          })(
            <TextArea
              style={{ minHeight: 32 }}
              placeholder="请输入办理提示，选填"
              rows={4}
            />
          )}
        </Form.Item>

        <Form.Item
          style={{ marginBottom: 8 }}
          wrapperCol={{
            xs: { span: 24, offset: 0 },
            sm: {
              span: formItemLayout.wrapperCol.span,
              offset: formItemLayout.labelCol.span,
            },
          }}
          label=""
        >
          <Button type="primary" onClick={onNext} loading={submitting}>
            提交
          </Button>
          <Button onClick={onPrev} style={{ marginLeft: 8 }}>
            上一步
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default Step2;
