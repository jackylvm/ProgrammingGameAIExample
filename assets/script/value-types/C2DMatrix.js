/*
 * File: C2DMatrix.js
 * File Created: 2018-12-19 17:17:45
 * Author: Jacky (jackylvm@foxmail.com>)
 * -----
 * Last Modified: 2018-12-19 19:24:46
 * Modified By: Jacky (jackylvm@foxmail.com>)
 * -----
 * Copyright 2018 上海火刀石网络科技有限公司
 * -----
 * HISTORY:
 * Date      			By			Comments
 * --------------------	---------	----------------------------------
 */
import CMatrix from "CMatrix";

cc.Class({
    properties: {
        matrix: {
            default: null,
            type: CMatrix
        }
    },
    ctor() {
        var self = this;

        self.matrix = new Matrix();
    },
    identity() {
        var self = this;

        self.matrix.identity();
    },
    matrixMultiply(mIn) {
        var self = this;

        var _matrix = self.matrix;
        var _mat = new Matrix();
        _mat.m11 = (_matrix.m11 * mIn.m11) + (_matrix.m12 * mIn.m21) + (_matrix.m13 * mIn.m31);
        _mat.m12 = (_matrix.m11 * mIn.m12) + (_matrix.m12 * mIn.m22) + (_matrix.m13 * mIn.m32);
        _mat.m13 = (_matrix.m11 * mIn.m13) + (_matrix.m12 * mIn.m23) + (_matrix.m13 * mIn.m33);

        _mat.m21 = (_matrix.m21 * mIn.m11) + (_matrix.m22 * mIn.m21) + (_matrix.m23 * mIn.m31);
        _mat.m22 = (_matrix.m21 * mIn.m12) + (_matrix.m22 * mIn.m22) + (_matrix.m23 * mIn.m32);
        _mat.m23 = (_matrix.m21 * mIn.m13) + (_matrix.m22 * mIn.m23) + (_matrix.m23 * mIn.m33);

        _mat.m31 = (_matrix.m31 * mIn.m11) + (_matrix.m32 * mIn.m21) + (_matrix.m33 * mIn.m31);
        _mat.m32 = (_matrix.m31 * mIn.m12) + (_matrix.m32 * mIn.m22) + (_matrix.m33 * mIn.m32);
        _mat.m33 = (_matrix.m31 * mIn.m13) + (_matrix.m32 * mIn.m23) + (_matrix.m33 * mIn.m33);

        self.matrix = _mat;
    },
    translate(x, y) {
        var self = this;

        var _mat = new Matrix();
        _mat.m11 = 1;
        _mat.m12 = 0;
        _mat.m13 = 0;

        _mat.m21 = 0;
        _mat.m22 = 1;
        _mat.m23 = 0;

        _mat.m31 = x;
        _mat.m32 = y;
        _mat.m33 = 1;

        self.matrixMultiply(_mat);
    },
    scale(xScale, yScale) {
        var self = this;

        var _mat = new CMatrix();
        _mat.m11 = xScale;
        _mat.m12 = 0;
        _mat.m13 = 0;

        _mat.m21 = 0;
        _mat.m22 = yScale;
        _mat.m23 = 0;

        _mat.m31 = 0;
        _mat.m32 = 0;
        _mat.m33 = 1;

        self.matrixMultiply(_mat);
    },
    rotateByRotation(rot) {
        var self = this;

        var _sin = Math.sin(rot);
        var _cos = Math.cos(rot);

        var _mat = new CMatrix();
        _mat.m11 = _cos;
        _mat.m12 = _sin;
        _mat.m13 = 0;

        _mat.m21 = -_sin;
        _mat.m22 = _cos;
        _mat.m23 = 0;

        _mat.m31 = 0;
        _mat.m32 = 0;
        _mat.m33 = 1;

        self.matrixMultiply(_mat);
    },
    rotateByVec2(fwd, side) {
        var self = this;

        var _mat = new CMatrix();
        _mat.m11 = fwd.x;
        _mat.m12 = fwd.y;
        _mat.m13 = 0;

        _mat.m21 = side.x;
        _mat.m22 = side.y;
        _mat.m23 = 0;

        _mat.m31 = 0;
        _mat.m32 = 0;
        _mat.m33 = 1;

        self.matrixMultiply(_mat);
    },
    transformVec2s(points) {
        var self = this;

        var _matrix = self.matrix;

        for (let i = 0; i < points.length; i++) {
            var pt = points[i];

            var tx = (_matrix.m11 * pt.x) + (_matrix.m21 * pt.y) + (_matrix.m31);
            var ty = (_matrix.m12 * pt.x) + (_matrix.m22 * pt.y) + (_matrix.m32);

            pt.x = tx;
            pt.y = ty;
        }
    },
    transformVec2(point) {
        var self = this;

        var _matrix = self.matrix;

        var tx = (_matrix.m11 * pt.x) + (_matrix.m21 * pt.y) + (_matrix.m31);
        var ty = (_matrix.m12 * pt.x) + (_matrix.m22 * pt.y) + (_matrix.m32);

        point.x = tx;
        point.y = ty;
    },
});