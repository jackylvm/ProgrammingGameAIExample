/*
 * File: CDemo01.js
 * File Created: 2018-12-18 20:07:08
 * Author: Jacky (jackylvm@foxmail.com>)
 * -----
 * Last Modified: 2019-01-23 12:02:57
 * Modified By: Jacky (jackylvm@foxmail.com>)
 * -----
 * Copyright 2018 上海火刀石网络科技有限公司
 * -----
 * HISTORY:
 * Date      			By			Comments
 * --------------------	---------	----------------------------------
 */
import CMousePoint from "CMousePoint";
import {
    EnumBehaviorType
} from "CEnum";

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
        },
        ShowDescription: {
            default: null,
            type: cc.Label
        }
    },

    // LIFE-CYCLE CALLBACKS:
    // onLoad () {},
    start() {
        var self = this;

        self.ShowDescription.string = "当前行为:SEEK";

        // 记录CVehicle的实例
        self._vehicles = [];

        self.MousePointInst.init(self);

        self.vehicle = cc.instantiate(self.VehiclePrefab);
        self.cVehicle = self.vehicle.getComponent("CVehicle");
        self.cVehicle.initVehicle(self);
        self.VehicleNode.addChild(self.vehicle);

        self._vehicles.push(self.cVehicle);

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
    btnSeek(evt) {
        var self = this;

        self.ShowDescription.string = "当前行为:SEEK";
        self.cVehicle.changeBehavior(EnumBehaviorType.SEEK);
    },
    btnFlee(evt) {
        var self = this;

        self.ShowDescription.string = "当前行为:FLEE";
        self.cVehicle.changeBehavior(EnumBehaviorType.FLEE);
    },
    btnArrive(evt) {
        var self = this;

        self.ShowDescription.string = "当前行为:ARRIVE";
        self.cVehicle.changeBehavior(EnumBehaviorType.ARRIVE);
    },
    btnPursuit(evt) {
        var self = this;

        self.ShowDescription.string = "当前行为:PURSUIT";
        self.cVehicle.changeBehavior(EnumBehaviorType.PURSUIT);
    },
});