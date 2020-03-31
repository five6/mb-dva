import { Button, Col, Input, Form, Popover, Progress, Row, Select, message } from 'antd';
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import React, { Component } from 'react';
import Link from 'umi/link';
import { connect } from 'dva';
import router from 'umi/router';
import styles from './style.less';
import { getFakeCaptcha } from '@/services/users';


const FormItem = Form.Item;
const { Option } = Select;
const InputGroup = Input.Group;
const passwordStatusMap = {
  ok: (
    <div className={styles.success}>
      <FormattedMessage id="userregister.strength.strong" />
    </div>
  ),
  pass: (
    <div className={styles.warning}>
      <FormattedMessage id="userregister.strength.medium" />
    </div>
  ),
  poor: (
    <div className={styles.error}>
      <FormattedMessage id="userregister.strength.short" />
    </div>
  ),
};
const passwordProgressMap = {
  ok: 'success',
  pass: 'normal',
  poor: 'exception',
};

class UserRegister extends Component {
  state = {
    count: 0,
    confirmDirty: false,
    visible: false,
    help: '',
    prefix: '86',
    captcha: '',
    confirmLoading: false
  };


  componentDidMount() {
    this.onGetCaptcha();

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
  };

  getPasswordStatus = () => {
    const { form } = this.props;
    const value = form.getFieldValue('password');

    if (value && value.length > 9) {
      return 'ok';
    }

    if (value && value.length > 5) {
      return 'pass';
    }

    return 'poor';
  };

  handleSubmit = e => {
    e.preventDefault();
    const self = this;
    const { form, dispatch } = this.props;
    form.validateFields((err, values) => {
        if (!err) {
          self.setState({
            confirmLoading: true
          })
          const { prefix } = this.state;
          dispatch({
            type: 'user/register',
            payload: { ...values, prefix },
            callback:(res) => {
              self.setState({
                confirmLoading: false
              })
              if(res && res.code === 0) {
                message.success(formatMessage({id: 'userregister.register-result.msg'}).replace("{email}", res.datas.email));
                router.push('/login');
              } else {
                message.error(res.msg);
              }
            }
          });
        }
      }
    );
  };

  checkConfirm = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('password')) {
      callback(
        formatMessage({
          id: 'userregister.password.twice',
        }),
      );
    } else {
      callback();
    }
  };

  checkPassword = (rule, value, callback) => {
    const { visible, confirmDirty } = this.state;
    if (!value) {
      this.setState({
        help: formatMessage({
          id: 'userregister.password.required',
        }),
        visible: !!value,
      });
      callback('error');
    } else {
      this.setState({
        help: '',
      });

      if (!visible) {
        this.setState({
          visible: !!value,
        });
      }

      if (value.length < 6) {
        callback('error');
      } else {
        const { form } = this.props;

        if (value && confirmDirty) {
          form.validateFields(['confirm'], {
            force: true,
          });
        }

        callback();
      }
    }
  };

  changePrefix = value => {
    this.setState({
      prefix: value,
    });
  };

  renderPasswordProgress = () => {
    const { form } = this.props;
    const value = form.getFieldValue('password');
    const passwordStatus = this.getPasswordStatus();
    return value && value.length ? (
      <div className={styles[`progress-${passwordStatus}`]}>
        <Progress
          status={passwordProgressMap[passwordStatus]}
          className={styles.progress}
          strokeWidth={6}
          percent={value.length * 10 > 100 ? 100 : value.length * 10}
          showInfo={false}
        />
      </div>
    ) : null;
  };

  render() {
    const { form } = this.props;
    const { getFieldDecorator } = form;
    const { count, prefix, help, visible, captcha, confirmLoading } = this.state;
    return (
      <div className={styles.main}>
        <div className={styles.formTitle}>
        {formatMessage({ id: 'userregister.register.register' })}
      </div>
        <Form className="form-register" onSubmit={this.handleSubmit}>
        <FormItem>
            {getFieldDecorator('username', {
              rules: [
                {
                  required: true,
                  message: formatMessage({
                    id: 'userregister.userName.required',
                  }),
                },
                {
                    pattern: /^\S.{4,16}\S$/,
                    message: formatMessage({
                      id: 'userregister.userName.strength.required',
                    }),
                }
              ],
            })(
              <Input
                size="large"
                placeholder={formatMessage({
                  id: 'userregister.userName.strength.required',
                })}
              />,
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('email', {
              rules: [
                {
                  required: true,
                  message: formatMessage({
                    id: 'userregister.email.required',
                  }),
                },
                {
                  type: 'email',
                  message: formatMessage({
                    id: 'userregister.email.wrong-format',
                  }),
                },
              ],
            })(
              <Input
                size="large"
                placeholder={formatMessage({
                  id: 'userregister.email.placeholder',
                })}
              />,
            )}
          </FormItem>
          <FormItem help={help}>
            <Popover
              getPopupContainer={node => {
                if (node && node.parentNode) {
                  return node.parentNode;
                }

                return node;
              }}
              content={
                <div
                  style={{
                    padding: '4px 0',
                  }}
                >
                  {passwordStatusMap[this.getPasswordStatus()]}
                  {this.renderPasswordProgress()}
                  <div
                    style={{
                      marginTop: 10,
                    }}
                  >
                    <FormattedMessage id="userregister.strength.msg" />
                  </div>
                </div>
              }
              overlayStyle={{
                width: 240,
              }}
              placement="right"
              visible={visible}
            >
              {getFieldDecorator('password', {
                rules: [
                  {
                    validator: this.checkPassword,
                  },
                ],
              })(
                <Input
                  size="large"
                  type="password"
                  placeholder={formatMessage({
                    id: 'userregister.password.placeholder',
                  })}
                />,
              )}
            </Popover>
          </FormItem>
          <FormItem>
            {getFieldDecorator('confirm', {
              rules: [
                {
                  required: true,
                  message: formatMessage({
                    id: 'userregister.confirm-password.required',
                  }),
                },
                {
                  validator: this.checkConfirm,
                },
              ],
            })(
              <Input
                size="large"
                type="password"
                placeholder={formatMessage({
                  id: 'userregister.confirm-password.placeholder',
                })}
              />,
            )}
          </FormItem>
          <FormItem>
            <InputGroup compact>
              <Select
                size="large"
                value={prefix}
                onChange={this.changePrefix}
                style={{
                  width: '20%',
                }}
              >
                <Option value="86">+86</Option>
                <Option value="87">+87</Option>
              </Select>
              {getFieldDecorator('mobile', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({
                      id: 'userregister.phone-number.required',
                    }),
                  },
                  {
                    pattern: /^\d{11}$/,
                    message: formatMessage({
                      id: 'userregister.phone-number.wrong-format',
                    }),
                  },
                ],
              })(
                <Input
                  size="large"
                  style={{
                    width: '80%',
                  }}
                  placeholder={formatMessage({
                    id: 'userregister.phone-number.placeholder',
                  })}
                />,
              )}
            </InputGroup>
          </FormItem>
          <FormItem>
            <Row gutter={8}>
              <Col span={16}>
                {getFieldDecorator('captcha', {
                  rules: [
                    {
                      required: true,
                      message: formatMessage({
                        id: 'userregister.verification-code.required',
                      }),
                    },
                  ],
                })(
                  <Input
                    size="large"
                    placeholder={formatMessage({
                      id: 'userregister.verification-code.placeholder',
                    })}
                  />,
                )}
              </Col>
              <Col span={8}>
                <img style={{cursor: 'pointer'}} src={captcha} alt=""  onClick={this.onGetCaptcha} />
                {/* <Button
                  size="large"
                  disabled={!!count}
                  className={styles.getCaptcha}
                  onClick={this.onGetCaptcha}
                >
                  {count
                    ? `${count} s`
                    : formatMessage({
                        id: 'userregister.register.get-verification-code',
                      })}
                </Button> */}
              </Col>
            </Row>
          </FormItem>
          <FormItem>
            <Button
              size="large"
              loading={confirmLoading}
              className={styles.submit}
              type="primary"
              // htmlType="submit"
              onClick={this.handleSubmit}
            >
              <FormattedMessage id="userregister.register.register" />
            </Button>
            <Link className={styles.login} to="/login">
              <FormattedMessage id="userregister.register.sign-in" />
            </Link>
          </FormItem>
        </Form>
      </div>
    );
  }
}

export default connect()(Form.create()(UserRegister));
