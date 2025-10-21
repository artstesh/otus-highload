/**
 * Represents a source item model that encapsulates details of a provider and its associated expression.
 */
export class SourceItemModel {
   /**
    * Constructor for initializing an instance with a provider ID and an expression.
    *
    * @param {string} providerId - The unique identifier for the provider.
    * @param {string} expression - The expression or formula associated with the provider.
    */
   constructor(
      public providerId: string,
      public expression: string
   ) {}
}
