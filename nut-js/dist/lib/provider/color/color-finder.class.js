"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const match_result_class_1 = require("../../match-result.class");
const imageToJimp_function_1 = require("../io/imageToJimp.function");
const point_class_1 = require("../../point.class");
class default_1 {
    async findMatch(query) {
        const jimp = (0, imageToJimp_function_1.imageToJimp)(query.haystack);
        let result = null;
        const color = query.needle.by.color;
        for (const { x, y, idx } of jimp.scanIterator(0, 0, jimp.bitmap.width, jimp.bitmap.height)) {
            if (jimp.bitmap.data[idx] === color.R &&
                jimp.bitmap.data[idx + 1] === color.G &&
                jimp.bitmap.data[idx + 2] === color.B &&
                jimp.bitmap.data[idx + 3] === color.A) {
                result = new match_result_class_1.MatchResult(1, new point_class_1.Point(x / query.haystack.pixelDensity.scaleX, y / query.haystack.pixelDensity.scaleY));
                break;
            }
        }
        if (result) {
            return result;
        }
        else {
            throw new Error(`No match for color RGBA(${color.R},${color.G},${color.B},${color.A}) found`);
        }
    }
    async findMatches(query) {
        const jimp = (0, imageToJimp_function_1.imageToJimp)(query.haystack);
        const results = [];
        const color = query.needle.by.color;
        jimp.scan(0, 0, jimp.bitmap.width, jimp.bitmap.height, (x, y, idx) => {
            if (jimp.bitmap.data[idx] === color.R &&
                jimp.bitmap.data[idx + 1] === color.G &&
                jimp.bitmap.data[idx + 2] === color.B &&
                jimp.bitmap.data[idx + 3] === color.A) {
                results.push(new match_result_class_1.MatchResult(1, new point_class_1.Point(x / query.haystack.pixelDensity.scaleX, y / query.haystack.pixelDensity.scaleY)));
            }
        });
        return results;
    }
}
exports.default = default_1;
//# sourceMappingURL=color-finder.class.js.map