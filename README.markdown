# react-form-logic

This is a form-handling library for React that makes it easy to:

* serialize forms into JSON and submit them to the server

* set up client-side validations without installing any additional
  libraries

* combine server-side validations with client-side validations in a
  streamlined way

* internationalize validation error messages

The library is also meant to:

* have a stable API

* be small and self-contained

* keep your form-handling code similar to all your other React-based
  code

* leave full control of the markup to your React components

* not interfere with any other custom dynamic behaviour you might want
  to build into your forms

## Getting started

react-form-logic works by generating a wrapper component for the
component that renders your form, based on an object that defines the
logic for the form (hence the name of the library). This object
defines the field names, validations and custom event handlers for the
fields. It looks like this:

```javascript
const form = FormLogic.Form({
  name: 'SignUpForm',
  fields: {
    email: FormLogic.Field({ presence: true }),
    password: FormLogic.Field({ presence: true })
  }
});
```

The wrapper component will accept some additional props that your
original component itself does not handle and will also inject
additional props into your component that you then need to pass to
your \<form\>, your \<label\>'s and \<input\>'s. Continuing the
previous example:

```javascript
@FormLogic(form)
export class SignUpForm extends Component {
  render() {
    return (
      <Form {...this.props.formProps}>
        <InputField caption='E-mail' />
        <PasswordField caption='Password' />
      </Form>
    );
  }
}

export const Form = () => {
};

export const InputField = () => {
};

export const PasswordField = () => {
};

export const Button = () => {
};
```

## Configuring validation error messages

## Defining custom event handlers for form fields

## Defining custom event handlers for form

**WARNING: IT SKIPS ALL FORM-LOGIC VALIDATIONS AND STATE CHANGES**
Use it only if you want to completely abandon formlogic logic.
Typical usecase: form is unsubmittable

```
const form = FormLogic.Form({
  name: 'SearchFriends',
  fields: {
    search: FormLogic.Field({
      options: {
        onChange: (value, _form, props) => {
          return props.invitationsSearch(value);
        }
      }
    })
  },
  options: {
    onSubmit: (event) => {
        event.preventDefault();
        return false
    }
  }
});
```

## Available validators

## Defining custom validators

## Stateful forms
