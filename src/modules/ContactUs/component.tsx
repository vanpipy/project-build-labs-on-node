import React, {useState} from 'react';
import Form from 'rsuite/Form';
import ButtonToolbar from 'rsuite/ButtonToolbar';
import Button from 'rsuite/Button';
import DatePicker from 'rsuite/DatePicker';
import Select from 'rsuite/SelectPicker';
import InputGroup from 'rsuite/InputGroup';
import Schema from 'rsuite/Schema';
import { Feedback } from '../../entity/Feedback';

const Field = React.forwardRef((props: any, ref: any) => {
  const { name, message, label, accepter, error, addon, ...rest  } = props;
  return (
    <Form.Group controlId={`${name}-id`} ref={ref} className={error ? 'has-error' : ''}>
      <Form.ControlLabel>{label}</Form.ControlLabel>
      <InputGroup>
        <Form.Control name={name} accepter={accepter} errorMessage={error} {...rest} />
        {addon ? (
          <InputGroup.Addon style={{ padding: 0 }}>{addon}</InputGroup.Addon>
        ) : null}
      </InputGroup>
    </Form.Group>
  );
});

const WARNING_MESSAGE = 'The field is required';

const FormModel = Schema.Model({
  name: Schema.Types.StringType().isRequired(WARNING_MESSAGE),
  phone: Schema.Types.StringType().pattern(/^1[0-9]{10}$/).isRequired(WARNING_MESSAGE),
  phoneCode: Schema.Types.StringType().isRequired(WARNING_MESSAGE),
  email: Schema.Types.StringType().isEmail('Please enter a valid email address').isRequired(WARNING_MESSAGE),
  availableOn: Schema.Types.DateType(),
  tellMeAboutYou: Schema.Types.StringType(),
});

const ContactUs = () => {
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [formData, setFormData] = useState<Partial<Feedback>>({});

  const onSubmit = (checkStatus: boolean, event: React.FormEvent<HTMLFormElement>) => {
    if (checkStatus) {
      setSubmitting(true);

      setTimeout(() => {
        const target: any = event.target;
        target?.submit();
      }, 500);
    }
  };

  const onChange = (values: Partial<Feedback>) => {
    setFormData(values);
  }

  return (
    <div style={{ width: '640px', margin: '20px auto' }}>
      <h2 style={{ marginBottom: '20px' }}>Contact Us</h2>
      <Form
        id="formId"
        fluid
        model={FormModel}
        onSubmit={onSubmit}
        onChange={onChange}
        method="POST"
        action="/contactus"
      >
        <Field label="Name" name="name" maxLength={30} />
        <Field label="Phone" name="phone" maxLength={30} />
        <Field
          label="Phone Code"
          name="phoneCode"
          maxLength={6}
          addon={<Button type="button" size="sm">Send</Button>}
        />
        <Field label="Email" name="email" maxLength={100} />
        <Field
          label="Available On"
          name="availableOn"
          accepter={DatePicker}
          style={{ width: '100%' }}
        />
        <Field
          label="Tell me about you"
          name="tellMeAboutYou"
          accepter={Select}
          style={{ width: '100%' }}
          searchable={false}
          data={[
            { label: 'A', value: 'a' },
            { label: 'B', value: 'b' },
            { label: 'C', value: 'c' }
          ]}
        />
        <Form.Group>
          <ButtonToolbar>
            <Button
              type="submit"
              appearance="primary"
              loading={submitting}
            >
              Submit
            </Button>
          </ButtonToolbar>
        </Form.Group>
      </Form>
    </div>
  )
};

export default ContactUs;
