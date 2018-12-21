/*
 * File: Vehicle.js
 * File Created: 2018-12-18 19:52:15
 * Author: Jacky (jackylvm@foxmail.com>)
 * -----
 * Last Modified: 2018-12-21 11:00:20
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

    properties: {},

    initVehicle(world) {
        var self = this;
        self.initVehicleEntity(world, new cc.v2(0, 0), EnumConst.HALF_PI, new cc.v2(0, 0), 1, 100, 120, 60, 1);
    },
    // LIFE-CYCLE CALLBACKS:
    // onLoad() {},
    start() {
        var self = this;

        var _graphics = self.getComponent(cc.Graphics);

        _graphics.clear();

        _graphics.moveTo(-6, 4);
        _graphics.lineTo(6, 0);
        _graphics.lineTo(-6, -4);
        _graphics.lineTo(-6, 4);
        _graphics.circle(0, 0, 1);
        _graphics.stroke();
    },
    // update (dt) {},
});