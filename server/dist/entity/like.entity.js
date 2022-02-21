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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Like = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const comment_entity_1 = require("./comment.entity");
const post_entity_1 = require("./post.entity");
const user_entity_1 = require("./user.entity");
let Like = class Like extends typeorm_1.BaseEntity {
};
__decorate([
    (0, type_graphql_1.Field)(() => String),
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], Like.prototype, "id", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String, { nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Like.prototype, "postId", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String, { nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Like.prototype, "commentId", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Like.prototype, "userId", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => user_entity_1.User),
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.likes),
    __metadata("design:type", user_entity_1.User)
], Like.prototype, "user", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => comment_entity_1.Comment, { nullable: true }),
    (0, typeorm_1.ManyToOne)(() => comment_entity_1.Comment, (comment) => comment.likes, {
        nullable: true,
    }),
    __metadata("design:type", comment_entity_1.Comment)
], Like.prototype, "comment", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => post_entity_1.Post, { nullable: true }),
    (0, typeorm_1.ManyToOne)(() => post_entity_1.Post, (post) => post.likes, {
        nullable: true,
    }),
    __metadata("design:type", post_entity_1.Post)
], Like.prototype, "post", void 0);
Like = __decorate([
    (0, type_graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)()
], Like);
exports.Like = Like;
//# sourceMappingURL=like.entity.js.map