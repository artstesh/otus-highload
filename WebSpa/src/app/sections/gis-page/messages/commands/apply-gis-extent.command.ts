import { PolygonModel } from '@artstesh/maps';
import { PostboyGenericMessage } from '@artstesh/postboy';

/**
 * The ApplyGisFilterCommand class is a specialized implementation of the PostboyGenericMessage,
 * representing a command to apply tile-map filters. This class includes
 * a specific identifier for the command and inherits generic messaging behavior.
 *
 * This command can be identified globally by its static readonly ID property.
 *
 * Inherits from PostboyGenericMessage.
 */
export class ApplyGisExtentCommand extends PostboyGenericMessage {
   public static readonly ID = 'ea486c2e-5bf9-48bf-a314-0c40af75f3d1';

   constructor(public polygons: PolygonModel[]) {
      super();
   }
}
