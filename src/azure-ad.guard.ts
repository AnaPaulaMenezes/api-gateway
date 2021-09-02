import { Injectable } from '@nestjs/common';
import { PassportStrategy, AuthGuard } from '@nestjs/passport';
import { BearerStrategy } from 'passport-azure-ad';

const clientID = '0e6bd11b-0eea-4a43-b9ed-3320d4c211ba';
const tenantID = 'eb7cd2bb-5669-4f74-9649-8280e435b766';

/**
 * Extracts ID token from header and validates it.
 */
@Injectable()
export class AzureADStrategy extends PassportStrategy(
    BearerStrategy,
    'azure-ad',
) {
    constructor() {
        super({
            identityMetadata: `https://login.microsoftonline.com/${tenantID}/v2.0/.well-known/openid-configuration`,
            clientID,
        });
    }

    async validate(data) {
        return data;
    }
}

export const AzureADGuard = AuthGuard('azure-ad');
