/**
 * This file shows how to create a custom component.
 *
 * Get the base component class by referencing Formio.Components.components map.
 */
import { Components } from 'formiojs';
// const FieldComponent = (Components as any).components.field;
const FieldComponent = (Components as any).components.base;
import editForm from './ProductWeight.form';

declare global {
  interface Window { productId: string; }
}

interface Product {
  weight: string
}

/**
 * Here we will derive from the base component which all Form.io form components derive from.
 *
 * @param component
 * @param options
 * @param data
 * @constructor
 */
export default class ProductWeight extends (FieldComponent as any) {
  public inputValue: string;
  public values: string[];
  public product: Product;
  constructor(component, options, data) {
    super(component, options, data);
    this.values = [];
  }

  static schema() {
    return FieldComponent.schema({
      type: 'productweight',
      apiUrl: '',
      data:{
        value: '',
        values: []
      }
    });
  }

  public static editForm = editForm;

  static builderInfo = {
    title: 'Product Weight',
    group: 'basic',
    icon: 'fa fa-table',
    weight: 70,
    documentation: 'http://help.form.io/userguide/#table',
    schema: ProductWeight.schema()
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
  public render() {
    return super.render(this.renderTemplate('productweight', {
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
    refs[`${this.component.key}`] = 'productweight'
    this.loadRefs(element, refs);
    const input = this.refs[`${this.component.key}`][0];
    if(!input) {
      return;
    }
    this.addEventListener(input, 'keyup', async (event) => {
      const productId = window.productId
      if (productId) {
        const result = await fetch(
          `${this.component.apiUrl}/${productId}`,
          {
            headers: {
              'Content-Type': 'application/json',
            }
        });
        this.product = await result.json();
        this.setValue(this.product.weight)
        // this.component.weight = result.weight
      } else {
        this.setValue('100 kilos');
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
    const value = this.inputValue;
    return value;
  }

  /**
   * Set the value of the component into the dom elements.
   *
   * @param value
   * @returns {boolean}
   */
  setValue(value) {
    if (!value) {
      return;
    }
    this.inputValue = value;
    this.render();
  }
}
