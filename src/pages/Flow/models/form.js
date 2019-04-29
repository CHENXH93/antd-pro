import { routerRedux } from 'dva/router';
import { message } from 'antd';
import { fakeSubmitForm } from '@/services/api';

export default {
  namespace: 'form',

  state: {
    step: {
      projectName: '计算机工程',
      letterNumber: '24212312',
      establishDept: '开发部',
      purchaser: '张三',
      budget:'2000',
      projectSummary:'无',

      peopleOne: '郑总',
      factorOne: '所有',
      filterOne: '',
      acceptMan:'',
      informText:'办理提示信息',
    },
  },

  effects: {
    *submitRegularForm({ payload }, { call }) {
      yield call(fakeSubmitForm, payload);
      message.success('提交成功');
    },
    *submitStepForm({ payload }, { call, put }) {
      yield call(fakeSubmitForm, payload);
      yield put({
        type: 'saveStepFormData',
        payload,
      });
      yield put(routerRedux.push('/flow/step-form/result'));
    },
    *submitAdvancedForm({ payload }, { call }) {
      yield call(fakeSubmitForm, payload);
      message.success('提交成功');
    },
  },

  reducers: {
    saveStepFormData(state, { payload }) {
      return {
        ...state,
        step: {
          ...state.step,
          ...payload,
        },
      };
    },
  },
};
