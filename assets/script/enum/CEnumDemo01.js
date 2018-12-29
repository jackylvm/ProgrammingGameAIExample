/*
 * File: CEnumDemo01.js
 * File Created: 2018-12-28 20:43:31
 * Author: Jacky (jackylvm@foxmail.com>)
 * -----
 * Last Modified: 2018-12-29 01:25:46
 * Modified By: Jacky (jackylvm@foxmail.com>)
 * -----
 * Copyright 2018 上海火刀石网络科技有限公司
 * -----
 * HISTORY:
 * Date      			By			Comments
 * --------------------	---------	----------------------------------
 */

var _enum = module.exports = {};

_enum.NumAgents = 300;
_enum.NumObstacles = 7;
_enum.MinObstacleRadius = 10;
_enum.MaxObstacleRadius = 30;

_enum.NumCellsX = 7;
_enum.NumCellsY = 7;

_enum.NumSamplesForSmoothing = 10;

_enum.SteeringForceTweaker = 200.0;
_enum.MaxSteeringForce = 2.0;
_enum.MaxSpeed = 150.0;
_enum.VehicleMass = 1.0;
_enum.VehicleScale = 3.0;

_enum.SeparationWeight = 1.0;
_enum.AlignmentWeight = 1.0;
_enum.CohesionWeight = 2.0;
_enum.ObstacleAvoidanceWeight = 10.0;
_enum.WallAvoidanceWeight = 10.0;
_enum.WanderWeight = 1.0;
_enum.SeekWeight = 1.0;
_enum.FleeWeight = 1.0;
_enum.ArriveWeight = 1.0;
_enum.PursuitWeight = 1.0;
_enum.OffsetPursuitWeight = 1.0;
_enum.InterposeWeight = 1.0;
_enum.HideWeight = 1.0;
_enum.EvadeWeight = 0.01;
_enum.FollowPathWeight = 0.05;

_enum.ViewDistance = 50.0;
_enum.MinDetectionBoxLength = 40.0;
_enum.WallDetectionFeelerLength = 40.0;

_enum.prWallAvoidance = 0.5;
_enum.prObstacleAvoidance = 0.5;
_enum.prSeparation = 0.2;
_enum.prAlignment = 0.3;
_enum.prCohesion = 0.6;
_enum.prWander = 0.8;
_enum.prSeek = 0.8;
_enum.prFlee = 0.6;
_enum.prEvade = 1.0;
_enum.prHide = 0.8;
_enum.prArrive = 0.5;

_enum.MaxTurnRatePerSecond = 3.1415926;