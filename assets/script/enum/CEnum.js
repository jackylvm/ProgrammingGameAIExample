/*
 * File: CEnum.js
 * File Created: 2018-12-19 18:05:33
 * Author: Jacky (jackylvm@foxmail.com>)
 * -----
 * Last Modified: 2018-12-29 01:25:03
 * Modified By: Jacky (jackylvm@foxmail.com>)
 * -----
 * Copyright 2018 上海火刀石网络科技有限公司
 * -----
 * HISTORY:
 * Date      			By			Comments
 * --------------------	---------	----------------------------------
 */
var _enum = module.exports = {};

_enum.EnumSummingMethod = cc.Enum({
    WEIGHTED_AVERAGE: 1,
    PRIORITIZED: 2,
    DITHERED: 3
});
_enum.EnumBehaviorType = cc.Enum({
    NONE: 0x00000,
    SEEK: 0x00002,
    FLEE: 0x00004,
    ARRIVE: 0x00008,
    WANDER: 0x00010,
    COHESION: 0x00020,
    SEPARATION: 0x00040,
    ALIGNMENT: 0x00080,
    OBSTACLE_AVOIDANCE: 0x00100,
    WALL_AVOIDANCE: 0x00200,
    FOLLOW_PATH: 0x00400,
    PURSUIT: 0x00800,
    EVADE: 0x01000,
    INTERPOSE: 0x02000,
    HIDE: 0x04000,
    FLOCK: 0x08000,
    OFFSET_PURSUIT: 0x10000
});
_enum.EnumDeceleration = cc.Enum({
    FAST: 1,
    NORMAL: 2,
    SLOW: 3,
});
_enum.EnumConst = cc.Enum({
    PI: 3.1415926,
    TWO_PI: 3.1415926 * 2,
    HALF_PI: 3.1415926 / 2,
    QUARTER_PI: 3.1415926 / 4,
    DEGREE_ONE: 180 / 3.1415926,
    MAX_DOUBLE: Number.MAX_VALUE,
});