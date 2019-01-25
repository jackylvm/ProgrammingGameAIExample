/*
 * File: CUtility.js
 * File Created: 2018-12-29 00:01:02
 * Author: Jacky (jackylvm@foxmail.com>)
 * -----
 * Last Modified: 2019-01-25 17:16:23
 * Modified By: Jacky (jackylvm@foxmail.com>)
 * -----
 * Copyright 2018 上海火刀石网络科技有限公司
 * -----
 * HISTORY:
 * Date      			By			Comments
 * --------------------	---------	----------------------------------
 */
import C2DMatrix from "C2DMatrix";

var _utility = module.exports = {};

_utility.randFloat = function () {
    return Math.random();
};
_utility.randInRange = function (x, y) {
    return x + _utility.randFloat() * (y - x);
};
_utility.randomClamped = function () {
    return _utility.randFloat() - _utility.randFloat();
};
_utility.vec2dRotateAroundOrigin = function (vec, ang) {
    var _matTransform = new C2DMatrix();

    _matTransform.rotateByRotation(ang);

    _matTransform.transformVec2(vec);
};
_utility.vec2dDistanceSq = function (vecA, vecB) {
    var _xSeparation = vecB.x - vecA.x;
    var _ySeparation = vecB.y - vecA.y;

    return _xSeparation * _xSeparation + _ySeparation * _ySeparation;
};
/**
 * 将窗户视为环形
 */
_utility.wrapAround = function (pos, maxX, maxY) {
    var _half_maxX = maxX / 2;
    var _half_maxY = maxY / 2;
    if (pos.x > _half_maxX) {
        pos.x = -_half_maxX;
    }
    if (pos.x < -_half_maxX) {
        pos.x = _half_maxX;
    }
    if (pos.y < -_half_maxY) {
        pos.y = _half_maxY;
    }
    if (pos.y > _half_maxY) {
        pos.y = -_half_maxY;
    }
};