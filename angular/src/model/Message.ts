import { File } from '../model/File';

export class MessageModel {
    files: File[];
    constructor(public message: Object[]) {
        this.files =  message as File[];
    }
}