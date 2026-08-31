import { NotAuthentificatedError } from "../error/NotAuthentificatedError.js";

export function verifyUser (req) {
    if (!req.session.get('user')) {
        throw new NotAuthentificatedError
    }
}