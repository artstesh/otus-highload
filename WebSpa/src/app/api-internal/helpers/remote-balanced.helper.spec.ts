import { Forger } from '@artstesh/forger';
import { should } from '@artstesh/it-should';
import { PostboyServiceMock } from '@artstesh/postboy';
import { RemoteBalancedHelper } from '@root/src/app/api-internal/helpers/remote-balanced.helper';
import { RequestQueueFactory } from '@root/src/app/api-internal/helpers/request-queue.factory';
import { RemoteHelperSettings } from '@root/src/app/api-internal/models/generic-service/generic-remote-service-option-item';
import { QueryQueue } from '@root/src/app/api-internal/models/query-queue.model';
import { RemoteServiceRequest } from '@root/src/app/api-internal/models/remote-service-request';
import { ReplaySubject, Subject } from 'rxjs';
import { anything, instance, mock, reset, verify, when } from 'ts-mockito';
import any = jasmine.any;

class TestQuery extends RemoteServiceRequest<string> {
   static readonly ID = 'TestQuery';
   constructor(public forceLoad = false) {
      super(forceLoad);
   }
}

describe('RemoteBalancedHelper', () => {
   let helper: RemoteBalancedHelper<TestQuery, string, string>;
   const postboy = new PostboyServiceMock();
   let load: ReplaySubject<string>;
   const queueFactory = mock(RequestQueueFactory);
   const queue = mock(QueryQueue);

   beforeEach(() => {
      when(queueFactory.produce<TestQuery>(anything())).thenReturn(instance(queue));
      when(queue.reset()).thenReturn(instance(queue));
      postboy.record(TestQuery, new Subject<TestQuery>());
      load = new ReplaySubject<string>();
   });

   afterEach(() => {
      reset(queue);
      reset(queueFactory);
      postboy.reset();
      expect().nothing();
   });

   it('should subscribe TestQuery on up', () => {
      helper = new RemoteBalancedHelper(
         postboy,
         instance(queueFactory),
         new RemoteHelperSettings(TestQuery, q => load)
      );
      //
      helper.up();
      //
      should().true(postboy.subscribed(TestQuery.name, 1));
   });

   it('empty requests - no reset', () => {
      helper = new RemoteBalancedHelper(
         postboy,
         instance(queueFactory),
         new RemoteHelperSettings(TestQuery, q => load)
      );
      //
      helper.reset();
      //
      verify(queue.reset()).never();
   });

   describe('load function', () => {
      beforeEach(() => {
         when(queue.tryFinish(anything())).thenReturn(false);
         postboy.record(TestQuery, new Subject<TestQuery>());
         helper = new RemoteBalancedHelper(
            postboy,
            instance(queueFactory),
            new RemoteHelperSettings(TestQuery, q => load)
         );
         helper.up();
      });

      it('success', () => {
         const expected = Forger.create<string>()!;
         helper.execute(new TestQuery());
         //
         load.next(expected);
         //
         verify(queue.finish(expected)).once();
      });
   });

   describe('balancing', () => {
      let counter = 0;

      beforeEach(() => {
         counter = 0;
         postboy.record(TestQuery, new Subject<TestQuery>());
         helper = new RemoteBalancedHelper(
            postboy,
            instance(queueFactory),
            new RemoteHelperSettings(TestQuery, q => {
               ++counter;
               return load;
            })
         );
         helper.up();
      });

      it('one load for all queries', () => {
         when(queue.tryFinish(anything())).thenReturn(false).thenReturn(true);
         const numberOfQueues = Forger.create<number>({ numberMin: 3, numberMax: 10 })!;
         //
         Array.from({ length: numberOfQueues }).forEach(() => helper.execute(new TestQuery()));
         load.next(Forger.create<string>()!);
         //
         should().number(counter).equals(1);
      });

      it('one load for every forced query', () => {
         const numberOfQueues = Forger.create<number>({ numberMin: 3, numberMax: 10 })!;
         load.next(Forger.create<string>()!);
         //
         Array.from({ length: numberOfQueues }).forEach(() => helper.execute(new TestQuery(true)));
         //
         should().number(counter).equals(numberOfQueues);
      });

      it('reset on forced query', () => {
         helper.execute(new TestQuery(true));
         //
         verify(queue.reset()).once();
      });
   });
});
