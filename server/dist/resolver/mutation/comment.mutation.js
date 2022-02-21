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
const comment_input_1 = require("../../input/comment.input");
const type_graphql_1 = require("type-graphql");
const comment_entity_1 = require("../../entity/comment.entity");
const typeorm_1 = require("typeorm");
const post_entity_1 = require("../../entity/post.entity");
const user_entity_1 = require("../../entity/user.entity");
let CommentMutation = class CommentMutation {
    async createComment({ postId, content, repliedUserId, parentCommentId }, { req }) {
        const post = await post_entity_1.Post.findOne(postId);
        if (!post) {
            throw new Error("post doesn't exist");
        }
        const comment = new comment_entity_1.Comment();
        comment.postId = post.id;
        comment.userId = req.session.userId;
        comment.content = content;
        if (repliedUserId) {
            const userReplied = await user_entity_1.User.findOne({ id: repliedUserId });
            if (!userReplied) {
                throw new Error("parent comment doesn't exist");
            }
            comment.repliedUserId = repliedUserId;
        }
        if (parentCommentId) {
            const parentComment = await comment_entity_1.Comment.findOne({ id: parentCommentId });
            if (!parentComment) {
                throw new Error("parent comment doesn't exist");
            }
            comment.parentCommentId = parentCommentId;
            comment.parentComment = parentComment;
        }
        return (0, typeorm_1.getConnection)().manager.save(comment);
    }
};
__decorate([
    (0, type_graphql_1.Mutation)(() => comment_entity_1.Comment),
    __param(0, (0, type_graphql_1.Arg)("values")),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [comment_input_1.CommentInput, Object]),
    __metadata("design:returntype", Promise)
], CommentMutation.prototype, "createComment", null);
CommentMutation = __decorate([
    (0, type_graphql_1.Resolver)()
], CommentMutation);
//# sourceMappingURL=comment.mutation.js.map