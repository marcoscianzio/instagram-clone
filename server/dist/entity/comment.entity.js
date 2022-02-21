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
var Comment_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Comment = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const like_entity_1 = require("./like.entity");
const post_entity_1 = require("./post.entity");
const user_entity_1 = require("./user.entity");
let Comment = Comment_1 = class Comment extends typeorm_1.BaseEntity {
};
__decorate([
    (0, type_graphql_1.Field)(() => String),
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], Comment.prototype, "id", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Comment.prototype, "postId", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Comment.prototype, "userId", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String, { nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Comment.prototype, "repliedUserId", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String, { nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Comment.prototype, "parentCommentId", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [Comment_1], { nullable: true }),
    (0, typeorm_1.OneToMany)(() => Comment_1, (category) => category.parentComment),
    __metadata("design:type", Array)
], Comment.prototype, "childrenComment", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => user_entity_1.User, { nullable: true }),
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.replies),
    __metadata("design:type", user_entity_1.User)
], Comment.prototype, "repliedUser", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.Int),
    __metadata("design:type", Number)
], Comment.prototype, "childrenCount", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => Comment_1, { nullable: true }),
    (0, typeorm_1.ManyToOne)(() => Comment_1, (comment) => comment.childrenComment),
    __metadata("design:type", Comment)
], Comment.prototype, "parentComment", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Comment.prototype, "content", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => post_entity_1.Post),
    (0, typeorm_1.ManyToOne)(() => post_entity_1.Post, (post) => post.comments),
    __metadata("design:type", post_entity_1.Post)
], Comment.prototype, "post", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => user_entity_1.User),
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.comments),
    __metadata("design:type", user_entity_1.User)
], Comment.prototype, "user", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.Int),
    (0, typeorm_1.RelationCount)((comment) => comment.likes),
    __metadata("design:type", Number)
], Comment.prototype, "likeCount", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => Boolean),
    __metadata("design:type", Boolean)
], Comment.prototype, "liked", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [like_entity_1.Like], { nullable: true }),
    (0, typeorm_1.OneToMany)(() => like_entity_1.Like, (like) => like.comment, { nullable: true }),
    __metadata("design:type", Array)
], Comment.prototype, "likes", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => Date),
    (0, typeorm_1.Column)(),
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Comment.prototype, "createdAt", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => Date),
    (0, typeorm_1.Column)(),
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Comment.prototype, "updatedAt", void 0);
Comment = Comment_1 = __decorate([
    (0, type_graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)()
], Comment);
exports.Comment = Comment;
//# sourceMappingURL=comment.entity.js.map