import { ToastType } from '../enums/toast-type';

export class ToastSetup
{
    public parent?: string;
    public type?: ToastType;
    public message!: string;
    public callback?: () => void;
}
