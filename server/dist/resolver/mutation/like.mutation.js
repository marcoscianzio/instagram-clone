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
const type_graphql_1 = require("type-graphql");
const like_entity_1 = require("../../entity/like.entity");
const typeorm_1 = require("typeorm");
const post_entity_1 = require("../../entity/post.entity");
const comment_entity_1 = require("../../entity/comment.entity");
let LikeMutation = class LikeMutation {
    async like(targetId, type, { req }) {
        const like = new like_entity_1.Like();
        like.userId = req.session.userId;
        if (type === "post") {
            const post = await post_entity_1.Post.findOne(targetId);
            if (!post) {
                return undefined;
            }
            const alreadyExist = await like_entity_1.Like.findOne({
                postId: post.id,
                userId: req.session.userId,
            });
            if (alreadyExist) {
                await like_entity_1.Like.delete(alreadyExist);
                return undefined;
            }
            else {
                like.postId = post.id;
            }
        }
        else if (type == "comment") {
            const comment = await comment_entity_1.Comment.findOne(targetId);
            if (!comment) {
                return undefined;
            }
            const alreadyExist = await like_entity_1.Like.findOne({
                commentId: comment.id,
                userId: req.session.userId,
            });
            if (alreadyExist) {
                await like_entity_1.Like.delete(alreadyExist);
                return undefined;
            }
            else {
                like.commentId = comment.id;
            }
        }
        else {
            return undefined;
        }
        return (0, typeorm_1.getConnection)().manager.save(like);
    }
};
__decorate([
    (0, type_graphql_1.Mutation)(() => like_entity_1.Like, { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)("targetId")),
    __param(1, (0, type_graphql_1.Arg)("type")),
    __param(2, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], LikeMutation.prototype, "like", null);
LikeMutation = __decorate([
    (0, type_graphql_1.Resolver)()
], LikeMutation);
//# sourceMappingURL=like.mutation.js.map