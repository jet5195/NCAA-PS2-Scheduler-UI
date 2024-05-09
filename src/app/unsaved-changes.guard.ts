import {CanDeactivateFn} from '@angular/router';
import {Observable} from "rxjs";

export interface ComponentCanDeactivate {
  canDeactivate: () => boolean | Observable<boolean>;
}

export const unsavedChangesGuard: CanDeactivateFn<unknown> = (component: ComponentCanDeactivate, currentRoute, currentState, nextState) => {

  return component.canDeactivate() ? true : confirm('You have unsaved changes. Are you sure you want to leave?');
};
