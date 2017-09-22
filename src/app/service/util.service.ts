import {Injectable} from '@angular/core';
import lzs from './compress/lz-string';

@Injectable()
export class lzwService{
    constructor(){}
    encode=(s:string)=>lzs.compressToUTF16(s);
    decode=(s:string)=>lzs.decompressFromUTF16(s);
}
