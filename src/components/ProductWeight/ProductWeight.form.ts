import nestedComponentForm from 'formiojs/components/_classes/nested/NestedComponent.form';
import ProductWeightEditDisplay from './editForm/ProductWeight.edit.display';
export default function(...extend) {
  return nestedComponentForm([
    {
      key: 'display',
      components: ProductWeightEditDisplay
    }
  ], ...extend);
}
