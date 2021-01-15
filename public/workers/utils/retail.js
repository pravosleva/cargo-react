// const retail = require('../../promventholod/calculate/retail')
// require('../../public/javascripts/cargo-tools/retail.js')

// import { b64_to_utf8 } from './convert/b64-to-utf8'

function b64_to_utf8(str) {
  if (!!window) {
    return decodeURIComponent(escape(window.atob(str)));
  }
  return str;
}

var retail = (function(){
  return{
    inWagon: function(arg){
      //console.log(arg);
      let length = Number(arg.length),
        width = Number(arg.width),
        height = Number(arg.height),
        weight = Number(arg.weight),
        maxInWagon = Number(arg.maxInWagon),
        addSize = Number(arg.addSize),
        maxRowsInWagon_byWagonWidth = Number(arg.maxRowsInWagon_byWagonWidth),
        maxRowsInWagon_byWagonLength = Number(arg.maxRowsInWagon_byWagonLength),
        maxFloorsInWagon = Number(arg.maxFloorsInWagon);
      //console.log(length, width, height);
      // The Wagon
      var wagon = {};
      wagon.maxLength = Number(arg.wagon.maxLength);
      wagon.maxWidth = Number(arg.wagon.maxWidth);
      wagon.maxHeight = Number(arg.wagon.maxHeight);
      wagon.maxWeight = Number(arg.wagon.maxWeight);

      var l, w, floors, result, config={}, horizontalOrientation = "undefined";
      if(length < width){
        l = width + addSize;
        w = length + addSize;
      }else{
        w = width + addSize;
        l = length + addSize;
      };
      var result = 0,
        comment = `Additional horizontal size is ${addSize} mm
Dims for each unit [ in Blue + additional size ] is ${l} x ${w} x ${height} mm`;
      if(w > wagon.maxWidth){
        result = 0;
        comment += " / Наименьший гор. размер 1 единицы с учетом запаса превышает макс. ширину контейнера " + w + " > " + wagon.maxWidth + " mm!"
      }else if(l > wagon.maxLength){
        result = 0;
        comment += " / Наибольший гор. размер 1 единицы с учетом запаса превышает макс. длину контейнера " + l + " > " + wagon.maxLength + " mm!"
      }else if(height > wagon.maxHeight){
        result = 0;
        comment += " / Вертикальный размер 1 единицы превышает макс. высоту контейнера " + height + " > " + wagon.maxHeight + " mm!"
      }else if(weight > wagon.maxWeight){
        result = 0;
        comment += " / Масса 1 единицы превышает грузоподъемность контейнера " + weight + " > " + wagon.maxWeight + " kg!";
      }else{
        // расчетное количество ярусов в машине (в соответствии с разрешенным maxFloorsInWagon для данного бренда)
        floors = 1;
        for(var i=1; i<=maxFloorsInWagon; i++){ if(wagon.maxHeight >= (height * i)){floors = i} };

        // v2
        config.byLength1 = Math.floor(wagon.maxLength / (length + addSize));
        if(config.byLength1 > maxRowsInWagon_byWagonLength){config.byLength1 = maxRowsInWagon_byWagonLength};
        config.byWidth1 = Math.floor(wagon.maxWidth / (width + addSize));
        if(config.byWidth1 > maxRowsInWagon_byWagonWidth){config.byWidth1 = maxRowsInWagon_byWagonWidth};
        config.result1 = config.byLength1 * config.byWidth1;
        config.byLength2 = Math.floor(wagon.maxLength / (width + addSize));
        if(config.byLength2 > maxRowsInWagon_byWagonLength){config.byLength2 = maxRowsInWagon_byWagonLength};
        config.byWidth2 = Math.floor(wagon.maxWidth / (length + addSize));
        if(config.byWidth2 > maxRowsInWagon_byWagonWidth){config.byWidth2 = maxRowsInWagon_byWagonWidth};
        config.result2 = config.byLength2 * config.byWidth2;

        //result = Math.max(config.result1, config.result2);
        //if(result === config.result1){horizontalOrientation = "byLength"}else{horizontalOrientation = "byWidth"}
        if(config.result1 >= config.result2){
          result = config.result1;
          horizontalOrientation = "byLength";
          // for the 3D model:
          config.pcsX = config.byLength1;
          config.pcsY = config.byWidth1;
          config.pcsZ = floors;
        }else if(config.result1 < config.result2){
          result = config.result2;
          horizontalOrientation = "byWidth";
          // for the 3D model:
          config.pcsX = config.byLength2;
          config.pcsY = config.byWidth2;
          config.pcsZ = floors;
        }else{
          comment += " / Не удалось определить расположение груза относительно контейнера!";
        }

        //result = result * rows;
        if(result > maxRowsInWagon_byWagonLength * maxRowsInWagon_byWagonWidth){result = maxRowsInWagon_byWagonLength * maxRowsInWagon_byWagonWidth};
        if(result * floors > maxInWagon){
          result = maxInWagon
        }else{
          result = result * floors;
        }
      };//console.log(result);

      // Full length:
      let sizes = {};
      // 2) Height is firstly:
      var _pcs = 0, // количество отображаемых кубиков
        _pcsBlue = 0, _pcsXBlue = 0, _pcsYBlue = 0, _pcsZBlue = 0; // кол-во синих по X Y Z

			// --- Should be refactored!
			_pcs = 0;
			_pcsXBlue = _pcsYBlue = _pcsZBlue = 0;
			for (let j = 0; j < config.pcsX; j++){ // For each by X
				for (let k = 0; k < config.pcsZ; k++){ // For each by Z
					for (let i = 0; i < config.pcsY; i++) { // For each by Y
						_pcs += 1;
						if (_pcs <= result) {// If Blue
              _pcsBlue += 1;

							if (_pcsXBlue < j) _pcsXBlue = j;
							if (_pcsYBlue < i) _pcsYBlue = i;
							if (_pcsZBlue < k) _pcsZBlue = k;

						}
					}
				}
			};
			_pcsXBlue += 1;
			_pcsYBlue += 1;
			_pcsZBlue += 1;
			// ---

      sizes.pcsPossible = _pcsBlue;
      sizes.pcsXPossible = _pcsXBlue;
      sizes.pcsYPossible = _pcsYBlue;
      sizes.pcsZPossible = _pcsZBlue;
      switch(horizontalOrientation){
        case "byWidth":
          sizes.fullX = _pcsXBlue * (width + addSize);
          sizes.fullY = _pcsYBlue * (length + addSize);
          break;
        case "byLength":
        default:
          sizes.fullX = _pcsXBlue * (length + addSize);
          sizes.fullY = _pcsYBlue * (width + addSize);
          break;
      }
      sizes.fullZ = _pcsZBlue * height;
      sizes.comment = `Total units number is ${_pcs} pcs
Blue= ${_pcsBlue} pcs
BlueZ= ${_pcsZBlue} pcs
BlueY= ${_pcsYBlue} pcs
BlueX= ${_pcsXBlue} pcs
Full X size= ${sizes.fullX} mm
Full Y size= ${sizes.fullY} mm
Full Z size= ${sizes.fullZ} mm`;

      // Cost calc for 1 m. is possible...
      //...

      return { result, comment, horizontalOrientation, wagon, config, sizes }
    },
  }
})();

// const b64_to_utf8 = (str) => decodeURIComponent(escape(window.atob(str)));
// const b64_to_utf8 = (encoded) => {
//   var bytes = base64.decode(encoded);
//   var text = utf8.decode(bytes);
//
//   return text;
// }

const retail2 = ({
  productList: productListB64,
  wagonLength,
  wagonWidth,
  wagonHeight,
  maxInWagon,
  maxRowsInWagon_byWagonWidth,
  maxRowsInWagon_byWagonLength,
  maxFloorsInWagon,
  wagonCarryingCapacity,

}) => {
  const result = {}

  try {
    const productList = JSON.parse(b64_to_utf8(productListB64)),
      cargoLength = {},
      cargoWidth = {},
      cargoHeight = {},
      cargoWeight = {},
      cargoAddSize = {},
      products = productList.map((product) => {
        const {
          id,
          length,
          width,
          height,
          weight,
          addSize,
        } = product;
        const cargoConfig = retail.inWagon({
          length,
          width,
          height,
          weight,
          addSize,
          maxInWagon,
          maxRowsInWagon_byWagonWidth,
          maxRowsInWagon_byWagonLength,
          maxFloorsInWagon,
          wagon: {
            maxLength: wagonLength,
            maxWidth: wagonWidth,
            maxHeight: wagonHeight,
            maxWeight: wagonCarryingCapacity
          }
        });
        // console.log(cargoConfig)
        cargoLength[id] = length
        cargoWidth[id] = width
        cargoHeight[id] = height
        cargoAddSize[id] = addSize

        let config = cargoConfig.config;
        let _l_tpm = cargoLength[id];
        switch(cargoConfig.horizontalOrientation){
          case "byLength":
            cargoLength[id] = _l_tpm;
            cargoWidth[id] = width;
            break;
          case "byWidth":
            cargoLength[id] = width;
            cargoWidth[id] = _l_tpm;
            break;
          default:;
        }

        return ({
          ...product,
          cargoConfig,
          horizontalOrientation: cargoConfig.horizontalOrientation,
        })
      })

      // products.forEach(({
      //   id,
      //   width,
      //   length,
      //   horizontalOrientation,
      //   cargoConfig,
      // }) => {
      //   let config = cargoConfig.config;
      //   let _l_tpm = cargoLength[id];
      //   switch(horizontalOrientation){
      //     case "byLength":
      //       cargoLength[id] = _l_tpm;
      //       cargoWidth[id] = width;
      //       break;
      //     case "byWidth":
      //       cargoLength[id] = width;
      //       cargoWidth[id] = _l_tpm;
      //       break;
      //     default:;
      //   }
      // })

      const _fact_inWagon = {
        result: products.reduce((acc, { cargoConfig }) => acc + cargoConfig.result, 0),
        comment: 'In progress',
        sizes: {
          comment: 'In progress',
        },
      }

      var _pcs = 0;// количество отображаемых кубиков
      var offsetX = wagonLength*0.001/2.1;
      var offsetY = wagonWidth*0.001/4;
      var offsetZ_cargoOnly = 0.005; // m

      let mayBeOffsetY = 0
      let mayBeDowngradeOffsetX = 0
      let isCorrectCube = false
      let totalX = 0
      products.forEach(({ cargoConfig, id }, pi) => {
        const { config } = cargoConfig
        // console.log(config)
        for (let j = 0; j < 1; j++){ // For each by X
          // let x = j * cargoLength[id]*0.001 + cargoLength[id]*0.001/2 + (j+1)*cargoAddSize[id]*0.001;
          let x = j * cargoLength[id]*0.001 + cargoLength[id]*0.001/2 + cargoAddSize[id]*0.001;
          for (let k = 0; k < 1; k++){ // For each by Z
            let z = k * cargoHeight[id]*0.001 + cargoHeight[id]*0.001/2;
            for (let i = 0; i < 1; i++) { // For each by YS

              let y = i*cargoWidth[id]*0.001 + cargoWidth[id]*0.001/2 + (i+1)*cargoAddSize[id]*0.001;
              if (
                _pcs >= _fact_inWagon.result
                || wagonWidth < (cargoWidth[id] + cargoAddSize[id])
              ) {
                // cubeMaterial = new THREE.MeshBasicMaterial({ color: 0xff7373, wireframe: true })
                isCorrectCube = false;
              } else {
                // cubeMaterial = new THREE.MeshBasicMaterial({});
                _pcs += 1;
                isCorrectCube = true;
              }
              // var cube = new THREE.Mesh(getCubeGeometry(cargoLength[id], cargoWidth[id], cargoHeight[id]), cubeMaterial);
              if (
                // (mayBeOffsetY > 0 && ((wagonWidth*0.001 - mayBeOffsetY) > cargoWidth[id]*0.001))
                (mayBeOffsetY > 0 && ((wagonWidth*0.001 - mayBeOffsetY) > cargoWidth[id]*0.001))
                && ((mayBeDowngradeOffsetX - cargoLength[id]*0.001) > 0)
              ) {
                // cube.position.x = x - offsetX - mayBeDowngradeOffsetX;
                // cube.position.y = y + offsetY + mayBeOffsetY;
                mayBeOffsetY = 0
                // console.log('ADDED', productList[pi].name)
              } else {
                // console.log('NOT ADDED', productList[pi].name)
                // console.log((wagonWidth*0.001 - cargoWidth[id]*0.001),  mayBeOffsetY)
                // console.log('wagonWidth*0.001', wagonWidth*0.001)
                // console.log('mayBeOffsetY', mayBeOffsetY)
                // console.log('cargoWidth[id]*0.001', cargoWidth[id]*0.001)
                // cube.position.x = x - offsetX;
                // cube.position.y = y + offsetY;
                mayBeOffsetY = cargoWidth[id]*0.001 + cargoAddSize[id]*0.001
                mayBeDowngradeOffsetX = cargoLength[id]*0.001 + cargoAddSize[id]*0.001

                if (isCorrectCube) {
                  totalX += cargoLength[id]*0.001 + cargoAddSize[id]*0.001
                }
              }

              // cube.position.z = z + offsetZ_cargoOnly;
              // scene.add(cube);
            }
          }
        }
        // offsetX -= config.pcsX * (cargoLength[id]*0.001 + cargoAddSize[id]*0.001)

        if (mayBeOffsetY !== 0) {
          offsetX -= cargoLength[id]*0.001 + cargoAddSize[id]*0.001
        }
        mayBeDowngradeOffsetX = cargoLength[id]*0.001 + cargoAddSize[id]*0.001
      })

      result.totalX = totalX;
      result.success = 1;

  } catch (err) {
    result.success = 0
    result.message = err.message
  }

  return result
}
