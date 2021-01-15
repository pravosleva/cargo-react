importScripts('./utils/retail.js');

var window = self

importScripts('./utils/build-url.js');

function b64_to_utf8(str) {
  if (!!window) {
    return decodeURIComponent(escape(window.atob(str)));
  }
  return str;
}
function utf8_to_b64(str) {
  if (!!window) {
    return window.btoa(unescape(encodeURIComponent(str)));
  }
  return str;
}

const getCalc = (queryParams) => {
  return retail2(queryParams)
}

const getUrl = (containerGroupData, baseUrl = 'https://selection4test.ru', path = '/projects/cargo-3d-2021') => {
  const {
    productList,
    id,
    carrying,
    width,
    length,
    height,
  } = containerGroupData
  const queryParams = {
    wagonLength: length,
    wagonWidth: width,
    wagonHeight: height,
    wagonCarryingCapacity: carrying,
    // cargoLength
    maxInWagon: 13,
    maxRowsInWagon_byWagonWidth: 2,
    maxRowsInWagon_byWagonLength: 50,
    maxFloorsInWagon: 1,
    cargoType: 'thermocold_chillers',
    modelName: 'tst',
    containerType: 'truck_v1',
    productList: utf8_to_b64(JSON.stringify(productList))
  }

  return {
    url: buildUrl(baseUrl, {
      path,
      queryParams,
    }),
    queryParams,
  }
}

self.onmessage = async ($event) => {
  // if ($event && $event.data && $event.data.msg === 'counterSample') {
  //   const newCounter = incApple($event.data.countApple);
  //   self.postMessage({ count: newCounter });
  // }
  if ($event && $event.data && $event.data.msg === 'getCombinationsAnalysis') {
    const t0 = Date.now()
    const _result = []
    // const promiseList = []
    const queryParamsPackArr = []
    const _r = []
    const info = {
      min: 1000000,
      minIndex: undefined,
      max: 0,
      maxIndex: undefined,
    }

    $event.data.combs.forEach((comb, i) => {
      // if (i === 0) console.log($event.data);
      const _urlData = getUrl({ ...$event.data.containerGroupData, productList: comb })
      const threejsLink = _urlData.url
      // const apiUrl = this.getUrl({ ...containerGroupData, productList: comb }, 'https://selection4test.ru', '/projects/cargo-2021/get-running-meters-in-wagon').url
      _result.push({ threejsLink })
      // console.log(getCalc(_urlData.queryParams))
      // { totalX: num, success: 0|1 }
      const res = getCalc(_urlData.queryParams);
      if (res.success === 1) {
        if (res.totalX <= info.min) {
          info.min = res.totalX;
          info.minIndex = i;
        }
        if (res.totalX >= info.max) {
          info.max = res.totalX;
          info.maxIndex = i;
        }
      }

      _r.push({
        res,
        // apiUrl: _result[i].apiUrl,
        threejsLink: _result[i].threejsLink,
      })
      self.postMessage({ count: 1, actionCode: 'COUNT', containerGroupData: $event.data.containerGroupData, totalCombinations: $event.data.combs.length });
    })

    let result = []

    if (typeof info.minIndex !== 'undefined') {
      result = [_r[info.minIndex], _r[info.maxIndex]]
    } else {
      result = _r.sort((e1, e2) => e1.res.totalX - e2.res.totalX)
    }
    const t1 = new Date().getTime()

    self.postMessage({ result, actionCode: 'RESULT', performanceInSeconds: (t1 - t0) / 1000, containerGroupData: $event.data.containerGroupData });
  }
};

function incApple(countApple) {
    return countApple + 1;
}
