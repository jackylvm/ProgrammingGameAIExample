/*
 * File: MovingEntity.js
 * File Created: 2018-12-19 14:29:07
 * Author: Jacky (jackylvm@foxmail.com>)
 * -----
 * Last Modified: 2018-12-21 20:54:29
 * Modified By: Jacky (jackylvm@foxmail.com>)
 * -----
 * Copyright 2018 上海火刀石网络科技有限公司
 * -----
 * HISTORY:
 * Date      			By			Comments
 * --------------------	---------	----------------------------------
 */
import CBaseGameEntity from "CBaseGameEntity";
import C2DMatrix from "C2DMatrix";
import {
    EnumConst
} from "CEnum";

cc.Class({
    extends: CBaseGameEntity,

    properties: {
        vecVelocity: new cc.v2(0, 0),
        vecHeading: new cc.v2(0, 1),
        vecSide: new cc.v2(0, 0),
        dMass: 0,
        dMaxSpeed: 0,
        dMaxForce: 0,
        dMaxTurnRate: 0
    },
    initMovingEntity(pos, radius, velocity, maxSpeed, heading, mass, scale, maxTurnRate, maxForce) {
        var self = this;

        self.initBaseGameEntity(pos, radius);
        self.setScaleByVec2(scale)

        self.vecVelocity.set(velocity);
        self.vecHeading.set(heading);
        self.dMass = mass;
        self.dMaxSpeed = maxSpeed;
        self.dMaxForce = maxForce;
        self.dMaxTurnRate = maxTurnRate;

        self.setSideFromHeading();

        // 正方向,heading和这个方向的夹角就是移动实体需要旋转的角度
        self._positiveDirection = new cc.v2(1, 0);
    },
    // LIFE-CYCLE CALLBACKS:
    // onLoad () {},
    // start() {},
    // update (dt) {},
    velocity() {
        var self = this;
        return self.vecVelocity;
    },
    setVelocity(val) {
        var self = this;
        self.vecVelocity.set(val);
    },
    mass() {
        var self = this;
        return self.dMass;
    },
    side() {
        var self = this;
        return self.vecSide;
    },
    setSideFromHeading() {
        var self = this;
        self.vecSide.x = -self.vecHeading.y;
        self.vecSide.y = self.vecHeading.x;
    },
    maxSpeed() {
        var self = this;
        return self.dMaxSpeed;
    },
    setMaxSpeed(val) {
        var self = this;
        self.dMaxSpeed = val;
    },
    maxForce() {
        var self = this;
        return self.dMaxForce;
    },
    setMaxForce(val) {
        var self = this;
        self.dMaxForce = val;
    },
    isSpeedMaxedOut() {
        var self = this;
        return self.dMaxSpeed * self.dMaxSpeed >= self.vecVelocity.magSqr();
    },
    speed() {
        var self = this;
        return self.vecVelocity.mag();
    },
    speedSQ() {
        var self = this;
        return self.vecVelocity.magSqr();
    },
    heading() {
        var self = this;
        return self.vecHeading;
    },
    setHeading(val) {
        var self = this;

        self.vecHeading.set(val);
        self.setSideFromHeading();

        self.updateRotation();
    },
    updateRotation() {
        var self = this;

        var aa = -self._positiveDirection.signAngle(self.vecHeading);
        var bb = aa * EnumConst.DEGREE_ONE;
        self.node.setRotation(bb);
    },
    maxTurnRate() {
        var self = this;
        return self.dMaxTurnRate;
    },
    setMaxTurnRate(val) {
        var self = this;
        self.dMaxTurnRate = val;
    },
    /**
     * 实体旋转到朝向目标
     * @param {Vec2} target 目标位置,世界坐标
     */
    RotateHeadingToFacePosition(target) {
        var self = this;

        var _toTarget = target.subSelf(self.vecPos);
        _toTarget.normalizeSelf()

        var _angle = self.vecHeading.signAngle(_toTarget);
        if (0.00001 > Math.abs(_angle)) {
            return true;
        }
        if (self.dMaxTurnRate < _angle) {
            _angle = self.dMaxTurnRate;
        }

        var rotationMatrix = new C2DMatrix();

        rotationMatrix.rotate(_angle);
        rotationMatrix.transformVec2(self.vecHeading);
        rotationMatrix.transformVec2(self.vecVelocity);

        self.setSideFromHeading();

        return false;
    },
});