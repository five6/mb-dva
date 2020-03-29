import React, { Component } from 'react';
import { connect } from 'dva';
import { formatMessage, FormattedMessage } from 'umi-plugin-react/locale';
import Link from 'umi/link';
import { Checkbox, Alert, message, Icon, Input, Form, Row, Col, Button } from 'antd';
import Login from '@/components/Login';
import styles from './Login.less';
import { getFakeCaptcha } from '@/services/users';
import router from 'umi/router';


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
    captcha: '',
    errorInfo: null
  };

  componentWillMount() {
    this.onGetCaptcha();
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
        })
        return;
      }
      const reader = new FileReader();
      reader.readAsDataURL(data);
      reader.onload = () => {
        self.setState({
          captcha: reader.result
        })
      }
    }).catch(err => {
      self.setState({
        captcha: "",
      })
      message.error(formatMessage({ id: 'common_error.unknown.error' }));
    })
  }


  handleSubmit = (e) => {
    const self = this;
    e.preventDefault();
    this.loginForm.validateFields((err, values) => {
      if (!err) {
        const { dispatch } = this.props;
        this.setState({
          loading: true
        });
        dispatch({
          type: 'user/login',
          payload: values,
          callback: (response) => {
            if (response && response.code !== 0) {
              message.error(response.msg);
              self.onGetCaptcha();
              self.setState({
                loading: false,
              })
            } else {
              router.push('/');
            }
          }
        });
      }
    })
  };

  render() {
    const { login, submitting, form } = this.props;
    const { captcha } = this.state;
    return (
      <div className={styles.main}>
        <div className={styles.formTitle}>
          {formatMessage({ id: 'user.login' })}
        </div>
        <Login
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
          <Submit type="button" className={styles.loginButton} onClick={this.handleSubmit} loading={submitting}>
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

export default Form.create()(MyForm);

