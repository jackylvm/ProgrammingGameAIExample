/*
 * File: PhysicsSetting.js
 * File Created: 2018-12-08 18:18:29
 * Author: Jacky (jackylvm@foxmail.com>)
 * -----
 * Last Modified: 2018-12-19 16:51:27
 * Modified By: Jacky (jackylvm@foxmail.com>)
 * -----
 * Copyright 2018 上海火刀石网络科技有限公司
 * -----
 * HISTORY:
 * Date      			By			Comments
 * --------------------	---------	----------------------------------
 */
// 该文件不需要绑定在什么地方,creator启动后会自动执行
cc.game.on(cc.game.EVENT_ENGINE_INITED, function (evt) {
    let physicsMgr = cc.director.getPhysicsManager();

    physicsMgr.enabled = true;
    physicsMgr.gravity = cc.v2(0, 0);

    physicsMgr.debugDrawFlags =
        cc.PhysicsManager.DrawBits.e_jointBit |
        cc.PhysicsManager.DrawBits.e_shapeBit |
        cc.PhysicsManager.DrawBits.e_aabbBit |
        cc.PhysicsManager.DrawBits.e_pairBit |
        cc.PhysicsManager.DrawBits.e_centerOfMassBit;
});