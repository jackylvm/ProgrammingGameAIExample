/*
 * File: Vehicle.js
 * File Created: 2018-12-18 19:52:15
 * Author: Jacky (jackylvm@foxmail.com>)
 * -----
 * Last Modified: 2019-01-26 14:15:01
 * Modified By: Jacky (jackylvm@foxmail.com>)
 * -----
 * Copyright 2018 上海火刀石网络科技有限公司
 * -----
 * HISTORY:
 * Date      			By			Comments
 * --------------------	---------	----------------------------------
 */
import CVehicleEntity from "CVehicleEntity";
import Utility from "CUtility";
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
        },
        vehicleSize: 12
    },

    /**
     * 初始化实体相关参数
     * @param {CWorld} world 游戏世界
     * @param {int} size 绘制图形的大小
     * @param {Vec2} position 初始位置
     * @param {Number} rotation 初始旋转,也可以说是初始化朝向
     * @param {Vec2} velocity 初始速度
     * @param {int} mass 实体质量
     * @param {int} maxForce 实体最大受力
     * @param {int} maxSpeed 实体最大速度
     * @param {int} maxTurnRate 实体最大旋转速率(单位:弧度/每秒)
     */
    initVehicle(
        world,
        size = 12,
        position = cc.v2(0, 0),
        rotation = 0,
        velocity = cc.v2(0, 0),
        mass = 1,
        maxForce = 96.0,
        maxSpeed = 150,
        maxTurnRate = 60
    ) {
        var self = this;

        self.vehicleSize = size;
        self.initVehicleEntity(world, position, rotation, velocity, mass, maxForce, maxSpeed, maxTurnRate);
    },
    // LIFE-CYCLE CALLBACKS:
    // onLoad() {},
    start() {
        var self = this;

        self.body.clear();

        var _half = self.vehicleSize / 2;
        self.body.moveTo(-self.vehicleSize, _half);
        self.body.lineTo(self.vehicleSize, 0);
        self.body.lineTo(-self.vehicleSize, -_half);
        self.body.lineTo(-self.vehicleSize, _half);
        self.body.circle(0, 0, _half / 2);
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

        Utility.wrapAround(self.pos(), self.world().cxClient(), self.world().cyClient());
    },
});