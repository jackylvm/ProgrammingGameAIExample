/*
 * File: CSteeringBehavior.js
 * File Created: 2018-12-19 18:16:13
 * Author: Jacky (jackylvm@foxmail.com>)
 * -----
 * Last Modified: 2018-12-20 20:22:42
 * Modified By: Jacky (jackylvm@foxmail.com>)
 * -----
 * Copyright 2018 上海火刀石网络科技有限公司
 * -----
 * HISTORY:
 * Date      			By			Comments
 * --------------------	---------	----------------------------------
 */
import C2DMatrix from "C2DMatrix";
import {
    EnumSummingMethod,
    EnumBehaviorType,
    EnumConst
} from "CEnum";

cc.Class({
    properties: {
        steeringForce: new cc.v2(0, 0),
        target: new cc.v2(0, 0),
        dboxLength: 0.0,
        feelers: [],
        wallDetectionFeelerLength: 0.0,
        wanderTarget: new cc.v2(0, 0),
        wanderJitter: 0.0,
        wanderRadius: 0.0,
        wanderDistance: 0.0,
        weightSeparation: 1.0,
        weightCohesion: 1.0,
        weightAlignment: 1.0,
        weightWander: 1.0,
        weightObstacleAvoidance: 1.0,
        weightWallAvoidance: 1.0,
        weightSeek: 1.0,
        weightFlee: 1.0,
        weightArrive: 1.0,
        weightPursuit: 1.0,
        weightOffsetPursuit: 1.0,
        weightInterpose: 1.0,
        weightHide: 1.0,
        weightEvade: 1.0,
        weightFollowPath: 1.0,
        viewDistance: 0.0,
        waypointSeekDistSq: 0.0,
        offset: new cc.v2(0, 0),
        flags: 0,
        deceleration: 0,
        cellSpaceOn: false,
        summingMethod: 0
    },
    init(agent) {
        var self = this;

        self._vehicle = agent;

        self._summingMethod = EnumSummingMethod.PRIORITIZED;

        self._targetAgent1 = null;
        self._targetAgent2 = null;
    },
    fleeOn() {
        var self = this;
        self.flags |= EnumBehaviorType.FLEE
    },
    fleeOff() {
        var self = this;
        if (self.on(EnumBehaviorType.FLEE)) {
            self.flags ^= EnumBehaviorType.FLEE
        }
    },
    isFleeOn() {
        var self = this;
        return self.on(EnumBehaviorType.FLEE);
    },
    seekOn() {
        var self = this;
        self.flags |= EnumBehaviorType.SEEK
    },
    seekOff() {
        var self = this;
        if (self.on(EnumBehaviorType.SEEK)) {
            self.flags ^= EnumBehaviorType.SEEK
        }
    },
    isSeekOn() {
        var self = this;
        return self.on(EnumBehaviorType.SEEK);
    },
    arriveOn() {
        var self = this;
        self.flags |= EnumBehaviorType.ARRIVE
    },
    arriveOff() {
        var self = this;
        if (self.on(EnumBehaviorType.ARRIVE)) {
            self.flags ^= EnumBehaviorType.ARRIVE
        }
    },
    isArriveOn() {
        var self = this;
        return self.on(EnumBehaviorType.ARRIVE);
    },
    wanderOn() {
        var self = this;
        self.flags |= EnumBehaviorType.WANDER
    },
    wanderOff() {
        var self = this;
        if (self.on(EnumBehaviorType.WANDER)) {
            self.flags ^= EnumBehaviorType.WANDER
        }
    },
    isWanderOn() {
        var self = this;
        return self.on(EnumBehaviorType.WANDER);
    },
    pursuitOn(target) {
        var self = this;
        self.flags |= EnumBehaviorType.PURSUIT
        self._targetAgent1 = target;
    },
    pursuitOff() {
        var self = this;
        if (self.on(EnumBehaviorType.PURSUIT)) {
            self.flags ^= EnumBehaviorType.PURSUIT
        }
    },
    isPursuitOn() {
        var self = this;
        return self.on(EnumBehaviorType.PURSUIT);
    },
    evadeOn(target) {
        var self = this;
        self.flags |= EnumBehaviorType.EVADE
        self._targetAgent1 = target;
    },
    evadeOff() {
        var self = this;
        if (self.on(EnumBehaviorType.EVADE)) {
            self.flags ^= EnumBehaviorType.EVADE
        }
    },
    isEvadeOn() {
        var self = this;
        return self.on(EnumBehaviorType.EVADE);
    },
    cohesionOn() {
        var self = this;
        self.flags |= EnumBehaviorType.COHESION
    },
    cohesionOff() {
        var self = this;
        if (self.on(EnumBehaviorType.COHESION)) {
            self.flags ^= EnumBehaviorType.COHESION
        }
    },
    isCohesionOn() {
        var self = this;
        return self.on(EnumBehaviorType.COHESION);
    },
    separationOn() {
        var self = this;
        self.flags |= EnumBehaviorType.SEPARATION
    },
    separationOff() {
        var self = this;
        if (self.on(EnumBehaviorType.SEPARATION)) {
            self.flags ^= EnumBehaviorType.SEPARATION
        }
    },
    isSeparationOn() {
        var self = this;
        return self.on(EnumBehaviorType.SEPARATION);
    },
    alignmentOn() {
        var self = this;
        self.flags |= EnumBehaviorType.ALIGNMENT
    },
    alignmentOff() {
        var self = this;
        if (self.on(EnumBehaviorType.ALIGNMENT)) {
            self.flags ^= EnumBehaviorType.ALIGNMENT
        }
    },
    isAlignmentOn() {
        var self = this;
        return self.on(EnumBehaviorType.ALIGNMENT);
    },
    obstacleAvoidanceOn() {
        var self = this;
        self.flags |= EnumBehaviorType.OBSTACLE_AVOIDANCE
    },
    obstacleAvoidanceOff() {
        var self = this;
        if (self.on(EnumBehaviorType.OBSTACLE_AVOIDANCE)) {
            self.flags ^= EnumBehaviorType.OBSTACLE_AVOIDANCE
        }
    },
    isObstacleAvoidanceOn() {
        var self = this;
        return self.on(EnumBehaviorType.OBSTACLE_AVOIDANCE);
    },
    wallAvoidanceOn() {
        var self = this;
        self.flags |= EnumBehaviorType.WALL_AVOIDANCE
    },
    wallAvoidanceOff() {
        var self = this;
        if (self.on(EnumBehaviorType.WALL_AVOIDANCE)) {
            self.flags ^= EnumBehaviorType.WALL_AVOIDANCE
        }
    },
    isWallAvoidanceOn() {
        var self = this;
        return self.on(EnumBehaviorType.WALL_AVOIDANCE);
    },
    followPathOn() {
        var self = this;
        self.flags |= EnumBehaviorType.FOLLOW_PATH
    },
    followPathOff() {
        var self = this;
        if (self.on(EnumBehaviorType.FOLLOW_PATH)) {
            self.flags ^= EnumBehaviorType.FOLLOW_PATH
        }
    },
    isFollowPathOn() {
        var self = this;
        return self.on(EnumBehaviorType.FOLLOW_PATH);
    },
    interposeOn(t1, t2) {
        var self = this;
        self.flags |= EnumBehaviorType.INTERPOSE
        self._targetAgent1 = t1;
        self._targetAgent2 = t2;
    },
    interposeOff() {
        var self = this;
        if (self.on(EnumBehaviorType.INTERPOSE)) {
            self.flags ^= EnumBehaviorType.INTERPOSE
        }
    },
    isInterposeOn() {
        var self = this;
        return self.on(EnumBehaviorType.INTERPOSE);
    },
    hideOn(target) {
        var self = this;
        self.flags |= EnumBehaviorType.HIDE
        self._targetAgent1 = target;
    },
    hideOff() {
        var self = this;
        if (self.on(EnumBehaviorType.HIDE)) {
            self.flags ^= EnumBehaviorType.HIDE
        }
    },
    isHideOn() {
        var self = this;
        return self.on(EnumBehaviorType.HIDE);
    },
    offsetPursuitOn(target, offset) {
        var self = this;
        self.flags |= EnumBehaviorType.OFFSET_PURSUIT
        self._targetAgent1 = target;
        self.offset.set(offset);
    },
    offsetPursuitOff() {
        var self = this;
        if (self.on(EnumBehaviorType.OFFSET_PURSUIT)) {
            self.flags ^= EnumBehaviorType.OFFSET_PURSUIT
        }
    },
    isOffsetPursuitOn() {
        var self = this;
        return self.on(EnumBehaviorType.OFFSET_PURSUIT);
    },
    flockingOn() {
        var self = this;
        self.cohesionOn();
        self.alignmentOn();
        self.separationOn();
        self.wanderOn();
    },
    flockingOff() {
        var self = this;
        self.cohesionOff();
        self.alignmentOff();
        self.separationOff();
        self.wanderOff();
    },
    calculate() {
        var self = this;

        self.steeringForce = cc.Vec2.ZERO;

        switch (self._summingMethod) {
            case EnumSummingMethod.WEIGHTED_AVERAGE:
                {
                    self.steeringForce = self.calculateWeightedSum();
                }
                break;
            case EnumSummingMethod.PRIORITIZED:
                {
                    self.steeringForce = self.calculatePrioritized();
                }
                break;
            case EnumSummingMethod.DITHERED:
                {
                    self.steeringForce = self.calculateDithered();
                }
                break;
            default:
                break;
        }
        return self.steeringForce;
    },
    calculateWeightedSum() {},
    calculatePrioritized() {
        var self = this;

        var _force = new cc.v2(0, 0);
        if (self.on(EnumBehaviorType.WALL_AVOIDANCE)) {
            var _tmp = self._vehicle.world().walls();
            _force = self.wallAvoidance(_tmp).subSelf(self.weightWallAvoidance);

            if (!self.accumulateForce(self.steeringForce, _force)) {
                return self.steeringForce;
            }
        }

        if (self.on(EnumBehaviorType.OBSTACLE_AVOIDANCE)) {
            var _tmp = self._vehicle.world().obstacles();
            _force = self.obstacleAvoidancd(_tmp).subSelf(self.weightObstacleAvoidance);

            if (!self.accumulateForce(self.steeringForce, _force)) {
                return self.steeringForce;
            }
        }

        if (self.on(EnumBehaviorType.EVADE)) {
            if (self.targetAgent1) {
                _force = self.evade(self.targetAgent1).mulSelf(self.weightEvade);

                if (!self.accumulateForce(self.steeringForce, _force)) {
                    return self.steeringForce;
                }
            } else {
                cc.log("Evade target not assigned!");
            }
        }

        if (self.on(EnumBehaviorType.SEEK)) {
            var _tmp = self._vehicle.world().crosshair();
            _force = self.seek(_tmp).mulSelf(self.weightSeek);

            if (!self.accumulateForce(self.steeringForce, _force)) {
                return self.steeringForce;
            }
        }

        return self.steeringForce;
    },
    calculateDithered() {},
    wallAvoidance(walls) {
        var self = this;

        self.createFeelers();

        var _distToThisIP = 0.0;
        var _distToClosestIP = EnumConst.MAX_DOUBLE;
        var _closestWall = -1;

        var _steeringForce = new cc.v2(0, 0);

        //TODO:

        return _steeringForce;
    },
    on(bt) {
        var self = this;

        return (self.flags & bt) == bt;
    },
    accumulateForce(sf, forceToAdd) {
        var self = this;

        var _magnitudeSoFar = sf.mag();
        var _magnitudeRemaining = self._vehicle.maxForce() - _magnitudeSoFar;
        if (0.0 >= _magnitudeRemaining) {
            return false;
        }

        var _magnitudeToAdd = forceToAdd.mag();

        if (_magnitudeToAdd < _magnitudeRemaining) {
            sf.addSelf(forceToAdd);
        } else {
            var tmp = forceToAdd.normalizeSelf().mulSelf(_magnitudeRemaining);
            sf.addSelf(tmp);
        }
        return true;
    },
    createFeelers() {
        var self = this;

        self.feelers[0] = self._vehicle.pos().addSelf(self._vehicle.heading.mulSelf(self.wallDetectionFeelerLength));

        var _halfLength = self.wallDetectionFeelerLength / 2;

        var tmp = self._vehicle.heading.clone();
        self.vec2DRotateAroundOrigin(tmp, EnumConst.HALF_PI * 3.5);
        self.feelers[1] = self._vehicle.pos().addSelf(tmp.mulSelf(_halfLength));

        tmp = self._vehicle.heading.clone();
        self.vec2DRotateAroundOrigin(tmp, EnumConst.HALF_PI * 0.5);
        self.feelers[2] = self._vehicle.pos().addSelf(tmp.mulSelf(_halfLength));
    },
    vec2DRotateAroundOrigin(val, ang) {
        var _mat = new C2DMatrix()
        _mat.rotateByRotation(ang);
        _mat.transformVec2(val);
    },
    seek(target) {
        var self = this;

        var _pos = self._vehicle.pos();
        var _desiredVelocity = target.sub(_pos).normalizeSelf().mulSelf(self._vehicle.maxSpeed());

        return _desiredVelocity.subSelf(self._vehicle.velocity());
    },
    flee(target) {
        var self = this;

        var _pos = self._vehicle.pos();
        var _desirredVelocity = _pos.sub(target).normalizeSelf().mulSelf(self._vehicle.maxSpeed());

        return _desirredVelocity.subSelf(self._vehicle.velocity());
    },
    evade(pursuer) {
        var self = this;

        //TODO:
        return new cc.v2(0, 0);
    },
});