/*
 * File: CDemo01.js
 * File Created: 2018-12-18 20:07:08
 * Author: Jacky (jackylvm@foxmail.com>)
 * -----
 * Last Modified: 2019-01-25 18:37:54
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

        self.target = cc.instantiate(self.VehiclePrefab);
        self.cTarget = self.target.getComponent("CVehicle");
        self.cTarget.initVehicle(self, 6);
        self.VehicleNode.addChild(self.target);

        self.cTarget.changeBehavior(EnumBehaviorType.SEEK);
        self.cVehicle.changeBehavior(EnumBehaviorType.EVADE, self.cTarget);
    },
    // update (dt) {},
    onMousePointMove(worldPt) {
        this._crosshair = this.vehicle.parent.convertToNodeSpaceAR(worldPt);
    },
});