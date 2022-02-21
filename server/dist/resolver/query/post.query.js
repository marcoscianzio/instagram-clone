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
const post_entity_1 = require("../../entity/post.entity");
const type_graphql_1 = require("type-graphql");
let PostQuery = class PostQuery {
    liked(post, { req }) {
        return post.likes.some((e) => e.userId === req.session.userId)
            ? true
            : false;
    }
    isArrayOfImages(post) {
        return post.images.length > 1 ? true : false;
    }
    async posts() {
        return await post_entity_1.Post.find({
            relations: [
                "images",
                "user",
                "likes",
                "likes.user",
                "likes.user.followers",
                "user.followers",
                "user.following",
            ],
            order: {
                createdAt: "DESC",
            },
        });
    }
    async post(id) {
        const post = await post_entity_1.Post.findOne(id, {
            relations: [
                "images",
                "user",
                "likes",
                "likes.user",
                "likes.user.followers",
                "user.followers",
                "user.following",
            ],
        });
        if (!post) {
            return undefined;
        }
        return post;
    }
};
__decorate([
    (0, type_graphql_1.FieldResolver)(),
    __param(0, (0, type_graphql_1.Root)()),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [post_entity_1.Post, Object]),
    __metadata("design:returntype", void 0)
], PostQuery.prototype, "liked", null);
__decorate([
    (0, type_graphql_1.FieldResolver)(),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [post_entity_1.Post]),
    __metadata("design:returntype", void 0)
], PostQuery.prototype, "isArrayOfImages", null);
__decorate([
    (0, type_graphql_1.Query)(() => [post_entity_1.Post]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PostQuery.prototype, "posts", null);
__decorate([
    (0, type_graphql_1.Query)(() => post_entity_1.Post, { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PostQuery.prototype, "post", null);
PostQuery = __decorate([
    (0, type_graphql_1.Resolver)(post_entity_1.Post)
], PostQuery);
//# sourceMappingURL=post.query.js.map