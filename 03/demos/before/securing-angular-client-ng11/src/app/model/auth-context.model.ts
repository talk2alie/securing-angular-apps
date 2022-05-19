import { SimpleClaim } from "./simple-claim.model";
import { UserProfile } from "./user-profile";

export class AuthContext {
    claims: SimpleClaim[];
    userProfile: UserProfile;
}