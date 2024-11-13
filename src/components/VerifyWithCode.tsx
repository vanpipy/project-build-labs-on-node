import React, { useRef, useState } from 'react';
import { Button, Input, message } from 'antd';
import CountDown from 'react-countdown';
import { createLoginService } from '@/services/login.service';

type Props = {
  phone: string;
  onChange?: (value: string) => void;
};

const VerifyWithCode = (props: Props) => {
  const { phone, onChange: onChangeEvent } = props;
  const [code, setCode] = useState('');
  const [sendingMsg, setSendingMsg] = useState(false);
  const [counting, setCounting] = useState(false);
  const countDownRef = useRef<any>(null);
  const onCodeChange = (event: any) => {
    const { value } = event.target;
    setCode(value);
    onChangeEvent?.(value);
  };
  const onSendMsg = async () => {
    if (/^1[0-9]{10}$/.test(phone)) {
      setSendingMsg(true);
      const loginService = await createLoginService();
      await loginService.sendPhoneCode({ phone, vcode: code });
      setCounting(true);
      setSendingMsg(false);
    } else {
      message.error('请输入正确的手机号码');
    }
  };
  const onCountDownEnd = () => {
    setCounting(false);
  };
  return (
    <div className="flex items-center">
      <Input
        size="large"
        placeholder="验证码"
        value={code}
        maxLength={6}
        onChange={onCodeChange}
        suffix={
          <div className="flex items-center">
            <Button
              ref={countDownRef}
              size="small"
              type="text"
              variant="text"
              disabled={Boolean(phone && phone.length === 0)}
              loading={sendingMsg}
              onClick={onSendMsg}
            >
              {counting ? (
                <CountDown
                  onComplete={onCountDownEnd}
                  date={Date.now() + 60000}
                  renderer={({ seconds }) => seconds || 60}
                />
              ) : null}
              <span className={!counting ? 'text-[#1677ff]' : '!hidden'}>发送验证码</span>
            </Button>
          </div>
        }
      />
    </div>
  );
};

export default VerifyWithCode;
