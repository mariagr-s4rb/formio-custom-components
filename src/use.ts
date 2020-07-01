import { Formio } from 'formiojs';
import FormioContrib from './index';
import checkmatrix from './components/CheckMatrix/CheckMatrix';
import customselect from './components/CustomSelect/CustomSelect';
(Formio as any).registerComponent('custom', customselect);
(Formio as any).registerComponent('checkmatrix', checkmatrix);
(Formio as any).use(FormioContrib);
export default FormioContrib;

