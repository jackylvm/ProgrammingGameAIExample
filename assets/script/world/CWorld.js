/*
 * File: CWorld.js
 * File Created: 2019-01-25 10:47:54
 * Author: Jacky (jackylvm@foxmail.com>)
 * -----
 * Last Modified: 2019-01-25 18:14:33
 * Modified By: Jacky (jackylvm@foxmail.com>)
 * -----
 * Copyright 2019 上海火刀石网络科技有限公司
 * -----
 * HISTORY:
 * Date      			By			Comments
 * --------------------	---------	----------------------------------
 */
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
        }
    },

    // onLoad () {},
    start() {
        var self = this;

        self._crosshair = cc.v2(0, 0);

        self.vehicle = cc.instantiate(self.VehiclePrefab);
        self.cVehicle = self.vehicle.getComponent("CVehicle");
        self.cVehicle.initVehicle(self);
        self.VehicleNode.addChild(self.vehicle);
    },
    // update (dt) {},
    walls() {
        return [];
    },
    obstacles() {
        return [];
    },
    crosshair() {
        return this._crosshair;
    },
    tagObstacleWithinViewRange(vehicle, range) {
        this.tagNeighbors(vehicle, self._vehicles, range);
    },
    tagNeighbors(vehicle, neighbors, radius) {
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
        return this._vehicles;
    },
    renderWanderCircle() {
        return true;
    },
    cxClient() {
        return 960;
    },
    cyClient() {
        return 640;
    },
});