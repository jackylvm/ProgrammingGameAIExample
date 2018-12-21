/*
 * File: CInput.js
 * File Created: 2018-12-07 16:29:23
 * Author: Jacky (jackylvm@foxmail.com>)
 * -----
 * Last Modified: 2018-12-19 11:23:53
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
            type: cc.Component
        }
    },
    // LIFE-CYCLE CALLBACKS:
    onLoad() {
        var self = this;

        // self.node.on(cc.Node.EventType.TOUCH_START, self.onTouchHandler, self);
        // self.node.on(cc.Node.EventType.TOUCH_MOVE, self.onTouchHandler, self);
        // self.node.on(cc.Node.EventType.TOUCH_END, self.onTouchHandler, self);
        // self.node.on(cc.Node.EventType.TOUCH_CANCEL, self.onTouchHandler, self);
        self.node.on(cc.Node.EventType.MOUSE_DOWN, self.onMouseHandler, self);
        self.node.on(cc.Node.EventType.MOUSE_UP, self.onMouseHandler, self);
    },
    // start() {},
    // update (dt) {},
    onTouchHandler(evt) {
        var self = this;

        cc.log("touch handler", evt.type);
        switch (evt.type) {
            case cc.Node.EventType.TOUCH_START:
                {}
                break;
            case cc.Node.EventType.TOUCH_MOVE:
                {}
                break;
            case cc.Node.EventType.TOUCH_END:
                {}
                break;
            case cc.Node.EventType.TOUCH_CANCEL:
                {}
                break;
            default:
                break;
        }
    },
    onMouseHandler(evt) {
        var self = this;

        // 设置的目标(target),一定确保有onMouseHandler属性的对象在Node节点后面第一个
        // 比如:对于MousePoint预制体来说,一定要把CMousePoint放到Node之后第一个,
        // 而不能把Graphics放到Node后面第一个,不然这个地方会找不到onMouseHandler方法
        if (self.target && self.target.onMouseHandler) {
            self.target.onMouseHandler(evt);
        }
    },
});