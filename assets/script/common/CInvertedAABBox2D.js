/*
 * File: CInvertedAABBox2D.js
 * File Created: 2018-12-29 14:48:09
 * Author: Jacky (jackylvm@foxmail.com>)
 * -----
 * Last Modified: 2018-12-29 15:05:19
 * Modified By: Jacky (jackylvm@foxmail.com>)
 * -----
 * Copyright 2018 上海火刀石网络科技有限公司
 * -----
 * HISTORY:
 * Date      			By			Comments
 * --------------------	---------	----------------------------------
 */

cc.Class({
    extends: cc.Component,

    properties: {
        topLeft: new cc.v2(0, 0),
        bottomRight: new cc.v2(0, 0),
        center: new cc.v2(0, 0),
    },
    init(topLeft, bottomRight) {
        var self = this;

        self.topLeft = topLeft.clone();
        self.bottomRight = bottomRight.clone();
        //(topLeft+bottomRight)/2
        self.center = self.topLeft.add(self.bottomRight).divSelf(2);
    },
    isOverlappedWith(other) {
        var self = this;

        return !(
            (other.top() > self.bottom()) ||
            (other.bottom() < self.top()) ||
            (other.left() > self.right()) ||
            (other.right() < self.left())
        );
    },
    top() {
        var self = this;
        return self.topLeft.y;
    },
    left() {
        var self = this;
        return self.topLeft.x;
    },
    bottom() {
        var self = this;
        return self.bottomRight.y;
    },
    right() {
        var self = this;
        return self.bottomRight.x;
    },
    // LIFE-CYCLE CALLBACKS:
    // onLoad () {},
    // start() {},
    // update (dt) {},
});