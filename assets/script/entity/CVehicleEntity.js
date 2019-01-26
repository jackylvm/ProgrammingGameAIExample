/*
 * File: CVehicleEntity.js
 * File Created: 2018-12-19 16:02:28
 * Author: Jacky (jackylvm@foxmail.com>)
 * -----
 * Last Modified: 2019-01-26 14:39:12
 * Modified By: Jacky (jackylvm@foxmail.com>)
 * -----
 * Copyright 2018 上海火刀石网络科技有限公司
 * -----
 * HISTORY:
 * Date      			By			Comments
 * --------------------	---------	----------------------------------
 */
import CMovingEntity from "CMovingEntity";
import CSteeringBehavior from "CSteeringBehavior";
import SmootherVec2 from "CSmootherVec2";
import {
    EnumBehaviorType
} from "CEnum";

cc.Class({
    extends: CMovingEntity,

    properties: {
        dTimeElapsed: 0.0,
        vecSmoothedHeading: new cc.v2(0, 0),
        bSmoothingOn: false,
        vehicleVB: []
    },
    initVehicleEntity(
        world,
        position,
        rotation,
        velocity,
        mass,
        maxForce,
        maxSpeed,
        maxTurnRate
    ) {
        var self = this;

        self._world = world;

        self.initMovingEntity(
            position, //pos
            1, //radius
            velocity, //velocity
            maxSpeed, //maxSpeed
            new cc.v2(Math.sin(rotation), Math.cos(rotation)), //heading
            mass, //mass
            new cc.v2(1, 1), //scale
            maxTurnRate, //maxTurnRate
            maxForce //maxForce
        )

        self._steering = new CSteeringBehavior();
        self._steering.init(self);

        self._headingSmoother = new SmootherVec2();
    },
    steering() {
        return this._steering;
    },
    world() {
        return this._world;
    },
    // LIFE-CYCLE CALLBACKS:
    onLoad() {
        var self = this;

        self.node.setPosition(self.pos());
        self.updateRotation();
    },
    // start() {},
    update(dt) {
        var self = this;

        self.dTimeElapsed = dt;

        var _steeringForce = self._steering.calculate();

        var _acceleration = _steeringForce.div(self.mass());
        self.velocity().addSelf(_acceleration.mulSelf(dt));

        if (self.velocity().mag() > self.maxSpeed()) {
            self.velocity().normalizeSelf().mulSelf(self.maxSpeed());
        }

        var _out = self.velocity().mul(dt);
        self.pos().addSelf(_out);
        self.node.setPosition(self.pos());

        if (self.velocity().magSqr() > 0.01) {
            _out = self.velocity().normalize();
            self.setHeading(_out);
        }

        self.node.setScale(self.scale().x, self.scale().y);
    },
    timeElapsed() {
        return this.dTimeElapsed;
    },
    changeBehavior(behavior, target1 = null, target2 = null, offset = null) {
        var self = this;

        self._steering.clearFlags();
        switch (behavior) {
            case EnumBehaviorType.SEEK:
                {
                    self._steering.seekOn();
                }
                break;
            case EnumBehaviorType.FLEE:
                {
                    self._steering.fleeOn();
                }
                break;
            case EnumBehaviorType.ARRIVE:
                {
                    self._steering.arriveOn();
                }
                break;
            case EnumBehaviorType.WANDER:
                {
                    self._steering.wanderOn();
                }
                break;
            case EnumBehaviorType.EVADE:
                {
                    self._steering.evadeOn(target1);
                }
                break;
            case EnumBehaviorType.PURSUIT:
                {
                    self._steering.pursuitOn(target1);
                }
                break;
            case EnumBehaviorType.OFFSET_PURSUIT:
                {
                    self._steering.offsetPursuitOn(target1, offset);
                }
                break;
            case EnumBehaviorType.OBSTACLE_AVOIDANCE:
                {
                    self._steering.obstacleAvoidanceOn(target1, offset);
                }
                break;
            default:
                break;
        }
    },
});