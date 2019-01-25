/*
 * File: BaseGameEntity.js
 * File Created: 2018-12-19 12:26:30
 * Author: Jacky (jackylvm@foxmail.com>)
 * -----
 * Last Modified: 2019-01-25 16:09:46
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
        type: -1,
        bTag: false,
        vecPos: new cc.v2(0, 0),
        vecScale: new cc.v2(1, 1)
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
        return this.vecPos;
    },
    setPos(val) {
        this.vecPos.set(val);
    },
    bRadius() {
        return this.boundingRadius;
    },
    setBRadius(val) {
        this.boundingRadius = val;
    },
    ID() {
        return this.id;
    },
    isTagged() {
        return this.bTag;
    },
    tag() {
        this.bTag = true;
    },
    untag() {
        this.bTag = false;
    },
    scale() {
        return this.vecScale;
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
        return this.type;
    },
    setEntityType(val) {
        this.type = val;
    },
});