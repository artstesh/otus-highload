/**
 * Presents information about the region after clicking on the map.
 */
export class GisRegionClickInfo {
   /**
    * Constructs an instance of the class with the specified id and level.
    *
    * @param {string} id - The unique identifier for the instance.
    * @param {number} level - The level or rank associated with the instance.
    */
   constructor(
      public id: string,
      public level: number
   ) {}
}
