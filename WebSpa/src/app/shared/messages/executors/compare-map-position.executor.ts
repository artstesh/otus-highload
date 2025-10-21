import { PostboyExecutionHandler, PostboyExecutor, PostboyGenericMessage } from '@artstesh/postboy';
import { MapPosition } from '@artstesh/maps';

export class CompareMapPositionExecutor extends PostboyExecutor<boolean> {
   static readonly ID = '99890e67-ca44-4533-909e-a0d27d29ab9d';

   constructor(public next: MapPosition, public prev?: MapPosition|null) {
      super();
   }
}

export class CompareMapPositionExecutorHandler extends PostboyExecutionHandler<boolean, CompareMapPositionExecutor>{
   handle(executor: CompareMapPositionExecutor): boolean {
      const position = executor.next;
      var result = true;
      if (executor.prev) {
         const zoomChanged = Math.abs(position.zoom - executor.prev.zoom) >= 1;
         const anchorChanged = this.anchorCompare(executor.next, executor.prev);
         result = (anchorChanged || zoomChanged);
      }
      return result;
   }

   private anchorCompare(position: MapPosition, prev: MapPosition): boolean {
      let change = 0;
      if (position.zoom >= 15) change = .00003;
      if (position.zoom >= 14) change = .0001;
      if (position.zoom >= 13) change = .0003;
      if (position.zoom >= 12) change = .001;
      if (position.zoom >= 11) change = .002;
      return Math.abs(position.extent[0] - prev.extent[0]) >= change || Math.abs(position.extent[1] - prev.extent[1]) >= change;
   }

}
