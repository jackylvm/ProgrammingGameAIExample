/*
 * File: CCell.js
 * File Created: 2018-12-29 15:05:50
 * Author: Jacky (jackylvm@foxmail.com>)
 * -----
 * Last Modified: 2018-12-29 15:09:49
 * Modified By: Jacky (jackylvm@foxmail.com>)
 * -----
 * Copyright 2018 上海火刀石网络科技有限公司
 * -----
 * HISTORY:
 * Date      			By			Comments
 * --------------------	---------	----------------------------------
 */
import CInvertedAABBox2D from "CInvertedAABBox2D";
cc.Class({
    extends: cc.Object,

    properties: {
        members: [],
        bbox: {
            default: null,
            type: CInvertedAABBox2D
        }
    },
    init(topLeft, bottomRight) {
        var self = this;

        self.bbox = new CInvertedAABBox2D();
        self.bbox.init(topLeft, bottomRight);
    },
});