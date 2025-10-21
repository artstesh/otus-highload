import { FieldDto } from '@api/fields';
import { FieldLayerType } from '@shared/models/field-layer-type.enum';

export interface MapFieldDto extends FieldDto{
   fieldLayer: FieldLayerType | null;
}
