/*
 * File: CDemo01.js
 * File Created: 2018-12-18 20:07:08
 * Author: Jacky (jackylvm@foxmail.com>)
 * -----
 * Last Modified: 2019-01-25 12:33:30
 * Modified By: Jacky (jackylvm@foxmail.com>)
 * -----
 * Copyright 2018 上海火刀石网络科技有限公司
 * -----
 * HISTORY:
 * Date      			By			Comments
 * --------------------	---------	----------------------------------
 */
import CMousePoint from "CMousePoint";
import CWorld from "CWorld";
import {
    EnumBehaviorType
} from "CEnum";

cc.Class({
    extends: CWorld,

    properties: {},

    // LIFE-CYCLE CALLBACKS:
    // onLoad () {},
    start() {
        var self = this;

        self._super();

        self.cVehicle.changeBehavior(EnumBehaviorType.WANDER);
    },
    // update (dt) {},
});