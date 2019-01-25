/*
 * File: CDemo01.js
 * File Created: 2018-12-18 20:07:08
 * Author: Jacky (jackylvm@foxmail.com>)
 * -----
 * Last Modified: 2019-01-25 20:23:24
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

        self.target1 = cc.instantiate(self.VehiclePrefab);
        self.cTarget1 = self.target1.getComponent("CVehicle");
        self.cTarget1.initVehicle(self, 6);
        self.VehicleNode.addChild(self.target1);
        self.cTarget1.changeBehavior(EnumBehaviorType.OFFSET_PURSUIT, self.cVehicle, null, cc.v2(0, 16));

        self.target2 = cc.instantiate(self.VehiclePrefab);
        self.cTarget2 = self.target2.getComponent("CVehicle");
        self.cTarget2.initVehicle(self, 6);
        self.VehicleNode.addChild(self.target2);
        self.cTarget2.changeBehavior(EnumBehaviorType.OFFSET_PURSUIT, self.cVehicle, null, cc.v2(0, -16));

        self.target3 = cc.instantiate(self.VehiclePrefab);
        self.cTarget3 = self.target3.getComponent("CVehicle");
        self.cTarget3.initVehicle(self, 6);
        self.VehicleNode.addChild(self.target3);
        self.cTarget3.changeBehavior(EnumBehaviorType.OFFSET_PURSUIT, self.cVehicle, null, cc.v2(-32, 0));

        self.cVehicle.changeBehavior(EnumBehaviorType.ARRIVE);
    },
    // update (dt) {},
    onMousePointMove(worldPt) {
        this._crosshair = this.vehicle.parent.convertToNodeSpaceAR(worldPt);
    },
});