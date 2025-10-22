"use strict";
(self["webpackChunkOtus"] = self["webpackChunkOtus"] || []).push([["main"],{

/***/ 10326:
/*!*******************************************************************************!*\
  !*** ./src/app/api-internal/field-clusters/field-cluster-internal.service.ts ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FieldClusterInternalService: () => (/* binding */ FieldClusterInternalService)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 33900);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ 61318);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs */ 59452);
/* harmony import */ var _root_src_app_api_internal_field_clusters_messages_list_field_clusters_query__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @root/src/app/api-internal/field-clusters/messages/list-field-clusters.query */ 98318);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _root_src_app_services_app_postboy_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @root/src/app/services/app-postboy.service */ 44804);
/* harmony import */ var _api_Geo__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @api/Geo */ 22155);





class FieldClusterInternalService {
  postboy;
  remote;
  _namespace = 'field-cluster-internal';
  constructor(postboy, remote) {
    this.postboy = postboy;
    this.remote = remote;
    this.postboy.addNamespace(this._namespace).recordSubject(_root_src_app_api_internal_field_clusters_messages_list_field_clusters_query__WEBPACK_IMPORTED_MODULE_0__.ListFieldClustersQuery);
  }
  up() {
    this.postboy.sub(_root_src_app_api_internal_field_clusters_messages_list_field_clusters_query__WEBPACK_IMPORTED_MODULE_0__.ListFieldClustersQuery).subscribe(qry => this.list(qry));
  }
  list(qry) {
    this.remote.clusterByBoundingBoxPost({
      body: {
        extent: qry.extent
      }
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_3__.takeUntil)(qry.cancel$), (0,rxjs__WEBPACK_IMPORTED_MODULE_4__.catchError)(err => (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.of)([]))).subscribe(result => qry.finish(result));
  }
  down() {
    this.postboy.eliminateNamespace(this._namespace);
  }
  static ɵfac = function FieldClusterInternalService_Factory(t) {
    return new (t || FieldClusterInternalService)(_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵinject"](_root_src_app_services_app_postboy_service__WEBPACK_IMPORTED_MODULE_1__.AppPostboyService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵinject"](_api_Geo__WEBPACK_IMPORTED_MODULE_2__.ClusterService));
  };
  static ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineInjectable"]({
    token: FieldClusterInternalService,
    factory: FieldClusterInternalService.ɵfac,
    providedIn: 'root'
  });
}

/***/ }),

/***/ 98318:
/*!***********************************************************************************!*\
  !*** ./src/app/api-internal/field-clusters/messages/list-field-clusters.query.ts ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ListFieldClustersQuery: () => (/* binding */ ListFieldClustersQuery)
/* harmony export */ });
/* harmony import */ var _artstesh_postboy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @artstesh/postboy */ 33518);
/* harmony import */ var _artstesh_postboy__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_artstesh_postboy__WEBPACK_IMPORTED_MODULE_0__);

class ListFieldClustersQuery extends _artstesh_postboy__WEBPACK_IMPORTED_MODULE_0__.PostboyCallbackMessage {
  extent;
  cancel$;
  static ID = '83bd46de-6178-4bdf-bc77-ba2e07360e87';
  constructor(extent, cancel$) {
    super();
    this.extent = extent;
    this.cancel$ = cancel$;
  }
}

/***/ }),

/***/ 82659:
/*!****************************************************************!*\
  !*** ./src/app/api-internal/fields/fields-internal.service.ts ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FieldsInternalService: () => (/* binding */ FieldsInternalService)
/* harmony export */ });
/* harmony import */ var _messages_list_fields_query__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./messages/list-fields.query */ 28960);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 33900);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ 61318);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs */ 59452);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _services_app_postboy_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../services/app-postboy.service */ 44804);
/* harmony import */ var _api_Geo__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @api/Geo */ 22155);





/**
 *
 */
class FieldsInternalService {
  postboy;
  remote;
  _namespace = 'fields-internal';
  constructor(postboy, remote) {
    this.postboy = postboy;
    this.remote = remote;
    this.postboy.addNamespace(this._namespace).recordSubject(_messages_list_fields_query__WEBPACK_IMPORTED_MODULE_0__.ListFieldsQuery);
  }
  up() {
    this.postboy.sub(_messages_list_fields_query__WEBPACK_IMPORTED_MODULE_0__.ListFieldsQuery).subscribe(qry => this.fieldList(qry));
  }
  fieldList(qry) {
    this.remote.fieldByBoundingBoxPost({
      body: {
        extent: qry.extent,
        zoom: qry.zoom
      }
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_3__.takeUntil)(qry.cancel$), (0,rxjs__WEBPACK_IMPORTED_MODULE_4__.catchError)(err => (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.of)([]))).subscribe({
      next: result => qry.finish(result),
      error: () => qry.finish([])
    });
  }
  down() {
    this.postboy.eliminateNamespace(this._namespace);
  }
  static ɵfac = function FieldsInternalService_Factory(t) {
    return new (t || FieldsInternalService)(_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵinject"](_services_app_postboy_service__WEBPACK_IMPORTED_MODULE_1__.AppPostboyService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵinject"](_api_Geo__WEBPACK_IMPORTED_MODULE_2__.FieldService));
  };
  static ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineInjectable"]({
    token: FieldsInternalService,
    factory: FieldsInternalService.ɵfac
  });
}

/***/ }),

/***/ 28960:
/*!*******************************************************************!*\
  !*** ./src/app/api-internal/fields/messages/list-fields.query.ts ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ListFieldsQuery: () => (/* binding */ ListFieldsQuery)
/* harmony export */ });
/* harmony import */ var _artstesh_postboy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @artstesh/postboy */ 33518);
/* harmony import */ var _artstesh_postboy__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_artstesh_postboy__WEBPACK_IMPORTED_MODULE_0__);

/**
 *
 */
class ListFieldsQuery extends _artstesh_postboy__WEBPACK_IMPORTED_MODULE_0__.PostboyCallbackMessage {
  extent;
  zoom;
  cancel$;
  static ID = '636092e4-7e0c-44db-897d-c4cbbacccab7';
  /**
   *
   */
  constructor(extent, zoom, cancel$) {
    super();
    this.extent = extent;
    this.zoom = zoom;
    this.cancel$ = cancel$;
  }
}

/***/ }),

/***/ 29366:
/*!************************************************************************!*\
  !*** ./src/app/api-internal/helpers/remote-balanced.helper.factory.ts ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   RemoteBalancedHelperFactory: () => (/* binding */ RemoteBalancedHelperFactory)
/* harmony export */ });
/* harmony import */ var _root_src_app_api_internal_helpers_remote_balanced_helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @root/src/app/api-internal/helpers/remote-balanced.helper */ 98406);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _root_src_app_services_app_postboy_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @root/src/app/services/app-postboy.service */ 44804);
/* harmony import */ var _root_src_app_api_internal_helpers_request_queue_factory__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @root/src/app/api-internal/helpers/request-queue.factory */ 17376);




/**
 * A factory service for creating instances of `RemoteBalancedHelper`, which facilitates
 * managing remote service requests with balanced and efficient handling.
 *
 * This factory is designed to work with `AppPostboyService` for post operations
 * and leverages `RequestQueueFactory` for managing request queues.
 */
class RemoteBalancedHelperFactory {
  postboy;
  queueFactory;
  /**
   * Creates an instance of the class.
   *
   * @param {AppPostboyService} postboy - The service responsible for handling post operations.
   * @param {RequestQueueFactory} queueFactory - The factory responsible for creating request queues.
   */
  constructor(postboy, queueFactory) {
    this.postboy = postboy;
    this.queueFactory = queueFactory;
  }
  /**
   * Produces an instance of RemoteBalancedHelper with the provided settings.
   *
   * @param {RemoteHelperSettings<M, E>} settings - The configuration settings used to initialize the RemoteBalancedHelper instance.
   * @return {RemoteBalancedHelper<M, T, E>} An instance of RemoteBalancedHelper configured with the provided settings.
   */
  produce(settings) {
    return new _root_src_app_api_internal_helpers_remote_balanced_helper__WEBPACK_IMPORTED_MODULE_0__.RemoteBalancedHelper(this.postboy, this.queueFactory, settings);
  }
  static ɵfac = function RemoteBalancedHelperFactory_Factory(t) {
    return new (t || RemoteBalancedHelperFactory)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](_root_src_app_services_app_postboy_service__WEBPACK_IMPORTED_MODULE_1__.AppPostboyService), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](_root_src_app_api_internal_helpers_request_queue_factory__WEBPACK_IMPORTED_MODULE_2__.RequestQueueFactory));
  };
  static ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjectable"]({
    token: RemoteBalancedHelperFactory,
    factory: RemoteBalancedHelperFactory.ɵfac,
    providedIn: 'root'
  });
}

/***/ }),

/***/ 98406:
/*!****************************************************************!*\
  !*** ./src/app/api-internal/helpers/remote-balanced.helper.ts ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   RemoteBalancedHelper: () => (/* binding */ RemoteBalancedHelper)
/* harmony export */ });
/* harmony import */ var _artstesh_collections__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @artstesh/collections */ 59139);
/* harmony import */ var _artstesh_collections__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_artstesh_collections__WEBPACK_IMPORTED_MODULE_0__);

class RemoteBalancedHelper {
  postboy;
  queueFactory;
  settings;
  requests = new _artstesh_collections__WEBPACK_IMPORTED_MODULE_0__.Dictionary();
  /**
   * Constructs a new instance of the class with the provided dependencies.
   *
   * @param {AppPostboyService} postboy - An instance of the AppPostboyService to handle posting operations.
   * @param {RequestQueueFactory} queueFactory - A factory to create request queues.
   * @param {RemoteHelperSettings<M, E>} settings - Configuration settings for the remote helper.
   */
  constructor(postboy, queueFactory, settings) {
    this.postboy = postboy;
    this.queueFactory = queueFactory;
    this.settings = settings;
  }
  /**
   * Subscribes to the specified message from the `postboy` service and executes a query when the message is received.
   *
   * @return {void} No return value.
   */
  up() {
    this.postboy.sub(this.settings.message).subscribe(qry => this.execute(qry));
  }
  /**
   * Executes the given query and processes it based on specified conditions.
   *
   * @param {M} qry - The query object containing the necessary data and flags for execution.
   * @return {void} - This method does not return a value.
   */
  execute(qry) {
    const queue = this.getQueue(qry.hash());
    if (qry.force) queue.reset().add(qry);else if (queue.tryFinish(qry)) return;
    this.settings.load(qry).subscribe({
      next: m => queue.finish(this.settings.mutation(m)),
      error: e => queue.finish(this.settings.failure)
    });
  }
  /**
   * Retrieves or creates a query queue associated with the given hash.
   *
   * @param {string} hash - The unique identifier used to reference the query queue.
   * @return {QueryQueue<T>} Returns the query queue associated with the provided hash.
   */
  getQueue(hash) {
    if (!this.requests.has(hash)) {
      let value = this.queueFactory.produce(this.settings.cache);
      this.requests.put(hash, value);
      return value;
    }
    return this.requests.take(hash);
  }
  /**
   * Resets the internal state of the list queue to its initial configuration.
   *
   * @return {void} Does not return any value.
   */
  reset(hash) {
    !!hash ? this.requests.take(hash)?.reset() : this.requests.forEach(q => q.reset());
  }
}

/***/ }),

/***/ 17376:
/*!***************************************************************!*\
  !*** ./src/app/api-internal/helpers/request-queue.factory.ts ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   RequestQueueFactory: () => (/* binding */ RequestQueueFactory)
/* harmony export */ });
/* harmony import */ var _root_src_app_api_internal_models_query_queue_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @root/src/app/api-internal/models/query-queue.model */ 36005);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 37580);


/**
 * A factory class responsible for creating instances of QueryQueue.
 * Designed to be provided at the root level using Angular's DI system.
 */
class RequestQueueFactory {
  /**
   * Creates and returns a new instance of QueryQueue.
   *
   * @template T The type of elements contained in the QueryQueue.
   * @return {QueryQueue<T>} A newly created QueryQueue instance.
   */
  produce(cache) {
    return new _root_src_app_api_internal_models_query_queue_model__WEBPACK_IMPORTED_MODULE_0__.QueryQueue(cache);
  }
  static ɵfac = function RequestQueueFactory_Factory(t) {
    return new (t || RequestQueueFactory)();
  };
  static ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({
    token: RequestQueueFactory,
    factory: RequestQueueFactory.ɵfac,
    providedIn: 'root'
  });
}

/***/ }),

/***/ 36005:
/*!**********************************************************!*\
  !*** ./src/app/api-internal/models/query-queue.model.ts ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   QueryQueue: () => (/* binding */ QueryQueue)
/* harmony export */ });
/* harmony import */ var _artstesh_collections__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @artstesh/collections */ 59139);
/* harmony import */ var _artstesh_collections__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_artstesh_collections__WEBPACK_IMPORTED_MODULE_0__);

class QueryQueue {
  cache;
  /**
   * Gets the current data stored in the instance.
   *
   * @return {D | null} The current data or null if no data is set.
   */
  get data() {
    return this._data;
  }
  queries = new _artstesh_collections__WEBPACK_IMPORTED_MODULE_0__.Queue();
  _requestInProgress = true;
  _data = null;
  /**
   * Constructs an instance of the class with an optional caching mechanism.
   *
   * @param {boolean} cache - Determines if caching should be enabled. Defaults to true.
   * @return {void}
   */
  constructor(cache = true) {
    this.cache = cache;
  }
  /**
   * Resets the state of the instance by clearing stored data.
   * This method sets the internal data to null, effectively resetting the object.
   *
   * @return {void} Does not return a value.
   */
  reset() {
    this._data = null;
    return this;
  }
  /**
   * Attempts to finalize the provided query. It either queues the query for later processing
   * if a request is in progress or data is missing, or completes the query immediately.
   *
   * @param {PostboyCallbackMessage<D>} query - The callback message to be finalized.
   * @return {boolean} - Returns true if the query was successfully finalized, otherwise false.
   */
  tryFinish(query) {
    if (this._requestInProgress || this._data === null) return this.queries.put(query) && false;
    query.finish(this._data);
    return true;
  }
  /**
   * Adds a new query to the query queue.
   *
   * @param {PostboyCallbackMessage<D>} query - The query to be added to the queue.
   * @return {QueryQueue<D>} The updated QueryQueue instance.
   */
  add(query) {
    return this.queries.put(query) && this;
  }
  /**
   * Marks the operation as finished by updating the internal state and handling each query.
   *
   * @param {D} data - The data to be set for the current operation.
   * @return {void} This method does not return a value.
   */
  finish(data) {
    if (this.cache) this._data = data;
    this._requestInProgress = false;
    this.queries.each(q => q.finish(data));
  }
}

/***/ }),

/***/ 27578:
/*!***************************************************************!*\
  !*** ./src/app/api-internal/models/remote-service-request.ts ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   RemoteServiceRequest: () => (/* binding */ RemoteServiceRequest)
/* harmony export */ });
/* harmony import */ var _artstesh_postboy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @artstesh/postboy */ 33518);
/* harmony import */ var _artstesh_postboy__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_artstesh_postboy__WEBPACK_IMPORTED_MODULE_0__);

class RemoteServiceRequest extends _artstesh_postboy__WEBPACK_IMPORTED_MODULE_0__.PostboyCallbackMessage {
  force;
  /**
   * Creates an instance of the class.    *
   * @param {boolean} [force=false] - A boolean flag to enable or disable forcing functionality.
   */
  constructor(force = false) {
    super();
    this.force = force;
  }
  hash = () => this.id;
}

/***/ }),

/***/ 29960:
/*!*********************************************************************!*\
  !*** ./src/app/api-internal/regions/messages/list-regions.query.ts ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ListRegionsQuery: () => (/* binding */ ListRegionsQuery)
/* harmony export */ });
/* harmony import */ var _root_src_app_api_internal_models_remote_service_request__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @root/src/app/api-internal/models/remote-service-request */ 27578);

class ListRegionsQuery extends _root_src_app_api_internal_models_remote_service_request__WEBPACK_IMPORTED_MODULE_0__.RemoteServiceRequest {
  static ID = 'f301daf2-1ea7-4a20-9ddf-e2c7f73a8616';
  constructor() {
    super();
  }
}

/***/ }),

/***/ 40747:
/*!******************************************************************!*\
  !*** ./src/app/api-internal/regions/regions-internal.service.ts ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   RegionsInternalService: () => (/* binding */ RegionsInternalService)
/* harmony export */ });
/* harmony import */ var _root_src_app_api_internal_regions_messages_list_regions_query__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @root/src/app/api-internal/regions/messages/list-regions.query */ 29960);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _api_Geo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @api/Geo */ 22155);
/* harmony import */ var _root_src_app_api_internal_helpers_remote_balanced_helper_factory__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @root/src/app/api-internal/helpers/remote-balanced.helper.factory */ 29366);
/* harmony import */ var _root_src_app_services_app_postboy_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @root/src/app/services/app-postboy.service */ 44804);





class RegionsInternalService {
  postboy;
  _namespace = 'regions-internal';
  listBalancer;
  constructor(remote, factory, postboy) {
    this.postboy = postboy;
    this.postboy.addNamespace(this._namespace).recordSubject(_root_src_app_api_internal_regions_messages_list_regions_query__WEBPACK_IMPORTED_MODULE_0__.ListRegionsQuery);
    this.listBalancer = factory.produce({
      message: _root_src_app_api_internal_regions_messages_list_regions_query__WEBPACK_IMPORTED_MODULE_0__.ListRegionsQuery,
      load: () => remote.regionGet(),
      mutation: m => m,
      failure: [],
      cache: true
    });
  }
  /**
   * Moves the list balancer up by invoking the `up` method of the `listBalancer` instance.
   *
   * @return {void} This method does not return a value.
   */
  up() {
    this.listBalancer.up();
  }
  down() {
    this.postboy.eliminateNamespace(this._namespace);
  }
  static ɵfac = function RegionsInternalService_Factory(t) {
    return new (t || RegionsInternalService)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_api_Geo__WEBPACK_IMPORTED_MODULE_1__.RegionService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_root_src_app_api_internal_helpers_remote_balanced_helper_factory__WEBPACK_IMPORTED_MODULE_2__.RemoteBalancedHelperFactory), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_root_src_app_services_app_postboy_service__WEBPACK_IMPORTED_MODULE_3__.AppPostboyService));
  };
  static ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjectable"]({
    token: RegionsInternalService,
    factory: RegionsInternalService.ɵfac
  });
}

/***/ }),

/***/ 97368:
/*!*****************************************!*\
  !*** ./src/app/api/Geo/base-service.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BaseService: () => (/* binding */ BaseService)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _geo_api_configuration__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./geo-api-configuration */ 98200);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ 46443);



/**
 * Base class for services
 */
class BaseService {
  config;
  http;
  constructor(config, http) {
    this.config = config;
    this.http = http;
  }
  _rootUrl;
  /**
   * Returns the root url for all operations in this service. If not set directly in this
   * service, will fallback to `GeoApiConfiguration.rootUrl`.
   */
  get rootUrl() {
    return this._rootUrl || this.config.rootUrl;
  }
  /**
   * Sets the root URL for API operations in this service.
   */
  set rootUrl(rootUrl) {
    this._rootUrl = rootUrl;
  }
  static ɵfac = function BaseService_Factory(t) {
    return new (t || BaseService)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_geo_api_configuration__WEBPACK_IMPORTED_MODULE_0__.GeoApiConfiguration), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpClient));
  };
  static ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({
    token: BaseService,
    factory: BaseService.ɵfac
  });
}

/***/ }),

/***/ 51964:
/*!**************************************************************************!*\
  !*** ./src/app/api/Geo/fn/cluster/cluster-by-bounding-box-post-plain.ts ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   clusterByBoundingBoxPost$Plain: () => (/* binding */ clusterByBoundingBoxPost$Plain)
/* harmony export */ });
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ 46443);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ 51567);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ 70271);
/* harmony import */ var _request_builder__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../request-builder */ 3948);
/* tslint:disable */
/* eslint-disable */



function clusterByBoundingBoxPost$Plain(http, rootUrl, params, context) {
  const rb = new _request_builder__WEBPACK_IMPORTED_MODULE_0__.RequestBuilder(rootUrl, clusterByBoundingBoxPost$Plain.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/*+json');
  }
  return http.request(rb.build({
    responseType: 'text',
    accept: 'text/plain',
    context
  })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.filter)(r => r instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.map)(r => {
    return r;
  }));
}
clusterByBoundingBoxPost$Plain.PATH = '/Cluster/by-bounding-box';

/***/ }),

/***/ 18573:
/*!********************************************************************!*\
  !*** ./src/app/api/Geo/fn/cluster/cluster-by-bounding-box-post.ts ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   clusterByBoundingBoxPost: () => (/* binding */ clusterByBoundingBoxPost)
/* harmony export */ });
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ 46443);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ 51567);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ 70271);
/* harmony import */ var _request_builder__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../request-builder */ 3948);
/* tslint:disable */
/* eslint-disable */



function clusterByBoundingBoxPost(http, rootUrl, params, context) {
  const rb = new _request_builder__WEBPACK_IMPORTED_MODULE_0__.RequestBuilder(rootUrl, clusterByBoundingBoxPost.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/*+json');
  }
  return http.request(rb.build({
    responseType: 'json',
    accept: 'text/json',
    context
  })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.filter)(r => r instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.map)(r => {
    return r;
  }));
}
clusterByBoundingBoxPost.PATH = '/Cluster/by-bounding-box';

/***/ }),

/***/ 65520:
/*!**********************************************************!*\
  !*** ./src/app/api/Geo/fn/cluster/cluster-reset-post.ts ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   clusterResetPost: () => (/* binding */ clusterResetPost)
/* harmony export */ });
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ 46443);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ 51567);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ 70271);
/* harmony import */ var _request_builder__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../request-builder */ 3948);
/* tslint:disable */
/* eslint-disable */



function clusterResetPost(http, rootUrl, params, context) {
  const rb = new _request_builder__WEBPACK_IMPORTED_MODULE_0__.RequestBuilder(rootUrl, clusterResetPost.PATH, 'post');
  if (params) {}
  return http.request(rb.build({
    responseType: 'text',
    accept: '*/*',
    context
  })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.filter)(r => r instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.map)(r => {
    return r.clone({
      body: undefined
    });
  }));
}
clusterResetPost.PATH = '/Cluster/reset';

/***/ }),

/***/ 72272:
/*!**********************************************************************!*\
  !*** ./src/app/api/Geo/fn/field/field-by-bounding-box-post-plain.ts ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   fieldByBoundingBoxPost$Plain: () => (/* binding */ fieldByBoundingBoxPost$Plain)
/* harmony export */ });
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ 46443);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ 51567);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ 70271);
/* harmony import */ var _request_builder__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../request-builder */ 3948);
/* tslint:disable */
/* eslint-disable */



function fieldByBoundingBoxPost$Plain(http, rootUrl, params, context) {
  const rb = new _request_builder__WEBPACK_IMPORTED_MODULE_0__.RequestBuilder(rootUrl, fieldByBoundingBoxPost$Plain.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/*+json');
  }
  return http.request(rb.build({
    responseType: 'text',
    accept: 'text/plain',
    context
  })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.filter)(r => r instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.map)(r => {
    return r;
  }));
}
fieldByBoundingBoxPost$Plain.PATH = '/Field/by-bounding-box';

/***/ }),

/***/ 36393:
/*!****************************************************************!*\
  !*** ./src/app/api/Geo/fn/field/field-by-bounding-box-post.ts ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   fieldByBoundingBoxPost: () => (/* binding */ fieldByBoundingBoxPost)
/* harmony export */ });
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ 46443);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ 51567);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ 70271);
/* harmony import */ var _request_builder__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../request-builder */ 3948);
/* tslint:disable */
/* eslint-disable */



function fieldByBoundingBoxPost(http, rootUrl, params, context) {
  const rb = new _request_builder__WEBPACK_IMPORTED_MODULE_0__.RequestBuilder(rootUrl, fieldByBoundingBoxPost.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/*+json');
  }
  return http.request(rb.build({
    responseType: 'json',
    accept: 'text/json',
    context
  })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.filter)(r => r instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.map)(r => {
    return r;
  }));
}
fieldByBoundingBoxPost.PATH = '/Field/by-bounding-box';

/***/ }),

/***/ 52839:
/*!******************************************************!*\
  !*** ./src/app/api/Geo/fn/field/field-post-plain.ts ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   fieldPost$Plain: () => (/* binding */ fieldPost$Plain)
/* harmony export */ });
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ 46443);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ 51567);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ 70271);
/* harmony import */ var _request_builder__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../request-builder */ 3948);
/* tslint:disable */
/* eslint-disable */



function fieldPost$Plain(http, rootUrl, params, context) {
  const rb = new _request_builder__WEBPACK_IMPORTED_MODULE_0__.RequestBuilder(rootUrl, fieldPost$Plain.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/*+json');
  }
  return http.request(rb.build({
    responseType: 'text',
    accept: 'text/plain',
    context
  })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.filter)(r => r instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.map)(r => {
    return r;
  }));
}
fieldPost$Plain.PATH = '/Field';

/***/ }),

/***/ 19082:
/*!************************************************!*\
  !*** ./src/app/api/Geo/fn/field/field-post.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   fieldPost: () => (/* binding */ fieldPost)
/* harmony export */ });
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ 46443);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ 51567);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ 70271);
/* harmony import */ var _request_builder__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../request-builder */ 3948);
/* tslint:disable */
/* eslint-disable */



function fieldPost(http, rootUrl, params, context) {
  const rb = new _request_builder__WEBPACK_IMPORTED_MODULE_0__.RequestBuilder(rootUrl, fieldPost.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/*+json');
  }
  return http.request(rb.build({
    responseType: 'json',
    accept: 'text/json',
    context
  })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.filter)(r => r instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.map)(r => {
    return r;
  }));
}
fieldPost.PATH = '/Field';

/***/ }),

/***/ 97833:
/*!***************************************************************!*\
  !*** ./src/app/api/Geo/fn/region/region-define-post-plain.ts ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   regionDefinePost$Plain: () => (/* binding */ regionDefinePost$Plain)
/* harmony export */ });
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ 46443);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ 51567);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ 70271);
/* harmony import */ var _request_builder__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../request-builder */ 3948);
/* tslint:disable */
/* eslint-disable */



function regionDefinePost$Plain(http, rootUrl, params, context) {
  const rb = new _request_builder__WEBPACK_IMPORTED_MODULE_0__.RequestBuilder(rootUrl, regionDefinePost$Plain.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/*+json');
  }
  return http.request(rb.build({
    responseType: 'text',
    accept: 'text/plain',
    context
  })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.filter)(r => r instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.map)(r => {
    return r;
  }));
}
regionDefinePost$Plain.PATH = '/Region/define';

/***/ }),

/***/ 34400:
/*!*********************************************************!*\
  !*** ./src/app/api/Geo/fn/region/region-define-post.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   regionDefinePost: () => (/* binding */ regionDefinePost)
/* harmony export */ });
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ 46443);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ 51567);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ 70271);
/* harmony import */ var _request_builder__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../request-builder */ 3948);
/* tslint:disable */
/* eslint-disable */



function regionDefinePost(http, rootUrl, params, context) {
  const rb = new _request_builder__WEBPACK_IMPORTED_MODULE_0__.RequestBuilder(rootUrl, regionDefinePost.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/*+json');
  }
  return http.request(rb.build({
    responseType: 'json',
    accept: 'text/json',
    context
  })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.filter)(r => r instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.map)(r => {
    return r;
  }));
}
regionDefinePost.PATH = '/Region/define';

/***/ }),

/***/ 33949:
/*!*******************************************************!*\
  !*** ./src/app/api/Geo/fn/region/region-get-plain.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   regionGet$Plain: () => (/* binding */ regionGet$Plain)
/* harmony export */ });
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ 46443);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ 51567);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ 70271);
/* harmony import */ var _request_builder__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../request-builder */ 3948);
/* tslint:disable */
/* eslint-disable */



function regionGet$Plain(http, rootUrl, params, context) {
  const rb = new _request_builder__WEBPACK_IMPORTED_MODULE_0__.RequestBuilder(rootUrl, regionGet$Plain.PATH, 'get');
  if (params) {}
  return http.request(rb.build({
    responseType: 'text',
    accept: 'text/plain',
    context
  })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.filter)(r => r instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.map)(r => {
    return r;
  }));
}
regionGet$Plain.PATH = '/Region';

/***/ }),

/***/ 24156:
/*!*************************************************!*\
  !*** ./src/app/api/Geo/fn/region/region-get.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   regionGet: () => (/* binding */ regionGet)
/* harmony export */ });
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ 46443);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ 51567);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ 70271);
/* harmony import */ var _request_builder__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../request-builder */ 3948);
/* tslint:disable */
/* eslint-disable */



function regionGet(http, rootUrl, params, context) {
  const rb = new _request_builder__WEBPACK_IMPORTED_MODULE_0__.RequestBuilder(rootUrl, regionGet.PATH, 'get');
  if (params) {}
  return http.request(rb.build({
    responseType: 'json',
    accept: 'text/json',
    context
  })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.filter)(r => r instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.map)(r => {
    return r;
  }));
}
regionGet.PATH = '/Region';

/***/ }),

/***/ 98200:
/*!**************************************************!*\
  !*** ./src/app/api/Geo/geo-api-configuration.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GeoApiConfiguration: () => (/* binding */ GeoApiConfiguration)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 37580);

/**
 * Global configuration
 */
class GeoApiConfiguration {
  rootUrl = '';
  static ɵfac = function GeoApiConfiguration_Factory(t) {
    return new (t || GeoApiConfiguration)();
  };
  static ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({
    token: GeoApiConfiguration,
    factory: GeoApiConfiguration.ɵfac,
    providedIn: 'root'
  });
}

/***/ }),

/***/ 41293:
/*!*******************************************!*\
  !*** ./src/app/api/Geo/geo-api.module.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GeoApiModule: () => (/* binding */ GeoApiModule)
/* harmony export */ });
/* harmony import */ var _geo_api_configuration__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./geo-api-configuration */ 98200);
/* harmony import */ var _services_cluster_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./services/cluster.service */ 57895);
/* harmony import */ var _services_field_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./services/field.service */ 76437);
/* harmony import */ var _services_region_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./services/region.service */ 2159);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common/http */ 46443);






/**
 * Module that provides all services and configuration.
 */
class GeoApiModule {
  static forRoot(params) {
    return {
      ngModule: GeoApiModule,
      providers: [{
        provide: _geo_api_configuration__WEBPACK_IMPORTED_MODULE_0__.GeoApiConfiguration,
        useValue: params
      }]
    };
  }
  constructor(parentModule, http) {
    if (parentModule) {
      throw new Error('GeoApiModule is already loaded. Import in your base AppModule only.');
    }
    if (!http) {
      throw new Error('You need to import the HttpClientModule in your AppModule! \n' + 'See also https://github.com/angular/angular/issues/20575');
    }
  }
  static ɵfac = function GeoApiModule_Factory(t) {
    return new (t || GeoApiModule)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](GeoApiModule, 12), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_5__.HttpClient, 8));
  };
  static ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineNgModule"]({
    type: GeoApiModule
  });
  static ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjector"]({
    providers: [_services_cluster_service__WEBPACK_IMPORTED_MODULE_1__.ClusterService, _services_field_service__WEBPACK_IMPORTED_MODULE_2__.FieldService, _services_region_service__WEBPACK_IMPORTED_MODULE_3__.RegionService, _geo_api_configuration__WEBPACK_IMPORTED_MODULE_0__.GeoApiConfiguration]
  });
}

/***/ }),

/***/ 22155:
/*!**********************************!*\
  !*** ./src/app/api/Geo/index.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BaseService: () => (/* reexport safe */ _base_service__WEBPACK_IMPORTED_MODULE_1__.BaseService),
/* harmony export */   ClusterService: () => (/* reexport safe */ _services_cluster_service__WEBPACK_IMPORTED_MODULE_4__.ClusterService),
/* harmony export */   FieldService: () => (/* reexport safe */ _services_field_service__WEBPACK_IMPORTED_MODULE_5__.FieldService),
/* harmony export */   GeoApiConfiguration: () => (/* reexport safe */ _geo_api_configuration__WEBPACK_IMPORTED_MODULE_0__.GeoApiConfiguration),
/* harmony export */   GeoApiModule: () => (/* reexport safe */ _geo_api_module__WEBPACK_IMPORTED_MODULE_3__.GeoApiModule),
/* harmony export */   RegionService: () => (/* reexport safe */ _services_region_service__WEBPACK_IMPORTED_MODULE_6__.RegionService),
/* harmony export */   RequestBuilder: () => (/* reexport safe */ _request_builder__WEBPACK_IMPORTED_MODULE_2__.RequestBuilder)
/* harmony export */ });
/* harmony import */ var _geo_api_configuration__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./geo-api-configuration */ 98200);
/* harmony import */ var _base_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./base-service */ 97368);
/* harmony import */ var _request_builder__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./request-builder */ 3948);
/* harmony import */ var _geo_api_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./geo-api.module */ 41293);
/* harmony import */ var _services_cluster_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./services/cluster.service */ 57895);
/* harmony import */ var _services_field_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./services/field.service */ 76437);
/* harmony import */ var _services_region_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./services/region.service */ 2159);








/***/ }),

/***/ 3948:
/*!********************************************!*\
  !*** ./src/app/api/Geo/request-builder.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   RequestBuilder: () => (/* binding */ RequestBuilder)
/* harmony export */ });
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common/http */ 46443);
/* tslint:disable */
/* eslint-disable */

/**
 * Custom parameter codec to correctly handle the plus sign in parameter
 * values. See https://github.com/angular/angular/issues/18261
 */
class ParameterCodec {
  encodeKey(key) {
    return encodeURIComponent(key);
  }
  encodeValue(value) {
    return encodeURIComponent(value);
  }
  decodeKey(key) {
    return decodeURIComponent(key);
  }
  decodeValue(value) {
    return decodeURIComponent(value);
  }
}
const ParameterCodecInstance = new ParameterCodec();
/**
 * Base class for a parameter
 */
class Parameter {
  name;
  value;
  options;
  constructor(name, value, options, defaultStyle, defaultExplode) {
    this.name = name;
    this.value = value;
    this.options = options;
    this.options = options || {};
    if (this.options.style === null || this.options.style === undefined) {
      this.options.style = defaultStyle;
    }
    if (this.options.explode === null || this.options.explode === undefined) {
      this.options.explode = defaultExplode;
    }
  }
  serializeValue(value, separator = ',') {
    if (value === null || value === undefined) {
      return '';
    } else if (value instanceof Array) {
      return value.map(v => this.serializeValue(v).split(separator).join(encodeURIComponent(separator))).join(separator);
    } else if (typeof value === 'object') {
      const array = [];
      for (const key of Object.keys(value)) {
        let propVal = value[key];
        if (propVal !== null && propVal !== undefined) {
          propVal = this.serializeValue(propVal).split(separator).join(encodeURIComponent(separator));
          if (this.options.explode) {
            array.push(`${key}=${propVal}`);
          } else {
            array.push(key);
            array.push(propVal);
          }
        }
      }
      return array.join(separator);
    } else {
      return String(value);
    }
  }
}
/**
 * A parameter in the operation path
 */
class PathParameter extends Parameter {
  constructor(name, value, options) {
    super(name, value, options, 'simple', false);
  }
  append(path) {
    let value = this.value;
    if (value === null || value === undefined) {
      value = '';
    }
    let prefix = this.options.style === 'label' ? '.' : '';
    let separator = this.options.explode ? prefix === '' ? ',' : prefix : ',';
    let alreadySerialized = false;
    if (this.options.style === 'matrix') {
      // The parameter name is just used as prefix, except in some cases...
      prefix = `;${this.name}=`;
      if (this.options.explode && typeof value === 'object') {
        prefix = ';';
        if (value instanceof Array) {
          // For arrays we have to repeat the name for each element
          value = value.map(v => `${this.name}=${this.serializeValue(v, ';')}`);
          value = value.join(';');
          alreadySerialized = true;
        } else {
          // For objects we have to put each the key / value pairs
          value = this.serializeValue(value, ';');
          alreadySerialized = true;
        }
      }
    }
    value = prefix + (alreadySerialized ? value : this.serializeValue(value, separator));
    // Replace both the plain variable and the corresponding variant taking in the prefix and explode into account
    path = path.replace(`{${this.name}}`, value);
    path = path.replace(`{${prefix}${this.name}${this.options.explode ? '*' : ''}}`, value);
    return path;
  }
  // @ts-ignore
  serializeValue(value, separator = ',') {
    var result = typeof value === 'string' ? encodeURIComponent(value) : super.serializeValue(value, separator);
    result = result.replace(/%3D/g, '=');
    result = result.replace(/%3B/g, ';');
    result = result.replace(/%2C/g, ',');
    return result;
  }
}
/**
 * A parameter in the query
 */
class QueryParameter extends Parameter {
  constructor(name, value, options) {
    super(name, value, options, 'form', true);
  }
  append(params) {
    if (this.value instanceof Array) {
      // Array serialization
      if (this.options.explode) {
        for (const v of this.value) {
          params = params.append(this.name, this.serializeValue(v));
        }
      } else {
        const separator = this.options.style === 'spaceDelimited' ? ' ' : this.options.style === 'pipeDelimited' ? '|' : ',';
        return params.append(this.name, this.serializeValue(this.value, separator));
      }
    } else if (this.value !== null && typeof this.value === 'object') {
      // Object serialization
      if (this.options.style === 'deepObject') {
        // Append a parameter for each key, in the form `name[key]`
        for (const key of Object.keys(this.value)) {
          const propVal = this.value[key];
          if (propVal !== null && propVal !== undefined) {
            params = params.append(`${this.name}[${key}]`, this.serializeValue(propVal));
          }
        }
      } else if (this.options.explode) {
        // Append a parameter for each key without using the parameter name
        for (const key of Object.keys(this.value)) {
          const propVal = this.value[key];
          if (propVal !== null && propVal !== undefined) {
            params = params.append(key, this.serializeValue(propVal));
          }
        }
      } else {
        // Append a single parameter whose values are a comma-separated list of key,value,key,value...
        const array = [];
        for (const key of Object.keys(this.value)) {
          const propVal = this.value[key];
          if (propVal !== null && propVal !== undefined) {
            array.push(key);
            array.push(propVal);
          }
        }
        params = params.append(this.name, this.serializeValue(array));
      }
    } else if (this.value !== null && this.value !== undefined) {
      // Plain value
      params = params.append(this.name, this.serializeValue(this.value));
    }
    return params;
  }
}
/**
 * A parameter in the HTTP request header
 */
class HeaderParameter extends Parameter {
  constructor(name, value, options) {
    super(name, value, options, 'simple', false);
  }
  append(headers) {
    if (this.value !== null && this.value !== undefined) {
      if (this.value instanceof Array) {
        for (const v of this.value) {
          headers = headers.append(this.name, this.serializeValue(v));
        }
      } else {
        headers = headers.append(this.name, this.serializeValue(this.value));
      }
    }
    return headers;
  }
}
/**
 * Helper to build http requests from parameters
 */
class RequestBuilder {
  rootUrl;
  operationPath;
  method;
  _path = new Map();
  _query = new Map();
  _header = new Map();
  _bodyContent;
  _bodyContentType;
  constructor(rootUrl, operationPath, method) {
    this.rootUrl = rootUrl;
    this.operationPath = operationPath;
    this.method = method;
  }
  /**
   * Sets a path parameter
   */
  path(name, value, options) {
    this._path.set(name, new PathParameter(name, value, options || {}));
  }
  /**
   * Sets a query parameter
   */
  query(name, value, options) {
    this._query.set(name, new QueryParameter(name, value, options || {}));
  }
  /**
   * Sets a header parameter
   */
  header(name, value, options) {
    this._header.set(name, new HeaderParameter(name, value, options || {}));
  }
  /**
   * Sets the body content, along with the content type
   */
  body(value, contentType = 'application/json') {
    if (value instanceof Blob) {
      this._bodyContentType = value.type;
    } else {
      this._bodyContentType = contentType;
    }
    if (this._bodyContentType === 'application/x-www-form-urlencoded' && value !== null && typeof value === 'object') {
      // Handle URL-encoded data
      const pairs = [];
      for (const key of Object.keys(value)) {
        let val = value[key];
        if (!(val instanceof Array)) {
          val = [val];
        }
        for (const v of val) {
          const formValue = this.formDataValue(v);
          if (formValue !== null) {
            pairs.push([key, formValue]);
          }
        }
      }
      this._bodyContent = pairs.map(p => `${encodeURIComponent(p[0])}=${encodeURIComponent(p[1])}`).join('&');
    } else if (this._bodyContentType === 'multipart/form-data') {
      // Handle multipart form data
      const formData = new FormData();
      if (value !== null && value !== undefined) {
        for (const key of Object.keys(value)) {
          const val = value[key];
          if (val instanceof Array) {
            for (const v of val) {
              const toAppend = this.formDataValue(v);
              if (toAppend !== null) {
                formData.append(key, toAppend);
              }
            }
          } else {
            const toAppend = this.formDataValue(val);
            if (toAppend !== null) {
              formData.set(key, toAppend);
            }
          }
        }
      }
      this._bodyContent = formData;
    } else {
      // The body is the plain content
      this._bodyContent = value;
    }
  }
  formDataValue(value) {
    if (value === null || value === undefined) {
      return null;
    }
    if (value instanceof Blob) {
      return value;
    }
    if (typeof value === 'object') {
      return new Blob([JSON.stringify(value)], {
        type: 'application/json'
      });
    }
    return String(value);
  }
  /**
   * Builds the request with the current set parameters
   */
  build(options) {
    options = options || {};
    // Path parameters
    let path = this.operationPath;
    for (const pathParam of this._path.values()) {
      path = pathParam.append(path);
    }
    const url = this.rootUrl + path;
    // Query parameters
    let httpParams = new _angular_common_http__WEBPACK_IMPORTED_MODULE_0__.HttpParams({
      encoder: ParameterCodecInstance
    });
    for (const queryParam of this._query.values()) {
      httpParams = queryParam.append(httpParams);
    }
    // Header parameters
    let httpHeaders = new _angular_common_http__WEBPACK_IMPORTED_MODULE_0__.HttpHeaders();
    if (options.accept) {
      httpHeaders = httpHeaders.append('Accept', options.accept);
    }
    for (const headerParam of this._header.values()) {
      httpHeaders = headerParam.append(httpHeaders);
    }
    // Request content headers
    if (this._bodyContentType && !(this._bodyContent instanceof FormData)) {
      httpHeaders = httpHeaders.set('Content-Type', this._bodyContentType);
    }
    // Perform the request
    return new _angular_common_http__WEBPACK_IMPORTED_MODULE_0__.HttpRequest(this.method.toUpperCase(), url, this._bodyContent, {
      params: httpParams,
      headers: httpHeaders,
      responseType: options.responseType,
      reportProgress: options.reportProgress,
      context: options.context
    });
  }
}

/***/ }),

/***/ 57895:
/*!*****************************************************!*\
  !*** ./src/app/api/Geo/services/cluster.service.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ClusterService: () => (/* binding */ ClusterService)
/* harmony export */ });
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/operators */ 70271);
/* harmony import */ var _base_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../base-service */ 97368);
/* harmony import */ var _fn_cluster_cluster_by_bounding_box_post__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../fn/cluster/cluster-by-bounding-box-post */ 18573);
/* harmony import */ var _fn_cluster_cluster_by_bounding_box_post_plain__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../fn/cluster/cluster-by-bounding-box-post-plain */ 51964);
/* harmony import */ var _fn_cluster_cluster_reset_post__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../fn/cluster/cluster-reset-post */ 65520);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _geo_api_configuration__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../geo-api-configuration */ 98200);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common/http */ 46443);








class ClusterService extends _base_service__WEBPACK_IMPORTED_MODULE_0__.BaseService {
  constructor(config, http) {
    super(config, http);
  }
  /** Path part for operation `clusterByBoundingBoxPost()` */
  static ClusterByBoundingBoxPostPath = '/Cluster/by-bounding-box';
  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `clusterByBoundingBoxPost$Plain()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  clusterByBoundingBoxPost$Plain$Response(params, context) {
    return (0,_fn_cluster_cluster_by_bounding_box_post_plain__WEBPACK_IMPORTED_MODULE_2__.clusterByBoundingBoxPost$Plain)(this.http, this.rootUrl, params, context);
  }
  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `clusterByBoundingBoxPost$Plain$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  clusterByBoundingBoxPost$Plain(params, context) {
    return this.clusterByBoundingBoxPost$Plain$Response(params, context).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.map)(r => r.body));
  }
  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `clusterByBoundingBoxPost()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  clusterByBoundingBoxPost$Response(params, context) {
    return (0,_fn_cluster_cluster_by_bounding_box_post__WEBPACK_IMPORTED_MODULE_1__.clusterByBoundingBoxPost)(this.http, this.rootUrl, params, context);
  }
  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `clusterByBoundingBoxPost$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  clusterByBoundingBoxPost(params, context) {
    return this.clusterByBoundingBoxPost$Response(params, context).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.map)(r => r.body));
  }
  /** Path part for operation `clusterResetPost()` */
  static ClusterResetPostPath = '/Cluster/reset';
  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `clusterResetPost()` instead.
   *
   * This method doesn't expect any request body.
   */
  clusterResetPost$Response(params, context) {
    return (0,_fn_cluster_cluster_reset_post__WEBPACK_IMPORTED_MODULE_3__.clusterResetPost)(this.http, this.rootUrl, params, context);
  }
  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `clusterResetPost$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  clusterResetPost(params, context) {
    return this.clusterResetPost$Response(params, context).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.map)(r => r.body));
  }
  static ɵfac = function ClusterService_Factory(t) {
    return new (t || ClusterService)(_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵinject"](_geo_api_configuration__WEBPACK_IMPORTED_MODULE_4__.GeoApiConfiguration), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_7__.HttpClient));
  };
  static ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineInjectable"]({
    token: ClusterService,
    factory: ClusterService.ɵfac,
    providedIn: 'root'
  });
}

/***/ }),

/***/ 76437:
/*!***************************************************!*\
  !*** ./src/app/api/Geo/services/field.service.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FieldService: () => (/* binding */ FieldService)
/* harmony export */ });
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs/operators */ 70271);
/* harmony import */ var _base_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../base-service */ 97368);
/* harmony import */ var _fn_field_field_by_bounding_box_post__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../fn/field/field-by-bounding-box-post */ 36393);
/* harmony import */ var _fn_field_field_by_bounding_box_post_plain__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../fn/field/field-by-bounding-box-post-plain */ 72272);
/* harmony import */ var _fn_field_field_post__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../fn/field/field-post */ 19082);
/* harmony import */ var _fn_field_field_post_plain__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../fn/field/field-post-plain */ 52839);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _geo_api_configuration__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../geo-api-configuration */ 98200);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/common/http */ 46443);









class FieldService extends _base_service__WEBPACK_IMPORTED_MODULE_0__.BaseService {
  constructor(config, http) {
    super(config, http);
  }
  /** Path part for operation `fieldPost()` */
  static FieldPostPath = '/Field';
  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `fieldPost$Plain()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  fieldPost$Plain$Response(params, context) {
    return (0,_fn_field_field_post_plain__WEBPACK_IMPORTED_MODULE_4__.fieldPost$Plain)(this.http, this.rootUrl, params, context);
  }
  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `fieldPost$Plain$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  fieldPost$Plain(params, context) {
    return this.fieldPost$Plain$Response(params, context).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.map)(r => r.body));
  }
  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `fieldPost()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  fieldPost$Response(params, context) {
    return (0,_fn_field_field_post__WEBPACK_IMPORTED_MODULE_3__.fieldPost)(this.http, this.rootUrl, params, context);
  }
  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `fieldPost$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  fieldPost(params, context) {
    return this.fieldPost$Response(params, context).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.map)(r => r.body));
  }
  /** Path part for operation `fieldByBoundingBoxPost()` */
  static FieldByBoundingBoxPostPath = '/Field/by-bounding-box';
  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `fieldByBoundingBoxPost$Plain()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  fieldByBoundingBoxPost$Plain$Response(params, context) {
    return (0,_fn_field_field_by_bounding_box_post_plain__WEBPACK_IMPORTED_MODULE_2__.fieldByBoundingBoxPost$Plain)(this.http, this.rootUrl, params, context);
  }
  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `fieldByBoundingBoxPost$Plain$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  fieldByBoundingBoxPost$Plain(params, context) {
    return this.fieldByBoundingBoxPost$Plain$Response(params, context).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.map)(r => r.body));
  }
  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `fieldByBoundingBoxPost()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  fieldByBoundingBoxPost$Response(params, context) {
    return (0,_fn_field_field_by_bounding_box_post__WEBPACK_IMPORTED_MODULE_1__.fieldByBoundingBoxPost)(this.http, this.rootUrl, params, context);
  }
  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `fieldByBoundingBoxPost$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  fieldByBoundingBoxPost(params, context) {
    return this.fieldByBoundingBoxPost$Response(params, context).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.map)(r => r.body));
  }
  static ɵfac = function FieldService_Factory(t) {
    return new (t || FieldService)(_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_geo_api_configuration__WEBPACK_IMPORTED_MODULE_5__.GeoApiConfiguration), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_8__.HttpClient));
  };
  static ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineInjectable"]({
    token: FieldService,
    factory: FieldService.ɵfac,
    providedIn: 'root'
  });
}

/***/ }),

/***/ 2159:
/*!****************************************************!*\
  !*** ./src/app/api/Geo/services/region.service.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   RegionService: () => (/* binding */ RegionService)
/* harmony export */ });
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs/operators */ 70271);
/* harmony import */ var _base_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../base-service */ 97368);
/* harmony import */ var _fn_region_region_define_post__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../fn/region/region-define-post */ 34400);
/* harmony import */ var _fn_region_region_define_post_plain__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../fn/region/region-define-post-plain */ 97833);
/* harmony import */ var _fn_region_region_get__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../fn/region/region-get */ 24156);
/* harmony import */ var _fn_region_region_get_plain__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../fn/region/region-get-plain */ 33949);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _geo_api_configuration__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../geo-api-configuration */ 98200);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/common/http */ 46443);









class RegionService extends _base_service__WEBPACK_IMPORTED_MODULE_0__.BaseService {
  constructor(config, http) {
    super(config, http);
  }
  /** Path part for operation `regionGet()` */
  static RegionGetPath = '/Region';
  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `regionGet$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  regionGet$Plain$Response(params, context) {
    return (0,_fn_region_region_get_plain__WEBPACK_IMPORTED_MODULE_4__.regionGet$Plain)(this.http, this.rootUrl, params, context);
  }
  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `regionGet$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  regionGet$Plain(params, context) {
    return this.regionGet$Plain$Response(params, context).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.map)(r => r.body));
  }
  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `regionGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  regionGet$Response(params, context) {
    return (0,_fn_region_region_get__WEBPACK_IMPORTED_MODULE_3__.regionGet)(this.http, this.rootUrl, params, context);
  }
  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `regionGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  regionGet(params, context) {
    return this.regionGet$Response(params, context).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.map)(r => r.body));
  }
  /** Path part for operation `regionDefinePost()` */
  static RegionDefinePostPath = '/Region/define';
  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `regionDefinePost$Plain()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  regionDefinePost$Plain$Response(params, context) {
    return (0,_fn_region_region_define_post_plain__WEBPACK_IMPORTED_MODULE_2__.regionDefinePost$Plain)(this.http, this.rootUrl, params, context);
  }
  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `regionDefinePost$Plain$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  regionDefinePost$Plain(params, context) {
    return this.regionDefinePost$Plain$Response(params, context).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.map)(r => r.body));
  }
  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `regionDefinePost()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  regionDefinePost$Response(params, context) {
    return (0,_fn_region_region_define_post__WEBPACK_IMPORTED_MODULE_1__.regionDefinePost)(this.http, this.rootUrl, params, context);
  }
  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `regionDefinePost$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  regionDefinePost(params, context) {
    return this.regionDefinePost$Response(params, context).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.map)(r => r.body));
  }
  static ɵfac = function RegionService_Factory(t) {
    return new (t || RegionService)(_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_geo_api_configuration__WEBPACK_IMPORTED_MODULE_5__.GeoApiConfiguration), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_8__.HttpClient));
  };
  static ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineInjectable"]({
    token: RegionService,
    factory: RegionService.ɵfac,
    providedIn: 'root'
  });
}

/***/ }),

/***/ 85448:
/*!********************************************!*\
  !*** ./src/app/api/fields/base-service.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BaseService: () => (/* binding */ BaseService)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _fields_api_configuration__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./fields-api-configuration */ 15876);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ 46443);



/**
 * Base class for services
 */
class BaseService {
  config;
  http;
  constructor(config, http) {
    this.config = config;
    this.http = http;
  }
  _rootUrl;
  /**
   * Returns the root url for all operations in this service. If not set directly in this
   * service, will fallback to `FieldsApiConfiguration.rootUrl`.
   */
  get rootUrl() {
    return this._rootUrl || this.config.rootUrl;
  }
  /**
   * Sets the root URL for API operations in this service.
   */
  set rootUrl(rootUrl) {
    this._rootUrl = rootUrl;
  }
  static ɵfac = function BaseService_Factory(t) {
    return new (t || BaseService)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_fields_api_configuration__WEBPACK_IMPORTED_MODULE_0__.FieldsApiConfiguration), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpClient));
  };
  static ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({
    token: BaseService,
    factory: BaseService.ɵfac
  });
}

/***/ }),

/***/ 15876:
/*!********************************************************!*\
  !*** ./src/app/api/fields/fields-api-configuration.ts ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FieldsApiConfiguration: () => (/* binding */ FieldsApiConfiguration)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 37580);

/**
 * Global configuration
 */
class FieldsApiConfiguration {
  rootUrl = '';
  static ɵfac = function FieldsApiConfiguration_Factory(t) {
    return new (t || FieldsApiConfiguration)();
  };
  static ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({
    token: FieldsApiConfiguration,
    factory: FieldsApiConfiguration.ɵfac,
    providedIn: 'root'
  });
}

/***/ }),

/***/ 25793:
/*!*************************************************!*\
  !*** ./src/app/api/fields/fields-api.module.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FieldsApiModule: () => (/* binding */ FieldsApiModule)
/* harmony export */ });
/* harmony import */ var _fields_api_configuration__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./fields-api-configuration */ 15876);
/* harmony import */ var _services_field_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./services/field.service */ 44421);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ 46443);




/**
 * Module that provides all services and configuration.
 */
class FieldsApiModule {
  static forRoot(params) {
    return {
      ngModule: FieldsApiModule,
      providers: [{
        provide: _fields_api_configuration__WEBPACK_IMPORTED_MODULE_0__.FieldsApiConfiguration,
        useValue: params
      }]
    };
  }
  constructor(parentModule, http) {
    if (parentModule) {
      throw new Error('FieldsApiModule is already loaded. Import in your base AppModule only.');
    }
    if (!http) {
      throw new Error('You need to import the HttpClientModule in your AppModule! \n' + 'See also https://github.com/angular/angular/issues/20575');
    }
  }
  static ɵfac = function FieldsApiModule_Factory(t) {
    return new (t || FieldsApiModule)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](FieldsApiModule, 12), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_3__.HttpClient, 8));
  };
  static ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({
    type: FieldsApiModule
  });
  static ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({
    providers: [_services_field_service__WEBPACK_IMPORTED_MODULE_1__.FieldService, _fields_api_configuration__WEBPACK_IMPORTED_MODULE_0__.FieldsApiConfiguration]
  });
}

/***/ }),

/***/ 62317:
/*!***********************************************************!*\
  !*** ./src/app/api/fields/fn/field/field-id-get-plain.ts ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   fieldIdGet$Plain: () => (/* binding */ fieldIdGet$Plain)
/* harmony export */ });
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ 46443);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ 51567);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ 70271);
/* harmony import */ var _request_builder__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../request-builder */ 80956);
/* tslint:disable */
/* eslint-disable */



function fieldIdGet$Plain(http, rootUrl, params, context) {
  const rb = new _request_builder__WEBPACK_IMPORTED_MODULE_0__.RequestBuilder(rootUrl, fieldIdGet$Plain.PATH, 'get');
  if (params) {
    rb.path('id', params.id, {});
  }
  return http.request(rb.build({
    responseType: 'text',
    accept: 'text/plain',
    context
  })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.filter)(r => r instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.map)(r => {
    return r;
  }));
}
fieldIdGet$Plain.PATH = '/Field/{id}';

/***/ }),

/***/ 77292:
/*!*****************************************************!*\
  !*** ./src/app/api/fields/fn/field/field-id-get.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   fieldIdGet: () => (/* binding */ fieldIdGet)
/* harmony export */ });
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ 46443);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ 51567);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ 70271);
/* harmony import */ var _request_builder__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../request-builder */ 80956);
/* tslint:disable */
/* eslint-disable */



function fieldIdGet(http, rootUrl, params, context) {
  const rb = new _request_builder__WEBPACK_IMPORTED_MODULE_0__.RequestBuilder(rootUrl, fieldIdGet.PATH, 'get');
  if (params) {
    rb.path('id', params.id, {});
  }
  return http.request(rb.build({
    responseType: 'json',
    accept: 'text/json',
    context
  })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.filter)(r => r instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.map)(r => {
    return r;
  }));
}
fieldIdGet.PATH = '/Field/{id}';

/***/ }),

/***/ 24247:
/*!*********************************************************!*\
  !*** ./src/app/api/fields/fn/field/field-post-plain.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   fieldPost$Plain: () => (/* binding */ fieldPost$Plain)
/* harmony export */ });
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ 46443);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ 51567);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ 70271);
/* harmony import */ var _request_builder__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../request-builder */ 80956);
/* tslint:disable */
/* eslint-disable */



function fieldPost$Plain(http, rootUrl, params, context) {
  const rb = new _request_builder__WEBPACK_IMPORTED_MODULE_0__.RequestBuilder(rootUrl, fieldPost$Plain.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/*+json');
  }
  return http.request(rb.build({
    responseType: 'text',
    accept: 'text/plain',
    context
  })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.filter)(r => r instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.map)(r => {
    return r;
  }));
}
fieldPost$Plain.PATH = '/Field';

/***/ }),

/***/ 95866:
/*!***************************************************!*\
  !*** ./src/app/api/fields/fn/field/field-post.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   fieldPost: () => (/* binding */ fieldPost)
/* harmony export */ });
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ 46443);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ 51567);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ 70271);
/* harmony import */ var _request_builder__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../request-builder */ 80956);
/* tslint:disable */
/* eslint-disable */



function fieldPost(http, rootUrl, params, context) {
  const rb = new _request_builder__WEBPACK_IMPORTED_MODULE_0__.RequestBuilder(rootUrl, fieldPost.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/*+json');
  }
  return http.request(rb.build({
    responseType: 'json',
    accept: 'text/json',
    context
  })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.filter)(r => r instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.map)(r => {
    return r;
  }));
}
fieldPost.PATH = '/Field';

/***/ }),

/***/ 58875:
/*!*************************************!*\
  !*** ./src/app/api/fields/index.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BaseService: () => (/* reexport safe */ _base_service__WEBPACK_IMPORTED_MODULE_1__.BaseService),
/* harmony export */   FieldService: () => (/* reexport safe */ _services_field_service__WEBPACK_IMPORTED_MODULE_4__.FieldService),
/* harmony export */   FieldsApiConfiguration: () => (/* reexport safe */ _fields_api_configuration__WEBPACK_IMPORTED_MODULE_0__.FieldsApiConfiguration),
/* harmony export */   FieldsApiModule: () => (/* reexport safe */ _fields_api_module__WEBPACK_IMPORTED_MODULE_3__.FieldsApiModule),
/* harmony export */   RequestBuilder: () => (/* reexport safe */ _request_builder__WEBPACK_IMPORTED_MODULE_2__.RequestBuilder)
/* harmony export */ });
/* harmony import */ var _fields_api_configuration__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./fields-api-configuration */ 15876);
/* harmony import */ var _base_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./base-service */ 85448);
/* harmony import */ var _request_builder__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./request-builder */ 80956);
/* harmony import */ var _fields_api_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./fields-api.module */ 25793);
/* harmony import */ var _services_field_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./services/field.service */ 44421);






/***/ }),

/***/ 80956:
/*!***********************************************!*\
  !*** ./src/app/api/fields/request-builder.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   RequestBuilder: () => (/* binding */ RequestBuilder)
/* harmony export */ });
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common/http */ 46443);
/* tslint:disable */
/* eslint-disable */

/**
 * Custom parameter codec to correctly handle the plus sign in parameter
 * values. See https://github.com/angular/angular/issues/18261
 */
class ParameterCodec {
  encodeKey(key) {
    return encodeURIComponent(key);
  }
  encodeValue(value) {
    return encodeURIComponent(value);
  }
  decodeKey(key) {
    return decodeURIComponent(key);
  }
  decodeValue(value) {
    return decodeURIComponent(value);
  }
}
const ParameterCodecInstance = new ParameterCodec();
/**
 * Base class for a parameter
 */
class Parameter {
  name;
  value;
  options;
  constructor(name, value, options, defaultStyle, defaultExplode) {
    this.name = name;
    this.value = value;
    this.options = options;
    this.options = options || {};
    if (this.options.style === null || this.options.style === undefined) {
      this.options.style = defaultStyle;
    }
    if (this.options.explode === null || this.options.explode === undefined) {
      this.options.explode = defaultExplode;
    }
  }
  serializeValue(value, separator = ',') {
    if (value === null || value === undefined) {
      return '';
    } else if (value instanceof Array) {
      return value.map(v => this.serializeValue(v).split(separator).join(encodeURIComponent(separator))).join(separator);
    } else if (typeof value === 'object') {
      const array = [];
      for (const key of Object.keys(value)) {
        let propVal = value[key];
        if (propVal !== null && propVal !== undefined) {
          propVal = this.serializeValue(propVal).split(separator).join(encodeURIComponent(separator));
          if (this.options.explode) {
            array.push(`${key}=${propVal}`);
          } else {
            array.push(key);
            array.push(propVal);
          }
        }
      }
      return array.join(separator);
    } else {
      return String(value);
    }
  }
}
/**
 * A parameter in the operation path
 */
class PathParameter extends Parameter {
  constructor(name, value, options) {
    super(name, value, options, 'simple', false);
  }
  append(path) {
    let value = this.value;
    if (value === null || value === undefined) {
      value = '';
    }
    let prefix = this.options.style === 'label' ? '.' : '';
    let separator = this.options.explode ? prefix === '' ? ',' : prefix : ',';
    let alreadySerialized = false;
    if (this.options.style === 'matrix') {
      // The parameter name is just used as prefix, except in some cases...
      prefix = `;${this.name}=`;
      if (this.options.explode && typeof value === 'object') {
        prefix = ';';
        if (value instanceof Array) {
          // For arrays we have to repeat the name for each element
          value = value.map(v => `${this.name}=${this.serializeValue(v, ';')}`);
          value = value.join(';');
          alreadySerialized = true;
        } else {
          // For objects we have to put each the key / value pairs
          value = this.serializeValue(value, ';');
          alreadySerialized = true;
        }
      }
    }
    value = prefix + (alreadySerialized ? value : this.serializeValue(value, separator));
    // Replace both the plain variable and the corresponding variant taking in the prefix and explode into account
    path = path.replace(`{${this.name}}`, value);
    path = path.replace(`{${prefix}${this.name}${this.options.explode ? '*' : ''}}`, value);
    return path;
  }
  // @ts-ignore
  serializeValue(value, separator = ',') {
    var result = typeof value === 'string' ? encodeURIComponent(value) : super.serializeValue(value, separator);
    result = result.replace(/%3D/g, '=');
    result = result.replace(/%3B/g, ';');
    result = result.replace(/%2C/g, ',');
    return result;
  }
}
/**
 * A parameter in the query
 */
class QueryParameter extends Parameter {
  constructor(name, value, options) {
    super(name, value, options, 'form', true);
  }
  append(params) {
    if (this.value instanceof Array) {
      // Array serialization
      if (this.options.explode) {
        for (const v of this.value) {
          params = params.append(this.name, this.serializeValue(v));
        }
      } else {
        const separator = this.options.style === 'spaceDelimited' ? ' ' : this.options.style === 'pipeDelimited' ? '|' : ',';
        return params.append(this.name, this.serializeValue(this.value, separator));
      }
    } else if (this.value !== null && typeof this.value === 'object') {
      // Object serialization
      if (this.options.style === 'deepObject') {
        // Append a parameter for each key, in the form `name[key]`
        for (const key of Object.keys(this.value)) {
          const propVal = this.value[key];
          if (propVal !== null && propVal !== undefined) {
            params = params.append(`${this.name}[${key}]`, this.serializeValue(propVal));
          }
        }
      } else if (this.options.explode) {
        // Append a parameter for each key without using the parameter name
        for (const key of Object.keys(this.value)) {
          const propVal = this.value[key];
          if (propVal !== null && propVal !== undefined) {
            params = params.append(key, this.serializeValue(propVal));
          }
        }
      } else {
        // Append a single parameter whose values are a comma-separated list of key,value,key,value...
        const array = [];
        for (const key of Object.keys(this.value)) {
          const propVal = this.value[key];
          if (propVal !== null && propVal !== undefined) {
            array.push(key);
            array.push(propVal);
          }
        }
        params = params.append(this.name, this.serializeValue(array));
      }
    } else if (this.value !== null && this.value !== undefined) {
      // Plain value
      params = params.append(this.name, this.serializeValue(this.value));
    }
    return params;
  }
}
/**
 * A parameter in the HTTP request header
 */
class HeaderParameter extends Parameter {
  constructor(name, value, options) {
    super(name, value, options, 'simple', false);
  }
  append(headers) {
    if (this.value !== null && this.value !== undefined) {
      if (this.value instanceof Array) {
        for (const v of this.value) {
          headers = headers.append(this.name, this.serializeValue(v));
        }
      } else {
        headers = headers.append(this.name, this.serializeValue(this.value));
      }
    }
    return headers;
  }
}
/**
 * Helper to build http requests from parameters
 */
class RequestBuilder {
  rootUrl;
  operationPath;
  method;
  _path = new Map();
  _query = new Map();
  _header = new Map();
  _bodyContent;
  _bodyContentType;
  constructor(rootUrl, operationPath, method) {
    this.rootUrl = rootUrl;
    this.operationPath = operationPath;
    this.method = method;
  }
  /**
   * Sets a path parameter
   */
  path(name, value, options) {
    this._path.set(name, new PathParameter(name, value, options || {}));
  }
  /**
   * Sets a query parameter
   */
  query(name, value, options) {
    this._query.set(name, new QueryParameter(name, value, options || {}));
  }
  /**
   * Sets a header parameter
   */
  header(name, value, options) {
    this._header.set(name, new HeaderParameter(name, value, options || {}));
  }
  /**
   * Sets the body content, along with the content type
   */
  body(value, contentType = 'application/json') {
    if (value instanceof Blob) {
      this._bodyContentType = value.type;
    } else {
      this._bodyContentType = contentType;
    }
    if (this._bodyContentType === 'application/x-www-form-urlencoded' && value !== null && typeof value === 'object') {
      // Handle URL-encoded data
      const pairs = [];
      for (const key of Object.keys(value)) {
        let val = value[key];
        if (!(val instanceof Array)) {
          val = [val];
        }
        for (const v of val) {
          const formValue = this.formDataValue(v);
          if (formValue !== null) {
            pairs.push([key, formValue]);
          }
        }
      }
      this._bodyContent = pairs.map(p => `${encodeURIComponent(p[0])}=${encodeURIComponent(p[1])}`).join('&');
    } else if (this._bodyContentType === 'multipart/form-data') {
      // Handle multipart form data
      const formData = new FormData();
      if (value !== null && value !== undefined) {
        for (const key of Object.keys(value)) {
          const val = value[key];
          if (val instanceof Array) {
            for (const v of val) {
              const toAppend = this.formDataValue(v);
              if (toAppend !== null) {
                formData.append(key, toAppend);
              }
            }
          } else {
            const toAppend = this.formDataValue(val);
            if (toAppend !== null) {
              formData.set(key, toAppend);
            }
          }
        }
      }
      this._bodyContent = formData;
    } else {
      // The body is the plain content
      this._bodyContent = value;
    }
  }
  formDataValue(value) {
    if (value === null || value === undefined) {
      return null;
    }
    if (value instanceof Blob) {
      return value;
    }
    if (typeof value === 'object') {
      return new Blob([JSON.stringify(value)], {
        type: 'application/json'
      });
    }
    return String(value);
  }
  /**
   * Builds the request with the current set parameters
   */
  build(options) {
    options = options || {};
    // Path parameters
    let path = this.operationPath;
    for (const pathParam of this._path.values()) {
      path = pathParam.append(path);
    }
    const url = this.rootUrl + path;
    // Query parameters
    let httpParams = new _angular_common_http__WEBPACK_IMPORTED_MODULE_0__.HttpParams({
      encoder: ParameterCodecInstance
    });
    for (const queryParam of this._query.values()) {
      httpParams = queryParam.append(httpParams);
    }
    // Header parameters
    let httpHeaders = new _angular_common_http__WEBPACK_IMPORTED_MODULE_0__.HttpHeaders();
    if (options.accept) {
      httpHeaders = httpHeaders.append('Accept', options.accept);
    }
    for (const headerParam of this._header.values()) {
      httpHeaders = headerParam.append(httpHeaders);
    }
    // Request content headers
    if (this._bodyContentType && !(this._bodyContent instanceof FormData)) {
      httpHeaders = httpHeaders.set('Content-Type', this._bodyContentType);
    }
    // Perform the request
    return new _angular_common_http__WEBPACK_IMPORTED_MODULE_0__.HttpRequest(this.method.toUpperCase(), url, this._bodyContent, {
      params: httpParams,
      headers: httpHeaders,
      responseType: options.responseType,
      reportProgress: options.reportProgress,
      context: options.context
    });
  }
}

/***/ }),

/***/ 44421:
/*!******************************************************!*\
  !*** ./src/app/api/fields/services/field.service.ts ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FieldService: () => (/* binding */ FieldService)
/* harmony export */ });
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs/operators */ 70271);
/* harmony import */ var _base_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../base-service */ 85448);
/* harmony import */ var _fn_field_field_id_get__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../fn/field/field-id-get */ 77292);
/* harmony import */ var _fn_field_field_id_get_plain__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../fn/field/field-id-get-plain */ 62317);
/* harmony import */ var _fn_field_field_post__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../fn/field/field-post */ 95866);
/* harmony import */ var _fn_field_field_post_plain__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../fn/field/field-post-plain */ 24247);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _fields_api_configuration__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../fields-api-configuration */ 15876);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/common/http */ 46443);









class FieldService extends _base_service__WEBPACK_IMPORTED_MODULE_0__.BaseService {
  constructor(config, http) {
    super(config, http);
  }
  /** Path part for operation `fieldPost()` */
  static FieldPostPath = '/Field';
  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `fieldPost$Plain()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  fieldPost$Plain$Response(params, context) {
    return (0,_fn_field_field_post_plain__WEBPACK_IMPORTED_MODULE_4__.fieldPost$Plain)(this.http, this.rootUrl, params, context);
  }
  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `fieldPost$Plain$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  fieldPost$Plain(params, context) {
    return this.fieldPost$Plain$Response(params, context).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.map)(r => r.body));
  }
  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `fieldPost()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  fieldPost$Response(params, context) {
    return (0,_fn_field_field_post__WEBPACK_IMPORTED_MODULE_3__.fieldPost)(this.http, this.rootUrl, params, context);
  }
  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `fieldPost$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  fieldPost(params, context) {
    return this.fieldPost$Response(params, context).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.map)(r => r.body));
  }
  /** Path part for operation `fieldIdGet()` */
  static FieldIdGetPath = '/Field/{id}';
  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `fieldIdGet$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  fieldIdGet$Plain$Response(params, context) {
    return (0,_fn_field_field_id_get_plain__WEBPACK_IMPORTED_MODULE_2__.fieldIdGet$Plain)(this.http, this.rootUrl, params, context);
  }
  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `fieldIdGet$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  fieldIdGet$Plain(params, context) {
    return this.fieldIdGet$Plain$Response(params, context).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.map)(r => r.body));
  }
  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `fieldIdGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  fieldIdGet$Response(params, context) {
    return (0,_fn_field_field_id_get__WEBPACK_IMPORTED_MODULE_1__.fieldIdGet)(this.http, this.rootUrl, params, context);
  }
  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `fieldIdGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  fieldIdGet(params, context) {
    return this.fieldIdGet$Response(params, context).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.map)(r => r.body));
  }
  static ɵfac = function FieldService_Factory(t) {
    return new (t || FieldService)(_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_fields_api_configuration__WEBPACK_IMPORTED_MODULE_5__.FieldsApiConfiguration), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_8__.HttpClient));
  };
  static ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineInjectable"]({
    token: FieldService,
    factory: FieldService.ɵfac,
    providedIn: 'root'
  });
}

/***/ }),

/***/ 20092:
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AppComponent: () => (/* binding */ AppComponent)
/* harmony export */ });
/* harmony import */ var _artstesh_modals__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @artstesh/modals */ 30239);
/* harmony import */ var _root_src_app_services_app_message_registrator_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @root/src/app/services/app-message-registrator.service */ 27670);
/* harmony import */ var _root_src_app_services_title_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @root/src/app/services/title.service */ 24416);
/* harmony import */ var _shared_components_destructible_destructible_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @shared/components/destructible/destructible.component */ 47231);
/* harmony import */ var _root_src_app_api_internal_regions_regions_internal_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @root/src/app/api-internal/regions/regions-internal.service */ 40747);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ 95072);









/**
 * The AppComponent is the root components of the application.
 *
 * This components is responsible for initializing application-wide services
 * and handles authentication status on initialization.
 *
 * The components extends DestructibleComponent to manage resources during
 * the lifecycle of the components, ensuring a proper cleanup.
 */
class AppComponent extends _shared_components_destructible_destructible_component__WEBPACK_IMPORTED_MODULE_3__.DestructibleComponent {
  appMessageRegistrator;
  constructor(appMessageRegistrator) {
    super();
    this.appMessageRegistrator = appMessageRegistrator;
    appMessageRegistrator.up();
  }
  onDestroy = () => {
    this.appMessageRegistrator.down();
  };
  static ɵfac = function AppComponent_Factory(t) {
    return new (t || AppComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_root_src_app_services_app_message_registrator_service__WEBPACK_IMPORTED_MODULE_1__.AppMessageRegistrator));
  };
  static ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineComponent"]({
    type: AppComponent,
    selectors: [["app-root"]],
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵProvidersFeature"]([_root_src_app_services_app_message_registrator_service__WEBPACK_IMPORTED_MODULE_1__.AppMessageRegistrator, _artstesh_modals__WEBPACK_IMPORTED_MODULE_0__.ModalPostboyService, _root_src_app_services_title_service__WEBPACK_IMPORTED_MODULE_2__.TitleService, _root_src_app_api_internal_regions_regions_internal_service__WEBPACK_IMPORTED_MODULE_4__.RegionsInternalService]), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵInheritDefinitionFeature"]],
    decls: 2,
    vars: 0,
    template: function AppComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](0, "router-outlet")(1, "art-modal-root");
      }
    },
    dependencies: [_angular_router__WEBPACK_IMPORTED_MODULE_6__.RouterOutlet, _artstesh_modals__WEBPACK_IMPORTED_MODULE_0__.ModalRootComponent],
    encapsulation: 2
  });
}

/***/ }),

/***/ 50635:
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AppModule: () => (/* binding */ AppModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/common */ 60316);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/common/http */ 46443);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/platform-browser */ 80436);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/router */ 95072);
/* harmony import */ var _artstesh_modals__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @artstesh/modals */ 30239);
/* harmony import */ var _root_src_app_routes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @root/src/app/routes */ 73150);
/* harmony import */ var _root_src_environments_environment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @root/src/environments/environment */ 45312);
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app.component */ 20092);
/* harmony import */ var _api_fields__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./api/fields */ 58875);
/* harmony import */ var _api_Geo__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @api/Geo */ 22155);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _api_fields_fields_api_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./api/fields/fields-api.module */ 25793);
/* harmony import */ var _api_Geo_geo_api_module__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./api/Geo/geo-api.module */ 41293);














/**
 * This is the root module of the application.
 *
 * The `AppModule` class is decorated with the `@NgModule` decorator that defines metadata for the module, including:
 *
 */
class AppModule {
  static ɵfac = function AppModule_Factory(t) {
    return new (t || AppModule)();
  };
  static ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdefineNgModule"]({
    type: AppModule,
    bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_3__.AppComponent]
  });
  static ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdefineInjector"]({
    providers: [{
      provide: _angular_common__WEBPACK_IMPORTED_MODULE_9__.LocationStrategy,
      useClass: _angular_common__WEBPACK_IMPORTED_MODULE_9__.PathLocationStrategy
    }],
    imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_10__.BrowserModule, _angular_common_http__WEBPACK_IMPORTED_MODULE_11__.HttpClientModule, _angular_router__WEBPACK_IMPORTED_MODULE_12__.RouterModule.forRoot(_root_src_app_routes__WEBPACK_IMPORTED_MODULE_1__.APP_ROUTES), _api_fields__WEBPACK_IMPORTED_MODULE_4__.FieldsApiModule.forRoot({
      rootUrl: _root_src_environments_environment__WEBPACK_IMPORTED_MODULE_2__.environment.fields
    }), _api_Geo__WEBPACK_IMPORTED_MODULE_5__.GeoApiModule.forRoot({
      rootUrl: _root_src_environments_environment__WEBPACK_IMPORTED_MODULE_2__.environment.geo
    }), _artstesh_modals__WEBPACK_IMPORTED_MODULE_0__.ArtModalModule]
  });
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵsetNgModuleScope"](AppModule, {
    declarations: [_app_component__WEBPACK_IMPORTED_MODULE_3__.AppComponent],
    imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_10__.BrowserModule, _angular_common_http__WEBPACK_IMPORTED_MODULE_11__.HttpClientModule, _angular_router__WEBPACK_IMPORTED_MODULE_12__.RouterModule, _api_fields_fields_api_module__WEBPACK_IMPORTED_MODULE_6__.FieldsApiModule, _api_Geo_geo_api_module__WEBPACK_IMPORTED_MODULE_7__.GeoApiModule, _artstesh_modals__WEBPACK_IMPORTED_MODULE_0__.ArtModalModule]
  });
})();

/***/ }),

/***/ 73150:
/*!***************************!*\
  !*** ./src/app/routes.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   APP_ROUTES: () => (/* binding */ APP_ROUTES)
/* harmony export */ });
/* harmony import */ var _root_src_app_sections_gis_page_gis_page_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @root/src/app/sections/gis-page/gis-page.component */ 78741);

/**
 * APP_ROUTES is a constant array of route configurations for an Angular application.
 * It defines the routing paths, associated components, and route guards, if any,
 * that should be used when navigating to different parts of the application.
 *
 * This constant is intended to be used with Angular's RouterModule to set up
 * application routing by supplying it to the RouterModule.forRoot or RouterModule.forChild method.
 */
const APP_ROUTES = [{
  component: _root_src_app_sections_gis_page_gis_page_component__WEBPACK_IMPORTED_MODULE_0__.GisPageComponent,
  path: ''
}];

/***/ }),

/***/ 41264:
/*!***************************************************************************************************!*\
  !*** ./src/app/sections/gis-page/component/gis/components/gis-clusters/gis-clusters.component.ts ***!
  \***************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GisClustersComponent: () => (/* binding */ GisClustersComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _artstesh_maps__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @artstesh/maps */ 86672);
/* harmony import */ var _root_src_app_sections_gis_page_component_gis_messages_events_gis_clusters_event__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @root/src/app/sections/gis-page/component/gis/messages/events/gis-clusters.event */ 84597);
/* harmony import */ var _shared_components_destructible_destructible_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @shared/components/destructible/destructible.component */ 47231);
/* harmony import */ var _root_src_app_services_app_postboy_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @root/src/app/services/app-postboy.service */ 44804);







class GisClustersComponent extends _shared_components_destructible_destructible_component__WEBPACK_IMPORTED_MODULE_2__.DestructibleComponent {
  postboy;
  clusterLayerSettings = new _artstesh_maps__WEBPACK_IMPORTED_MODULE_0__.ClusterLayerSettings().setMaxZoom(12).setStyle(fs => {
    let count = 0;
    fs.forEach(f => count += f.count);
    return _artstesh_maps__WEBPACK_IMPORTED_MODULE_0__.MarkerStyleHelper.withText(_artstesh_maps__WEBPACK_IMPORTED_MODULE_0__.MarkerStyleHelper.circle(11, '#173867', '#fff', 1), _artstesh_maps__WEBPACK_IMPORTED_MODULE_0__.TextStyleHelper.get(count + '', '600 8px Arial,serif', '#fff'));
  });
  markers = (0,_angular_core__WEBPACK_IMPORTED_MODULE_4__.signal)([]);
  constructor(postboy) {
    super();
    this.postboy = postboy;
  }
  ngOnInit() {
    this.postboy.sub(_root_src_app_sections_gis_page_component_gis_messages_events_gis_clusters_event__WEBPACK_IMPORTED_MODULE_1__.GisClustersEvent).subscribe(ev => this.markers.set(ev.items.map((p, i) => new _artstesh_maps__WEBPACK_IMPORTED_MODULE_0__.MarkerModel(p.lat, p.lon, i, {
      count: p.count
    }))));
  }
  static ɵfac = function GisClustersComponent_Factory(t) {
    return new (t || GisClustersComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_root_src_app_services_app_postboy_service__WEBPACK_IMPORTED_MODULE_3__.AppPostboyService));
  };
  static ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineComponent"]({
    type: GisClustersComponent,
    selectors: [["app-gis-clusters"]],
    standalone: true,
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵInheritDefinitionFeature"], _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵStandaloneFeature"]],
    decls: 2,
    vars: 3,
    consts: [[3, "settings"], [3, "layerName", "markers"]],
    template: function GisClustersComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "art-cluster-layer", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](1, "art-markers", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("settings", ctx.clusterLayerSettings);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("layerName", ctx.clusterLayerSettings.name)("markers", ctx.markers());
      }
    },
    dependencies: [_artstesh_maps__WEBPACK_IMPORTED_MODULE_0__.MapModule, _artstesh_maps__WEBPACK_IMPORTED_MODULE_0__.MarkersComponent, _artstesh_maps__WEBPACK_IMPORTED_MODULE_0__.ClusterLayerComponent],
    encapsulation: 2,
    changeDetection: 0
  });
}

/***/ }),

/***/ 26744:
/*!*************************************************************************************************************!*\
  !*** ./src/app/sections/gis-page/component/gis/components/gis-field-markers/gis-field-markers.component.ts ***!
  \*************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GisFieldMarkersComponent: () => (/* binding */ GisFieldMarkersComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _artstesh_maps__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @artstesh/maps */ 86672);
/* harmony import */ var _root_src_app_sections_gis_page_component_gis_messages_events_gis_fields_event__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @root/src/app/sections/gis-page/component/gis/messages/events/gis-fields.event */ 22827);
/* harmony import */ var _shared_components_destructible_destructible_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @shared/components/destructible/destructible.component */ 47231);
/* harmony import */ var _root_src_app_services_app_postboy_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @root/src/app/services/app-postboy.service */ 44804);







/**
 *
 */
class GisFieldMarkersComponent extends _shared_components_destructible_destructible_component__WEBPACK_IMPORTED_MODULE_2__.DestructibleComponent {
  postboy;
  clusterLayerSettings = new _artstesh_maps__WEBPACK_IMPORTED_MODULE_0__.ClusterLayerSettings().setMaxZoom(15).setMinZoom(12).setDistance(100).setStyle(f => _artstesh_maps__WEBPACK_IMPORTED_MODULE_0__.MarkerStyleHelper.withText(_artstesh_maps__WEBPACK_IMPORTED_MODULE_0__.MarkerStyleHelper.circle(11, '#963cff', '#fff', 2), _artstesh_maps__WEBPACK_IMPORTED_MODULE_0__.TextStyleHelper.get(f.length === 1 ? '' : f.length + '', '600 8px Arial,serif', '#fff')));
  markers = (0,_angular_core__WEBPACK_IMPORTED_MODULE_4__.signal)([]);
  constructor(postboy) {
    super();
    this.postboy = postboy;
  }
  ngOnInit() {
    this.postboy.sub(_root_src_app_sections_gis_page_component_gis_messages_events_gis_fields_event__WEBPACK_IMPORTED_MODULE_1__.GisFieldsEvent).subscribe(ev => this.markers.set(ev.items.filter(i => !i.wkt).map(p => new _artstesh_maps__WEBPACK_IMPORTED_MODULE_0__.MarkerModel(p.lat, p.lon, p.id))));
  }
  static ɵfac = function GisFieldMarkersComponent_Factory(t) {
    return new (t || GisFieldMarkersComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_root_src_app_services_app_postboy_service__WEBPACK_IMPORTED_MODULE_3__.AppPostboyService));
  };
  static ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineComponent"]({
    type: GisFieldMarkersComponent,
    selectors: [["app-gis-field-markers"]],
    standalone: true,
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵInheritDefinitionFeature"], _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵStandaloneFeature"]],
    decls: 2,
    vars: 3,
    consts: [[3, "settings"], [3, "layerName", "markers"]],
    template: function GisFieldMarkersComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "art-cluster-layer", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](1, "art-markers", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("settings", ctx.clusterLayerSettings);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("layerName", ctx.clusterLayerSettings.name)("markers", ctx.markers());
      }
    },
    dependencies: [_artstesh_maps__WEBPACK_IMPORTED_MODULE_0__.MapModule, _artstesh_maps__WEBPACK_IMPORTED_MODULE_0__.MarkersComponent, _artstesh_maps__WEBPACK_IMPORTED_MODULE_0__.ClusterLayerComponent],
    encapsulation: 2,
    changeDetection: 0
  });
}

/***/ }),

/***/ 71957:
/*!*****************************************************************************************************************************************************************************!*\
  !*** ./src/app/sections/gis-page/component/gis/components/gis-field-passport-modal/components/gis-field-passport-data-wrapper/gis-field-passport-data-wrapper.component.ts ***!
  \*****************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GisFieldPassportDataWrapperComponent: () => (/* binding */ GisFieldPassportDataWrapperComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _ngbracket_ngx_layout__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ngbracket/ngx-layout */ 87801);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ 60316);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ngx-translate/core */ 90852);







function GisFieldPassportDataWrapperComponent_ng_container_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainer"](0);
  }
}
class GisFieldPassportDataWrapperComponent {
  label = _angular_core__WEBPACK_IMPORTED_MODULE_0__.input.required();
  contentRef = _angular_core__WEBPACK_IMPORTED_MODULE_0__.input.required();
  static ɵfac = function GisFieldPassportDataWrapperComponent_Factory(t) {
    return new (t || GisFieldPassportDataWrapperComponent)();
  };
  static ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
    type: GisFieldPassportDataWrapperComponent,
    selectors: [["app-gis-field-passport-data-wrapper"]],
    inputs: {
      label: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵInputFlags"].SignalBased, "label"],
      contentRef: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵInputFlags"].SignalBased, "contentRef"]
    },
    standalone: true,
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵStandaloneFeature"]],
    decls: 6,
    vars: 4,
    consts: [["fxLayout", "column", "fxLayoutGap", "10px", 1, "data-wrapper"], [1, "data-title"], [1, "data-value"], [4, "ngTemplateOutlet"]],
    template: function GisFieldPassportDataWrapperComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0)(1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](3, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](5, GisFieldPassportDataWrapperComponent_ng_container_5_Template, 1, 0, "ng-container", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](3, 2, ctx.label()));
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngTemplateOutlet", ctx.contentRef());
      }
    },
    dependencies: [_ngbracket_ngx_layout__WEBPACK_IMPORTED_MODULE_1__.FlexModule, _ngbracket_ngx_layout__WEBPACK_IMPORTED_MODULE_1__.DefaultLayoutDirective, _ngbracket_ngx_layout__WEBPACK_IMPORTED_MODULE_1__.DefaultLayoutGapDirective, _angular_common__WEBPACK_IMPORTED_MODULE_2__.NgTemplateOutlet, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_3__.TranslateModule, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_3__.TranslatePipe],
    styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"],
    changeDetection: 0
  });
}

/***/ }),

/***/ 78125:
/*!*************************************************************************************************************************************************************************!*\
  !*** ./src/app/sections/gis-page/component/gis/components/gis-field-passport-modal/components/gis-field-passport-field-info/gis-field-passport-field-info.component.ts ***!
  \*************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GisFieldPassportFieldInfoComponent: () => (/* binding */ GisFieldPassportFieldInfoComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _root_src_app_sections_gis_page_component_gis_components_gis_field_passport_modal_components_gis_field_passport_data_wrapper_gis_field_passport_data_wrapper_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @root/src/app/sections/gis-page/component/gis/components/gis-field-passport-modal/components/gis-field-passport-data-wrapper/gis-field-passport-data-wrapper.component */ 71957);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ 60316);
/* harmony import */ var _ngbracket_ngx_layout__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ngbracket/ngx-layout */ 87801);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ngx-translate/core */ 90852);








function GisFieldPassportFieldInfoComponent_ng_template_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](0);
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", ctx_r0.field().id, "\n");
  }
}
function GisFieldPassportFieldInfoComponent_ng_template_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](1, "number");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](2, "translate");
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate2"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind2"](1, 2, ctx_r0.field().areaM2 / 10000, "1.0-2"), " ", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind1"](2, 5, "Ha"), "\n");
  }
}
class GisFieldPassportFieldInfoComponent {
  field = _angular_core__WEBPACK_IMPORTED_MODULE_1__.input.required();
  static ɵfac = function GisFieldPassportFieldInfoComponent_Factory(t) {
    return new (t || GisFieldPassportFieldInfoComponent)();
  };
  static ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
    type: GisFieldPassportFieldInfoComponent,
    selectors: [["app-gis-field-passport-field-info"]],
    inputs: {
      field: [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵInputFlags"].SignalBased, "field"]
    },
    standalone: true,
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵStandaloneFeature"]],
    decls: 7,
    vars: 2,
    consts: [["fieldId", ""], ["area", ""], ["fxLayout", "row", "fxLayoutGap", "20px", 1, "info-wrapper"], ["label", "Field Id", 3, "contentRef"], ["label", "Field area", 3, "contentRef"]],
    template: function GisFieldPassportFieldInfoComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](1, "app-gis-field-passport-data-wrapper", 3)(2, "app-gis-field-passport-data-wrapper", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](3, GisFieldPassportFieldInfoComponent_ng_template_3_Template, 1, 1, "ng-template", null, 0, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplateRefExtractor"])(5, GisFieldPassportFieldInfoComponent_ng_template_5_Template, 3, 7, "ng-template", null, 1, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplateRefExtractor"]);
      }
      if (rf & 2) {
        const fieldId_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵreference"](4);
        const area_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵreference"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("contentRef", fieldId_r2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("contentRef", area_r3);
      }
    },
    dependencies: [_root_src_app_sections_gis_page_component_gis_components_gis_field_passport_modal_components_gis_field_passport_data_wrapper_gis_field_passport_data_wrapper_component__WEBPACK_IMPORTED_MODULE_0__.GisFieldPassportDataWrapperComponent, _angular_common__WEBPACK_IMPORTED_MODULE_2__.DecimalPipe, _ngbracket_ngx_layout__WEBPACK_IMPORTED_MODULE_3__.FlexModule, _ngbracket_ngx_layout__WEBPACK_IMPORTED_MODULE_3__.DefaultLayoutDirective, _ngbracket_ngx_layout__WEBPACK_IMPORTED_MODULE_3__.DefaultLayoutGapDirective, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_4__.TranslateModule, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_4__.TranslatePipe],
    styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"],
    changeDetection: 0
  });
}

/***/ }),

/***/ 36529:
/*!***********************************************************************************************************************************************************************************!*\
  !*** ./src/app/sections/gis-page/component/gis/components/gis-field-passport-modal/components/gis-field-passport-section-wrapper/gis-field-passport-section-wrapper.component.ts ***!
  \***********************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GisFieldPassportSectionWrapperComponent: () => (/* binding */ GisFieldPassportSectionWrapperComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ 60316);
/* harmony import */ var _ngbracket_ngx_layout__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ngbracket/ngx-layout */ 87801);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ngx-translate/core */ 90852);







function GisFieldPassportSectionWrapperComponent_ng_container_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainer"](0);
  }
}
class GisFieldPassportSectionWrapperComponent {
  label = _angular_core__WEBPACK_IMPORTED_MODULE_0__.input.required();
  contentRef = _angular_core__WEBPACK_IMPORTED_MODULE_0__.input.required();
  static ɵfac = function GisFieldPassportSectionWrapperComponent_Factory(t) {
    return new (t || GisFieldPassportSectionWrapperComponent)();
  };
  static ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
    type: GisFieldPassportSectionWrapperComponent,
    selectors: [["app-gis-field-passport-section-wrapper"]],
    inputs: {
      label: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵInputFlags"].SignalBased, "label"],
      contentRef: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵInputFlags"].SignalBased, "contentRef"]
    },
    standalone: true,
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵStandaloneFeature"]],
    decls: 5,
    vars: 4,
    consts: [["fxLayout", "column", "fxLayoutGap", "10px", 1, "section-wrapper"], [1, "section-title"], [4, "ngTemplateOutlet"]],
    template: function GisFieldPassportSectionWrapperComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0)(1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](3, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](4, GisFieldPassportSectionWrapperComponent_ng_container_4_Template, 1, 0, "ng-container", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](3, 2, ctx.label()));
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngTemplateOutlet", ctx.contentRef());
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_1__.NgTemplateOutlet, _ngbracket_ngx_layout__WEBPACK_IMPORTED_MODULE_2__.FlexModule, _ngbracket_ngx_layout__WEBPACK_IMPORTED_MODULE_2__.DefaultLayoutDirective, _ngbracket_ngx_layout__WEBPACK_IMPORTED_MODULE_2__.DefaultLayoutGapDirective, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_3__.TranslateModule, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_3__.TranslatePipe],
    styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"],
    changeDetection: 0
  });
}

/***/ }),

/***/ 30028:
/*!***************************************************************************************************************************!*\
  !*** ./src/app/sections/gis-page/component/gis/components/gis-field-passport-modal/gis-field-passport-modal.component.ts ***!
  \***************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GisFieldPassportModalComponent: () => (/* binding */ GisFieldPassportModalComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _artstesh_modals__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @artstesh/modals */ 30239);
/* harmony import */ var _ngbracket_ngx_layout__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @ngbracket/ngx-layout */ 87801);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @ngx-translate/core */ 90852);
/* harmony import */ var _root_src_app_sections_gis_page_component_gis_components_gis_field_passport_modal_components_gis_field_passport_field_info_gis_field_passport_field_info_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @root/src/app/sections/gis-page/component/gis/components/gis-field-passport-modal/components/gis-field-passport-field-info/gis-field-passport-field-info.component */ 78125);
/* harmony import */ var _root_src_app_sections_gis_page_component_gis_components_gis_field_passport_modal_components_gis_field_passport_section_wrapper_gis_field_passport_section_wrapper_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @root/src/app/sections/gis-page/component/gis/components/gis-field-passport-modal/components/gis-field-passport-section-wrapper/gis-field-passport-section-wrapper.component */ 36529);
/* harmony import */ var _root_src_app_sections_gis_page_component_gis_messages_commands_show_field_passport_command__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @root/src/app/sections/gis-page/component/gis/messages/commands/show-field-passport.command */ 58847);
/* harmony import */ var _shared_components_destructible_destructible_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @shared/components/destructible/destructible.component */ 47231);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! rxjs */ 98764);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! rxjs */ 36647);
/* harmony import */ var _shared_components_loading_zone_loading_zone_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @shared/components/loading-zone/loading-zone.component */ 24713);
/* harmony import */ var _root_src_app_services_app_postboy_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @root/src/app/services/app-postboy.service */ 44804);














function GisFieldPassportModalComponent_ng_template_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](1, "app-gis-field-passport-section-wrapper", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]();
    const fieldInfoModalContent_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵreference"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("contentRef", fieldInfoModalContent_r2);
  }
}
function GisFieldPassportModalComponent_ng_template_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](0, "app-gis-field-passport-field-info", 7);
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("field", ctx_r2.field());
  }
}
class GisFieldPassportModalComponent extends _shared_components_destructible_destructible_component__WEBPACK_IMPORTED_MODULE_4__.DestructibleComponent {
  postboy;
  modalPostboy;
  settings = new _artstesh_modals__WEBPACK_IMPORTED_MODULE_0__.ModalSettings();
  field = (0,_angular_core__WEBPACK_IMPORTED_MODULE_7__.signal)(null);
  constructor(postboy, modalPostboy) {
    super();
    this.postboy = postboy;
    this.modalPostboy = modalPostboy;
  }
  ngOnInit() {
    this.postboy.sub(_root_src_app_sections_gis_page_component_gis_messages_commands_show_field_passport_command__WEBPACK_IMPORTED_MODULE_3__.ShowFieldPassportCommand).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_8__.tap)(c => this.field.set(c.field)), (0,rxjs__WEBPACK_IMPORTED_MODULE_9__.switchMap)(c => this.modalPostboy.fireCallback(new _artstesh_modals__WEBPACK_IMPORTED_MODULE_0__.OpenModalCommand(this.settings.id)))).subscribe();
  }
  close() {
    this.modalPostboy.fire(new _artstesh_modals__WEBPACK_IMPORTED_MODULE_0__.CloseModalCommand(this.settings.id));
  }
  static ɵfac = function GisFieldPassportModalComponent_Factory(t) {
    return new (t || GisFieldPassportModalComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_root_src_app_services_app_postboy_service__WEBPACK_IMPORTED_MODULE_6__.AppPostboyService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_artstesh_modals__WEBPACK_IMPORTED_MODULE_0__.ModalPostboyService));
  };
  static ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineComponent"]({
    type: GisFieldPassportModalComponent,
    selectors: [["app-gis-field-passport-modal"]],
    standalone: true,
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵInheritDefinitionFeature"], _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵStandaloneFeature"]],
    decls: 8,
    vars: 3,
    consts: [["cadastralLoadingZone", ""], ["fieldInfoModalContent", ""], [3, "settings"], ["fxLayoutAlign", "end ", 1, "closer", 3, "click"], [3, "contentRef", "isLoading"], ["fxLayout", "column", "fxLayoutGap", "20px", 1, "modal-content-wrapper"], ["label", "Field info", 3, "contentRef"], [3, "field"]],
    template: function GisFieldPassportModalComponent_Template(rf, ctx) {
      if (rf & 1) {
        const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵgetCurrentView"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "art-modal", 2)(1, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("click", function GisFieldPassportModalComponent_Template_div_click_1_listener() {
          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r1);
          return _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵresetView"](ctx.close());
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](2, "\u2716");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](3, "app-loading-zone", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](4, GisFieldPassportModalComponent_ng_template_4_Template, 2, 1, "ng-template", null, 0, _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](6, GisFieldPassportModalComponent_ng_template_6_Template, 1, 1, "ng-template", null, 1, _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplateRefExtractor"]);
      }
      if (rf & 2) {
        const cadastralLoadingZone_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵreference"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("settings", ctx.settings);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("contentRef", cadastralLoadingZone_r4)("isLoading", !ctx.field());
      }
    },
    dependencies: [_artstesh_modals__WEBPACK_IMPORTED_MODULE_0__.ArtModalModule, _artstesh_modals__WEBPACK_IMPORTED_MODULE_0__.ModalComponent, _root_src_app_sections_gis_page_component_gis_components_gis_field_passport_modal_components_gis_field_passport_section_wrapper_gis_field_passport_section_wrapper_component__WEBPACK_IMPORTED_MODULE_2__.GisFieldPassportSectionWrapperComponent, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_10__.TranslateModule, _ngbracket_ngx_layout__WEBPACK_IMPORTED_MODULE_11__.FlexModule, _ngbracket_ngx_layout__WEBPACK_IMPORTED_MODULE_11__.DefaultLayoutDirective, _ngbracket_ngx_layout__WEBPACK_IMPORTED_MODULE_11__.DefaultLayoutGapDirective, _ngbracket_ngx_layout__WEBPACK_IMPORTED_MODULE_11__.DefaultLayoutAlignDirective, _root_src_app_sections_gis_page_component_gis_components_gis_field_passport_modal_components_gis_field_passport_field_info_gis_field_passport_field_info_component__WEBPACK_IMPORTED_MODULE_1__.GisFieldPassportFieldInfoComponent, _shared_components_loading_zone_loading_zone_component__WEBPACK_IMPORTED_MODULE_5__.LoadingZoneComponent],
    styles: ["app-gis-field-passport-modal {\n  --am-dialog-content-padding: 0;\n}\napp-gis-field-passport-modal .modal-content-wrapper {\n  width: 650px;\n  max-height: 80vh;\n  overflow-y: auto;\n}\napp-gis-field-passport-modal .closer {\n  cursor: pointer;\n}\napp-gis-field-passport-modal .art-modal-dialog-buttons, app-gis-field-passport-modal .art-modal-dialog-title {\n  display: none !important;\n}\napp-gis-field-passport-modal app-loader {\n  position: unset;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvc2VjdGlvbnMvZ2lzLXBhZ2UvY29tcG9uZW50L2dpcy9jb21wb25lbnRzL2dpcy1maWVsZC1wYXNzcG9ydC1tb2RhbC9naXMtZmllbGQtcGFzc3BvcnQtbW9kYWwuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBRUE7RUFDRSw4QkFBQTtBQURGO0FBR0U7RUFDRSxZQUFBO0VBQ0EsZ0JBQUE7RUFDQSxnQkFBQTtBQURKO0FBSUU7RUFDRSxlQUFBO0FBRko7QUFLRTtFQUNFLHdCQUFBO0FBSEo7QUFPRTtFQUNFLGVBQUE7QUFMSiIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5cclxuYXBwLWdpcy1maWVsZC1wYXNzcG9ydC1tb2RhbCB7XHJcbiAgLS1hbS1kaWFsb2ctY29udGVudC1wYWRkaW5nOiAwO1xyXG5cclxuICAubW9kYWwtY29udGVudC13cmFwcGVyIHtcclxuICAgIHdpZHRoOiA2NTBweDtcclxuICAgIG1heC1oZWlnaHQ6IDgwdmg7XHJcbiAgICBvdmVyZmxvdy15OiBhdXRvO1xyXG4gIH1cclxuXHJcbiAgLmNsb3NlciB7XHJcbiAgICBjdXJzb3I6IHBvaW50ZXI7XHJcbiAgfVxyXG5cclxuICAuYXJ0LW1vZGFsLWRpYWxvZy1idXR0b25zLC5hcnQtbW9kYWwtZGlhbG9nLXRpdGxlIHtcclxuICAgIGRpc3BsYXk6IG5vbmUgIWltcG9ydGFudDtcclxuICB9XHJcblxyXG5cclxuICBhcHAtbG9hZGVyIHtcclxuICAgIHBvc2l0aW9uOiB1bnNldDtcclxuICB9XHJcbn1cclxuIl0sInNvdXJjZVJvb3QiOiIifQ== */"],
    encapsulation: 2,
    changeDetection: 0
  });
}

/***/ }),

/***/ 31686:
/*!***************************************************************************************************************!*\
  !*** ./src/app/sections/gis-page/component/gis/components/gis-field-polygons/gis-field-polygons.component.ts ***!
  \***************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GisFieldPolygonsComponent: () => (/* binding */ GisFieldPolygonsComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _artstesh_maps__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @artstesh/maps */ 86672);
/* harmony import */ var _root_src_app_sections_gis_page_component_gis_messages_events_gis_fields_event__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @root/src/app/sections/gis-page/component/gis/messages/events/gis-fields.event */ 22827);
/* harmony import */ var _shared_components_destructible_destructible_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @shared/components/destructible/destructible.component */ 47231);
/* harmony import */ var _models_gis_constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../models/gis.constants */ 55128);
/* harmony import */ var _root_src_app_services_app_postboy_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @root/src/app/services/app-postboy.service */ 44804);








/**
 *
 */
class GisFieldPolygonsComponent extends _shared_components_destructible_destructible_component__WEBPACK_IMPORTED_MODULE_2__.DestructibleComponent {
  postboy;
  style = _artstesh_maps__WEBPACK_IMPORTED_MODULE_0__.PolygonStyleHelper.simple('#1CA49464', '#1ca494', 2);
  polygons = (0,_angular_core__WEBPACK_IMPORTED_MODULE_5__.signal)([]);
  layerSettings = new _artstesh_maps__WEBPACK_IMPORTED_MODULE_0__.FeatureLayerSettings().setMinZoom(15).setName(_models_gis_constants__WEBPACK_IMPORTED_MODULE_3__.GisConstants.GisFieldPolygonsLayerName).setStyle(this.style);
  constructor(postboy) {
    super();
    this.postboy = postboy;
  }
  ngOnInit() {
    this.postboy.sub(_root_src_app_sections_gis_page_component_gis_messages_events_gis_fields_event__WEBPACK_IMPORTED_MODULE_1__.GisFieldsEvent).subscribe(ev => this.polygons.set(ev.items.filter(i => !!i.wkt).map(p => _artstesh_maps__WEBPACK_IMPORTED_MODULE_0__.PolygonModel.fromWKT(p.id, p.wkt))));
  }
  static ɵfac = function GisFieldPolygonsComponent_Factory(t) {
    return new (t || GisFieldPolygonsComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_root_src_app_services_app_postboy_service__WEBPACK_IMPORTED_MODULE_4__.AppPostboyService));
  };
  static ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineComponent"]({
    type: GisFieldPolygonsComponent,
    selectors: [["app-gis-field-polygons"]],
    standalone: true,
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵInheritDefinitionFeature"], _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵStandaloneFeature"]],
    decls: 2,
    vars: 3,
    consts: [[3, "settings"], [3, "layerName", "polygons"]],
    template: function GisFieldPolygonsComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "art-feature-layer", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](1, "art-polygons", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("settings", ctx.layerSettings);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("layerName", ctx.layerSettings.name)("polygons", ctx.polygons());
      }
    },
    dependencies: [_artstesh_maps__WEBPACK_IMPORTED_MODULE_0__.MapModule, _artstesh_maps__WEBPACK_IMPORTED_MODULE_0__.FeatureLayerComponent, _artstesh_maps__WEBPACK_IMPORTED_MODULE_0__.PolygonsComponent],
    encapsulation: 2,
    changeDetection: 0
  });
}

/***/ }),

/***/ 12660:
/*!*****************************************************************************************************************!*\
  !*** ./src/app/sections/gis-page/component/gis/components/gis-region-polygons/gis-region-polygons.component.ts ***!
  \*****************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GisReionPolygonsComponent: () => (/* binding */ GisReionPolygonsComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _artstesh_maps__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @artstesh/maps */ 86672);
/* harmony import */ var _shared_components_destructible_destructible_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @shared/components/destructible/destructible.component */ 47231);
/* harmony import */ var _root_src_app_api_internal_regions_messages_list_regions_query__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @root/src/app/api-internal/regions/messages/list-regions.query */ 29960);
/* harmony import */ var _root_src_app_services_app_postboy_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @root/src/app/services/app-postboy.service */ 44804);







/**
 *
 */
class GisReionPolygonsComponent extends _shared_components_destructible_destructible_component__WEBPACK_IMPORTED_MODULE_1__.DestructibleComponent {
  postboy;
  polygons = (0,_angular_core__WEBPACK_IMPORTED_MODULE_4__.signal)([]);
  polygonStyle = _artstesh_maps__WEBPACK_IMPORTED_MODULE_0__.PolygonStyleHelper.simple('transparent', '#a4511c', 2);
  layerSettings = new _artstesh_maps__WEBPACK_IMPORTED_MODULE_0__.FeatureLayerSettings().setStyle(this.polygonStyle);
  constructor(postboy) {
    super();
    this.postboy = postboy;
  }
  ngOnInit() {
    this.postboy.fireCallback(new _root_src_app_api_internal_regions_messages_list_regions_query__WEBPACK_IMPORTED_MODULE_2__.ListRegionsQuery()).subscribe(rs => {
      this.polygons.set(rs.map(r => _artstesh_maps__WEBPACK_IMPORTED_MODULE_0__.PolygonModel.fromWKT(r.id, r.wkt)));
    });
  }
  static ɵfac = function GisReionPolygonsComponent_Factory(t) {
    return new (t || GisReionPolygonsComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_root_src_app_services_app_postboy_service__WEBPACK_IMPORTED_MODULE_3__.AppPostboyService));
  };
  static ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineComponent"]({
    type: GisReionPolygonsComponent,
    selectors: [["app-gis-region-polygons"]],
    standalone: true,
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵInheritDefinitionFeature"], _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵStandaloneFeature"]],
    decls: 2,
    vars: 3,
    consts: [[3, "settings"], [3, "layerName", "polygons"]],
    template: function GisReionPolygonsComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "art-feature-layer", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](1, "art-polygons", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("settings", ctx.layerSettings);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("layerName", ctx.layerSettings.name)("polygons", ctx.polygons());
      }
    },
    dependencies: [_artstesh_maps__WEBPACK_IMPORTED_MODULE_0__.MapModule, _artstesh_maps__WEBPACK_IMPORTED_MODULE_0__.FeatureLayerComponent, _artstesh_maps__WEBPACK_IMPORTED_MODULE_0__.PolygonsComponent],
    encapsulation: 2,
    changeDetection: 0
  });
}

/***/ }),

/***/ 98661:
/*!******************************************************************!*\
  !*** ./src/app/sections/gis-page/component/gis/gis.component.ts ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GisComponent: () => (/* binding */ GisComponent)
/* harmony export */ });
/* harmony import */ var _angular_cdk_drag_drop__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/cdk/drag-drop */ 28473);
/* harmony import */ var _artstesh_maps__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @artstesh/maps */ 86672);
/* harmony import */ var _ngbracket_ngx_layout__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @ngbracket/ngx-layout */ 87801);
/* harmony import */ var _root_src_app_shared_components_destructible_destructible_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @root/src/app/shared/components/destructible/destructible.component */ 47231);
/* harmony import */ var _components_gis_region_polygons_gis_region_polygons_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/gis-region-polygons/gis-region-polygons.component */ 12660);
/* harmony import */ var _shared_components_map_layer_toggle_control_layer_toggle_control_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../shared/components/map-layer-toggle-control/layer-toggle-control.component */ 31804);
/* harmony import */ var _messages_commands_apply_gis_extent_command__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../messages/commands/apply-gis-extent.command */ 24663);
/* harmony import */ var _root_src_app_sections_gis_page_component_gis_services_gis_message_register_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @root/src/app/sections/gis-page/component/gis/services/gis-message-register.service */ 15018);
/* harmony import */ var _root_src_app_sections_gis_page_component_gis_components_gis_field_passport_modal_gis_field_passport_modal_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @root/src/app/sections/gis-page/component/gis/components/gis-field-passport-modal/gis-field-passport-modal.component */ 30028);
/* harmony import */ var _root_src_app_sections_gis_page_component_gis_services_gis_features_orchestrator_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @root/src/app/sections/gis-page/component/gis/services/gis-features-orchestrator.service */ 1237);
/* harmony import */ var _root_src_app_sections_gis_page_component_gis_components_gis_field_markers_gis_field_markers_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @root/src/app/sections/gis-page/component/gis/components/gis-field-markers/gis-field-markers.component */ 26744);
/* harmony import */ var _root_src_app_sections_gis_page_component_gis_components_gis_field_polygons_gis_field_polygons_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @root/src/app/sections/gis-page/component/gis/components/gis-field-polygons/gis-field-polygons.component */ 31686);
/* harmony import */ var _root_src_app_sections_gis_page_component_gis_components_gis_clusters_gis_clusters_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @root/src/app/sections/gis-page/component/gis/components/gis-clusters/gis-clusters.component */ 41264);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _root_src_app_services_app_postboy_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @root/src/app/services/app-postboy.service */ 44804);

















class GisComponent extends _root_src_app_shared_components_destructible_destructible_component__WEBPACK_IMPORTED_MODULE_1__.DestructibleComponent {
  postboy;
  mapPostboy;
  register;
  settings = new _artstesh_maps__WEBPACK_IMPORTED_MODULE_0__.MapSettings().setCenter([30, -2]).setZoom(8).setInteractionSettings({
    altShiftDragRotate: false,
    pinchRotate: false
  }).setLyrs(_artstesh_maps__WEBPACK_IMPORTED_MODULE_0__.MapLyrs.Terrain);
  zoomSettings = new _artstesh_maps__WEBPACK_IMPORTED_MODULE_0__.ZoomControlSettings().setZoomInLabel('Zoom In');
  /**
   * Constructor of the class.
   */
  constructor(postboy, mapPostboy, register) {
    super();
    this.postboy = postboy;
    this.mapPostboy = mapPostboy;
    this.register = register;
  }
  /**
   * Initializes the components after Angular first displays the data-bound properties and sets up the components.
   * This method subscribes to the CommonDropdownOpenStateEvent to monitor when the dropdown is open,
   * and if it is, it checks the viewport size of the first scrollable element.
   * @return {void} No return value.
   */
  ngOnInit() {
    this.register.up();
    this.observeVisibiliyMarkers();
  }
  observeVisibiliyMarkers() {
    this.postboy.sub(_messages_commands_apply_gis_extent_command__WEBPACK_IMPORTED_MODULE_4__.ApplyGisExtentCommand).subscribe(f => {
      this.mapPostboy.fire(new _artstesh_maps__WEBPACK_IMPORTED_MODULE_0__.FitToPolygonsCommand(f.polygons));
    });
  }
  onDestroy = () => this.register.down();
  static ɵfac = function GisComponent_Factory(t) {
    return new (t || GisComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdirectiveInject"](_root_src_app_services_app_postboy_service__WEBPACK_IMPORTED_MODULE_11__.AppPostboyService), _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdirectiveInject"](_artstesh_maps__WEBPACK_IMPORTED_MODULE_0__.MapPostboyService), _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdirectiveInject"](_root_src_app_sections_gis_page_component_gis_services_gis_message_register_service__WEBPACK_IMPORTED_MODULE_5__.GisMessageRegisterService));
  };
  static ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdefineComponent"]({
    type: GisComponent,
    selectors: [["app-gis"]],
    standalone: true,
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵProvidersFeature"]([_root_src_app_sections_gis_page_component_gis_services_gis_message_register_service__WEBPACK_IMPORTED_MODULE_5__.GisMessageRegisterService, _root_src_app_sections_gis_page_component_gis_services_gis_features_orchestrator_service__WEBPACK_IMPORTED_MODULE_7__.GisFeaturesOrchestratorService]), _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵInheritDefinitionFeature"], _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵStandaloneFeature"]],
    decls: 8,
    vars: 3,
    consts: [[3, "settings"], [3, "settingsChange", "settings"]],
    template: function GisComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](0, "art-map-plate", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](1, "app-gis-region-polygons")(2, "app-gis-field-polygons")(3, "app-gis-field-markers")(4, "app-gis-clusters")(5, "art-map-control-zoom", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](6, "app-map-layer-toggle-control", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtwoWayListener"]("settingsChange", function GisComponent_Template_app_map_layer_toggle_control_settingsChange_6_listener($event) {
          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtwoWayBindingSet"](ctx.settings, $event) || (ctx.settings = $event);
          return $event;
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](7, "app-gis-field-passport-modal");
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("settings", ctx.settings);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("settings", ctx.zoomSettings);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtwoWayProperty"]("settings", ctx.settings);
      }
    },
    dependencies: [_ngbracket_ngx_layout__WEBPACK_IMPORTED_MODULE_13__.FlexModule, _angular_cdk_drag_drop__WEBPACK_IMPORTED_MODULE_14__.DragDropModule, _artstesh_maps__WEBPACK_IMPORTED_MODULE_0__.MapModule, _artstesh_maps__WEBPACK_IMPORTED_MODULE_0__.MapPlateComponent, _artstesh_maps__WEBPACK_IMPORTED_MODULE_0__.MapControlZoomComponent, _components_gis_region_polygons_gis_region_polygons_component__WEBPACK_IMPORTED_MODULE_2__.GisReionPolygonsComponent, _shared_components_map_layer_toggle_control_layer_toggle_control_component__WEBPACK_IMPORTED_MODULE_3__.LayerToggleControlComponent, _root_src_app_sections_gis_page_component_gis_components_gis_field_passport_modal_gis_field_passport_modal_component__WEBPACK_IMPORTED_MODULE_6__.GisFieldPassportModalComponent, _root_src_app_sections_gis_page_component_gis_components_gis_field_markers_gis_field_markers_component__WEBPACK_IMPORTED_MODULE_8__.GisFieldMarkersComponent, _root_src_app_sections_gis_page_component_gis_components_gis_field_polygons_gis_field_polygons_component__WEBPACK_IMPORTED_MODULE_9__.GisFieldPolygonsComponent, _root_src_app_sections_gis_page_component_gis_components_gis_clusters_gis_clusters_component__WEBPACK_IMPORTED_MODULE_10__.GisClustersComponent],
    styles: ["app-loader {\n  position: fixed;\n  height: 100%;\n  width: 100%;\n  display: flex;\n  z-index: 100;\n}\n\nart-map-plate {\n  position: relative;\n}\nart-map-plate .ol-scale-line {\n  background: rgba(0, 60, 136, 0.3);\n  border-radius: 4px;\n  bottom: 8px;\n  left: 8px;\n  padding: 2px;\n  position: absolute;\n}\nart-map-plate .ol-scale-line .ol-scale-line-inner {\n  border: 1px solid #eee;\n  border-top: none;\n  color: #eee;\n  font-size: 10px;\n  text-align: center;\n  margin: 1px;\n  padding: 0 2px;\n}\nart-map-plate app-gis-business-potential-layer-trigger {\n  position: absolute;\n  right: 10px;\n  top: 60px;\n  z-index: 100;\n}\nart-map-plate .ol-zoom {\n  display: flex;\n  flex-direction: row;\n  position: absolute;\n  right: 10px;\n  top: 92px;\n  gap: 3px;\n  background: rgba(255, 255, 255, 0.75);\n  border: 1px solid white;\n  border-radius: 5px;\n  padding: 3px;\n}\nart-map-plate .ol-zoom .ol-zoom-out,\nart-map-plate .ol-zoom .ol-zoom-in {\n  color: black;\n  width: 20px;\n  height: 20px;\n  display: flex;\n  justify-content: center;\n  border: none;\n  background: transparent;\n  font-size: 17px;\n}\nart-map-plate .ol-zoom .ol-zoom-out:hover,\nart-map-plate .ol-zoom .ol-zoom-in:hover {\n  background: #fff;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvc2VjdGlvbnMvZ2lzLXBhZ2UvY29tcG9uZW50L2dpcy9naXMuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0E7RUFDRyxlQUFBO0VBQ0EsWUFBQTtFQUNBLFdBQUE7RUFDQSxhQUFBO0VBQ0EsWUFBQTtBQUFIOztBQUdBO0VBQ0csa0JBQUE7QUFBSDtBQUVHO0VBQ0csaUNBQUE7RUFDQSxrQkFBQTtFQUNBLFdBQUE7RUFDQSxTQUFBO0VBQ0EsWUFBQTtFQUNBLGtCQUFBO0FBQU47QUFFTTtFQUNHLHNCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxXQUFBO0VBQ0EsZUFBQTtFQUNBLGtCQUFBO0VBQ0EsV0FBQTtFQUNBLGNBQUE7QUFBVDtBQUlFO0VBQ0Usa0JBQUE7RUFDQSxXQUFBO0VBQ0EsU0FBQTtFQUNBLFlBQUE7QUFGSjtBQUtHO0VBQ0csYUFBQTtFQUNBLG1CQUFBO0VBQ0Esa0JBQUE7RUFDQSxXQUFBO0VBQ0EsU0FBQTtFQUNBLFFBQUE7RUFFQSxxQ0FBQTtFQUNBLHVCQUFBO0VBQ0Esa0JBQUE7RUFDQSxZQUFBO0FBSk47QUFRTTs7RUFFRyxZQUFBO0VBQ0EsV0FMUTtFQU1SLFlBTlE7RUFPUixhQUFBO0VBQ0EsdUJBQUE7RUFDQSxZQUFBO0VBQ0EsdUJBQUE7RUFDQSxlQUFBO0FBTlQ7QUFRUzs7RUFDRyxnQkFBQTtBQUxaIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmFwcC1sb2FkZXIge1xyXG4gICBwb3NpdGlvbjogZml4ZWQ7XHJcbiAgIGhlaWdodDogMTAwJTtcclxuICAgd2lkdGg6IDEwMCU7XHJcbiAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgIHotaW5kZXg6IDEwMDtcclxufVxyXG5cclxuYXJ0LW1hcC1wbGF0ZSB7XHJcbiAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuXHJcbiAgIC5vbC1zY2FsZS1saW5lIHtcclxuICAgICAgYmFja2dyb3VuZDogcmdiYSgwLCA2MCwgMTM2LCAuMyk7XHJcbiAgICAgIGJvcmRlci1yYWRpdXM6IDRweDtcclxuICAgICAgYm90dG9tOiA4cHg7XHJcbiAgICAgIGxlZnQ6IDhweDtcclxuICAgICAgcGFkZGluZzogMnB4O1xyXG4gICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcblxyXG4gICAgICAub2wtc2NhbGUtbGluZS1pbm5lciB7XHJcbiAgICAgICAgIGJvcmRlcjogMXB4IHNvbGlkICNlZWU7XHJcbiAgICAgICAgIGJvcmRlci10b3A6IG5vbmU7XHJcbiAgICAgICAgIGNvbG9yOiAjZWVlO1xyXG4gICAgICAgICBmb250LXNpemU6IDEwcHg7XHJcbiAgICAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICAgICAgICAgbWFyZ2luOiAxcHg7XHJcbiAgICAgICAgIHBhZGRpbmc6IDAgMnB4O1xyXG4gICAgICB9XHJcbiAgIH1cclxuXHJcbiAgYXBwLWdpcy1idXNpbmVzcy1wb3RlbnRpYWwtbGF5ZXItdHJpZ2dlciB7XHJcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICByaWdodDogMTBweDtcclxuICAgIHRvcDogNjBweDtcclxuICAgIHotaW5kZXg6IDEwMDtcclxuICB9XHJcblxyXG4gICAub2wtem9vbSB7XHJcbiAgICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICAgIGZsZXgtZGlyZWN0aW9uOiByb3c7XHJcbiAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgICAgcmlnaHQ6IDEwcHg7XHJcbiAgICAgIHRvcDogOTJweDtcclxuICAgICAgZ2FwOiAzcHg7XHJcblxyXG4gICAgICBiYWNrZ3JvdW5kOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuNzUpO1xyXG4gICAgICBib3JkZXI6IDFweCBzb2xpZCB3aGl0ZTtcclxuICAgICAgYm9yZGVyLXJhZGl1czogNXB4O1xyXG4gICAgICBwYWRkaW5nOiAzcHg7XHJcblxyXG4gICAgICAkYnRuLXNpemU6IDIwcHg7XHJcblxyXG4gICAgICAub2wtem9vbS1vdXQsXHJcbiAgICAgIC5vbC16b29tLWluIHtcclxuICAgICAgICAgY29sb3I6IGJsYWNrO1xyXG4gICAgICAgICB3aWR0aDogJGJ0bi1zaXplO1xyXG4gICAgICAgICBoZWlnaHQ6ICRidG4tc2l6ZTtcclxuICAgICAgICAgZGlzcGxheTogZmxleDtcclxuICAgICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgICAgICAgIGJvcmRlcjogbm9uZTtcclxuICAgICAgICAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XHJcbiAgICAgICAgIGZvbnQtc2l6ZTogMTdweDtcclxuXHJcbiAgICAgICAgICY6aG92ZXIge1xyXG4gICAgICAgICAgICBiYWNrZ3JvdW5kOiAjZmZmO1xyXG4gICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgfVxyXG59XHJcbiJdLCJzb3VyY2VSb290IjoiIn0= */"],
    encapsulation: 2,
    changeDetection: 0
  });
}

/***/ }),

/***/ 58847:
/*!**************************************************************************************************!*\
  !*** ./src/app/sections/gis-page/component/gis/messages/commands/show-field-passport.command.ts ***!
  \**************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ShowFieldPassportCommand: () => (/* binding */ ShowFieldPassportCommand)
/* harmony export */ });
/* harmony import */ var _artstesh_postboy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @artstesh/postboy */ 33518);
/* harmony import */ var _artstesh_postboy__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_artstesh_postboy__WEBPACK_IMPORTED_MODULE_0__);

class ShowFieldPassportCommand extends _artstesh_postboy__WEBPACK_IMPORTED_MODULE_0__.PostboyGenericMessage {
  field;
  static ID = '415f6877-f15f-4e8f-a8eb-bd68056edf63';
  constructor(field) {
    super();
    this.field = field;
  }
}

/***/ }),

/***/ 84597:
/*!***************************************************************************************!*\
  !*** ./src/app/sections/gis-page/component/gis/messages/events/gis-clusters.event.ts ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GisClustersEvent: () => (/* binding */ GisClustersEvent)
/* harmony export */ });
/* harmony import */ var _artstesh_postboy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @artstesh/postboy */ 33518);
/* harmony import */ var _artstesh_postboy__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_artstesh_postboy__WEBPACK_IMPORTED_MODULE_0__);

class GisClustersEvent extends _artstesh_postboy__WEBPACK_IMPORTED_MODULE_0__.PostboyGenericMessage {
  items;
  static ID = 'd88f836c-9b30-401b-b1cf-b9c450f56144';
  constructor(items) {
    super();
    this.items = items;
  }
}

/***/ }),

/***/ 22827:
/*!*************************************************************************************!*\
  !*** ./src/app/sections/gis-page/component/gis/messages/events/gis-fields.event.ts ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GisFieldsEvent: () => (/* binding */ GisFieldsEvent)
/* harmony export */ });
/* harmony import */ var _artstesh_postboy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @artstesh/postboy */ 33518);
/* harmony import */ var _artstesh_postboy__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_artstesh_postboy__WEBPACK_IMPORTED_MODULE_0__);

class GisFieldsEvent extends _artstesh_postboy__WEBPACK_IMPORTED_MODULE_0__.PostboyGenericMessage {
  items;
  static ID = 'e9a4fd44-72e9-497f-b21e-8d56255b9e35';
  constructor(items) {
    super();
    this.items = items;
  }
}

/***/ }),

/***/ 1237:
/*!***********************************************************************************************!*\
  !*** ./src/app/sections/gis-page/component/gis/services/gis-features-orchestrator.service.ts ***!
  \***********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GisFeaturesOrchestratorService: () => (/* binding */ GisFeaturesOrchestratorService)
/* harmony export */ });
/* harmony import */ var _artstesh_maps__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @artstesh/maps */ 86672);
/* harmony import */ var _shared_messages_executors_compare_map_position_executor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @shared/messages/executors/compare-map-position.executor */ 21577);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs/operators */ 70271);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! rxjs/operators */ 63037);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! rxjs/operators */ 51567);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! rxjs */ 98764);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! rxjs */ 10819);
/* harmony import */ var _root_src_app_sections_gis_page_component_gis_messages_events_gis_clusters_event__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @root/src/app/sections/gis-page/component/gis/messages/events/gis-clusters.event */ 84597);
/* harmony import */ var _root_src_app_api_internal_field_clusters_messages_list_field_clusters_query__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @root/src/app/api-internal/field-clusters/messages/list-field-clusters.query */ 98318);
/* harmony import */ var _root_src_app_api_internal_fields_messages_list_fields_query__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @root/src/app/api-internal/fields/messages/list-fields.query */ 28960);
/* harmony import */ var _root_src_app_sections_gis_page_component_gis_messages_events_gis_fields_event__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @root/src/app/sections/gis-page/component/gis/messages/events/gis-fields.event */ 22827);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _root_src_app_services_app_postboy_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @root/src/app/services/app-postboy.service */ 44804);











class GisFeaturesOrchestratorService {
  postboy;
  mapPostboy;
  previousPosition;
  constructor(postboy, mapPostboy) {
    this.postboy = postboy;
    this.mapPostboy = mapPostboy;
  }
  up() {
    let cancel$;
    this.mapPostboy.sub(_artstesh_maps__WEBPACK_IMPORTED_MODULE_0__.MapMoveEndEvent).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_7__.map)(ev => ev.position), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_8__.startWith)(this.mapPostboy.exec(new _artstesh_maps__WEBPACK_IMPORTED_MODULE_0__.GetMapPositionExecutor())), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_9__.filter)(ev => !!ev && this.mapPositionFilter(ev)), (0,rxjs__WEBPACK_IMPORTED_MODULE_10__.tap)(() => {
      cancel$?.next();
      cancel$ = new rxjs__WEBPACK_IMPORTED_MODULE_11__.Subject();
    })).subscribe(position => {
      if (position.zoom < 12) {
        this.postboy.fireCallback(new _root_src_app_api_internal_field_clusters_messages_list_field_clusters_query__WEBPACK_IMPORTED_MODULE_3__.ListFieldClustersQuery(position.extent, cancel$)).subscribe(rs => this.update(rs, []));
      } else {
        this.postboy.fireCallback(new _root_src_app_api_internal_fields_messages_list_fields_query__WEBPACK_IMPORTED_MODULE_4__.ListFieldsQuery(position.extent, position.zoom, cancel$)).subscribe(fs => this.update([], fs));
      }
    });
  }
  update(clusters, fields) {
    this.postboy.fire(new _root_src_app_sections_gis_page_component_gis_messages_events_gis_clusters_event__WEBPACK_IMPORTED_MODULE_2__.GisClustersEvent(clusters));
    this.postboy.fire(new _root_src_app_sections_gis_page_component_gis_messages_events_gis_fields_event__WEBPACK_IMPORTED_MODULE_5__.GisFieldsEvent(fields));
  }
  mapPositionFilter(position) {
    let result = this.postboy.exec(new _shared_messages_executors_compare_map_position_executor__WEBPACK_IMPORTED_MODULE_1__.CompareMapPositionExecutor(position, this.previousPosition));
    this.previousPosition = position;
    return result;
  }
  down;
  static ɵfac = function GisFeaturesOrchestratorService_Factory(t) {
    return new (t || GisFeaturesOrchestratorService)(_angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵinject"](_root_src_app_services_app_postboy_service__WEBPACK_IMPORTED_MODULE_6__.AppPostboyService), _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵinject"](_artstesh_maps__WEBPACK_IMPORTED_MODULE_0__.MapPostboyService));
  };
  static ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdefineInjectable"]({
    token: GisFeaturesOrchestratorService,
    factory: GisFeaturesOrchestratorService.ɵfac
  });
}

/***/ }),

/***/ 15018:
/*!******************************************************************************************!*\
  !*** ./src/app/sections/gis-page/component/gis/services/gis-message-register.service.ts ***!
  \******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GisMessageRegisterService: () => (/* binding */ GisMessageRegisterService)
/* harmony export */ });
/* harmony import */ var _artstesh_postboy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @artstesh/postboy */ 33518);
/* harmony import */ var _artstesh_postboy__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_artstesh_postboy__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _root_src_app_sections_gis_page_component_gis_messages_commands_show_field_passport_command__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @root/src/app/sections/gis-page/component/gis/messages/commands/show-field-passport.command */ 58847);
/* harmony import */ var _root_src_app_sections_gis_page_component_gis_messages_events_gis_clusters_event__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @root/src/app/sections/gis-page/component/gis/messages/events/gis-clusters.event */ 84597);
/* harmony import */ var _root_src_app_sections_gis_page_component_gis_messages_events_gis_fields_event__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @root/src/app/sections/gis-page/component/gis/messages/events/gis-fields.event */ 22827);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _root_src_app_services_app_postboy_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @root/src/app/services/app-postboy.service */ 44804);
/* harmony import */ var _root_src_app_sections_gis_page_component_gis_services_gis_features_orchestrator_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @root/src/app/sections/gis-page/component/gis/services/gis-features-orchestrator.service */ 1237);







class GisMessageRegisterService extends _artstesh_postboy__WEBPACK_IMPORTED_MODULE_0__.PostboyAbstractRegistrator {
  constructor(postboy, feature) {
    super(postboy);
    this.registerServices([feature]);
  }
  _up() {
    this.recordSubject(_root_src_app_sections_gis_page_component_gis_messages_commands_show_field_passport_command__WEBPACK_IMPORTED_MODULE_1__.ShowFieldPassportCommand);
    this.recordSubject(_root_src_app_sections_gis_page_component_gis_messages_events_gis_clusters_event__WEBPACK_IMPORTED_MODULE_2__.GisClustersEvent);
    this.recordSubject(_root_src_app_sections_gis_page_component_gis_messages_events_gis_fields_event__WEBPACK_IMPORTED_MODULE_3__.GisFieldsEvent);
  }
  static ɵfac = function GisMessageRegisterService_Factory(t) {
    return new (t || GisMessageRegisterService)(_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵinject"](_root_src_app_services_app_postboy_service__WEBPACK_IMPORTED_MODULE_4__.AppPostboyService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵinject"](_root_src_app_sections_gis_page_component_gis_services_gis_features_orchestrator_service__WEBPACK_IMPORTED_MODULE_5__.GisFeaturesOrchestratorService));
  };
  static ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineInjectable"]({
    token: GisMessageRegisterService,
    factory: GisMessageRegisterService.ɵfac
  });
}

/***/ }),

/***/ 78741:
/*!*********************************************************!*\
  !*** ./src/app/sections/gis-page/gis-page.component.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GisPageComponent: () => (/* binding */ GisPageComponent)
/* harmony export */ });
/* harmony import */ var _artstesh_maps__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @artstesh/maps */ 86672);
/* harmony import */ var _ngbracket_ngx_layout__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ngbracket/ngx-layout */ 87801);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ngx-translate/core */ 90852);
/* harmony import */ var _shared_components_destructible_destructible_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../shared/components/destructible/destructible.component */ 47231);
/* harmony import */ var _component_gis_gis_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./component/gis/gis.component */ 98661);
/* harmony import */ var _services_gis_page_message_registrator_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./services/gis-page-message-registrator.service */ 88547);
/* harmony import */ var _api_internal_fields_fields_internal_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../api-internal/fields/fields-internal.service */ 82659);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 37580);










/**
 * The TileMapPageComponent is responsible for displaying Tile-map page content.
 */
class GisPageComponent extends _shared_components_destructible_destructible_component__WEBPACK_IMPORTED_MODULE_1__.DestructibleComponent {
  registrator;
  /**
   * Constructs an instance of the class and initializes the GisPageMessageRegistratorService.
   *
   * @param {GisPageMessageRegistratorService} registrator - The GisPageMessageRegistratorService responsible for managing application messages.
   */
  constructor(registrator) {
    super();
    this.registrator = registrator;
    this.registrator.up();
  }
  /**
   * @description
   * A callback function that is invoked when the components or object is being destroyed.
   * This function typically contains cleanup logic to ensure that resources are properly
   * released and the system remains stable after the components's lifecycle ends.
   *
   * Specifically, it calls the `down` method on `this.registrator` to perform any
   * necessary deregistration or cleanup tasks related to message handling or communication.
   *
   * @type {Function}
   */
  ngOnDestroy() {
    this.registrator.down();
  }
  static ɵfac = function GisPageComponent_Factory(t) {
    return new (t || GisPageComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_services_gis_page_message_registrator_service__WEBPACK_IMPORTED_MODULE_3__.GisPageMessageRegistratorService));
  };
  static ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineComponent"]({
    type: GisPageComponent,
    selectors: [["app-gis-page"]],
    standalone: true,
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵProvidersFeature"]([_api_internal_fields_fields_internal_service__WEBPACK_IMPORTED_MODULE_4__.FieldsInternalService, _services_gis_page_message_registrator_service__WEBPACK_IMPORTED_MODULE_3__.GisPageMessageRegistratorService, _artstesh_maps__WEBPACK_IMPORTED_MODULE_0__.MapPostboyService]), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵInheritDefinitionFeature"], _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵStandaloneFeature"]],
    decls: 1,
    vars: 0,
    consts: [["fxFill", ""]],
    template: function GisPageComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](0, "app-gis", 0);
      }
    },
    dependencies: [_ngbracket_ngx_layout__WEBPACK_IMPORTED_MODULE_6__.FlexModule, _ngbracket_ngx_layout__WEBPACK_IMPORTED_MODULE_6__.FlexFillDirective, _component_gis_gis_component__WEBPACK_IMPORTED_MODULE_2__.GisComponent, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__.TranslateModule],
    styles: ["\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"],
    encapsulation: 2,
    changeDetection: 0
  });
}

/***/ }),

/***/ 24663:
/*!*********************************************************************************!*\
  !*** ./src/app/sections/gis-page/messages/commands/apply-gis-extent.command.ts ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ApplyGisExtentCommand: () => (/* binding */ ApplyGisExtentCommand)
/* harmony export */ });
/* harmony import */ var _artstesh_postboy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @artstesh/postboy */ 33518);
/* harmony import */ var _artstesh_postboy__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_artstesh_postboy__WEBPACK_IMPORTED_MODULE_0__);

/**
 * The ApplyGisFilterCommand class is a specialized implementation of the PostboyGenericMessage,
 * representing a command to apply tile-map filters. This class includes
 * a specific identifier for the command and inherits generic messaging behavior.
 *
 * This command can be identified globally by its static readonly ID property.
 *
 * Inherits from PostboyGenericMessage.
 */
class ApplyGisExtentCommand extends _artstesh_postboy__WEBPACK_IMPORTED_MODULE_0__.PostboyGenericMessage {
  polygons;
  static ID = 'ea486c2e-5bf9-48bf-a314-0c40af75f3d1';
  constructor(polygons) {
    super();
    this.polygons = polygons;
  }
}

/***/ }),

/***/ 53635:
/*!***********************************************************************************!*\
  !*** ./src/app/sections/gis-page/messages/commands/zoom-target-fields.command.ts ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ZoomTargetFieldsCommand: () => (/* binding */ ZoomTargetFieldsCommand)
/* harmony export */ });
/* harmony import */ var _artstesh_postboy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @artstesh/postboy */ 33518);
/* harmony import */ var _artstesh_postboy__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_artstesh_postboy__WEBPACK_IMPORTED_MODULE_0__);

class ZoomTargetFieldsCommand extends _artstesh_postboy__WEBPACK_IMPORTED_MODULE_0__.PostboyGenericMessage {
  static ID = '8372fdc2-c9df-46ce-b9dc-defe5773adc4';
  constructor() {
    super();
  }
}

/***/ }),

/***/ 55128:
/*!***********************************************************!*\
  !*** ./src/app/sections/gis-page/models/gis.constants.ts ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GisConstants: () => (/* binding */ GisConstants)
/* harmony export */ });
class GisConstants {
  static GisFieldPolygonsLayerName = 'gis-field-polygons';
  static GisFieldMarkersLayerName = 'gis-field-markers';
  static CnhFieldPolygonEdgeZoom = 15;
}

/***/ }),

/***/ 88547:
/*!************************************************************************************!*\
  !*** ./src/app/sections/gis-page/services/gis-page-message-registrator.service.ts ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GisPageMessageRegistratorService: () => (/* binding */ GisPageMessageRegistratorService)
/* harmony export */ });
/* harmony import */ var _artstesh_postboy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @artstesh/postboy */ 33518);
/* harmony import */ var _artstesh_postboy__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_artstesh_postboy__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _root_src_app_sections_gis_page_messages_commands_zoom_target_fields_command__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @root/src/app/sections/gis-page/messages/commands/zoom-target-fields.command */ 53635);
/* harmony import */ var _messages_commands_apply_gis_extent_command__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../messages/commands/apply-gis-extent.command */ 24663);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _root_src_app_services_app_postboy_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @root/src/app/services/app-postboy.service */ 44804);
/* harmony import */ var _root_src_app_api_internal_fields_fields_internal_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @root/src/app/api-internal/fields/fields-internal.service */ 82659);
/* harmony import */ var _root_src_app_api_internal_field_clusters_field_cluster_internal_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @root/src/app/api-internal/field-clusters/field-cluster-internal.service */ 10326);







class GisPageMessageRegistratorService extends _artstesh_postboy__WEBPACK_IMPORTED_MODULE_0__.PostboyAbstractRegistrator {
  /**
   * Registers handlers for replay and subject events.
   *
   * @return {void}
   */
  _up() {
    this.recordSubject(_messages_commands_apply_gis_extent_command__WEBPACK_IMPORTED_MODULE_2__.ApplyGisExtentCommand);
    this.recordSubject(_root_src_app_sections_gis_page_messages_commands_zoom_target_fields_command__WEBPACK_IMPORTED_MODULE_1__.ZoomTargetFieldsCommand);
  }
  /**
   * Constructor for initializing the service with dependencies.
   *
   */
  constructor(postboy, fields, clusters) {
    super(postboy);
    this.registerServices([fields, clusters]);
  }
  static ɵfac = function GisPageMessageRegistratorService_Factory(t) {
    return new (t || GisPageMessageRegistratorService)(_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵinject"](_root_src_app_services_app_postboy_service__WEBPACK_IMPORTED_MODULE_3__.AppPostboyService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵinject"](_root_src_app_api_internal_fields_fields_internal_service__WEBPACK_IMPORTED_MODULE_4__.FieldsInternalService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵinject"](_root_src_app_api_internal_field_clusters_field_cluster_internal_service__WEBPACK_IMPORTED_MODULE_5__.FieldClusterInternalService));
  };
  static ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineInjectable"]({
    token: GisPageMessageRegistratorService,
    factory: GisPageMessageRegistratorService.ɵfac
  });
}

/***/ }),

/***/ 27670:
/*!*************************************************************!*\
  !*** ./src/app/services/app-message-registrator.service.ts ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AppMessageRegistrator: () => (/* binding */ AppMessageRegistrator)
/* harmony export */ });
/* harmony import */ var _artstesh_postboy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @artstesh/postboy */ 33518);
/* harmony import */ var _artstesh_postboy__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_artstesh_postboy__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _shared_messages_executors_compare_map_position_executor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @shared/messages/executors/compare-map-position.executor */ 21577);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _root_src_app_services_app_postboy_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @root/src/app/services/app-postboy.service */ 44804);
/* harmony import */ var _root_src_app_services_title_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @root/src/app/services/title.service */ 24416);
/* harmony import */ var _root_src_app_api_internal_regions_regions_internal_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @root/src/app/api-internal/regions/regions-internal.service */ 40747);






/**
 * AppMessageRegistrator class is responsible for registering message handlers
 * related to theme settings using the PostboyAbstractRegistrator.
 * It registers both replay and subject handlers, particularly for color theme events
 * and theme commands.
 *
 * The constructor initializes the class by calling the parent constructor with the
 * specified AppPostboyService instance and registers a list of services including
 * the ColorThemeService.
 *
 * Methods:
 * - _up(): Registers message handlers for replaying and subject events.
 *
 * Dependencies:
 * - postboy: An instance of AppPostboyService used for postboy operations.
 * - color: An instance of ColorThemeService for handling color theme logic.
 */
class AppMessageRegistrator extends _artstesh_postboy__WEBPACK_IMPORTED_MODULE_0__.PostboyAbstractRegistrator {
  /**
   * Registers handlers for replay and subject events related to color theme changes.
   *
   * @return {void}
   */
  _up() {
    this.recordHandler(_shared_messages_executors_compare_map_position_executor__WEBPACK_IMPORTED_MODULE_1__.CompareMapPositionExecutor, new _shared_messages_executors_compare_map_position_executor__WEBPACK_IMPORTED_MODULE_1__.CompareMapPositionExecutorHandler());
  }
  constructor(postboy, title, regions) {
    super(postboy);
    this.registerServices([title, regions]);
  }
  static ɵfac = function AppMessageRegistrator_Factory(t) {
    return new (t || AppMessageRegistrator)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_root_src_app_services_app_postboy_service__WEBPACK_IMPORTED_MODULE_2__.AppPostboyService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_root_src_app_services_title_service__WEBPACK_IMPORTED_MODULE_3__.TitleService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_root_src_app_api_internal_regions_regions_internal_service__WEBPACK_IMPORTED_MODULE_4__.RegionsInternalService));
  };
  static ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjectable"]({
    token: AppMessageRegistrator,
    factory: AppMessageRegistrator.ɵfac
  });
}

/***/ }),

/***/ 44804:
/*!*************************************************!*\
  !*** ./src/app/services/app-postboy.service.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AppPostboyService: () => (/* binding */ AppPostboyService)
/* harmony export */ });
/* harmony import */ var _artstesh_postboy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @artstesh/postboy */ 33518);
/* harmony import */ var _artstesh_postboy__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_artstesh_postboy__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 37580);


/**
 * AppPostboyService provides enhanced functionality by extending the PostboyService.
 * This service is injectable and is provided at the root level, ensuring the single
 * instance is available throughout the application.
 */
class AppPostboyService extends _artstesh_postboy__WEBPACK_IMPORTED_MODULE_0__.PostboyService {
  constructor() {
    super();
  }
  static ɵfac = function AppPostboyService_Factory(t) {
    return new (t || AppPostboyService)();
  };
  static ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({
    token: AppPostboyService,
    factory: AppPostboyService.ɵfac,
    providedIn: 'root'
  });
}

/***/ }),

/***/ 24416:
/*!*******************************************!*\
  !*** ./src/app/services/title.service.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TitleService: () => (/* binding */ TitleService)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _root_src_app_services_app_postboy_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @root/src/app/services/app-postboy.service */ 44804);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/platform-browser */ 80436);



/**
 * Service responsible for managing and setting the application title dynamically.
 * Implements IPostboyDependingService interface.
 */
class TitleService {
  postboy;
  titleService;
  defaultTitle = 'Otus Highload';
  title = this.defaultTitle;
  constructor(postboy, titleService) {
    this.postboy = postboy;
    this.titleService = titleService;
  }
  /**
   * Subscribes to necessary observables and events to update the application title dynamically.
   * @return {void} Does not return a value.
   */
  up() {
    this.titleService.setTitle(this.title);
  }
  static ɵfac = function TitleService_Factory(t) {
    return new (t || TitleService)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_root_src_app_services_app_postboy_service__WEBPACK_IMPORTED_MODULE_0__.AppPostboyService), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__.Title));
  };
  static ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({
    token: TitleService,
    factory: TitleService.ɵfac
  });
}

/***/ }),

/***/ 47231:
/*!**************************************************************************!*\
  !*** ./src/app/shared/components/destructible/destructible.component.ts ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DestructibleComponent: () => (/* binding */ DestructibleComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _shared_services_component_satellite_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @shared/services/component-satellite.service */ 1769);


/**
 * A components that manages its own destruction lifecycle, ensuring that
 * all subscriptions are properly unsubscribed to avoid memory leaks.
 *
 * This components also allows for an optional cleanup function to be executed
 * when the components is destroyed.
 */
class DestructibleComponent {
  satellite;
  subs = [];
  onDestroy;
  /**
   * Constructs an instance of the class.
   *
   * @param {ComponentSatelliteService} [satellite] - An optional instance of the ComponentSatelliteService used to manage satellite configurations or interactions.
   */
  constructor(satellite) {
    this.satellite = satellite;
  }
  /**
   * Lifecycle hook that is called when a directive, pipe, or service is destroyed.
   * This method ensures that all subscriptions are properly unsubscribed to prevent memory leaks.
   * It also executes an optional cleanup function if provided.
   *
   * @return {void} No return value.
   */
  ngOnDestroy() {
    this.subs.forEach(s => s.unsubscribe());
    this.satellite?.down();
    if (this.onDestroy) this.onDestroy();
  }
  static ɵfac = function DestructibleComponent_Factory(t) {
    return new (t || DestructibleComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_shared_services_component_satellite_service__WEBPACK_IMPORTED_MODULE_0__.ComponentSatelliteService, 8));
  };
  static ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
    type: DestructibleComponent,
    selectors: [["ng-component"]],
    standalone: true,
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵStandaloneFeature"]],
    decls: 0,
    vars: 0,
    template: function DestructibleComponent_Template(rf, ctx) {},
    encapsulation: 2
  });
}

/***/ }),

/***/ 24713:
/*!**************************************************************************!*\
  !*** ./src/app/shared/components/loading-zone/loading-zone.component.ts ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LoadingZoneComponent: () => (/* binding */ LoadingZoneComponent)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ 60316);
/* harmony import */ var _ngbracket_ngx_layout__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ngbracket/ngx-layout */ 87801);
/* harmony import */ var _shared_freezed_screen_loader_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @shared/freezed-screen/loader.component */ 8345);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 37580);





function LoadingZoneComponent_div_0_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainer"](0);
  }
}
function LoadingZoneComponent_div_0_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](1, LoadingZoneComponent_div_0_ng_container_1_Template, 1, 0, "ng-container", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngTemplateOutlet", ctx_r0.contentRef);
  }
}
function LoadingZoneComponent_div_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](1, "app-loader", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("size", ctx_r0.size);
  }
}
/**
 * Component representing a loading zone with configurable loading state.
 * This component provides an isolated section in the UI displaying loading indicators
 * based on the provided `isLoading` state.
 *
 * The visual appearance and behavior are influenced by the view encapsulation, change detection strategy,
 * and the imported modules including FlexModule for layout, NgIf for structural directives,
 * and LoaderComponent for the loading indicator.
 *
 * The component leverages Angular's OnPush change detection strategy and ViewEncapsulation.None
 * for efficient rendering and styling management.
 */
class LoadingZoneComponent {
  detector;
  size = 48;
  contentRef = null;
  /**
   * Setter for the `isLoading` state. Updates the internal `_isLoading` property
   * and triggers change detection to update the view.
   *
   * @param {boolean} v - The new value for the `isLoading` state.
   */
  set isLoading(v) {
    this._isLoading = v;
    this.detector.detectChanges();
  }
  _isLoading = false;
  /**
   * Constructor for the class that initializes with a ChangeDetectorRef instance.
   *
   * @param {ChangeDetectorRef} detector - The Angular ChangeDetectorRef used for detecting and triggering change detection in Angular components.
   */
  constructor(detector) {
    this.detector = detector;
  }
  static ɵfac = function LoadingZoneComponent_Factory(t) {
    return new (t || LoadingZoneComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__.ChangeDetectorRef));
  };
  static ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
    type: LoadingZoneComponent,
    selectors: [["app-loading-zone"]],
    inputs: {
      size: "size",
      contentRef: "contentRef",
      isLoading: "isLoading"
    },
    standalone: true,
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵStandaloneFeature"]],
    decls: 2,
    vars: 2,
    consts: [["fxFill", "", 4, "ngIf"], ["fxFill", "", "fxLayoutAlign", "center center", 4, "ngIf"], ["fxFill", ""], [4, "ngTemplateOutlet"], ["fxFill", "", "fxLayoutAlign", "center center"], [3, "size"]],
    template: function LoadingZoneComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](0, LoadingZoneComponent_div_0_Template, 2, 1, "div", 0)(1, LoadingZoneComponent_div_1_Template, 2, 1, "div", 1);
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", !ctx._isLoading);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx._isLoading);
      }
    },
    dependencies: [_ngbracket_ngx_layout__WEBPACK_IMPORTED_MODULE_2__.FlexModule, _ngbracket_ngx_layout__WEBPACK_IMPORTED_MODULE_2__.DefaultLayoutAlignDirective, _ngbracket_ngx_layout__WEBPACK_IMPORTED_MODULE_2__.FlexFillDirective, _angular_common__WEBPACK_IMPORTED_MODULE_3__.NgIf, _shared_freezed_screen_loader_component__WEBPACK_IMPORTED_MODULE_0__.LoaderComponent, _angular_common__WEBPACK_IMPORTED_MODULE_3__.NgTemplateOutlet],
    styles: ["app-loading-zone {\n  display: grid;\n  min-height: 100%;\n  min-width: 100%;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvc2hhcmVkL2NvbXBvbmVudHMvbG9hZGluZy16b25lL2xvYWRpbmctem9uZS5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNHLGFBQUE7RUFDQSxnQkFBQTtFQUNBLGVBQUE7QUFDSCIsInNvdXJjZXNDb250ZW50IjpbImFwcC1sb2FkaW5nLXpvbmUge1xyXG4gICBkaXNwbGF5OiBncmlkO1xyXG4gICBtaW4taGVpZ2h0OiAxMDAlO1xyXG4gICBtaW4td2lkdGg6IDEwMCU7XHJcbn1cclxuIl0sInNvdXJjZVJvb3QiOiIifQ== */"],
    encapsulation: 2,
    changeDetection: 0
  });
}

/***/ }),

/***/ 31804:
/*!**********************************************************************************************!*\
  !*** ./src/app/shared/components/map-layer-toggle-control/layer-toggle-control.component.ts ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LayerToggleControlComponent: () => (/* binding */ LayerToggleControlComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _artstesh_maps__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @artstesh/maps */ 86672);
/* harmony import */ var _shared_components_destructible_destructible_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @shared/components/destructible/destructible.component */ 47231);
/* harmony import */ var _layer_toggle__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./layer-toggle */ 78341);






class LayerToggleControlComponent extends _shared_components_destructible_destructible_component__WEBPACK_IMPORTED_MODULE_1__.DestructibleComponent {
  postboy;
  settings = _angular_core__WEBPACK_IMPORTED_MODULE_3__.input.required();
  settingsChange = (0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.output)();
  control;
  constructor(postboy) {
    super();
    this.postboy = postboy;
  }
  ngOnInit() {
    this.control = new _layer_toggle__WEBPACK_IMPORTED_MODULE_2__.LayerToggle(this.postboy);
    setTimeout(() => this.postboy.fire(new _artstesh_maps__WEBPACK_IMPORTED_MODULE_0__.AddControlCommand(this.control)), 1000); //ToDo Wait for the MapRenderEvent
    this.control.changeEmitter.subscribe(ev => {
      this.settingsChange.emit(this.settings().setLyrs(ev));
    });
  }
  /**
   * A method that executes when the component or control is being destroyed.
   * It checks if the control exists and, if so, dispatches a `RemoveControlCommand`
   * to perform cleanup or removal operations on the control.
   *
   * This function utilizes a conditional check to ensure the existence of the
   * control before attempting to invoke a command to avoid potential errors.
   */
  onDestroy = () => {
    !!this.control && this.postboy.fire(new _artstesh_maps__WEBPACK_IMPORTED_MODULE_0__.RemoveControlCommand(this.control));
  };
  static ɵfac = function LayerToggleControlComponent_Factory(t) {
    return new (t || LayerToggleControlComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_artstesh_maps__WEBPACK_IMPORTED_MODULE_0__.MapPostboyService));
  };
  static ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({
    type: LayerToggleControlComponent,
    selectors: [["app-map-layer-toggle-control"]],
    inputs: {
      settings: [_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵInputFlags"].SignalBased, "settings"]
    },
    outputs: {
      settingsChange: "settingsChange"
    },
    standalone: true,
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵInheritDefinitionFeature"], _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵStandaloneFeature"]],
    decls: 0,
    vars: 0,
    template: function LayerToggleControlComponent_Template(rf, ctx) {},
    styles: [".map-base-layer-toggle {\n  color: black;\n  position: absolute;\n  z-index: 1000;\n  bottom: var(--map-layer-toggle-control-bottom);\n  left: var(--map-layer-toggle-control-left);\n  right: var(--map-layer-toggle-control-right, 10px);\n  top: var(--map-layer-toggle-control-top, 20px);\n  font-size: var(--map-layer-toggle-control-font-size, 13px);\n}\n.map-base-layer-toggle .switch {\n  position: relative;\n  display: inline-block;\n  width: var(--map-layer-toggle-control-width, 140px);\n  height: var(--map-layer-toggle-control-height, 30px);\n}\n.map-base-layer-toggle .switch .slider.round {\n  display: flex;\n  justify-content: stretch;\n  align-items: center;\n}\n.map-base-layer-toggle .switch .slider.round span {\n  border-radius: 8px;\n  text-align: center;\n  display: inline-block;\n  line-height: 30px;\n  font-size: 12px;\n  cursor: pointer;\n  flex: 1 1 70px;\n  background-color: white;\n  color: black;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  padding: 3px 8px;\n}\n.map-base-layer-toggle .switch .slider.round span.active {\n  background-color: gainsboro;\n}\n.map-base-layer-toggle .switch .slider.round span:first-child {\n  border-bottom-right-radius: unset;\n  border-top-right-radius: unset;\n}\n.map-base-layer-toggle .switch .slider.round span:last-child {\n  border-bottom-left-radius: unset;\n  border-top-left-radius: unset;\n}\n.map-base-layer-toggle .switch input {\n  display: none;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvc2hhcmVkL2NvbXBvbmVudHMvbWFwLWxheWVyLXRvZ2dsZS1jb250cm9sL2xheWVyLXRvZ2dsZS1jb250cm9sLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0csWUFBQTtFQUNBLGtCQUFBO0VBQ0EsYUFBQTtFQUNBLDhDQUFBO0VBQ0EsMENBQUE7RUFDQSxrREFBQTtFQUNBLDhDQUFBO0VBQ0EsMERBQUE7QUFDSDtBQUNHO0VBQ0csa0JBQUE7RUFDQSxxQkFBQTtFQUNBLG1EQUFBO0VBQ0Esb0RBQUE7QUFDTjtBQUNNO0VBQ0csYUFBQTtFQUNBLHdCQUFBO0VBQ0EsbUJBQUE7QUFDVDtBQUNTO0VBQ0csa0JBQUE7RUFDQSxrQkFBQTtFQUNBLHFCQUFBO0VBQ0EsaUJBQUE7RUFDQSxlQUFBO0VBQ0EsZUFBQTtFQUNBLGNBQUE7RUFDQSx1QkFBQTtFQUNBLFlBQUE7RUFFQSxnQkFBQTtFQUNBLHVCQUFBO0VBQ0EsbUJBQUE7RUFDQSxnQkFBQTtBQUFaO0FBRVk7RUFDRywyQkFBQTtBQUFmO0FBR1k7RUFDRyxpQ0FBQTtFQUNBLDhCQUFBO0FBRGY7QUFJWTtFQUNHLGdDQUFBO0VBQ0EsNkJBQUE7QUFGZjtBQU9NO0VBQ0csYUFBQTtBQUxUIiwic291cmNlc0NvbnRlbnQiOlsiLm1hcC1iYXNlLWxheWVyLXRvZ2dsZSB7XHJcbiAgIGNvbG9yOiBibGFjaztcclxuICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICB6LWluZGV4OiAxMDAwO1xyXG4gICBib3R0b206IHZhcigtLW1hcC1sYXllci10b2dnbGUtY29udHJvbC1ib3R0b20pO1xyXG4gICBsZWZ0OiB2YXIoLS1tYXAtbGF5ZXItdG9nZ2xlLWNvbnRyb2wtbGVmdCk7XHJcbiAgIHJpZ2h0OiB2YXIoLS1tYXAtbGF5ZXItdG9nZ2xlLWNvbnRyb2wtcmlnaHQsIDEwcHgpO1xyXG4gICB0b3A6IHZhcigtLW1hcC1sYXllci10b2dnbGUtY29udHJvbC10b3AsIDIwcHgpO1xyXG4gICBmb250LXNpemU6IHZhcigtLW1hcC1sYXllci10b2dnbGUtY29udHJvbC1mb250LXNpemUsIDEzcHgpO1xyXG5cclxuICAgLnN3aXRjaCB7XHJcbiAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xyXG4gICAgICB3aWR0aDogdmFyKC0tbWFwLWxheWVyLXRvZ2dsZS1jb250cm9sLXdpZHRoLCAxNDBweCk7XHJcbiAgICAgIGhlaWdodDogdmFyKC0tbWFwLWxheWVyLXRvZ2dsZS1jb250cm9sLWhlaWdodCwgMzBweCk7XHJcblxyXG4gICAgICAuc2xpZGVyLnJvdW5kIHtcclxuICAgICAgICAgZGlzcGxheTogZmxleDtcclxuICAgICAgICAganVzdGlmeS1jb250ZW50OiBzdHJldGNoO1xyXG4gICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG5cclxuICAgICAgICAgc3BhbiB7XHJcbiAgICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDhweDtcclxuICAgICAgICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gICAgICAgICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XHJcbiAgICAgICAgICAgIGxpbmUtaGVpZ2h0OiAzMHB4O1xyXG4gICAgICAgICAgICBmb250LXNpemU6IDEycHg7XHJcbiAgICAgICAgICAgIGN1cnNvcjogcG9pbnRlcjtcclxuICAgICAgICAgICAgZmxleDogMSAxIDcwcHg7XHJcbiAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xyXG4gICAgICAgICAgICBjb2xvcjogYmxhY2s7XHJcbiAgICAgICAgICAgIC8vIGJvcmRlcjogc29saWQgMXB4IGNvbG9ycy4kbXV0ZWQ7XHJcbiAgICAgICAgICAgIG92ZXJmbG93OiBoaWRkZW47XHJcbiAgICAgICAgICAgIHRleHQtb3ZlcmZsb3c6IGVsbGlwc2lzO1xyXG4gICAgICAgICAgICB3aGl0ZS1zcGFjZTogbm93cmFwO1xyXG4gICAgICAgICAgICBwYWRkaW5nOiAzcHggOHB4O1xyXG5cclxuICAgICAgICAgICAgJi5hY3RpdmUge1xyXG4gICAgICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiBnYWluc2Jvcm87XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICY6Zmlyc3QtY2hpbGQge1xyXG4gICAgICAgICAgICAgICBib3JkZXItYm90dG9tLXJpZ2h0LXJhZGl1czogdW5zZXQ7XHJcbiAgICAgICAgICAgICAgIGJvcmRlci10b3AtcmlnaHQtcmFkaXVzOiB1bnNldDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgJjpsYXN0LWNoaWxkIHtcclxuICAgICAgICAgICAgICAgYm9yZGVyLWJvdHRvbS1sZWZ0LXJhZGl1czogdW5zZXQ7XHJcbiAgICAgICAgICAgICAgIGJvcmRlci10b3AtbGVmdC1yYWRpdXM6IHVuc2V0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgaW5wdXQge1xyXG4gICAgICAgICBkaXNwbGF5OiBub25lO1xyXG4gICAgICB9XHJcbiAgIH1cclxufVxyXG4iXSwic291cmNlUm9vdCI6IiJ9 */"],
    encapsulation: 2
  });
}

/***/ }),

/***/ 78341:
/*!****************************************************************************!*\
  !*** ./src/app/shared/components/map-layer-toggle-control/layer-toggle.ts ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LayerToggle: () => (/* binding */ LayerToggle)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _artstesh_maps__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @artstesh/maps */ 86672);
/* harmony import */ var ol_control__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ol/control */ 99270);



/**
 * The LayerToggle class is a UI control component that allows users to toggle between
 * different map layers, specifically satellite and terrain layers. It integrates with the
 * MapPostboyService to manage changes in the selected map layer.
 *
 * Extends the Control class to function as a map control.
 */
class LayerToggle extends ol_control__WEBPACK_IMPORTED_MODULE_1__["default"] {
  changeEmitter = new _angular_core__WEBPACK_IMPORTED_MODULE_2__.EventEmitter();
  current = _artstesh_maps__WEBPACK_IMPORTED_MODULE_0__.MapLyrs.Terrain;
  /**
   * Constructs a new instance of the class.
   * Initializes a toggle switch UI for selecting between satellite and terrain map layers.
   *
   * @param {MapPostboyService} postboy - A service used to handle map-related communication and operations.
   */
  constructor(opt_options) {
    const label = document.createElement('label');
    label.className = 'switch';
    const input = document.createElement('input');
    input.type = 'checkbox';
    input.id = 'togBtn';
    label.appendChild(input);
    const container = document.createElement('div');
    container.className = 'slider round';
    const optSatellite = document.createElement('span');
    optSatellite.className = 'off';
    optSatellite.innerHTML = 'Satellite';
    const optTerrain = document.createElement('span');
    optTerrain.className = 'on';
    optTerrain.innerHTML = 'Terrain';
    container.appendChild(optSatellite);
    container.appendChild(optTerrain);
    label.appendChild(container);
    const element = document.createElement('div');
    element.className = 'map-base-layer-toggle ol-unselectable ol-control';
    element.appendChild(label);
    super({
      element: element,
      target: (opt_options || {}).target
    });
    this.optionOn = optTerrain;
    this.optionOff = optSatellite;
    input.checked = this.current == _artstesh_maps__WEBPACK_IMPORTED_MODULE_0__.MapLyrs.Terrain;
    this.optionOn.classList.add('active');
    optTerrain.addEventListener('click', () => {
      this.changeEmitter.next(_artstesh_maps__WEBPACK_IMPORTED_MODULE_0__.MapLyrs.Terrain);
      this.optionOff.classList.remove('active');
      this.optionOn.classList.add('active');
      if (input.checked) input.checked = !input.checked;
    }, false);
    optSatellite.addEventListener('click', () => {
      this.changeEmitter.next(_artstesh_maps__WEBPACK_IMPORTED_MODULE_0__.MapLyrs.Satellite);
      this.optionOn.classList.remove('active');
      this.optionOff.classList.add('active');
      if (!input.checked) input.checked = !input.checked;
    }, false);
  }
  optionOn;
  optionOff;
}

/***/ }),

/***/ 8349:
/*!********************************************************************************!*\
  !*** ./src/app/shared/freezed-screen/circle-loader/circle-loader.component.ts ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CircleLoaderComponent: () => (/* binding */ CircleLoaderComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 37580);

/**
 * CircleLoaderComponent is a reusable Angular components that displays a circular loading indicator.
 *
 * This components is typically used to indicate loading or processing state in an application,
 * providing a visual cue to users that some background activity is taking place.
 *
 * The components is standalone and can be used in various parts of the application
 * without requiring additional configuration.
 *
 * Attributes:
 * - direction: Determines the direction of the loader's animation.
 *              Accepted values are 'clockwise' and 'counterclockwise'.
 *              Defaults to 'clockwise'.
 */
class CircleLoaderComponent {
  /**
   * Represents the direction of rotation.
   * It can either be 'clockwise' or 'counterclockwise'.
   *
   * @type {'clockwise' | 'counterclockwise'}
   * @default 'clockwise'
   */
  direction = 'clockwise';
  static ɵfac = function CircleLoaderComponent_Factory(t) {
    return new (t || CircleLoaderComponent)();
  };
  static ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
    type: CircleLoaderComponent,
    selectors: [["app-circle-loader"]],
    inputs: {
      direction: "direction"
    },
    standalone: true,
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵStandaloneFeature"]],
    decls: 3,
    vars: 3,
    consts: [["width", "160", "height", "160", "viewBox", "0 0 160 160"], ["r", "70", "cx", "80", "cy", "80", "fill", "transparent", "stroke", "#34c759", "stroke-width", "12px", "stroke-dasharray", "439.6px", "stroke-dashoffset", "109.9px"]],
    template: function CircleLoaderComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "svg", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2, "circle", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassMapInterpolate1"]("circle-loader-block  ", ctx.direction, "");
      }
    },
    styles: ["@keyframes _ngcontent-%COMP%_clockwise {\n  from {\n    transform: rotate(-360deg);\n  }\n  to {\n    transform: rotate(360deg);\n  }\n}\n@keyframes _ngcontent-%COMP%_counterclockwise {\n  from {\n    transform: rotate(360deg);\n  }\n  to {\n    transform: rotate(-360deg);\n  }\n}\n.circle-loader-block[_ngcontent-%COMP%] {\n  animation-duration: 5s;\n  animation-timing-function: linear;\n  animation-iteration-count: infinite;\n  animation-name: _ngcontent-%COMP%_clockwise;\n  border-bottom: none;\n  background-color: transparent;\n  width: 100%;\n  height: 100%;\n}\n.circle-loader-block.clockwise[_ngcontent-%COMP%] {\n  animation-name: _ngcontent-%COMP%_clockwise;\n}\n.circle-loader-block.counterclockwise[_ngcontent-%COMP%] {\n  animation-name: _ngcontent-%COMP%_counterclockwise;\n}\n.circle-loader-block[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvc2hhcmVkL2ZyZWV6ZWQtc2NyZWVuL2NpcmNsZS1sb2FkZXIvY2lyY2xlLWxvYWRlci5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQTtFQUNHO0lBQ0csMEJBQUE7RUFESjtFQUdDO0lBQ0cseUJBQUE7RUFESjtBQUNGO0FBR0E7RUFDRztJQUNHLHlCQUFBO0VBREo7RUFHQztJQUNHLDBCQUFBO0VBREo7QUFDRjtBQUlBO0VBQ0csc0JBQUE7RUFDQSxpQ0FBQTtFQUNBLG1DQUFBO0VBQ0EseUJBQUE7RUFDQSxtQkFBQTtFQUNBLDZCQUFBO0VBQ0EsV0FBQTtFQUNBLFlBQUE7QUFGSDtBQUlHO0VBQ0cseUJBQUE7QUFGTjtBQUtHO0VBQ0csZ0NBQUE7QUFITjtBQU1HO0VBQ0csV0FBQTtFQUNBLFlBQUE7QUFKTiIsInNvdXJjZXNDb250ZW50IjpbIkB1c2UgJ3Nhc3M6bWF0aCc7XHJcblxyXG5Aa2V5ZnJhbWVzIGNsb2Nrd2lzZSB7XHJcbiAgIGZyb20ge1xyXG4gICAgICB0cmFuc2Zvcm06IHJvdGF0ZSgtMzYwZGVnKTtcclxuICAgfVxyXG4gICB0byB7XHJcbiAgICAgIHRyYW5zZm9ybTogcm90YXRlKDM2MGRlZyk7XHJcbiAgIH1cclxufVxyXG5Aa2V5ZnJhbWVzIGNvdW50ZXJjbG9ja3dpc2Uge1xyXG4gICBmcm9tIHtcclxuICAgICAgdHJhbnNmb3JtOiByb3RhdGUoMzYwZGVnKTtcclxuICAgfVxyXG4gICB0byB7XHJcbiAgICAgIHRyYW5zZm9ybTogcm90YXRlKC0zNjBkZWcpO1xyXG4gICB9XHJcbn1cclxuXHJcbi5jaXJjbGUtbG9hZGVyLWJsb2NrIHtcclxuICAgYW5pbWF0aW9uLWR1cmF0aW9uOiA1cztcclxuICAgYW5pbWF0aW9uLXRpbWluZy1mdW5jdGlvbjogbGluZWFyO1xyXG4gICBhbmltYXRpb24taXRlcmF0aW9uLWNvdW50OiBpbmZpbml0ZTtcclxuICAgYW5pbWF0aW9uLW5hbWU6IGNsb2Nrd2lzZTtcclxuICAgYm9yZGVyLWJvdHRvbTogbm9uZTtcclxuICAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XHJcbiAgIHdpZHRoOiAxMDAlO1xyXG4gICBoZWlnaHQ6IDEwMCU7XHJcblxyXG4gICAmLmNsb2Nrd2lzZSB7XHJcbiAgICAgIGFuaW1hdGlvbi1uYW1lOiBjbG9ja3dpc2U7XHJcbiAgIH1cclxuXHJcbiAgICYuY291bnRlcmNsb2Nrd2lzZSB7XHJcbiAgICAgIGFuaW1hdGlvbi1uYW1lOiBjb3VudGVyY2xvY2t3aXNlO1xyXG4gICB9XHJcblxyXG4gICBzdmcge1xyXG4gICAgICB3aWR0aDogMTAwJTtcclxuICAgICAgaGVpZ2h0OiAxMDAlO1xyXG4gICB9XHJcbn1cclxuIl0sInNvdXJjZVJvb3QiOiIifQ== */"]
  });
}

/***/ }),

/***/ 8345:
/*!***********************************************************!*\
  !*** ./src/app/shared/freezed-screen/loader.component.ts ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LoaderComponent: () => (/* binding */ LoaderComponent)
/* harmony export */ });
/* harmony import */ var _shared_components_destructible_destructible_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @shared/components/destructible/destructible.component */ 47231);
/* harmony import */ var _circle_loader_circle_loader_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./circle-loader/circle-loader.component */ 8349);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 37580);



/**
 * Component representing a frozen screen state.
 */
class LoaderComponent extends _shared_components_destructible_destructible_component__WEBPACK_IMPORTED_MODULE_0__.DestructibleComponent {
  size = 48;
  static ɵfac = /*@__PURE__*/(() => {
    let ɵLoaderComponent_BaseFactory;
    return function LoaderComponent_Factory(t) {
      return (ɵLoaderComponent_BaseFactory || (ɵLoaderComponent_BaseFactory = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetInheritedFactory"](LoaderComponent)))(t || LoaderComponent);
    };
  })();
  static ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({
    type: LoaderComponent,
    selectors: [["app-loader"]],
    inputs: {
      size: "size"
    },
    standalone: true,
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵInheritDefinitionFeature"], _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵStandaloneFeature"]],
    decls: 4,
    vars: 18,
    consts: [[1, "loader-wrapper"], ["direction", "clockwise"], ["direction", "counterclockwise"]],
    template: function LoaderComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](1, "app-circle-loader", 1)(2, "app-circle-loader", 2)(3, "app-circle-loader", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵstyleProp"]("width", ctx.size, "px")("height", ctx.size, "px")("font-size", ctx.size, "px");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵstyleProp"]("width", ctx.size * 0.6, "px")("height", ctx.size * 0.6, "px")("font-size", ctx.size * 0.6, "px");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵstyleProp"]("width", ctx.size * 0.3, "px")("height", ctx.size * 0.3, "px")("font-size", ctx.size * 0.3, "px");
      }
    },
    dependencies: [_circle_loader_circle_loader_component__WEBPACK_IMPORTED_MODULE_1__.CircleLoaderComponent],
    styles: [".loader-wrapper[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  z-index: 100;\n  background-color: rgba(202, 202, 202, 0.2509803922);\n  width: 100%;\n  height: 100%;\n}\n.loader-wrapper[_ngcontent-%COMP%]   app-circle-loader[_ngcontent-%COMP%] {\n  position: absolute;\n  font-size: unset;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvc2hhcmVkL2ZyZWV6ZWQtc2NyZWVuL2xvYWRlci5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNHLGFBQUE7RUFDQSx1QkFBQTtFQUNBLG1CQUFBO0VBQ0EsWUFBQTtFQUNBLG1EQUFBO0VBQ0EsV0FBQTtFQUNBLFlBQUE7QUFDSDtBQUNHO0VBQ0csa0JBQUE7RUFDQSxnQkFBQTtBQUNOIiwic291cmNlc0NvbnRlbnQiOlsiLmxvYWRlci13cmFwcGVyIHtcclxuICAgZGlzcGxheTogZmxleDtcclxuICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgIHotaW5kZXg6IDEwMDtcclxuICAgYmFja2dyb3VuZC1jb2xvcjogI2NhY2FjYTQwO1xyXG4gICB3aWR0aDogMTAwJTtcclxuICAgaGVpZ2h0OiAxMDAlO1xyXG5cclxuICAgYXBwLWNpcmNsZS1sb2FkZXIge1xyXG4gICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICAgIGZvbnQtc2l6ZTogdW5zZXQ7XHJcbiAgIH1cclxufVxyXG4iXSwic291cmNlUm9vdCI6IiJ9 */"]
  });
}

/***/ }),

/***/ 21577:
/*!****************************************************************************!*\
  !*** ./src/app/shared/messages/executors/compare-map-position.executor.ts ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CompareMapPositionExecutor: () => (/* binding */ CompareMapPositionExecutor),
/* harmony export */   CompareMapPositionExecutorHandler: () => (/* binding */ CompareMapPositionExecutorHandler)
/* harmony export */ });
/* harmony import */ var _artstesh_postboy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @artstesh/postboy */ 33518);
/* harmony import */ var _artstesh_postboy__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_artstesh_postboy__WEBPACK_IMPORTED_MODULE_0__);

class CompareMapPositionExecutor extends _artstesh_postboy__WEBPACK_IMPORTED_MODULE_0__.PostboyExecutor {
  next;
  prev;
  static ID = '99890e67-ca44-4533-909e-a0d27d29ab9d';
  constructor(next, prev) {
    super();
    this.next = next;
    this.prev = prev;
  }
}
class CompareMapPositionExecutorHandler extends _artstesh_postboy__WEBPACK_IMPORTED_MODULE_0__.PostboyExecutionHandler {
  handle(executor) {
    const position = executor.next;
    var result = true;
    if (executor.prev) {
      const zoomChanged = Math.abs(position.zoom - executor.prev.zoom) >= 1;
      const anchorChanged = this.anchorCompare(executor.next, executor.prev);
      result = anchorChanged || zoomChanged;
    }
    return result;
  }
  anchorCompare(position, prev) {
    let change = 0;
    if (position.zoom >= 15) change = .00003;
    if (position.zoom >= 14) change = .0001;
    if (position.zoom >= 13) change = .0003;
    if (position.zoom >= 12) change = .001;
    if (position.zoom >= 11) change = .002;
    return Math.abs(position.extent[0] - prev.extent[0]) >= change || Math.abs(position.extent[1] - prev.extent[1]) >= change;
  }
}

/***/ }),

/***/ 1769:
/*!****************************************************************!*\
  !*** ./src/app/shared/services/component-satellite.service.ts ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ComponentSatelliteService: () => (/* binding */ ComponentSatelliteService)
/* harmony export */ });
/**
 * An abstract class that provides a base structure for managing and cleaning up subscriptions.
 * Designed to prevent memory leaks by ensuring all subscriptions are unsubscribed when no longer needed.
 */
class ComponentSatelliteService {
  subs = [];
  /**
   * Unsubscribes from all subscriptions stored in the `subs` array.
   * This method iterates through each subscription and calls the `unsubscribe` method
   * to ensure proper cleanup and prevent memory leaks.
   *
   * @return {void} No return value.
   */
  down() {
    this.subs.forEach(s => s.unsubscribe());
  }
}

/***/ }),

/***/ 45312:
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   environment: () => (/* binding */ environment)
/* harmony export */ });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const environment = {
  production: false,
  fields: 'https://localhost:5002',
  geo: 'https://localhost:5001'
};

/***/ }),

/***/ 84429:
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/platform-browser */ 80436);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app/app.module */ 50635);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./environments/environment */ 45312);




if (_environments_environment__WEBPACK_IMPORTED_MODULE_1__.environment.production) {
  (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.enableProdMode)();
}
_angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__.platformBrowser().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_0__.AppModule).catch(err => console.error(err));

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["vendor"], () => (__webpack_exec__(84429)));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=main.2371391d416e1589.js.map