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
var User_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const comment_entity_1 = require("./comment.entity");
const like_entity_1 = require("./like.entity");
const post_entity_1 = require("./post.entity");
let User = User_1 = class User extends typeorm_1.BaseEntity {
};
__decorate([
    (0, type_graphql_1.Field)(() => String),
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], User.prototype, "id", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.Int, { nullable: true }),
    (0, typeorm_1.Column)({ nullable: true, unique: true }),
    __metadata("design:type", Number)
], User.prototype, "githubId", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "displayName", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.Int),
    (0, typeorm_1.RelationCount)((user) => user.comments),
    __metadata("design:type", Number)
], User.prototype, "commentCount", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.Int),
    (0, typeorm_1.RelationCount)((user) => user.posts),
    __metadata("design:type", Number)
], User.prototype, "postCount", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [post_entity_1.Post], { nullable: true }),
    (0, typeorm_1.OneToMany)(() => post_entity_1.Post, (post) => post.user, {
        nullable: true,
    }),
    __metadata("design:type", Array)
], User.prototype, "posts", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [comment_entity_1.Comment]),
    (0, typeorm_1.OneToMany)(() => comment_entity_1.Comment, (comment) => comment.user, { nullable: true }),
    __metadata("design:type", Array)
], User.prototype, "comments", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [comment_entity_1.Comment]),
    (0, typeorm_1.OneToMany)(() => comment_entity_1.Comment, (comment) => comment.repliedUser, {
        nullable: true,
    }),
    __metadata("design:type", Array)
], User.prototype, "replies", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [like_entity_1.Like]),
    (0, typeorm_1.OneToMany)(() => like_entity_1.Like, (like) => like.user),
    __metadata("design:type", Array)
], User.prototype, "likes", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.Int),
    (0, typeorm_1.RelationCount)((user) => user.likes),
    __metadata("design:type", Number)
], User.prototype, "likeCount", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => Boolean, { nullable: true }),
    __metadata("design:type", Boolean)
], User.prototype, "followed", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => Boolean, { nullable: true }),
    __metadata("design:type", Boolean)
], User.prototype, "follower", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [User_1], { nullable: true }),
    (0, typeorm_1.JoinTable)(),
    (0, typeorm_1.ManyToMany)(() => User_1, (user) => user.following),
    __metadata("design:type", Array)
], User.prototype, "followers", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.Int),
    (0, typeorm_1.RelationCount)((user) => user.followers),
    __metadata("design:type", Number)
], User.prototype, "followersCount", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [User_1], { nullable: true }),
    (0, typeorm_1.ManyToMany)(() => User_1, (user) => user.followers),
    __metadata("design:type", Array)
], User.prototype, "following", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.Int),
    (0, typeorm_1.RelationCount)((user) => user.following),
    __metadata("design:type", Number)
], User.prototype, "followingCount", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => Boolean),
    __metadata("design:type", Boolean)
], User.prototype, "isMe", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => Date),
    (0, typeorm_1.Column)(),
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], User.prototype, "createdAt", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => Date),
    (0, typeorm_1.Column)(),
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], User.prototype, "updatedAt", void 0);
User = User_1 = __decorate([
    (0, type_graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)()
], User);
exports.User = User;
//# sourceMappingURL=user.entity.js.map