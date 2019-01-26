/*
 * File: CCameraControl.js
 * File Created: 2018-12-07 15:12:54
 * Author: Jacky (jackylvm@foxmail.com>)
 * -----
 * Last Modified: 2019-01-26 12:11:54
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
        target: {
            default: null,
            type: cc.Node
        }
    },

    // LIFE-CYCLE CALLBACKS:
    onLoad() {
        this.camera = this.getComponent(cc.Camera);
    },
    // start() {},
    // update (dt) {},
    lateUpdate(dt) {
        var self = this;

        var targetPos = self.target.convertToWorldSpaceAR(cc.Vec2.ZERO);
        self.node.position = self.node.parent.convertToNodeSpaceAR(targetPos);

        var ratio = targetPos.y / cc.winSize.height;
        self.camera.zoomRatio = 1 + (0.5 - ratio) * 0.5;
    },
});