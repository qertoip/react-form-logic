# react-form-logic

This is a form-handling library for React that makes it easy to:

* serialize forms into JSON and submit them to the server

* set up client-side validations without installing any additional
  libraries

* combine server-side validations with client-side validations in a
  streamlined way

* internationalize validation error messages

The library is also meant to:

* be small and self-contained

* have an API that keeps your form-handling code similar to all your
  other React-based code

* leave full control of the markup to your React components

* not interfere with any other custom dynamic behaviour you might want
  to build into your forms

## Getting started

You use react-form-logic be defining a form object, and then using it
to generate a wrapper component for the component that renders your
form.

The form object describes the fields your form has, the validations
you want them to have and additional event handlers for events related
to the form. It looks like this:

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
additional props into your component, that you need to pass to your
\<form\>, your \<label\>'s and \<input\>'s. Example:

```javascript
@FormLogic(form)
export class SignUpForm extends Component {
  render() {
  }
}
```