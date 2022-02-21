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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const post_entity_1 = require("../../entity/post.entity");
const type_graphql_1 = require("type-graphql");
const post_input_1 = require("../../input/post.input");
const image_entity_1 = require("../../entity/image.entity");
const typeorm_1 = require("typeorm");
let PostMutation = class PostMutation {
    async createPost({ images, description }, { req }) {
        var e_1, _a;
        const imageArray = [];
        if (images) {
            try {
                for (var images_1 = __asyncValues(images), images_1_1; images_1_1 = await images_1.next(), !images_1_1.done;) {
                    const element = images_1_1.value;
                    const image = new image_entity_1.Image();
                    image.url = element.url;
                    imageArray.push(image);
                    await (0, typeorm_1.getConnection)().manager.save(image);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (images_1_1 && !images_1_1.done && (_a = images_1.return)) await _a.call(images_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }
        return await post_entity_1.Post.create({
            description,
            images: imageArray,
            userId: req.session.userId,
        }).save({});
    }
};
__decorate([
    (0, type_graphql_1.Mutation)(() => post_entity_1.Post),
    __param(0, (0, type_graphql_1.Arg)("values")),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [post_input_1.PostInput, Object]),
    __metadata("design:returntype", Promise)
], PostMutation.prototype, "createPost", null);
PostMutation = __decorate([
    (0, type_graphql_1.Resolver)(post_entity_1.Post)
], PostMutation);
//# sourceMappingURL=post.mutation.js.map