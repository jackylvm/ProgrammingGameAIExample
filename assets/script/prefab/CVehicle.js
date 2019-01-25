/*
 * File: Vehicle.js
 * File Created: 2018-12-18 19:52:15
 * Author: Jacky (jackylvm@foxmail.com>)
 * -----
 * Last Modified: 2019-01-25 16:48:20
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
    EnumConst,
    EnumBehaviorType
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

        self.body.moveTo(-12, 6);
        self.body.lineTo(12, 0);
        self.body.lineTo(-12, -6);
        self.body.lineTo(-12, 6);
        self.body.circle(0, 0, 3);
        self.body.stroke();
    },
    update(dt) {
        var self = this;

        self._super(dt);

        if (self.steering().on(EnumBehaviorType.WANDER) && self.world().renderWanderCircle()) {
            var _tmp = cc.v2(self.steering().wanderDistance * self.bRadius(), 0);

            self.wander.clear();

            self.wander.strokeColor = cc.Color.GREEN;
            self.wander.circle(_tmp.x, _tmp.y, self.steering().wanderRadius * self.bRadius());
            self.wander.stroke();

            _tmp = self.steering().wanderTarget.clone();
            _tmp.addSelf(cc.v2(self.steering().wanderDistance, 0)).mulSelf(self.bRadius());

            self.wander.strokeColor = cc.Color.RED;
            self.wander.circle(_tmp.x, _tmp.y, 3);
            self.wander.stroke();
        }
    },
});