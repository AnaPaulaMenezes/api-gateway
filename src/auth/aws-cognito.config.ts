import { Injectable } from "@nestjs/common";

@Injectable()
export class AwsCognitoConfig {
    public userPoolId: string = process.env.COGNITO_USER_POOL_ID;
    public clientID: string = process.env.COGNITO_USER_ID;
    public region: string = process.env.AWS_REGION_US_VIRGINIA;
    public authority: string = ""
}