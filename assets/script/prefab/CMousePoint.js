/*
 * File: CMousePoint.js
 * File Created: 2018-12-19 09:49:37
 * Author: Jacky (jackylvm@foxmail.com>)
 * -----
 * Last Modified: 2019-01-25 18:13:22
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

    properties: {},

    init(follower) {
        this._follower = follower;
    },
    // LIFE-CYCLE CALLBACKS:
    // onLoad () {},
    start() {
        var self = this;

        var _graphics = self.getComponent(cc.Graphics);

        _graphics.clear();

        var radius = 4;
        _graphics.circle(0, 0, radius);
        _graphics.moveTo(-(radius + 2), 0);
        _graphics.lineTo(radius + 2, 0);
        _graphics.moveTo(0, radius + 2);
        _graphics.lineTo(0, -(radius + 2));
        _graphics.stroke();
    },
    // update (dt) {},
    onMouseHandler(evt) {
        var self = this;

        switch (evt.type) {
            case cc.Node.EventType.MOUSE_DOWN:
                {
                    var mouseType = evt.getButton();
                    if (cc.Event.EventMouse.BUTTON_LEFT == mouseType) {
                        // 坐标转换
                        var tt = evt.getLocation();
                        tt = self.node.parent.convertToNodeSpaceAR(tt);
                        self.node.setPosition(tt);

                        if (self._follower && self._follower.onMousePointMove) {
                            var worldPoint = self.node.getPosition();
                            worldPoint = self.node.parent.convertToWorldSpaceAR(worldPoint);
                            self._follower.onMousePointMove(worldPoint);
                        }
                    }
                }
                break;
            default:
                break;
        }
    },
});