/*
 * File: CDemo01.js
 * File Created: 2018-12-18 20:07:08
 * Author: Jacky (jackylvm@foxmail.com>)
 * -----
 * Last Modified: 2019-01-25 12:14:55
 * Modified By: Jacky (jackylvm@foxmail.com>)
 * -----
 * Copyright 2018 上海火刀石网络科技有限公司
 * -----
 * HISTORY:
 * Date      			By			Comments
 * --------------------	---------	----------------------------------
 */
import CMousePoint from "CMousePoint";
import CWorld from "CWorld";
import {
    EnumBehaviorType
} from "CEnum";

cc.Class({
    extends: CWorld,

    properties: {
        MousePointInst: {
            default: null,
            type: CMousePoint
        }
    },

    // LIFE-CYCLE CALLBACKS:
    // onLoad () {},
    start() {
        var self = this;

        self._super();

        self.MousePointInst.init(self);

        var _tmp = self.MousePointInst.node.getPosition();
        _tmp = self.MousePointInst.node.parent.convertToWorldSpaceAR(_tmp);
        self._crosshair = self.vehicle.parent.convertToNodeSpaceAR(_tmp);

        self.cVehicle.changeBehavior(EnumBehaviorType.ARRIVE);
    },
    // update (dt) {},
    onMousePointMove(worldPt) {
        var self = this;
        self._crosshair = self.vehicle.parent.convertToNodeSpaceAR(worldPt);
    },
});