import nestedComponentForm from 'formiojs/components/_classes/nested/NestedComponent.form';
import CustomSelectEditDisplay from './editForm/CustomSelect.edit.display';
export default function(...extend) {
  return nestedComponentForm([
    {
      key: 'display',
      components: CustomSelectEditDisplay
    }
  ], ...extend);
}
