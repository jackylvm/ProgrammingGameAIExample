/*
 * File: CPath.js
 * File Created: 2018-12-28 23:50:58
 * Author: Jacky (jackylvm@foxmail.com>)
 * -----
 * Last Modified: 2019-01-26 12:11:06
 * Modified By: Jacky (jackylvm@foxmail.com>)
 * -----
 * Copyright 2018 上海火刀石网络科技有限公司
 * -----
 * HISTORY:
 * Date      			By			Comments
 * --------------------	---------	----------------------------------
 */
import EnumConst from "CEnum";
import Utility from "CUtility";

cc.Class({
    extends: cc.Object,

    properties: {
        wayPoints: [cc.Vec2],
        curWayPoint: 0,
        looped: false
    },
    init(numWayPoints, minX, minY, maxX, maxY, looped) {
        var self = this;

        self.createRandomPath(numWayPoints, minX, minY, maxX, maxY);

        self.curWayPoint = 0;
        self.looped = looped;
    },
    loopOn() {
        this.looped = true;
    },
    loopOff() {
        this.looped = false;
    },
    finished() {
        return this.wayPoints.length <= this.curWayPoint;
    },
    clear() {
        this.wayPoints = [];
        this.curWayPoint = 0;
    },
    currentWayPoint() {
        var self = this;

        if (self.wayPoints.length <= self.curWayPoint) {
            self.curWayPoint = self.wayPoints.length - 1;
        }
        return self.wayPoints[self.curWayPoint];
    },
    getPath() {
        return this.wayPoints;
    },
    setByArray(wayPoints) {
        this.wayPoints = wayPoints;
        this.curWayPoint = 0;
    },
    setByPath(path) {
        if (path) {
            this.wayPoints = path.getPath();
            this.curWayPoint = 0;
        }
    },
    createRandomPath(numWayPoints, minX, minY, maxX, maxY) {
        var self = this;

        self.wayPoints = [];

        var _midX = (maxX + minX) / 2.0;
        var _midY = (maxY + minY) / 2.0;

        var _smaller = Math.min(_midX, _midY);
        var _spacing = EnumConst.TWO_PI / numWayPoints;

        for (let i = 0; i < numWayPoints; i++) {
            var _radialDist = Utility.randInRange(_smaller * 0.2, _smaller);
            var _temp = new cc.v2(_radialDist, 0);

            Utility.vec2dRotateAroundOrigin(_temp, i * _spacing);

            _temp.x += _midX;
            _temp.y += _midY;

            self.wayPoints.push(_temp);
        }

        self.curWayPoint = 0;
        return self.wayPoints;
    },
    setNextWayPoint() {
        var self = this;

        self.curWayPoint += 1;
        if (self.wayPoints.length <= self.curWayPoint) {
            if (self.looped) {
                self.curWayPoint = 0;
            } else {
                self.curWayPoint = self.wayPoints.length;
            }
        }
    },
    addWayPoint(pt) {
        var self = this;
    },
});