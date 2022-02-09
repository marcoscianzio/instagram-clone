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
const Post_1 = require("../entity/Post");
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
let PostResolver = class PostResolver {
    async userPosts(authorId) {
        const posts = await typeorm_1.getConnection()
            .createQueryBuilder()
            .select("post")
            .from(Post_1.Post, "post")
            .innerJoinAndSelect("post.author", "user")
            .where("post.authorId = :authorId", { authorId })
            .getMany();
        if (!posts) {
            return undefined;
        }
        return posts;
    }
    async createPost(content, image, { req }) {
        const post = Post_1.Post.create({
            content,
            image,
            authorId: req.session.userId,
            author: req.session.user,
        }).save();
        return post;
    }
};
__decorate([
    type_graphql_1.Query(() => [Post_1.Post]),
    __param(0, type_graphql_1.Arg("authorId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PostResolver.prototype, "userPosts", null);
__decorate([
    type_graphql_1.Mutation(() => Post_1.Post),
    __param(0, type_graphql_1.Arg("content")),
    __param(1, type_graphql_1.Arg("image")),
    __param(2, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], PostResolver.prototype, "createPost", null);
PostResolver = __decorate([
    type_graphql_1.Resolver(Post_1.Post)
], PostResolver);
exports.PostResolver = PostResolver;
//# sourceMappingURL=Post.js.map