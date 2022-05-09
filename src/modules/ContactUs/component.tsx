import React, {useRef} from 'react';
import Form from 'rsuite/Form';
import ButtonToolbar from 'rsuite/ButtonToolbar';
import Button from 'rsuite/Button';
import DatePicker from 'rsuite/DatePicker';
import Select from 'rsuite/SelectPicker';
import InputGroup from 'rsuite/InputGroup';
import Schema from 'rsuite/Schema';

const Field = React.forwardRef((props: any, ref: any) => {
  const { name, message, label, accepter, error, addon, ...rest  } = props;
  return (
    <Form.Group controlId={`${name}-id`} ref={ref} className={error ? 'has-error' : ''}>
      <Form.ControlLabel>{label}</Form.ControlLabel>
      <InputGroup>
        <Form.Control name={name} accepter={accepter} errorMessage={error} {...rest} onChange />
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
  phone: Schema.Types.StringType().isRequired(WARNING_MESSAGE),
  phone_code: Schema.Types.StringType().isRequired(WARNING_MESSAGE),
  email: Schema.Types.StringType().isEmail('Please enter a valid email address').isRequired(WARNING_MESSAGE),
  available_on: Schema.Types.DateType().isRequired(WARNING_MESSAGE),
  tell_me_about_you: Schema.Types.StringType().isRequired(WARNING_MESSAGE),
});

const ContactUs = () => {
  const formRef: any = useRef();

  return (
    <div style={{ width: '640px', margin: '20px auto' }}>
      <h2 style={{ marginBottom: '20px' }}>Contact Us</h2>
      <Form model={FormModel} ref={formRef} fluid>
        <Field label="Name" name="name" maxLength={30} />
        <Field label="Phone" name="phone" />
        <Field
          label="Phone Code"
          name="phone_code"
          addon={<Button type="button" size="sm">Send</Button>}
        />
        <Field label="Email" name="email" />
        <Field
          label="Available On"
          name="available_on"
          accepter={DatePicker}
          style={{ width: '100%' }}
        />
        <Field
          label="Tell me about you"
          name="tell_me_about_you"
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
            <Button type="submit" appearance="primary">Submit</Button>
          </ButtonToolbar>
        </Form.Group>
      </Form>
    </div>
  )
};

export default ContactUs;
