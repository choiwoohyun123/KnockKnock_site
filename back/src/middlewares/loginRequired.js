import { UnauthorizedError, InternalServerError } from './errorMiddleware.js';
import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';

const jwtOptions = {
    // JWT 토큰의 비밀 키 설정
    secretOrKey: process.env.JWT_SECRET_KEY || 'jwt-secret-key',
    // 토큰 추출 방식 설정
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

passport.use(
    new JwtStrategy(jwtOptions, (jwtPayload, done) => {
        // JWT 토큰으로부터 추출한 userId를 검증하고, 검증 결과를 done 콜백 함수를 통해 전달
        const userId = jwtPayload.userId;
        if (userId) {
            return done(null, userId);
        } else {
            return done(null, false);
        }
    }),
);

function loginRequired(req, res, next) {
    passport.authenticate('jwt', { session: false }, (err, userId) => {
        if (err) {
            throw new InternalServerError('서버 오류가 발생했습니다. 다시 시도해주세요.');
        }

        if (!userId) {
            throw new UnauthorizedError('로그인한 유저만 사용할 수 있는 서비스입니다.');
        }

        req.currentUserId = userId;
        next();
    })(req, res, next);
}

export { loginRequired };
