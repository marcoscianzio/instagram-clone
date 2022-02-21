"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_entity_1 = require("../../entity/user.entity");
const type_graphql_1 = require("type-graphql");
let UserQuery = class UserQuery {
    isMe(user, { req }) {
        return user.id === req.session.userId ? true : false;
    }
    follower(user, { req }) {
        return user.following.some((e) => e.id === req.session.userId)
            ? true
            : false;
    }
    followed(user, { req }) {
        return user.followers.some((e) => e.id === req.session.userId)
            ? true
            : false;
    }
    async users() {
        return await user_entity_1.User.find({
            relations: ["posts", "posts.images"],
        });
    }
    async user(id) {
        const user = await user_entity_1.User.findOne(id, {
            relations: [
                "posts",
                "posts.images",
                "followers",
                "following",
                "followers.followers",
                "following.followers",
            ],
        });
        if (!user) {
            return undefined;
        }
        return user;
    }
    async me({ req }) {
        if (!req.session.userId) {
            return undefined;
        }
        else {
            return await user_entity_1.User.findOne(req.session.userId, {
                relations: ["posts", "posts.images", "followers", "following"],
            });
        }
    }
};
__decorate([
    (0, type_graphql_1.FieldResolver)(),
    __param(0, (0, type_graphql_1.Root)()),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User, Object]),
    __metadata("design:returntype", void 0)
], UserQuery.prototype, "isMe", null);
__decorate([
    (0, type_graphql_1.FieldResolver)(),
    __param(0, (0, type_graphql_1.Root)()),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User, Object]),
    __metadata("design:returntype", void 0)
], UserQuery.prototype, "follower", null);
__decorate([
    (0, type_graphql_1.FieldResolver)(),
    __param(0, (0, type_graphql_1.Root)()),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User, Object]),
    __metadata("design:returntype", void 0)
], UserQuery.prototype, "followed", null);
__decorate([
    (0, type_graphql_1.Query)(() => [user_entity_1.User]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserQuery.prototype, "users", null);
__decorate([
    (0, type_graphql_1.Query)(() => user_entity_1.User, { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserQuery.prototype, "user", null);
__decorate([
    (0, type_graphql_1.Query)(() => user_entity_1.User, { nullable: true }),
    __param(0, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserQuery.prototype, "me", null);
UserQuery = __decorate([
    (0, type_graphql_1.Resolver)(user_entity_1.User)
], UserQuery);
//# sourceMappingURL=user.query.js.map