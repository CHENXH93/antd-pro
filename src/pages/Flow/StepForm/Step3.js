import React, { Fragment } from 'react';
import { connect } from 'dva';
import { Button } from 'antd';
import router from 'umi/router';
import Result from '@/components/Result';
import styles from './style.less';

@connect(({ form }) => ({
  data: form.step,
}))
class Step3 extends React.PureComponent {
  render() {
    const { data } = this.props;
    const onFinish = () => {
      router.push('/flow/step-form/info');
    };

    const onCheck = () => {
      router.push('/flow/list');
    };
    const actions = (
      <Fragment>
        <Button type="primary" onClick={onFinish}>
          发起新流程
        </Button>
        <Button type="primary" onClick={onCheck}>查询流程</Button>
      </Fragment>
    );
    return (
      <Result
        type="success"
        title="提交成功"
        actions={actions}
        className={styles.result}
      />
    );
  }
}

export default Step3;
