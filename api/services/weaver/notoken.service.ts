import { BaseApiService } from "./base.service";
import { HeaderRequest } from "./types/general";

/**
 * API service for endpoints that don't require authentication
 */
export class WeaverNoTokenApiService extends BaseApiService {
  constructor(headers?: HeaderRequest) {
    super({
      headers,
    });
  }
}
