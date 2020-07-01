var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
/**
 * This file shows how to create a custom component.
 *
 * Get the base component class by referencing Formio.Components.components map.
 */
import { Components } from 'formiojs';
// const FieldComponent = (Components as any).components.field;
var FieldComponent = Components.components.base;
import editForm from './CustomSelect.form';
/**
 * Here we will derive from the base component which all Form.io form components derive from.
 *
 * @param component
 * @param options
 * @param data
 * @constructor
 */
var CustomSelect = /** @class */ (function (_super) {
    __extends(CustomSelect, _super);
    function CustomSelect(component, options, data) {
        var _this = _super.call(this, component, options, data) || this;
        _this.values = [];
        return _this;
    }
    CustomSelect.schema = function () {
        return FieldComponent.schema({
            type: 'customselect',
            apiUrl: '',
            data: {
                value: '',
                values: []
            }
        });
    };
    CustomSelect.prototype.renderInput = function () {
        return this.renderTemplate('input', {
            input: {
                type: 'input',
                ref: "" + this.component.key,
                attr: {
                    id: "" + this.component.key,
                    class: 'form-control',
                    type: 'text',
                    value: this.inputValue
                }
            }
        });
    };
    CustomSelect.prototype.render = function (children) {
        return _super.prototype.render.call(this, this.renderTemplate('customselect', {
            renderInput: this.renderInput.bind(this)
        }));
    };
    /**
     * After the html string has been mounted into the dom, the dom element is returned here. Use refs to find specific
     * elements to attach functionality to.
     *
     * @param element
     * @returns {Promise}
     */
    CustomSelect.prototype.attach = function (element) {
        var _this = this;
        var refs = {};
        refs["" + this.component.key] = 'customselect';
        this.loadRefs(element, refs);
        console.log({ ref: this.refs, element: element, component: this.component });
        var input = this.refs["" + this.component.key][0];
        console.log({ input: input });
        if (!input) {
            return;
        }
        this.addEventListener(input, 'keyup', function (event) { return __awaiter(_this, void 0, void 0, function () {
            var key, results, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        key = event.key;
                        console.log({ url: this.component.apiUrl });
                        if (!(event.target.value.length % 3 === 0)) return [3 /*break*/, 3];
                        console.log('indide if');
                        return [4 /*yield*/, fetch(this.component.apiUrl + "/" + event.target.value, {
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Authorization': "Bearer " + localStorage.token,
                                }
                            })];
                    case 1:
                        results = _b.sent();
                        _a = this;
                        return [4 /*yield*/, results.json()];
                    case 2:
                        _a.values = _b.sent();
                        console.log({ values: this.values });
                        _b.label = 3;
                    case 3:
                        if (['Backspace', 'Delete'].includes(key)) {
                            this.setValue(this.emptyValue, []);
                        }
                        return [2 /*return*/];
                }
            });
        }); });
        // Allow basic component functionality to attach like field logic and tooltips.
        return _super.prototype.attach.call(this, element);
    };
    /**
     * Get the value of the component from the dom elements.
     *
     * @returns {Array}
     */
    CustomSelect.prototype.getValue = function () {
        var value = this.inputValue;
        return value;
    };
    /**
     * Set the value of the component into the dom elements.
     *
     * @param value
     * @returns {boolean}
     */
    CustomSelect.prototype.setValue = function (value, values) {
        if (!value) {
            return;
        }
        this.inputValue = value;
        this.values = values;
    };
    CustomSelect.editForm = editForm;
    CustomSelect.builderInfo = {
        title: 'Custom Select',
        group: 'basic',
        icon: 'fa fa-table',
        weight: 70,
        documentation: 'http://help.form.io/userguide/#table',
        schema: CustomSelect.schema()
    };
    return CustomSelect;
}(FieldComponent));
export default CustomSelect;
