import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { SecurityContext } from '@angular/core';

@Injectable()
export class SanitizerService {

    constructor(private domSanitizer: DomSanitizer) { }

    sanitizeInput(payload) {
        return this.domSanitizer.sanitize(SecurityContext.HTML, payload);
    }

}
