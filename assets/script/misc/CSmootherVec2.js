/*
 * File: CSmoother.js
 * File Created: 2018-12-20 14:52:31
 * Author: Jacky (jackylvm@foxmail.com>)
 * -----
 * Last Modified: 2018-12-20 16:33:12
 * Modified By: Jacky (jackylvm@foxmail.com>)
 * -----
 * Copyright 2018 上海火刀石网络科技有限公司
 * -----
 * HISTORY:
 * Date      			By			Comments
 * --------------------	---------	----------------------------------
 */
cc.Class({
    properties: {
        history: [],
        nextUpdateSlot: 0,
    },
    doUpdate(mostRecentValue) {
        var self = this;

        self.history.push(mostRecentValue);

        if (self.history.length == self.nextUpdateSlot) {
            self.nextUpdateSlot = 0;
        }

        var _sum = new cc.v2(0, 0);
        self.history.forEach(element => {
            _sum.addSelf(element);
        });

        return _sum.divSelf(self.history.length);
    },
});