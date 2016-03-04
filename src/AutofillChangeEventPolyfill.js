// Emit change event when the browser auto-fills an input filed
// Based on https://github.com/Pephers/react-autofill

import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export class AutofillChangeEventPolyfill extends Component {
  constructor(props) {
    super(props);

    this.changeListeners = [];
  }

  componentDidMount() {
    const rootNode = ReactDOM.findDOMNode(this);

    const forms =
      rootNode.tagName === 'FORM' ?
        [rootNode] :
        rootNode.querySelectorAll('form');

    for(var i = 0; i < forms.length; i++) {
      const form = forms[i];

      for(var j = 0; j < form.elements.length; j++) {
        const element = form.elements[j];

        this.changeListeners.push(setInterval(function() {
          if (this.previousValue === this.element.value) {
            return;
          }

          this.previousValue = this.element.value;

          const event = document.createEvent('HTMLEvents');
          event.initEvent('input', true, true);
          this.element.dispatchEvent(event);
        }.bind({ element, previousValue: '' }), 50));
      }
    }
  }

  componentWillUnmount() {
    for(var i = 0; i < this.changeListeners.length; i++) {
      const listener = this.changeListeners[i];
      clearInterval(listener)
    }
  }

  render() {
    return React.Children.only(this.props.children);
  }
}
