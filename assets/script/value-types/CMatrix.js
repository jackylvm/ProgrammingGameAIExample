/*
 * File: Matrix.js
 * File Created: 2018-12-19 17:26:53
 * Author: Jacky (jackylvm@foxmail.com>)
 * -----
 * Last Modified: 2018-12-19 19:25:06
 * Modified By: Jacky (jackylvm@foxmail.com>)
 * -----
 * Copyright 2018 上海火刀石网络科技有限公司
 * -----
 * HISTORY:
 * Date      			By			Comments
 * --------------------	---------	----------------------------------
 */
cc.Class({
    name: "CMatrix",
    properties: {
        m11: {
            get() {
                return this._m11;
            },
            set(val) {
                this._m11 = val;
            }
        },
        m12: {
            get() {
                return this._m12;
            },
            set(val) {
                this._m12 = val;
            }
        },
        m13: {
            get() {
                return this._m13;
            },
            set(val) {
                this._m13 = val;
            }
        },
        m21: {
            get() {
                return this._m21;
            },
            set(val) {
                this._m21 = val;
            }
        },
        m22: {
            get() {
                return this._m22;
            },
            set(val) {
                this._m22 = val;
            }
        },
        m23: {
            get() {
                return this._m23;
            },
            set(val) {
                this._m23 = val;
            }
        },
        m31: {
            get() {
                return this._m31;
            },
            set(val) {
                this._m31 = val;
            }
        },
        m32: {
            get() {
                return this._m32;
            },
            set(val) {
                this._m32 = val;
            }
        },
        m33: {
            get() {
                return this._m33;
            },
            set(val) {
                this._m33 = val;
            }
        }
    },
    ctor() {
        var self = this;

        self.identity();
    },
    identity() {
        var self = this;

        self._m11 = 1.0;
        self._m12 = 0.0;
        self._m13 = 0.0;
        self._m21 = 0.0;
        self._m22 = 1.0;
        self._m23 = 0.0;
        self._m31 = 0.0;
        self._m32 = 0.0;
        self._m33 = 1.0;
    },
});