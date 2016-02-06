# react-form-logic

react-form-logic is a library for handling forms in React. The project
is intended to make it easy to:

* serialize forms into JSON and handle form submission

* set up client-side validations without installing any additional
  libraries

* unify handling of client-side validations and server-side validations

* internationalize validation error messages

Additionally, the library is meant to be small and self-contained, and
to be as close in spirit to React itself as possible - I believe your
form handling code should not feel too different from all your other
React code, to the extent possible.

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
<form>, your <label>'s and <input>'s. Example:

```javascript
@FormLogic(form)
export class SignUpForm extends Component {
  render() {
  }
}
```