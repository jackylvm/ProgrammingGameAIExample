/*
 * File: CSteeringBehavior.js
 * File Created: 2018-12-19 18:16:13
 * Author: Jacky (jackylvm@foxmail.com>)
 * -----
 * Last Modified: 2019-01-26 10:45:03
 * Modified By: Jacky (jackylvm@foxmail.com>)
 * -----
 * Copyright 2018 上海火刀石网络科技有限公司
 * -----
 * HISTORY:
 * Date      			By			Comments
 * --------------------	---------	----------------------------------
 */
import C2DMatrix from "C2DMatrix";
import Utility from "CUtility";
import EnumDemo from "CEnumDemo01";
import {
    EnumSummingMethod,
    EnumBehaviorType,
    EnumDeceleration,
    EnumConst
} from "CEnum";

var WANDER_RADIUS = 8;
var WANDER_DISTANCE = 20.0;
var WANDER_JITTER_PER_SEC = 160.0;
var WAY_POINT_SEEK_DIST = 20;

cc.Class({
    extends: cc.Object,

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
        deceleration: 2,
        cellSpaceOn: false,
        summingMethod: 0
    },
    ctor() {
        var self = this;

        self.dboxLength = EnumDemo.MinDetectionBoxLength;
        self.weightCohesion = EnumDemo.CohesionWeight;
        self.weightAlignment = EnumDemo.AlignmentWeight;
        self.weightSeparation = EnumDemo.SeparationWeight;
        self.weightObstacleAvoidance = EnumDemo.ObstacleAvoidanceWeight;
        self.weightWander = EnumDemo.WanderWeight;
        self.weightWallAvoidance = EnumDemo.WallAvoidanceWeight;
        self.viewDistance = EnumDemo.ViewDistance;
        self.wallDetectionFeelerLength = EnumDemo.WallDetectionFeelerLength;
        self.deceleration = EnumDeceleration.NORMAL;
        self.wanderDistance = WANDER_DISTANCE;
        self.wanderJitter = WANDER_JITTER_PER_SEC;
        self.wanderRadius = WANDER_RADIUS;
        self.waypointSeekDistSq = WAY_POINT_SEEK_DIST * WAY_POINT_SEEK_DIST;
        self.weightSeek = EnumDemo.SeekWeight;
        self.weightFlee = EnumDemo.FleeWeight;
        self.weightArrive = EnumDemo.ArriveWeight;
        self.weightPursuit = EnumDemo.PursuitWeight;
        self.weightOffsetPursuit = EnumDemo.OffsetPursuitWeight;
        self.weightInterpose = EnumDemo.InterposeWeight;
        self.weightHide = EnumDemo.HideWeight;
        self.weightEvade = EnumDemo.EvadeWeight;
        self.weightFollowPath = EnumDemo.FollowPathWeight;

        var _theta = Utility.randFloat() * EnumConst.TWO_PI;
        self.wanderTarget = cc.v2(self.wanderRadius * Math.cos(_theta), self.wanderRadius * Math.sin(_theta));
    },
    init(agent) {
        var self = this;

        self._vehicle = agent;

        self._summingMethod = EnumSummingMethod.PRIORITIZED;

        self._targetAgent1 = null;
        self._targetAgent2 = null;
    },
    clearFlags() {
        var self = this;
        self.flags = 0;
    },
    setPath(path) {
        var self = this;
        self._path = path;
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
    toggleSpacePartitioningOnOff() {
        var self = this;
        self.cellSpaceOn = !self.cellSpaceOn;
    },
    isSpacePartitioningOn() {
        var self = this;
        return self.cellSpaceOn;
    },
    pointToWorldSpace(pt, agentHeading, agentSide, agentPosition) {
        var _transPoint = pt.clone();

        var _matTransform = new C2DMatrix();
        _matTransform.rotateByVec2(agentHeading, agentSide);
        _matTransform.translate(agentPosition.x, agentPosition.y);

        _matTransform.transformVec2(_transPoint);
        return _transPoint;
    },
    pointToLocalSpace(pt, agentHeading, agentSide, agentPosition) {
        var _transPoint = pt.clone();

        var _tX = -agentPosition.dot(agentHeading);
        var _tY = -agentPosition.dot(agentSide);

        var _matTransform = new C2DMatrix();
        _matTransform._11(agentHeading.x);
        _matTransform._12(agentSide.x);
        _matTransform._21(agentHeading.y);
        _matTransform._22(agentSide.y);
        _matTransform._31(_tX);
        _matTransform._32(_tY);

        _matTransform.transformVec2(_transPoint);
        return _transPoint;
    },
    vectorToWorldSpace(vec, agentHeading, agentSide) {
        var _transVec = vec.clone();

        var _matTransform = new C2DMatrix();
        _matTransform.rotateByVec2(agentHeading, agentSide);

        _matTransform.transformVec2(_transVec);
        return _transVec;
    },
    lineIntersection2D(vecA, vecB, vecC, vecD) {
        var _rTop = (vecA.y - vecC.y) * (vecD.x - vecC.x) - (vecA.x - vecC.x) * (vecD.y - vecC.y);
        var _rBot = (vecB.x - vecA.x) * (vecD.y - vecC.y) - (vecB.y - vecA.y) * (vecD.x - vecC.x);

        var _sTop = (vecA.y - vecC.y) * (vecB.x - vecA.x) - (vecA.x - vecC.x) * (vecB.y - vecA.y);
        var _sBot = (vecB.x - vecA.x) * (vecD.y - vecC.y) - (vecB.y - vecA.y) * (vecD.x - vecC.x);

        var _dist = 0;

        if ((0 == _rBot) || (0 == _sBot)) {
            return [false, _dist];
        }

        var _r = _rTop / _rBot;
        var _s = _sTop / _sBot;

        if ((0 < _r) && (1 > _r) && (0 < _s) && (1 > _s)) {
            var _ySeparation = vecB.y - vecA.y;
            var _xSeparation = vecB.x - vecA.x;
            _dist = _r * Math.sqrt(_xSeparation * _xSeparation + _ySeparation * _ySeparation);
            var _point = vecB.sub(vecA);
            _point.mulSelf(_r).addSelf(vecA);

            return [true, _dist, _point];
        }
        return [false, 0];
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
            _force = self.obstacleAvoidance(_tmp).subSelf(self.weightObstacleAvoidance);

            if (!self.accumulateForce(self.steeringForce, _force)) {
                return self.steeringForce;
            }
        }

        if (self.on(EnumBehaviorType.EVADE)) {
            if (self._targetAgent1) {
                _force = self.evade(self._targetAgent1).mulSelf(self.weightEvade);

                if (!self.accumulateForce(self.steeringForce, _force)) {
                    return self.steeringForce;
                }
            } else {
                cc.log("Evade target not assigned!");
            }
        }

        if (self.on(EnumBehaviorType.FLEE)) {
            var _tmp = self._vehicle.world().crosshair();
            _force = self.flee(_tmp).mulSelf(self.weightFlee);

            if (!self.accumulateForce(self.steeringForce, _force)) {
                return self.steeringForce;
            }
        }

        if (!self.isSpacePartitioningOn()) {
            if (self.on(EnumBehaviorType.SEPARATION)) {
                var _agents = self._vehicle.world().agents();
                _force = self.separation(_agents).mulSelf(self.weightSeparation);

                if (!self.accumulateForce(self.steeringForce, _force)) {
                    return self.steeringForce;
                }
            }
            if (self.on(EnumBehaviorType.ALIGNMENT)) {
                var _agents = self._vehicle.world().agents();
                _force = self.alignment(_agents).mulSelf(self.weightAlignment);

                if (!self.accumulateForce(self.steeringForce, _force)) {
                    return self.steeringForce;
                }
            }
            if (self.on(EnumBehaviorType.COHESION)) {
                var _agents = self._vehicle.world().agents();
                _force = self.cohesion(_agents).mulSelf(self.weightCohesion);

                if (!self.accumulateForce(self.steeringForce, _force)) {
                    return self.steeringForce;
                }
            }
        } else {
            if (self.on(EnumBehaviorType.SEPARATION)) {
                var _agents = self._vehicle.world().agents();
                _force = self.separationPlus(_agents).mulSelf(self.weightSeparation);

                if (!self.accumulateForce(self.steeringForce, _force)) {
                    return self.steeringForce;
                }
            }
            if (self.on(EnumBehaviorType.ALIGNMENT)) {
                var _agents = self._vehicle.world().agents();
                _force = self.alignmentPlus(_agents).mulSelf(self.weightAlignment);

                if (!self.accumulateForce(self.steeringForce, _force)) {
                    return self.steeringForce;
                }
            }
            if (self.on(EnumBehaviorType.COHESION)) {
                var _agents = self._vehicle.world().agents();
                _force = self.cohesionPlus(_agents).mulSelf(self.weightCohesion);

                if (!self.accumulateForce(self.steeringForce, _force)) {
                    return self.steeringForce;
                }
            }
        }

        if (self.on(EnumBehaviorType.SEEK)) {
            var _tmp = self._vehicle.world().crosshair();
            _force = self.seek(_tmp).mulSelf(self.weightSeek);

            if (!self.accumulateForce(self.steeringForce, _force)) {
                return self.steeringForce;
            }
        }

        if (self.on(EnumBehaviorType.ARRIVE)) {
            var _tmp = self._vehicle.world().crosshair();
            _force = self.arrive(_tmp, self.deceleration).mulSelf(self.weightArrive);

            if (!self.accumulateForce(self.steeringForce, _force)) {
                return self.steeringForce;
            }
        }

        if (self.on(EnumBehaviorType.WANDER)) {
            _force = self.wander().mulSelf(self.weightWander);

            if (!self.accumulateForce(self.steeringForce, _force)) {
                return self.steeringForce;
            }
        }

        if (self.on(EnumBehaviorType.PURSUIT)) {
            if (self._targetAgent1) {
                _force = self.pursuit(self._targetAgent1).mulSelf(self.weightPursuit);

                if (!self.accumulateForce(self.steeringForce, _force)) {
                    return self.steeringForce;
                }
            } else {
                cc.log("Pursuit target not assigned!");
            }
        }

        if (self.on(EnumBehaviorType.OFFSET_PURSUIT)) {
            if (self._targetAgent1) {
                _force = self.offsetPursuit(self._targetAgent1, self.offset).mulSelf(self.weightOffsetPursuit);


                if (!self.accumulateForce(self.steeringForce, _force)) {
                    return self.steeringForce;
                }
            } else {
                cc.log("Pursuit target not assigned!");
            }
        }
        return self.steeringForce;
    },
    calculateDithered() {},
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

        var _out = self._vehicle.heading.mul(self.wallDetectionFeelerLength);
        self.feelers[0] = self._vehicle.pos().add(_out, _out);

        var _halfLength = self.wallDetectionFeelerLength / 2;

        var tmp = self._vehicle.heading.clone();
        self.vec2DRotateAroundOrigin(tmp, EnumConst.HALF_PI * 3.5);
        self.feelers[1] = self._vehicle.pos().add(tmp.mulSelf(_halfLength));

        tmp = self._vehicle.heading.clone();
        self.vec2DRotateAroundOrigin(tmp, EnumConst.HALF_PI * 0.5);
        self.feelers[2] = self._vehicle.pos().add(tmp.mulSelf(_halfLength));
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
        var _desiredVelocity = _pos.sub(target).normalizeSelf().mulSelf(self._vehicle.maxSpeed());

        return _desiredVelocity.subSelf(self._vehicle.velocity());
    },
    evade(pursuer) {
        var self = this;

        var _pos = self._vehicle.pos();
        var _toPursuer = pursuer.pos().sub(_pos);

        var _threatRangeSqr = 100.0 * 100.0;
        if (_toPursuer.magSqr() > _threatRangeSqr) {
            return new cc.v2(0, 0);
        }

        var _lookAheadTime = _toPursuer.mag() / (self._vehicle.maxSpeed() + pursuer.maxSpeed());
        var _tmp = pursuer.velocity().mul(_lookAheadTime);
        return self.flee(pursuer.pos().add(_tmp));
    },
    arrive(target, deceleration) {
        var self = this;

        var _pos = self._vehicle.pos();
        var _toTarget = target.sub(_pos);

        var _dist = _toTarget.mag();
        if (0.01 < _dist) {
            var _decelerationTweaker = 0.3;
            var _speed = _dist / (deceleration * _decelerationTweaker);
            _speed = Math.min(_speed, self._vehicle.maxSpeed());

            var _desiredVelocity = _toTarget.mulSelf(_speed).divSelf(_dist);
            return _desiredVelocity.subSelf(self._vehicle.velocity());
        }
        return new cc.v2(0, 0);
    },
    pursuit(evader) {
        var self = this;

        var _pos = self._vehicle.pos();
        cc.log(evader);
        var _toEvader = evader.pos().sub(_pos);

        var _relativeHeading = self._vehicle.heading().dot(evader.heading());

        var _tmp = _toEvader.dot(self._vehicle.heading());
        if (0 < _tmp && -0.95 > _relativeHeading) {
            return self.seek(evader.pos());
        }

        var _lookAheadTime = _toEvader.mag() / (self._vehicle.maxSpeed() + evader.maxSpeed());
        _tmp = self._vehicle.velocity().mul(_lookAheadTime);
        return self.seek(evader.pos().add(_tmp));
    },
    offsetPursuit(leader, offset) {
        var self = this;

        var _worldOffsetPos = self.pointToWorldSpace(offset, leader.heading(), leader.side(), leader.pos());
        var _toOffset = _worldOffsetPos.sub(self._vehicle.pos());
        var _lookAheadTime = _toOffset.mag() / (self._vehicle.maxSpeed() + leader.maxSpeed());

        var _tmp = leader.velocity().mul(_lookAheadTime);
        return self.arrive(_worldOffsetPos.addSelf(_tmp), EnumDeceleration.FAST);
    },
    wander() {
        var self = this;

        var _jitterThisTimeSlice = self.wanderJitter * self._vehicle.timeElapsed();
        var _tmp = cc.v2(Utility.randomClamped() * _jitterThisTimeSlice, Utility.randomClamped() * _jitterThisTimeSlice);
        self.wanderTarget.addSelf(_tmp);
        self.wanderTarget.normalizeSelf();
        self.wanderTarget.mulSelf(self.wanderRadius);

        var _target = self.wanderTarget.add(cc.v2(self.wanderDistance, 0));
        _target = self.pointToWorldSpace(_target, self._vehicle.heading(), self._vehicle.side(), self._vehicle.pos());
        return _target.subSelf(self._vehicle.pos());
    },
    obstacleAvoidance(obstacles) {
        var self = this;

        self.dboxLength = EnumDemo.MinDetectionBoxLength + (self._vehicle.speed() / self._vehicle.maxSpeed()) * EnumDemo.MinDetectionBoxLength;
        self._vehicle.world().tagObstacleWithinViewRange(self._vehicle, self.dboxLength);

        var _closestIntersectingObstacle = null;
        var _distToClosestIP = EnumConst.MAX_DOUBLE;
        var _localPosOfClosestObstacle = null;

        for (let i = 0; i < obstacles.length; i++) {
            const obstacle = obstacles[i];
            var _cVehicle = obstacle.getComponent("CVehicle");
            if (_cVehicle.isTagged()) {
                var _localPos = self.pointToLocalSpace(
                    _cVehicle.pos(),
                    self._vehicle.heading(),
                    self._vehicle.side(),
                    self._vehicle.pos()
                );

                if (_localPos.x >= 0) {
                    var _expandedRadius = _cVehicle.bRadius() + self._vehicle.bRadius();

                    if (Math.abs(_localPos.y) < _expandedRadius) {
                        var _cX = _localPos.x;
                        var _cY = _localPos.y;

                        var _sqrtPart = Math.sqrt(_expandedRadius * _expandedRadius - _cY * _cY);
                        var _ip = _cX = _sqrtPart;

                        if (_ip <= 0.0) {
                            _ip = _cX + _sqrtPart;
                        }

                        if (_ip < _distToClosestIP) {
                            _distToClosestIP = _ip;
                            _closestIntersectingObstacle = _cVehicle;
                            _localPosOfClosestObstacle = _localPos;
                        }
                    }
                }
            }
        }

        var _steeringForce = cc.v2(0, 0);

        if (_closestIntersectingObstacle) {
            var _multiplier = 1.0 + (self.dboxLength - _localPosOfClosestObstacle.x) / self.dboxLength;

            _steeringForce.y = (_closestIntersectingObstacle.bRadius() - _localPosOfClosestObstacle.y) * _multiplier;

            var _brakingWeight = 0.2;

            _steeringForce.x = (_closestIntersectingObstacle.bRadius() - _localPosOfClosestObstacle.x) * _brakingWeight;
        }

        return self.vectorToWorldSpace(_steeringForce, self._vehicle.heading(), self._vehicle.side());
    },
    wallAvoidance(walls) {
        var self = this;

        self.createFeelers();

        var _distToThisIP = 0.0;
        var _distToClosestIP = EnumConst.MAX_DOUBLE;
        var _closestWall = -1;

        var _steeringForce = null;
        var _closestPoint = null;

        for (let i = 0; i < self.feelers.length; i++) {
            const _feeler = self.feelers[i];

            for (let j = 0; j < walls.length; j++) {
                const _wall = walls[j];

                var _ret = self.lineIntersection2D(
                    self._vehicle.pos(),
                    _feeler,
                    _wall.from(),
                    _wall.to(),
                    _distToThisIP,
                    _point
                );
                var _flag = _ret[0];
                if (_flag) {
                    _distToThisIP = _ret[1];
                    if (_distToThisIP < _distToClosestIP) {
                        _distToClosestIP = _distToThisIP;

                        _closestWall = j;
                        _closestPoint = _ret[2];
                    }
                }
            }

            if (0 <= _closestWall) {
                var _overShoot = _feeler.sub(_closestPoint);
                _steeringForce = walls[_closestWall].normalize().mulSelf(_overShoot.mag());
            }
        }
        return _steeringForce;
    },
    followPath() {
        var self = this;

        var _currentWayPoint = self._path.currentWayPoint();
        var _dist = Utility.vec2dDistanceSq(_currentWayPoint, self._vehicle.pos());
        if (_dist < self.waypointSeekDistSq) {
            self._path.setNextWayPoint();
        }

        var _pt = self._path.currentWayPoint();
        _pt = _pt.clone();

        var _finished = self._path.finished();
        if (_finished) {
            return self.arrive(_pt, EnumDeceleration.NORMAL);
        } else {
            return self.seek(_pt);
        }
    },
    separation(neighbors) {
        var self = this;

        var _steeringForce = new cc.v2(0, 0);
        for (let i = 0; i < neighbors.length; i++) {
            const _neighbor = neighbors[i];

            if ((_neighbor != self._vehicle) && _neighbor.isTagged() && (_neighbor != self._targetAgent1)) {
                var _toAgent = self._vehicle.sub(_neighbor.pos());

                var _length = _toAgent.mag();
                _toAgent.normalizeSelf();
                _steeringForce.addSelf(_toAgent.divSelf(_length));
            }
        }
        return _steeringForce;
    },
    separationPlus(neighbors) {
        var self = this;

        //TODO:

        var _steeringForce = new cc.v2(0, 0);
        return _steeringForce;
    },
    alignment(neighbors) {
        var self = this;

        var _averageHeading = new cc.v2(0, 0);
        var _neighborCount = 0;

        for (let i = 0; i < neighbors.length; i++) {
            const _neighbor = neighbors[i];

            if ((_neighbor != self._vehicle) && _neighbor.isTagged() && (_neighbor != self._targetAgent1)) {
                _averageHeading.addSelf(_neighbor.heading());
                ++_neighborCount;
            }
        }

        if (_neighborCount > 0) {
            _averageHeading.divSelf(_neighborCount);
            _averageHeading.subSelf(self._vehicle.heading());
        }
        return _averageHeading;
    },
    alignmentPlus(neighbors) {
        var self = this;

        //TODO:

        var _averageHeading = new cc.v2(0, 0);
        return _averageHeading;
    },
    cohesion(neighbors) {
        var self = this;

        var _centerOfMass = new cc.v2(0, 0);
        var _steeringForce = new cc.v2(0, 0);

        var _neighborCount = 0;

        for (let i = 0; i < neighbors.length; i++) {
            const _neighbor = neighbors[i];

            if ((_neighbor != self._vehicle) && _neighbor.isTagged() && (_neighbor != self._targetAgent1)) {
                _centerOfMass.addSelf(_neighbor.pos());
                ++_neighborCount;
            }
        }

        if (_neighborCount > 0) {
            _centerOfMass.divSelf(_neighborCount);
            _steeringForce = self.seek(_centerOfMass);
        }
        _steeringForce.normalizeSelf();
        return _steeringForce;
    },
    cohesionPlus(neighbors) {
        var self = this;

        //TODO:

        var _steeringForce = new cc.v2(0, 0);
        _steeringForce.normalizeSelf();
        return _steeringForce;
    },
});