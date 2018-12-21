/*
 * File: BaseGameEntity.js
 * File Created: 2018-12-19 12:26:30
 * Author: Jacky (jackylvm@foxmail.com>)
 * -----
 * Last Modified: 2018-12-20 19:35:30
 * Modified By: Jacky (jackylvm@foxmail.com>)
 * -----
 * Copyright 2018 上海火刀石网络科技有限公司
 * -----
 * HISTORY:
 * Date      			By			Comments
 * --------------------	---------	----------------------------------
 */
var CBaseGameEntity = cc.Class({
    extends: cc.Component,
    statics: {
        nextID: 0,
        nextValidID() {
            return CBaseGameEntity.nextID++;
        },
    },
    properties: {
        id: 0,
        type: -1,
        bTag: false,
        boundingRadius: 0.0,
        vecPos: new cc.v2(0, 0),
        vecScale: new cc.v2(0, 0)
    },
    ctor() {
        var self = this;

        self.id = CBaseGameEntity.nextValidID();
    },
    initBaseGameEntity(pos, r) {
        var self = this;

        self.boundingRadius = r;

        self.vecPos.set(pos);
    },
    // LIFE-CYCLE CALLBACKS:
    // onLoad () {},
    // start() {},
    // update (dt) {},
    pos() {
        var self = this;
        return self.vecPos;
    },
    setPos(val) {
        self.vecPos.set(val);
    },
    bRadius() {
        var self = this;
        return self.boundingRadius;
    },
    setBRadius(val) {
        var self = this;
        self.boundingRadius = val;
    },
    ID() {
        var self = this;
        return self.id;
    },
    isTagged() {
        var self = this;
        return self.bTag;
    },
    tag() {
        var self = this;
        self.bTag = true;
    },
    untag() {
        var self = this;
        self.bTag = false;
    },
    scale() {
        var self = this;
        return self.vecScale;
    },
    setScaleByVec2(val) {
        var self = this;
        self.boundingRadius *= (Math.max(val.x, val.y) / Math.max(self.vecScale.x, self.vecScale.y));
        self.vecScale.set(val);
    },
    setScaleByNumber(val) {
        self.boundingRadius *= (val / Math.max(self.vecScale.x, self.vecScale.y));
        self.vecScale.x = val;
        self.vecScale.y = val;
    },
    entityType() {
        var self = this;
        return self.type;
    },
    setEntityType(val) {
        var self = this;
        self.type = val;
    },
});