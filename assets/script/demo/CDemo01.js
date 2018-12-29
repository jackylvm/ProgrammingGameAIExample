/*
 * File: CDemo01.js
 * File Created: 2018-12-18 20:07:08
 * Author: Jacky (jackylvm@foxmail.com>)
 * -----
 * Last Modified: 2018-12-29 01:10:30
 * Modified By: Jacky (jackylvm@foxmail.com>)
 * -----
 * Copyright 2018 上海火刀石网络科技有限公司
 * -----
 * HISTORY:
 * Date      			By			Comments
 * --------------------	---------	----------------------------------
 */
import CMousePoint from "CMousePoint";

cc.Class({
    extends: cc.Component,

    properties: {
        VehiclePrefab: {
            default: null,
            type: cc.Prefab
        },
        VehicleNode: {
            default: null,
            type: cc.Node
        },
        MousePointInst: {
            default: null,
            type: CMousePoint
        }
    },

    // LIFE-CYCLE CALLBACKS:
    // onLoad () {},
    start() {
        var self = this;

        // 记录CVehicle的实例
        self._vehicles = [];

        self.MousePointInst.init(self);

        self.vehicle = cc.instantiate(self.VehiclePrefab);
        var _cVehicle = self.vehicle.getComponent("CVehicle");
        _cVehicle.initVehicle(self);
        self.VehicleNode.addChild(self.vehicle);

        self._vehicles.push(_cVehicle);

        var _tmp = self.MousePointInst.node.getPosition();
        _tmp = self.MousePointInst.node.parent.convertToWorldSpaceAR(_tmp);
        self._crosshair = self.vehicle.parent.convertToNodeSpaceAR(_tmp);
    },
    // update (dt) {},
    onMousePointMove(worldPt) {
        var self = this;
        self._crosshair = self.vehicle.parent.convertToNodeSpaceAR(worldPt);
    },
    walls() {
        return [];
    },
    obstacles() {
        return [];
    },
    crosshair() {
        var self = this;
        return self._crosshair;
    },
    tagObstacleWithinViewRange(vehicle, range) {
        var self = this;

        self.tagNeighbors(vehicle, self._vehicles, range);
    },
    tagNeighbors(vehicle, neighbors, radius) {
        var self = this;

        for (let i = 0; i < neighbors.length; i++) {
            const _cVehicle = neighbors[i];
            _cVehicle.untag();

            if (vehicle != _cVehicle) {
                var _to = _cVehicle.pos().sub(_cVehicle.pos());
                var _range = radius + _cVehicle.bRadius();
                if (_to.magSqr() < (_range * _range)) {
                    _cVehicle.tag();
                }
            }
        }
    },
    agents() {
        var self = this;
        return self._vehicles;
    },
});