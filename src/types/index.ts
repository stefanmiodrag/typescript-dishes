export interface DOMEvent<T extends EventTarget> extends Event {
    target: T
}

export interface IState {
    name: string,
    type: string,
}

export interface IDish {
    _id: string,
    name: string,
    type: string,
}