/*
 * File: MovingEntity.js
 * File Created: 2018-12-19 14:29:07
 * Author: Jacky (jackylvm@foxmail.com>)
 * -----
 * Last Modified: 2019-01-26 11:01:53
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
        self.vecScale.set(scale);

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
        return this.vecVelocity;
    },
    setVelocity(val) {
        this.vecVelocity.set(val);
    },
    mass() {
        return this.dMass;
    },
    side() {
        return this.vecSide;
    },
    setSideFromHeading() {
        this.vecSide.x = -this.vecHeading.y;
        this.vecSide.y = this.vecHeading.x;
    },
    maxSpeed() {
        return this.dMaxSpeed;
    },
    setMaxSpeed(val) {
        this.dMaxSpeed = val;
    },
    maxForce() {
        return this.dMaxForce;
    },
    setMaxForce(val) {
        this.dMaxForce = val;
    },
    isSpeedMaxedOut() {
        return this.dMaxSpeed * this.dMaxSpeed >= this.vecVelocity.magSqr();
    },
    speed() {
        return this.vecVelocity.mag();
    },
    speedSQ() {
        return this.vecVelocity.magSqr();
    },
    heading() {
        return this.vecHeading;
    },
    setHeading(val) {
        this.vecHeading.set(val);
        this.setSideFromHeading();

        this.updateRotation();
    },
    updateRotation() {
        var aa = -this._positiveDirection.signAngle(this.vecHeading);
        var bb = aa * EnumConst.DEGREE_ONE;
        this.node.setRotation(bb);
    },
    maxTurnRate() {
        return this.dMaxTurnRate;
    },
    setMaxTurnRate(val) {
        this.dMaxTurnRate = val;
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