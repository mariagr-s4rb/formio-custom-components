/**
 * This file shows how to create a custom component.
 *
 * Get the base component class by referencing Formio.Components.components map.
 */
import { Components } from 'formiojs';
// const FieldComponent = (Components as any).components.field;
const FieldComponent = (Components as any).components.base;
import editForm from './CustomSelect.form';

/**
 * Here we will derive from the base component which all Form.io form components derive from.
 *
 * @param component
 * @param options
 * @param data
 * @constructor
 */
export default class CustomSelect extends (FieldComponent as any) {
  public inputValue: string;
  public values: Array<string>;
  constructor(component, options, data) {
    super(component, options, data);
    this.values = [];
  }

  static schema() {
    return FieldComponent.schema({
      type: 'customselect',
      apiUrl: '',
      data:{
        value: '',
        values: []
      }
    });
  }

  public static editForm = editForm;

  static builderInfo = {
    title: 'Custom Select',
    group: 'basic',
    icon: 'fa fa-table',
    weight: 70,
    documentation: 'http://help.form.io/userguide/#table',
    schema: CustomSelect.schema()
  }

  renderInput() {
    return this.renderTemplate('input', {
      input: {
        type: 'input',
        ref: `${this.component.key}`,
        attr: {
          id: `${this.component.key}`,
          class: 'form-control',
          type: 'text',
          value: this.inputValue
        }
      }
    });
  }
  public render(children) {
    return super.render(this.renderTemplate('customselect', {
      renderInput: this.renderInput.bind(this)
    }));
  }

  /**
   * After the html string has been mounted into the dom, the dom element is returned here. Use refs to find specific
   * elements to attach functionality to.
   *
   * @param element
   * @returns {Promise}
   */
  attach(element) {
    const refs = {};
    refs[`${this.component.key}`] = 'customselect'
    this.loadRefs(element, refs);
    const input = this.refs[`${this.component.key}`][0];
    if(!input) {
      return;
    }
    this.addEventListener(input, 'keyup', async (event) => {
      const { key } = event;
      if (event.target.value.length % 3 === 0) {
        const results = await fetch(
          `${this.component.apiUrl}/${event.target.value}`,
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.token}`,
            }
        });
        this.values = await results.json();
      }

      if (['Backspace', 'Delete'].includes(key)) {
        this.setValue(this.emptyValue, []);
      }
    });
    // Allow basic component functionality to attach like field logic and tooltips.
    return super.attach(element);
  }

  /**
   * Get the value of the component from the dom elements.
   *
   * @returns {Array}
   */
  getValue() {
    var value = this.inputValue;
    return value;
  }

  /**
   * Set the value of the component into the dom elements.
   *
   * @param value
   * @returns {boolean}
   */
  setValue(value, values) {
    if (!value) {
      return;
    }
    this.inputValue = value;
    this.values = values;
  }
}
