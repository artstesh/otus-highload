import { Component } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { should } from '@artstesh/it-should';
import { MockBuilder, MockRender } from 'ng-mocks';
import { CircleLoaderComponent } from './circle-loader.component';

@Component({
   template: '<app-circle-loader [direction]="direction"></app-circle-loader>'
})
class TestHostComponent {
   direction: 'clockwise' | 'counterclockwise' = 'clockwise';
}

describe('CircleLoaderComponent', () => {
   let testHostComponent: TestHostComponent;
   let testHostFixture: ComponentFixture<TestHostComponent>;

   beforeEach(async () => {
      return MockBuilder([TestHostComponent, CircleLoaderComponent]);
   });

   beforeEach(() => {
      const fixture = MockRender(TestHostComponent);
      testHostComponent = fixture.componentInstance;
      testHostFixture = fixture;
      testHostFixture.detectChanges();
   });

   afterEach(() => {
      expect().nothing();
   });

   it('should create', () => {
      expect(testHostComponent).toBeTruthy();
   });

   it('should accept "clockwise" as direction input', () => {
      testHostComponent.direction = 'clockwise';
      testHostFixture.detectChanges();
      //
      should().string('clockwise').equals(testHostComponent.direction);
   });

   it('should accept "counterclockwise" as direction input', () => {
      testHostComponent.direction = 'counterclockwise';
      testHostFixture.detectChanges();
      //
      should().string('counterclockwise').equals(testHostComponent.direction);
   });
});
