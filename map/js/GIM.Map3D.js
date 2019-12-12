
GIM.Map3D = function(params) {

    var params = params || {};

    var mainContainer = params.container !== undefined ? params.container : document.createElement("div"),
        initCompleted = params.initCompleted !== undefined ? params.initCompleted : null,
        enabledControl = params.enabledControl !== undefined ? params.enabledControl : true,
        onSelected = params.onSelected !== undefined ? params.onSelected : null,
        accessToken = params.accessToken !== undefined ? params.accessToken : null,
        backgroundColor = params.backgroundColor !== undefined ? params.backgroundColor : 0x0,
        compassOffset = params.compassOffset !== undefined ? params.compassOffset : [10, 10];
    themeID = params.themeID !== undefined ? params.themeID : null;

    GIM.ThemePath += themeID + "/";

    var self = this;
    this.startNode = {};
    this.endNode = {};
    var containerWidth, containerHeight, containerHalfWidth, containerHalfHeight;

    var renderer, stats, scene, cameraController, container3D, projector;

    var controls;
    var floor3Ds = {};
    var curSelectedUnit3D = null;
    var curShownFloorIds = null;

    var raycaster, containerPos;
    var mouse = new THREE.Vector2(),
        INTERSECTED;

    var pathMesh;
    var minFloorPositionZ = GIM.MAP_CONFIG.minFloorPositionZ;
    var maxFloorPositionZ = GIM.MAP_CONFIG.maxFloorPositionZ;
    var isMapReady = false;

    var pathAnimatePointMeshes = [];
    var pathAnimateIndexDelta = 0;
    var pathAnimateTime = 60;
    var pathAnimateCircleLength = 25;

    var zoomBar;
    var mapPin;
    var floorSelector;

    var mouseOrigPoint = { x: 0, y: 0 };
    var floorContainer = new THREE.Group();
    var lastSelectdModel = null; //modle orgin color orgin mesh  face range
    var collision = new GIM.Collision();
    var locationMark;
    var isSimulated = false; //是否开启模拟导�?
    var isNavigation = false;
    var compass;

    //MAIN FUNCTIONS///////////////////////////////////////////

    function reset() {

        if (isMapReady) {
            clearPath();
            self.setPolarAngle(60);
            zoomLevel(10);
            forceUpate();
            TweenLite.to(floorContainer.position, { x: 0, y: 0, z: 0 });
        }
    }


    function showFloors(floorIds) {

        if (floorIds.length == 1)
            checkFloorIsCreat(floorIds[0]);

        clearPath();
        cameraController.percent = 0;
        if (curShownFloorIds === null) curShownFloorIds = floorIds;

        if (GIM.DEBUG_MODE) mapPin.close();

        //UPDATE FLOOR LOGOS
        if (GIM.DEBUG_MODE) floorSelector.showFloors(floorIds);

        //HIDE ALL FLOORS
        for (var key in floor3Ds) {
            var floor3D = floor3Ds[key];
            floor3D.visible = false;
            floor3D.position.z = minFloorPositionZ;
        }

        if (floorIds.length === 1) {
            if (curShownFloorIds.length > 0) {
                var preFloorId = curShownFloorIds[0];
                var curFloorId = floorIds[0];
                var preVisibleFloor3D = floor3Ds[preFloorId];
                var curVisibleFloor3D = floor3Ds[curFloorId];

                if (preVisibleFloor3D && curVisibleFloor3D) {
                    curVisibleFloor3D.visible = true
                    preVisibleFloor3D.visible = true;

                } else {

                    // return;
                }

                if (preVisibleFloor3D.name !== curVisibleFloor3D.name) {
                    var isUp = parseInt(preVisibleFloor3D.order) > parseInt(curVisibleFloor3D.order);
                    preVisibleFloor3D.position.z = 0;
                    var temp = 2;
                    curVisibleFloor3D.position.z = isUp ? minFloorPositionZ / temp : maxFloorPositionZ / temp;
                    self.forceRender = true;
                    TweenLite.to(preVisibleFloor3D.position, 0.7, {
                        z: isUp ? maxFloorPositionZ / temp : minFloorPositionZ / temp,
                        onComplete: function() {

                            preVisibleFloor3D.visible = false;
                            preVisibleFloor3D.position.z = maxFloorPositionZ;
                            self.forceRender = false;
                            //  console.log(preVisibleFloor3D.name,curVisibleFloor3D.name,curVisibleFloor3D.position.z);

                        }
                    });

                    TweenLite.to(curVisibleFloor3D.position, 0.7, { z: 0 })
                } else {
                    preVisibleFloor3D.position.z = 0;
                }
            }
        } else if (floorIds.length === 2) {

            var floor3D1 = floor3Ds[floorIds[0]];
            var floor3D2 = floor3Ds[floorIds[1]];
            floor3D1.visible = floor3D2.visible = true;
            var isUp = parseInt(floor3D1.order) > parseInt(floor3D2.order);
            var floor3D1Z = GIM.FLOOR_GAP * 1 * (isUp ? 1 : -1);
            var floor3D2Z = GIM.FLOOR_GAP * 1 * (isUp ? -1 : 1);

            TweenLite.to(floor3D1.position, 0.8, { z: floor3D1Z });
            TweenLite.to(floor3D2.position, 0.8, { z: floor3D2Z });

        } else if (floorIds.length === 3) {

            var floor3D1 = floor3Ds[floorIds[0]];
            var floor3D2 = floor3Ds[floorIds[1]];
            var floor3D3 = floor3Ds[floorIds[2]];
            var tempFloor3Ds = [floor3D1, floor3D2, floor3D3];

            tempFloor3Ds = tempFloor3Ds.sort(function(a, b) {

                if (a.order > b.order) {
                    return 1;
                }
                if (a.order < b.order) {
                    return -1;
                }
                // a 必须等于 b
                return 0;
            })

            floor3D1.visible = floor3D2.visible = floor3D3.visible = true;
            tempFloor3Ds[0].position.z = GIM.FLOOR_GAP * 1 * (isUp ? 1 : -1);
            tempFloor3Ds[1].position.z = 0;
            tempFloor3Ds[2].position.z = GIM.FLOOR_GAP * 1 * (isUp ? -1 : 1);

        }

        curShownFloorIds = floorIds;
    }



    function showPinOnUnit3D(nodePosition, floor) {
        if (nodePosition === null) return;
        var wordCoordinate = toScreenXY(nodePosition.x, nodePosition.y, nodePosition.z);

        mapPin.open(wordCoordinate.x, wordCoordinate.y, self);
    }

    function searchPath(callback, $isSimulated) {

        isSimulated = $isSimulated;
        clearPath(false);
        var msg = "startNodeId or endNodeId is null";
        var startNodeId = self.startNode.pointID;
        var endNodeId = self.endNode.pointID;

        if (!startNodeId || !endNodeId) {

            if (callback) callback(msg);
            return;

        }

        var path = [];
        var cmd = {};
        cmd.command = "CreatePath";
        cmd.pid = GIM.PID;
        cmd.lan = "sc";
        cmd.parameter = {};
        cmd.parameter.PointID = startNodeId;
        cmd.parameter.EndPointID = endNodeId;
        cmd.parameter.SameFloorCreatePath = "false";

        var agrs = "code=" + JSON.stringify(cmd);

        var dic = {};
        var pathFloors = [];
        GIM.SVGParser.loadURL(GIM.REMOTE_SERVER, agrs, function(data) {

            if (data) {

                path = data.v.Path;
                if (!path) {
                    alert("寻路失败");
                    return;
                }
                path.forEach(function(pointModel) {
                        // dic[pointModel.FloorID] = dic[pointModel.FloorID] ? dic[pointModel.FloorID] : {list: []};
                        // dic[pointModel.FloorID].list.push(pointModel);
                        if (pathFloors.indexOf(pointModel.FloorID) == -1)
                            pathFloors.push(pointModel.FloorID);
                    }) //  end  for
                drawPathToCurrentSelectedUnit(path, pathFloors, callback);
                return path;
            }

        })

    }


    function drawPathToCurrentSelectedUnit(pathList, pathFloors, callback) {

        var startFloorId = self.startNode.floorID;
        var endFloorId = self.endNode.floorID;

        if (pathFloors.length > 0)
            showFloors(pathFloors);

        setTimeout(function() {

            var vector3Ds = [];
            var vector2Ds = [];
            var pathNodes = pathList;
            if (pathNodes.length === 0) {
                showFloors([startFloorId]);
                console.log("faild")
                if (callback) callback("faild");

            } else {

                isNavigation = true;

                distance = GIM.prototype.calcDistance(pathNodes);

                for (var i = 0; i < pathNodes.length; i++) {
                    var pathNode = pathNodes[i];
                    var floor3D = floor3Ds[pathNode.FloorID];
                    var vector3 = new THREE.Vector3(pathNode.x - GIM.OFFSET, -pathNode.y + GIM.OFFSET, floor3D.position.z + 20);
                    vector3Ds.push(vector3);
                    vector2Ds.push(new THREE.Vector2(pathNode.x - GIM.OFFSET, -pathNode.y + GIM.OFFSET))
                }

                // console.log(vector2Ds);
                drawPath(vector3Ds);
                if (callback) callback("done");

            }

        }, 1000)

    }

    var distance = 0;

    function drawPath(vector3Ds) {

        // vector3Ds = averageVectors(vector3Ds); // 分割Z
        vector3Ds.reverse();
        var pathGeometry = new THREE.Geometry();
        var vector3D;
        var temp = [];

        for (var i = 0; i < vector3Ds.length; i++) {
            vector3D = vector3Ds[i];
            var v3 = new THREE.Vector3(vector3D.x, vector3D.y, vector3D.z)
            temp.push(v3)

        }

        var curve = new THREE.CatmullRomCurve3(temp, false, "catmullrom", 0); //Path//CatmullRomCurve3
        // curve.arcLengthDivisions = 2000;
        // curve.updateArcLengths ()
        var points = curve.getSpacedPoints(Math.floor(distance / 10));
        pathGeometry.vertices = points //.reverse();

        // temp = points;
        self.path = temp;
        makeLine(pathGeometry, temp);

        if (!isSimulated) return;

        points.reverse();
        var len = points.length;
        for (var i = 0; i < len; i++) {
            var vector3DofPath = points[i];
            pathAnimatePointMeshes.push(vector3DofPath);
        }

        pathAnimateCircleLength = pathAnimatePointMeshes.length;
        pathAnimateIndexDelta = pathAnimatePointMeshes.length;
        locationMark.visible = true;

    }

    var lastPostion;

    function doPathAnimate() {

        if (!isSimulated) return;
        pathAnimateIndexDelta--;
        if (pathAnimateIndexDelta < 0) pathAnimateIndexDelta = pathAnimateCircleLength;
        for (var i = 0; i < pathAnimatePointMeshes.length - 2; i++) {
            var p = pathAnimatePointMeshes[i];
            lastPostion = pathAnimatePointMeshes[i + 1];
            if (true) {

                if (i === pathAnimateIndexDelta) {
                    // mesh.visible = true;
                    self.setLocation(p);
                    var rad = Math.atan2(p.y - lastPostion.y, p.x - lastPostion.x) - Math.PI / 2;
                    self.locationMarkRotation(rad);
                    rad = rad > 0 ? rad : Math.PI + (Math.PI + rad);
                    // controls.setAzimuthalAngle(rad);

                } else {
                    // mesh.visible = false;

                }

            }
        }
    }



    function clearPath(isCleanMark) {

        floorContainer.remove(floorContainer.getObjectByName("line"));
        // cleanSelectUnit3D();

        if (isCleanMark) {
            self.clearEndArea();
            self.clearStartArea();
        }

        if (locationMark) {
            locationMark.visible = false;
        }

        if (pathMesh) {
            pathMesh.parent.remove(pathMesh);
            pathMesh = null;
            delete pathMesh;
        }
        pathAnimatePointMeshes = [];

        isNavigation = false;
    }

    function setSize(width, height) {

        if (GIM.DEBUG_MODE) console.log("- [GimMap]Map3D.setSize:", width, height);

        containerWidth = width;
        containerHeight = height;

        containerHalfWidth = containerWidth * 0.5;
        containerHalfHeight = containerHeight * 0.5;

        cameraController.camera.aspect = containerWidth / containerHeight;
        cameraController.camera.updateProjectionMatrix();

        renderer.setSize(containerWidth, containerHeight);
    }

    //ASSIST FUNCTIONS//////////////////////////////////////////

    function selectUint3DByAreaId(areaID, jumpToFloor) {

        cleanSelectUnit3D();

        var displayModel = GIM.DisplayModel.prototype.allArea[areaID];
        if (displayModel) {

            var areaFaces = displayModel.geometry.faces.slice(displayModel.faceRange[0], displayModel.faceRange[1]);
            updateFaceColors(areaFaces, GIM.SELECT_COLOR);
            displayModel.geometry.colorsNeedUpdate = true;
            if (self.mark) {
                self.mark.visible = false;
                self.mark.position.x = displayModel.data.nodePosition.x;
                self.mark.position.y = displayModel.data.nodePosition.y;
                self.mark.position.z = displayModel.data.deep + 3; //+ self.mark.scale.y / 2
                self.markShowTimer = setTimeout(function() {
                    self.mark.visible = true;
                    clearTimeout(self.markShowTimer);

                }, 100);

                displayModel.floor.add(self.mark);
                if (displayModel.floor.facilityPOIList.indexOf(self.mark) == -1)
                    displayModel.floor.facilityPOIList.push(self.mark);
            }

            onSelected(displayModel.data);

            if (curShownFloorIds.length > 1 || curShownFloorIds.indexOf(displayModel.floorID) == -1 && jumpToFloor) {
                showFloors([displayModel.floorID]);

            } else if (jumpToFloor && jumpToFloor != "undefined") {
                self.move2Point(displayModel.data.nodePosition);

            }

            self.currentSelectUint3DID = areaID;
            lastSelectdModel = {};
            lastSelectdModel.areaID = areaID

            // controls.move2Point(self.mark.position);
        }

    };


    function setEndArea(areaID, jumpToFloor) {

        // self.mark.visible = false;
        var displayModel = GIM.DisplayModel.prototype.allArea[areaID];
        if (displayModel) {

            self.endMark.visible = false;
            self.endMark.position.x = displayModel.data.nodePosition.x;
            self.endMark.position.y = displayModel.data.nodePosition.y;
            self.endMark.position.z = displayModel.data.deep + 3;
            displayModel.floor.remove(self.endMark);
            displayModel.floor.add(self.endMark);
            self.mark.visible = false;
            // self.endMark.visible = true;
            self.endMarkShowTimer = setTimeout(function() {
                self.endMark.visible = true;
                clearTimeout(self.endMarkShowTimer);

            }, 100);
            if (displayModel.floor.facilityPOIList.indexOf(self.endMark) == -1)
                displayModel.floor.facilityPOIList.push(self.endMark);
            self.endNode.pointID = displayModel.pointID
            self.endNode.floorID = displayModel.floorID
                // console.log("setEndArea:", displayModel.pointID);
            if (self.endNode.pointID && self.startNode.pointID && GIM.DEBUG_MODE) {
                searchPath(function() {
                    zoomLevel(20);
                    self.setPolarAngle(60);
                });
            }

            if (curShownFloorIds.length > 1 || curShownFloorIds.indexOf(displayModel.floorID) == -1 && jumpToFloor) {
                showFloors([displayModel.floorID]);

            } else if (jumpToFloor && jumpToFloor != "undefined") {
                self.move2Point(displayModel.data.nodePosition);
            }

            return displayModel.pointID;
        } else {

            return null;
        }
    }


    function setStartArea(areaID, $jumpToFloor) {

        var jumpToFloor = $jumpToFloor;
        var displayModel = GIM.DisplayModel.prototype.allArea[areaID];
        if (displayModel) {
            self.startMark.visible = false;
            self.startMark.position.x = displayModel.data.nodePosition.x;
            self.startMark.position.y = displayModel.data.nodePosition.y;
            self.startMark.position.z = displayModel.data.deep + 3; //+ self.mark.scale.y / 2 
            displayModel.floor.add(self.startMark);
            self.mark.visible = false;

            self.startMarkShowTimer = setTimeout(function() {
                self.startMark.visible = true;
                clearTimeout(self.startMarkShowTimer);

            }, 100)

            if (displayModel.floor.facilityPOIList.indexOf(self.startMark) == -1) {
                displayModel.floor.facilityPOIList.push(self.startMark);

            }

            self.startNode.pointID = displayModel.pointID;
            self.startNode.floorID = displayModel.floorID;

            if (self.endNode.pointID && self.startNode.pointID && GIM.DEBUG_MODE) {
                searchPath(function() {
                    zoomLevel(20);
                    self.setPolarAngle(60);
                });
            }

            if (curShownFloorIds.length > 1 || curShownFloorIds.indexOf(displayModel.floorID) == -1 && jumpToFloor) {
                showFloors([displayModel.floorID]);

            } else if (jumpToFloor && jumpToFloor != "undefined") {
                self.move2Point(displayModel.data.nodePosition);

            }

            return displayModel.pointID;

        } else {

            return null;
        }

    }


    function selectUnit3DByPosition(mouseX, mouseY) {


        mouse.x = ((mouseX - containerPos.left) / containerWidth) * 2 - 1;
        mouse.y = -((mouseY - containerPos.top) / containerHeight) * 2 + 1;

        raycaster.setFromCamera(mouse, cameraController.camera);
        var intersects = raycaster.intersectObjects(GIM.DisplayUnit3D.prototype.hitCheckMeshs, false);

        if (intersects.length > 0) {

            var faceIndex = intersects[0].faceIndex;
            var tempMesh = intersects[0].object;

            for (var key in GIM.DisplayModel.prototype.allArea) {

                var model = GIM.DisplayModel.prototype.allArea[key];
                if (model.floorID != tempMesh.floorID || curShownFloorIds.indexOf(model.floorID) == -1) continue;

                if (faceIndex > model.faceRange[0] && faceIndex <= model.faceRange[1]) {

                    selectUint3DByAreaId(key, GIM.CLICK_FOCUS);
                    break
                }
            }


        }
    }


    function cleanSelectUnit3D() {

        if (mapPin) mapPin.close();
        if (lastSelectdModel && lastSelectdModel.areaID) {

            var displayModel = GIM.DisplayModel.prototype.allArea[lastSelectdModel.areaID];
            lastSelectdModel = {};

            if (displayModel) {
                var areaFaces = displayModel.geometry.faces.slice(displayModel.faceRange[0], displayModel.faceRange[1]);
                updateFaceColors(areaFaces, displayModel.data.fill);
                displayModel.geometry.colorsNeedUpdate = true;
                // var index = displayModel.floor.facilityPOIList.indexOf(self.mark); //standby
                // if (index != -1) {
                //     displayModel.floor.facilityPOIList.splice(index, 1);
                // }
            }
        }

    }



    function updateFaceColors(faces, color) {

        var c = new THREE.Color(color);
        faces.forEach(function(face) {

            for (var j = 0; j < 3; j++) {

                face.vertexColors[j].copy(c);
            }
        })
    }


    function toScreenCoordinate(worldX, worldY, worldZ) {
        var projector = new THREE.Projector();
        var worldVector = new THREE.Vector3(worldX + floorContainer.position.x, worldY + floorContainer.position.y, worldZ);
        var vector = projector.projectVector(worldVector, cameraController.camera);
        console.log(vector);
        return {
            x: Math.round(vector.x * containerHalfWidth + containerHalfWidth),
            y: Math.round(-vector.y * containerHalfHeight + containerHalfHeight)
        };
    }


    function toScreenXY(worldX, worldY, worldZ) {
        var vector = new THREE.Vector3(worldX + floorContainer.position.x, worldY + floorContainer.position.y, worldZ);
        vector.project(cameraController.camera);
        var pos = vector.clone();
        pos.x = (pos.x * containerHalfWidth) + containerHalfWidth;
        pos.y = -(pos.y * containerHalfHeight) + containerHalfHeight;

        return {
            x: pos.x - 1,
            y: pos.y + 1
        };

    }

    function findOffset(element) {

        var pos = new Object();
        pos.left = pos.top = 0;
        if (element.offsetParent) {
            do {
                pos.left += element.offsetLeft;
                pos.top += element.offsetTop;
            } while (element = element.offsetParent);
        }
        return pos;
    }


    function averageVectors(vector3Ds) {

        var resultVector3Ds = [];
        var preVector = null;
        for (var i = vector3Ds.length - 1; i >= 0; i--) {
            var vector = vector3Ds[i];
            if (preVector) {
                resultVector3Ds.push(preVector);
                var tmpVector = vector.clone().sub(preVector);
                var length = tmpVector.length();
                if (length > GIM.PATH_POINT_GAP) {
                    var times = parseInt(length / GIM.PATH_POINT_GAP);
                    for (var t = 1; t < times; t++) {
                        resultVector3Ds.push(tmpVector.clone().multiplyScalar(t / times).add(preVector));
                    }
                }
            }
            preVector = vector;
        }
        return resultVector3Ds;

    }


    function onContainerMouseDown(e) {
        e.preventDefault();

        if (e.target.id !== "gotoImage" && e.target.id !== "searchImage" && Object.prototype.toString.apply(e.target) !== "[object HTMLCanvasElement]") return;

        var touch;
        if (e instanceof MouseEvent) {
            touch = e;
            // if (GIM.DEBUG_MODE) console.log("- [GimMap]Map3D.onContainerMouseDown", touch.clientX, touch.clientY);
        } else {
            touch = e.targetTouches[0];
            // if (GIM.DEBUG_MODE) console.log("- [GimMap]Map3D.onContainerTouchDown", touch.clientX, touch.clientY);
        }
        mouseOrigPoint.x = touch.clientX;
        mouseOrigPoint.y = touch.clientY;

        if (e.target.id === "gotoImage") {

            // clearPath();
            setEndArea(self.currentSelectUint3DID);
            mapPin.close();

        } else if (e.target.id === "searchImage") {

            // clearPath();
            setStartArea(self.currentSelectUint3DID);
            mapPin.close();


        } else {
            selectUnit3DByPosition(touch.clientX, touch.clientY);
            if (curSelectedUnit3D) showPinOnUnit3D(curSelectedUnit3D);
        }


    }


    function init() {
        init3d();
        initComponents();
        initData2();
        setInterval(doPathAnimate, pathAnimateTime);
        mainContainer.style.display = "none";
        // mainContainer.style.visibility="hidden";
        // setInterval(delayMove, 2000);
        doAnimate();
        mainContainer.addEventListener('click', onContainerMouseDown, false);
        // mainContainer.addEventListener("DOMNodeInserted", reset, true);
        setSize(parseFloat(mainContainer.style.width), parseFloat(mainContainer.style.height));
    }

    function init3d() {

        renderer = new THREE.WebGLRenderer({
            antialias: true,
            preserveDrawingBuffer: false,
            stencil: false,
            logarithmicDepthBuffer: false
        });

        renderer.setClearColor(backgroundColor);
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.sortObjects = true;
        renderer.autoClear = true;
        renderer.shadowMap.enabled = false;
        // renderer.shadowMapType = THREE.PCFShadowMap;

        renderer.gammaInput = true;
        renderer.gammaOutput = true;

        renderer.shadowMap = false;
        renderer.shadowMap.renderReverseSided = false;

        mainContainer.appendChild(renderer.domElement);

        scene = new THREE.Scene();
        container3D = new THREE.Group();
        scene.add(container3D);

        GIM.scene = scene;
        cameraController = new GIM.CameraController(mainContainer, container3D);
        containerPos = findOffset(mainContainer);


        controls = new THREE.OrbitControls(cameraController.camera, renderer.domElement, floorContainer, enabledControl);
        controls.dampingFactor = 0.25;
        controls.enableDamping = true;
        // controls.enableZoom = false;
        controls.addEventListener('change', mapChange);

        cameraController.camera.position.z = 7000;
        cameraController.camera.position.x = 0;
        cameraController.camera.position.y = 0;

        // 初始化点击器
        raycaster = new THREE.Raycaster();

        splineCamera = new THREE.PerspectiveCamera(84, window.innerWidth / window.innerHeight, 0.01, 1000);
        splineCamera.position.set(0, 0, 500);
        self.cameraEye = new THREE.Mesh(new THREE.SphereGeometry(15), new THREE.MeshBasicMaterial({ color: 0xff00ff }));
        cameraHelper = new THREE.CameraHelper(splineCamera);

        // scene.add( cameraHelper );
        // scene.add( self.cameraEye );
        // scene.add( splineCamera );;


    }


    function initComponents() {
        if (GIM.DEBUG_MODE) {
            stats = new Stats();
            stats.domElement.style.cssText += 'position:absolute;top:0px';
            mainContainer.appendChild(stats.domElement);
        }

        if (GIM.DEBUG_MODE) {
            floorSelector = new GIM.FloorSelector(mainContainer);
            zoomBar = new GIM.ZoomBar(mainContainer, cameraController, floorContainer);
            mapPin = new GIM.MapPin(mainContainer);
        }

        compass = new GIM.Compass(mainContainer, controls, compassOffset);

    }


    function initData2() {

        // localStorage.clear();
        initRecursos();
        var localData = localStorage.getItem("AreaData" + GIM.PID);

        if (localData) {
            bulidModel(JSON.parse(localData))

        } else {

            var cmd = {};
            cmd.command = "getArea";
            cmd.pid = GIM.PID;
            cmd.lan = "sc";
            cmd.parameter = { "FormfatFloor": "TRUE" };
            var agrs = "code=" + JSON.stringify(cmd);
            GIM.SVGParser.loadURL(GIM.REMOTE_SERVER, agrs, function(data) {

                try {
                    localStorage.setItem("AreaData" + GIM.PID, JSON.stringify(data));
                } catch (err) {

                    localStorage.clear();
                    console.log(err)
                }

                bulidModel(data)
            })
        }

    }

    function initRecursos() {

        self.mark = new THREE.Sprite();
        GIM.SVGParser.loadTexture(GIM.ThemePath + "imageMarker.png", "mark", function(sp) { self.mark = sp; });
        GIM.SVGParser.loadTexture(GIM.ThemePath + "start.png", "startmark", function(sp) { self.startMark = sp; });
        GIM.SVGParser.loadTexture(GIM.ThemePath + "end.png", "endmark", function(sp) { self.endMark = sp; });

        var textureLoader = new THREE.TextureLoader();
        textureLoader.crossOrigin = "Anonymous";
        textureLoader.load(GIM.ThemePath + "pointer.png", function(mapC) {

            var width = mapC.image.width;
            var height = mapC.image.height;
            var geometry = new THREE.PlaneBufferGeometry(width / 1, height / 1, 1);
            var material = new THREE.MeshBasicMaterial({ map: mapC, side: THREE.DoubleSide, transparent: true });
            locationMark = new THREE.Mesh(geometry, material);
            locationMark.position.z = 50;
            locationMark.visible = false;
            floorContainer.add(locationMark)

        });


    };

    var floorData = [];
    var floorDataDic = {};
    var areaIDInFloor = {};

    function bulidModel(data) {

        var floors = data.v[0].Floor;
        var tempFloorIDList = [];

        floors.sort(function(a, b) { return a.Order - b.Order }, 16);
        floors.forEach(function(t) { // array to dic  and  set id list

            var oneFloorData = {};
            tempFloorIDList.push(t.FloorID);
            oneFloorData.floorID = t.FloorID;
            oneFloorData.order = t.Order;
            oneFloorData.name = t.Name;
            floorData.push(oneFloorData); // output to initCompleted func
            floorDataDic[t.FloorID] = t;

            t.Area.forEach(function(area) {
                    areaIDInFloor[area.AreaID] = area.FloorID;
                }

            )
            if (GIM.DEBUG_MODE) floorSelector.addLogo(t.FloorID, t.Name, GIM.LOCAL_PATH + "img/floorlogo/" + "floor1" + ".png", false, showFloors);

        })

        // console.log(areaIDInFloor);

        container3D.add(floorContainer);

        var initFloorData = floorDataDic[GIM.INIT_FLOORID] ? floorDataDic[GIM.INIT_FLOORID] : floorDataDic[tempFloorIDList[0]];

        if (initFloorData) {
            var floor3D = new GIM.DisplayFloor3D(initFloorData, true);
            floor3D.isCreated = true;
            floor3Ds[initFloorData.FloorID] = floor3D;
            floor3D.visible = false;
            floorContainer.add(floor3D);
            tempFloorIDList.push(floor3D.floorID);
        }

        setTimeout(function() {
            GIM.INIT_FLOORID = tempFloorIDList.indexOf(GIM.INIT_FLOORID) > -1 ? GIM.INIT_FLOORID : tempFloorIDList[0];
            showFloors([GIM.INIT_FLOORID]);
            initCompleted(floorData);
            initFloorData.isCreated = true;
            // mainContainer.style.visibility="visible";
            mainContainer.style.display = "block";

        }, 100);

        ansyncbulidModel(floors);
        isMapReady = true;


    }

    function checkFloorIsCreat(floorID) {
        if (!floor3Ds[floorID]) {
            var floor3D = new GIM.DisplayFloor3D(floorDataDic[floorID], true);
            floor3D.isCreated = true;
            floor3Ds[floorID] = floor3D;
            // floor3D.visible = false;
            floorContainer.add(floor3D);
            // floor3D.position.z = maxFloorPositionZ;
        }
    }

    function ansyncbulidModel(floors) {

        var index = 0;
        var timerID = setInterval(function() {

            var currentCreatData = floors[index];
            index++;
            if (index == floors.length) {
                clearInterval(timerID)
            }

            if (currentCreatData.isCreated || floor3Ds[currentCreatData.FloorID]) {
                return
            } else {

                var floor3D = new GIM.DisplayFloor3D(currentCreatData, false);
                floor3Ds[currentCreatData.FloorID] = floor3D;
                floor3D.isCreated = true;
                floor3D.visible = false;
                floorContainer.add(floor3D);
                floor3D.position.z = maxFloorPositionZ;

            }
        }, 1000)


    }


    function doAnimate() {
        if (GIM.DEBUG_MODE) stats.update();
        render();
        requestAnimationFrame(doAnimate);
    }


    function forceUpate() {

        self.forceRender = true;
        clearTimeout(self.timeOutID);
        self.timeOutID = setTimeout(function() {
            self.forceRender = false;
        }, 2000)

    };


    function render() {

        var newTime = performance.now();
        var offset = newTime - this.oldTime;

        if (!self.forceRender && offset < 50) {
            return
        }

        // doPathAnimate();
        if (controls) controls.update();
        if (cameraHelper) cameraHelper.update();

        renderer.clear();
        renderer.clearDepth();
        renderer.render(scene, cameraController.camera);
        this.oldTime = newTime;

        update();

    } //

    var pathIndex = 0;
    var speed = -5;

    function autoCenterLocation() {

        if (self.path) {
            if (self.path.length < pathIndex) return;



            var p1 = self.path[pathIndex];
            var p2 = self.path[pathIndex + 1];
            dis = Math.floor(Point.distance(new Point(floorContainer.position.x, floorContainer.position.y), new Point(p2.x, p2.y)));

            var atan2 = Math.atan2(p1.y - p2.y, p1.x - p2.x);
            speedY = speed * Math.sin(atan2);
            speedX = speed * Math.cos(atan2);
            floorContainer.translateX(speedX);
            floorContainer.translateY(speedY);

        }


    }

    function update() {

        var cameraPosition = cameraController.camera.position;
        for (var i = 0 in floorContainer.children) {

            var floor3d = floorContainer.children[i];

            if (floor3d && !floor3d.visible || !floor3d.hasOwnProperty("labelPOIList") || !floor3d.isCreated) continue;

            collision.clear();

            var b = new THREE.Vector3();
            var d = b.distanceTo(cameraPosition);

            floor3d.labelPOIList.forEach(
                    function(sprite3d) {

                        var vec = new THREE.Vector3();
                        var scaleFactor = 1.1; // a constant
                        var defaultDepth = 150; // a constant

                        var temp = sprite3d.width / sprite3d.height;
                        var length = vec.setFromMatrixPosition(sprite3d.matrixWorld).sub(cameraPosition).length();

                        var pro = project(sprite3d);

                        var obj = {
                            x: pro.x,
                            y: pro.y,
                            w: sprite3d.scale.x * 2,
                            h: sprite3d.scale.y * 2
                        }

                        // var obj = {
                        //     x: sprite3d.position.x,
                        //     y: sprite3d.position.y,
                        //     w: sprite3d.scale.x * 1.5,
                        //     h: sprite3d.scale.y * 1.5
                        // }

                        if (!sprite3d.isFacility) {

                            if (d < GIM.SHOW_SPRITE_LENGTH) {

                                scaleFactor = cameraPosition.z > 5000 ? 1 : 1.2;
                                var isCollision = collision.push(null, obj);
                                sprite3d.visible = !isCollision;

                            } else {

                                if (sprite3d.areaType != GIM.NODE_TYPE_ENTRANCE && sprite3d.areaType != GIM.NODE_TYPE_BULID) {

                                    sprite3d.visible = false;

                                } else {

                                    sprite3d.visible = true;

                                }

                            }

                        } else {

                            scaleFactor = cameraPosition.z > 3000 ? 0.5 : 1.8;
                        }

                        sprite3d.scale.x = scaleFactor * length / defaultDepth * temp * scaleFactor;
                        sprite3d.scale.y = scaleFactor * length / defaultDepth * scaleFactor;

                    }


                ) // end  for labelPOIList

            floor3d.facilityPOIList.forEach(function(t) {

                    var vec = new THREE.Vector3();
                    var temp = t.width / t.height;
                    var scaleFactor = 1; // a constant
                    var defaultDepth = 50; // a constant
                    var length = vec.setFromMatrixPosition(t.matrixWorld).sub(cameraPosition).length();

                    if (d > GIM.SHOW_Facility_LENGTH && t.name.search("mark") == -1) {
                        t.visible = false;
                        return;
                    } else {
                        if (t.name.search("mark") != -1) {

                        } else {

                            t.visible = true;


                        }
                    }
                    t.scale.x = length / defaultDepth * temp * scaleFactor;
                    t.scale.y = length / defaultDepth * scaleFactor;


                }) // end facilityPOIList

        }

    }


    function project(a) {
        var b = new THREE.Vector3;
        b.setFromMatrixPosition(a.matrixWorld);
        b.project(cameraController.camera);

        var c = b.x,
            d = b.y
        return {
            x: c * containerWidth,
            y: -d * containerHeight
        }
    }

    function mapChange() {

        if (GIM.DEBUG_MODE) mapPin.close();
    }


    function makeSquare(vector3Ds) {
        var g = new THREE.Geometry();

        for (var i = 0; i < vector3Ds.length; i++) {
            var position_ = vector3Ds[i]
            g.vertices[i] = new THREE.Vector3(position_.x, position_.y, position_.z);
        }

        return g;
    };

    function makeLine(geo, vector3Ds) {

        floorContainer.remove(floorContainer.getObjectByName("line"));
        var id = "canvasID";
        var textureIcon = drawLine(id);
        var strokeTexture;
        var texture = new THREE.Texture(textureIcon);
        texture.needsUpdate = true;
        strokeTexture = texture;
        strokeTexture.wrapS = strokeTexture.wrapT = THREE.RepeatWrapping;
        strokeTexture.repeat.set(0.8, 0.8);


        var resolution = new THREE.Vector2(containerWidth, containerHeight);
        // var geo = makeSquare(vector3Ds);

        var g = new MeshLine();
        g.setGeometry(geo);

        var material = new MeshLineMaterial({
            map: strokeTexture, //self.TestMap,
            useMap: true, //params.strokes,
            // color: new THREE.Color(0xff0000),
            opacity: 1,
            // dashArray: new THREE.Vector2( 10, 5 ),
            resolution: resolution,
            sizeAttenuation: false,
            lineWidth: GIM.pathWidth,
            near: GIM.near,
            far: GIM.far,
            depthWrite: false,
            depthTest: true,
            alphaTest: 0.5,
            transparent: true,
            side: THREE.DoubleSide,
            repeat: new THREE.Vector2(vector3Ds.length / 1, 1),
            sizeAttenuation: true,
        });

        var mesh = new THREE.Mesh(g.geometry, material);
        mesh.visible = true;
        mesh.name = 'line';
        floorContainer.add(mesh);
    }


    function drawLine(id) {
        var godEdgeColor = "#4a82d2",
            godColor = GIM.PATH_COLOR,
            godArrowColor = "#F4FEFB",
            height = 200,
            width = 300,
            godHeightPercent = .5,
            godEdgePercent = .2,
            godArrowPercent = .3,
            godArrowXScale = .6,
            godArrowWidthPercent = .07;
        var textCanvas = document.createElement("canvas");
        document.body.appendChild(textCanvas);
        textCanvas.style.cssText = "width:" + width + "px;height:" + height + "px;margin:0px;display:none;";
        var a = textCanvas.getContext("2d");
        a.fillStyle = godEdgeColor;
        a.fillRect(0, 0, width, height);
        a.fillStyle = godColor;
        var b = godEdgePercent * height / 2;
        c = (godHeightPercent + godArrowWidthPercent) * height;
        a.fillRect(0, b, width, c);
        a.fillStyle = "#ffffff";
        a.shadowOffsetX = -2;
        a.shadowOffsetY = 2;
        a.shadowBlur = 4;
        a.shadowColor = "rgba(0,0,0,0.5)";
        var d = { x: width / 2, y: height / 2 };
        e = width * godArrowPercent;
        f = width * godArrowWidthPercent;
        g = width * (godArrowPercent - godArrowWidthPercent) * godArrowXScale;
        h = d.x - e / 2 * godArrowXScale;
        i = d.y - e / 2;
        a.beginPath();
        a.moveTo(h, b);
        a.lineTo(h + f, b);
        a.lineTo(h + f + g, c / 2 + b);
        a.lineTo(h + f, c + b);
        a.lineTo(h, c + b);
        a.lineTo(h + g, c / 2 + b);
        a.closePath();
        a.fillStyle = godArrowColor;
        a.fill();
        return textCanvas;
    }


    function zoomLevel(level) {

        forceUpate();
        var gap = 19;
        if (controls && cameraController.camera) {
            var levelGap = (controls.maxDistance - controls.minDistance) / gap;
            var temp = level * levelGap + controls.minDistance;
            controls.setDistance(temp);
        }
    }

    self.setPolarAngle = function(angel) {

        if (controls) {
            var angelX = (angel / 180 * Math.PI);
            controls.setPolarAngle(angelX);
        }
    }

    self.setAzimuthalAngle = function(angel) {

        if (controls) {
            var statrAngel = controls.getAzimuthalAngle() * 180 / Math.PI;
            angel = shortRotation(statrAngel, angel);
            console.log("setAzimuthalAngle:", statrAngel, angel);
            var angelX = (angel / 180 * Math.PI);
            controls.setAzimuthalAngle(angelX);
        }

    }

    function shortRotation($start, $end) {
        console.log("dif:", $start, $end);
        var dif = ($end - $start) % 360;
        if (dif != dif % 180) {
            dif = (dif < 0) ? dif + 360 : dif - 360;
        }
        return ($start + dif) % 360;
    }

    self.clearEndArea = function() {

        if (self.endMark)
            self.endMark.visible = false;
        self.endNode = {};
    }

    self.clearStartArea = function() {

        if (self.startMark)
            self.startMark.visible = false;
        self.startNode = {};
    }

    self.move2Point = function(position) {

        function onComplete() {

            if (GIM.DEBUG_MODE && self.mark) showPinOnUnit3D(self.mark.position);
            self.forceRender = false;
        }
        self.forceRender = true;
        TweenLite.to(floorContainer.position, 0.5, { x: -position.x, y: -position.y, z: 0, onComplete: onComplete })

    }


    this.setLocation = function(position, autoCenterLocation) { // set locationMark position

        // console.log("setLocation!");
        if (locationMark == undefined) return;
        locationMark.visible = true;
        locationMark.position.x = position.x;
        locationMark.position.y = position.y;
        locationMark.position.z = position.z + 20;

        if (autoCenterLocation !== undefined && autoCenterLocation == true) {

            TweenLite.set(floorContainer.position, { x: -position.x, y: -position.y, z: -position.z });

        }

    }

    this.locationMarkRotation = function(rad) {

        if (locationMark) {
            locationMark.visible = true;
            TweenLite.killTweensOf(locationMark.rotation);
            TweenLite.to(locationMark.rotation, 0.3, { z: rad });
        }

    }

    this.moveToLocation = function() {

        // 当前楼层 和非当前楼层两种状�?
        if (floorContainer && locationMark && locationMark.visible) { //&& pathAnimatePointMeshes.length > 2  && locationMark.visible
            self.forceRender = true;
            TweenLite.to(floorContainer.position, 1, {
                x: -locationMark.position.x,
                y: -locationMark.position.y,
                z: -locationMark.position.z,
                onComplete: function() {

                    self.forceRender = false;

                }
            }); //,ease:Linear.easeNone
        }

    }

    this.showLocation = function() {

        console.log("showLocation!");
        // locationMark.floorID = "8AD368B1-A9B7-4E54-A37E-A3EA8424A1ED";
        if (locationMark && locationMark.floorID) {
            var floor3D = floor3Ds[locationMark.floorID];

            if (floor3D && floor3D.visible) {

                setTimeout(function() {
                    var floor3D = floor3Ds[locationMark.floorID];
                    self.setLocation(floor3D.position);
                    self.moveToLocation();

                }, 1000)

            } else {

                showFloors([locationMark.floorID]);
                setTimeout(function() {
                    var floor3D = floor3Ds[locationMark.floorID];
                    self.setLocation(floor3D.position);
                    self.moveToLocation();

                }, 1000)

            }


            return true;
        } else {


            return false;
        }

    }
    var locationModel = true;
    this.setLocationMark = function(position, floorID, jumpToFloor) {
        console.log("setLocationMark?");
        var floor3D = floor3Ds[floorID];
        if (!floor3D) return;

        locationMark.visible = floor3D.visible;
        locationMark.floorID = floor3D.floorID;
        var floor3DZ = floor3D.position.z;
        position.z = floor3DZ + 40;

        switch (locationModel) {

            case "lockCenter":

                self.setLocation(position, true);
                if (!isNavigation)
                    self.moveToLocation();

                break;
            case "lookAt":

                self.setLocation(position, true);

                break;

            case "normal":

                // self.setLocation(position,true);
                break;

            default:
                break;
        }




        // Reconstruction isNavigation
        if (floor3D.visible) {
            self.setLocation(position, true)




        } else if (jumpToFloor) {

            showFloors([floorID]);
        } else {

            // locationMark.visible = false;

        }

    }

    /**
     * @param {*String} params  lookAt\\normal\\lockCenter
     */

    // var locationModel = true;
    this.setLocationModel = function(model) {

        locationModel = model;

    }

    this.getLocationModel = function(model) {

        return locationModel;

    }

    this.hideLocationMark = function() {

        console.log("hideLocationMark");
        locationMark.visible = false;
    }

    this.setShop = function(shopID) {

        var areaData = GIM.DisplayModel.prototype.getAreaByShop(shopID);

        setTimeout(function() {
            setEndArea(areaData.areaID);

        }, 200);

        return areaData;
    }

    this.showCompass = function(visible) {

        if (compass) {
            compass.showCompass(visible);

        }

    }


    init();

    self.selectUint3DByAreaId = selectUint3DByAreaId; //area id type：string
    self.setEndArea = setEndArea; //area id string
    self.setStartArea = setStartArea; //area id string
    self.searchPath = searchPath; //start point id  and end point id  type: string
    self.clearPath = clearPath; // no param
    self.showFloors = showFloors; //floorid string
    self.zoomLevel = zoomLevel; //zoomLevel string                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
    self.setSize = setSize; //width height
    self.reset = reset;
    self.cleanSelectUnit3D = cleanSelectUnit3D;

}
