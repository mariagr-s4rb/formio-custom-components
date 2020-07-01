import editForm from './CustomSelect.form';
declare const CustomSelect_base: any;
/**
 * Here we will derive from the base component which all Form.io form components derive from.
 *
 * @param component
 * @param options
 * @param data
 * @constructor
 */
export default class CustomSelect extends CustomSelect_base {
    inputValue: string;
    values: Array<string>;
    constructor(component: any, options: any, data: any);
    static schema(): any;
    static editForm: typeof editForm;
    static builderInfo: {
        title: string;
        group: string;
        icon: string;
        weight: number;
        documentation: string;
        schema: any;
    };
    renderInput(): any;
    render(children: any): any;
    /**
     * After the html string has been mounted into the dom, the dom element is returned here. Use refs to find specific
     * elements to attach functionality to.
     *
     * @param element
     * @returns {Promise}
     */
    attach(element: any): any;
    /**
     * Get the value of the component from the dom elements.
     *
     * @returns {Array}
     */
    getValue(): string;
    /**
     * Set the value of the component into the dom elements.
     *
     * @param value
     * @returns {boolean}
     */
    setValue(value: any, values: any): void;
}
export {};
