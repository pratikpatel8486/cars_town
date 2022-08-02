import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class GlobalStateService {
	private _data: any = new Subject<Object>();
	private _dataStream$ = this._data.asObservable();
	private _subscriptions: Map<string, Array<Function>> = new Map<string, Array<Function>>();
	constructor() {
		this._dataStream$.subscribe((data: any) =>
			this._onEvent(data)
		);
	}

	notifyDataChanged(event: string, value: any) {
		const current = this._data[event];
		if (current !== value) {
			this._data[event] = value;
			this._data.next({ event: event, data: this._data[event] });
		}
	}

	notifyDataChangedDuplicate(event: string, value: any) {
		const current = this._data[event];
		this._data[event] = value;
		this._data.next({ event: event, data: this._data[event] });
	}

	subscribe(event: string, callback: Function) {
		const subscribers = this._subscriptions.get(event) || [];
		subscribers.push(callback);
		this._subscriptions.set(event, subscribers);
	}

	unsubscribe(event: string) {
		this._subscriptions.delete(event);
	}

	_onEvent(data: any) {
		const subscribers = this._subscriptions.get(data['event']) || [];
		subscribers.forEach((callback) => {
			callback.call(null, data['data']);
		});
	}
}
