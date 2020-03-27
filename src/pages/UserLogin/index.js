import React, { Component } from 'react';
import { connect } from 'dva';
import { formatMessage, FormattedMessage } from 'umi-plugin-react/locale';
import Link from 'umi/link';
import { Checkbox, Alert, message, Icon, Input, Form, Row, Col, Button } from 'antd';
import Login from '@/components/Login';
import styles from './Login.less';
import { getFakeCaptcha } from '@/services/users';


/**
 * TODO 修改后台接口获取的base64
 */


const { Tab, UserName, Password, Mobile, ImgCaptcha, Submit } = Login;

@connect(({ login, loading, global }) => ({
  login,
  submitting: loading.effects['login/login'],
}))
class MyForm extends Component {
  state = {
    online: false,
    captcha: '',
    vertfId: '',
    currentOk: true
  };

  componentWillMount() {
    const { dispatch } = this.props;
    this.onGetCaptcha();
    dispatch({
      type: 'global/getOtaRosMessage',
      payload: {}
    })
  }


  componentWillUnmount() {
    clearInterval(this.clearIntervalTimer);
  }

  onGetCaptcha = () => {
    const self = this;
    getFakeCaptcha().then(({ data, response }) => {
      if (!data || !data.size) {
        self.setState({
          captcha: '',
          vertfId: ''
        })
        return;
      }
      const reader = new FileReader();
      reader.readAsDataURL(data);
      reader.onload = () => {
        self.setState({
          vertfId: response.headers.get('vertfId'),
          captcha: reader.result
        })
      }
    }).catch(err => {
      self.setState({
        captcha: "",
        vertfId: ''
      })
      message.error(formatMessage({ id: 'common_error.unknown.error' }));
    })
  }


  handleSubmit = (err, values) => {
    const self = this;
    if (!err) {
      const { online, vertfId } = this.state;
      const { dispatch } = this.props;
      const payload = {
        online,
        type: 2,
        vertfId
      }
      dispatch({
        type: 'user/login',
        payload,
        callback: (response) => {
          if (response && response.code !== 0) {
            self.onGetCaptcha();
            self.setState({
              currentOk: false,
            })
          }
        }
      });
    }
  };

  changeAutoLogin = e => {
    this.setState({
      online: e.target.checked,
    });
  };

  render() {
    const { login, submitting, form } = this.props;
    const { online, captcha, waitTime, surplusNum, currentOk } = this.state;
    return (
      <div className={styles.main}>
        {
          !currentOk ? <Alert style={{ marginBottom: 24 }} message={formatMessage({ id: 'app.login.surplusNum_waitTime' }).replace('[surplusNum]', surplusNum).replace('[waitTime]', waitTime)} type="error" showIcon />
            : null
        }
        <div className={styles.formTitle}>
          {formatMessage({ id: 'user.login' })}
        </div>
        <Login
          onSubmit={this.handleSubmit}
          ref={form => {
            this.loginForm = form;
          }}
        >
          <UserName
            name="name"
            placeholder={formatMessage({ id: 'app.login.userName_email' })}
            rules={[
              {
                required: true,
                message: formatMessage({ id: 'validation.userName.required' }),
              },
            ]}
          />
          <Password
            name="password"
            placeholder={formatMessage({ id: 'app.login.password' })}
            rules={[
              {
                required: true,
                message: formatMessage({ id: 'validation.password.required' }),
              },
            ]}
          />
          <ImgCaptcha
            name="captcha"
            placeholder={formatMessage({ id: 'validation.code.placeholder' })}
            onGetCaptcha={this.onGetCaptcha}
            src={captcha}
            rules={[
              {
                required: true,
                message: formatMessage({ id: 'validation.verification-code.required' }),
              },
            ]}
          />
          <Submit disabled={!currentOk} loading={submitting}>
            <FormattedMessage id="app.login" />
          </Submit>
          <Link className={styles.login} to="/register">
              <FormattedMessage id="app.login.to.sign-up" />
            </Link>
        </Login>
      </div>
    );
  }
}

export default MyForm;

