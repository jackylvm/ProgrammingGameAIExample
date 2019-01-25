/*
 * File: Vehicle.js
 * File Created: 2018-12-18 19:52:15
 * Author: Jacky (jackylvm@foxmail.com>)
 * -----
 * Last Modified: 2019-01-25 14:29:25
 * Modified By: Jacky (jackylvm@foxmail.com>)
 * -----
 * Copyright 2018 上海火刀石网络科技有限公司
 * -----
 * HISTORY:
 * Date      			By			Comments
 * --------------------	---------	----------------------------------
 */
import CVehicleEntity from "CVehicleEntity";
import {
    EnumConst
} from "CEnum";

cc.Class({
    extends: CVehicleEntity,

    properties: {
        body: {
            default: null,
            type: cc.Graphics
        },
        wander: {
            default: null,
            type: cc.Graphics
        }
    },

    initVehicle(world) {
        var self = this;

        self.initVehicleEntity(world, new cc.v2(0, 0), EnumConst.HALF_PI, new cc.v2(0, 0), 1, 100, 120, 60, 1);
    },
    // LIFE-CYCLE CALLBACKS:
    // onLoad() {},
    start() {
        var self = this;

        self.body.clear();

        self.body.moveTo(-6, 4);
        self.body.lineTo(6, 0);
        self.body.lineTo(-6, -4);
        self.body.lineTo(-6, 4);
        self.body.circle(0, 0, 1);
        self.body.stroke();
    },
    // update(dt) {},
});