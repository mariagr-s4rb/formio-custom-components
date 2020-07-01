import { Formio } from 'formiojs';
import FormioContrib from './index';
import checkmatrix from './components/CheckMatrix/CheckMatrix';
import customselect from './components/CustomSelect/CustomSelect';
Formio.registerComponent('custom', customselect);
Formio.registerComponent('checkmatrix', checkmatrix);
Formio.use(FormioContrib);
export default FormioContrib;
