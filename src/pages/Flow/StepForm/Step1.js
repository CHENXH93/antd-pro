import React, { Fragment } from 'react';
import { connect } from 'dva';
import { Form, Input, Button, Select, Divider,Upload, Icon, message, Row, Col } from 'antd';
import router from 'umi/router';
import styles from './style.less';

const Dragger = Upload.Dragger;
const props = {
  name: 'file',
  multiple: true,
  // action: '//jsonplaceholder.typicode.com/posts/',
  onChange(info) {
    const status = info.file.status;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

const { Option } = Select;
const { TextArea } = Input;

const formItemLayout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

@connect(({ form }) => ({
  data: form.step,
}))
@Form.create()
class Step1 extends React.PureComponent {
  render() {
    const { form, dispatch, data } = this.props;
    const { getFieldDecorator, validateFields } = form;
    const onValidateForm = () => {
      validateFields((err, values) => {
        if (!err) {
          dispatch({
            type: 'form/saveStepFormData',
            payload: values,
          });
          router.push('/flow/step-form/confirm');
        }
      });
    };
    const onNext = () => {
      router.push('/flow/step-form/confirm');
    };
    return (
      <Fragment>
        <Form layout="horizontal" className={styles.stepForm}>
          <Form.Item {...formItemLayout} label="项目名称">
            {getFieldDecorator('projectName', {
              initialValue: data.projectName,
              rules: [{ required: true, message: '请输入项目名称' }],
            })(<Input placeholder="请输入项目名称，必填" />)}
          </Form.Item>

          <Form.Item {...formItemLayout} label="函号/招标编号">
            {getFieldDecorator('letterNumber', {
              initialValue: data.letterNumber,
              rules: [{ required: true, message: '请输入收款人姓名' }],
            })(<Input placeholder="请输入函号或招标编号，必填" />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label="立项部门/委托单位">
            {getFieldDecorator('establishDept', {
              initialValue: data.establishDept,
              rules: [{ required: true, message: '请输入立项部门或委托单位' }],
            })(<Input placeholder="请输入立项部门或委托单位，必填" />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label="采购人/招标人">
            {getFieldDecorator('purchaser', {
              initialValue: data.purchaser,
              rules: [{ required: false, message: '请输入采购人或招标人' }],
            })(<Input placeholder="请输入采购人或招标人，选填" />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label="预算金额">
            {getFieldDecorator('budget', {
              initialValue: data.budget,
              rules: [{ required: false, message: '请输入预算金额' }],
            })(<Input placeholder="请输入预算金额，选填" />)}
          </Form.Item>

          <Form.Item {...formItemLayout} label="项目概况">
            {getFieldDecorator('projectSummary', {
              initialValue: data.projectSummary,
              rules: [{ required: false, message: '请输入项目概况' }],
            })(
              <TextArea
                style={{ minHeight: 32 }}
                placeholder="请输入项目概况，选填"
                rows={4}

              />
            )}
          </Form.Item>
          <Form.Item {...formItemLayout} label="增加附件">
            {getFieldDecorator('appendix', {
              initialValue: data.appendix,
              rules: [{ required: false, message: '请输入预算金额' }],
            })(
              // {...props}
              <Dragger >
                <p className="ant-upload-drag-icon">
                  <Icon type="inbox" />
                </p>
                <p className="ant-upload-text">点击或者拖拽文件至此处上传</p>
                <p className="ant-upload-hint">支持一个或多个文件同时上传</p>
              </Dragger>,
            )}
          </Form.Item>
          <Form.Item
            wrapperCol={{
              xs: { span: 24, offset: 0 },
              sm: {
                span: formItemLayout.wrapperCol.span,
                offset: formItemLayout.labelCol.span,
              },
            }}
            label=""
          >
            <Row>
              <Col >
                <Button type="primary" onClick={onNext}>
                  转下一步
                </Button>
                <Button style={{ margin: 8}}>
                  保存
                </Button>
              </Col>
            </Row>

          </Form.Item>
        </Form>
        <Divider style={{ margin: '40px 0 24px' }} />
      </Fragment>
    );
  }
}

export default Step1;
