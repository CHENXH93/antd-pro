import React, { PureComponent, Fragment } from 'react';
import { Card, Steps } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from '../style.less';

const { Step } = Steps;

export default class StepForm extends PureComponent {
  getCurrentStep() {
    const { location } = this.props;
    const { pathname } = location;
    const pathList = pathname.split('/');
    switch (pathList[pathList.length - 1]) {
      case 'info':
        return 0;
      case 'confirm':
        return 1;
      case 'result':
        return 2;
      default:
        return 0;
    }
  }

  render() {
    const { location, children } = this.props;
    return (
      <PageHeaderWrapper
        title="政采/招标立项申请表"
        tabActiveKey={location.pathname}
        content=""
      >
        <Card bordered={false}>
          <Fragment>
            <Steps current={this.getCurrentStep()} className={styles.steps}>
              <Step title="填写申请表" />
              <Step title="选择受理人" />
              <Step title="完成" />
            </Steps>
            {children}
          </Fragment>
        </Card>
      </PageHeaderWrapper>
    );
  }
}
